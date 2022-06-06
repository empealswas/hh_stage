import React, {useEffect, useMemo, useState} from 'react';
import {BaseOptionChart} from "../../../../components/chart";
import {addDays, compareAsc, format, getMonth, parseISO, subDays} from "date-fns";
import {Teacher} from "../../../../models/Teacher";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Organization, PELessonRecord, Pupil} from "../../../../API";
import axios from "axios";
import {Principal} from "../../../../models/Principal";
import merge from "lodash/merge";
import {fShortenNumber} from "../../../../utils/formatNumber";
import {Box, Card, CardHeader} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import collect, {Collection} from 'collect.js';
import {useParams} from "react-router-dom";
import ActivtityChartSkeleton from "../../../../components/skeleton/ActivtityChartSkeleton";
import OrganizationDashboard from "../OrganizationDashboard";

const averageData = [{
    name: 'Marine Sprite',
    data: [44, 55, 41, 37, 22, 43, 100]
}, {
    name: 'Striking Calf',
    data: [53, 32, 33, 52, 13, 43, 32]
}, {
    name: 'Tank Picture',
    data: [12, 17, 11, 9, 15, 11, 20]
}, {
    name: 'Bucket Slope',
    data: [9, 7, 5, 8, 6, 9, 4]
}, {
    name: 'Reborn Kid',
    data: [25, 12, 19, 32, 25, 24, 10]
}];
const query = `query MyQuery($id: ID = "", $gt: String = "", $lt: String = "") {
  getOrganization(id: $id) {
    Classrooms {
      items {
        LessonRecords(filter: {date: {gt: $gt, lt: $lt}}, limit: 10000) {
          items {
            date
            duration
            id
          }
        }
      }
    }
  }
}`

type Props = {
    organization: Organization,
}
const ActivityOrganizationLineChart = ({organization}: Props) => {
    let apexOptions = BaseOptionChart();
    const {organizationId} = useParams();
    const items = collect(organization?.Classrooms?.items
        .flatMap(value => value?.LessonRecords?.items));
    const data: any = useMemo(() => {
        const result = items.groupBy(item => {
            return item?.date;
        });
        return result.all();
    }, []);
    const series: { name: string, data: number; } [] = [];
    console.log(items);
    for (let label in data) {
        series.push({
            name: label,
            data: Number(collect(data[label].items)
                .sum((item: any) => ((item?.duration ?? 0) * (item?.Attendances?.items?.length ?? 0)))),
        });
    }
    console.log(series)
    series.sort((a, b) => compareAsc(parseISO(a.name), parseISO(b.name)));
    const chartOptions = merge(apexOptions, {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        labels: series.map(value => value.name),

        stroke: {
            curve: 'straight'
        },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return value;
                }
            },
        },
        grid: {
            row: {
                opacity: 0.5
            },
        },
    },);

    return (
        <Card>
            {/*<CardHeader title="7 days activity" subheader={`${biggerThan >= 0 ? '+' : ''}${biggerThan}% than 7 days ago`}/>*/}
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={[{
                    data: series?.map(value => value.data),
                    type: 'line'
                }]} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
};

export default ActivityOrganizationLineChart;
