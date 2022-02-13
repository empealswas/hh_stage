import React, {useEffect, useMemo, useState} from 'react';
import {BaseOptionChart} from "../../../../components/chart";
import {addDays, format, getMonth, parseISO, subDays} from "date-fns";
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
const ActivityOrganizationLineChart = () => {
    let apexOptions = BaseOptionChart();
    const {organizationId} = useParams();
    const labels = getDates(subDays(new Date(), 7), new Date());
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [previousResult, setPreviousResult] = useState<Organization | null>(null);
    const series: any = {};

    function getDates(startDate: Date, stopDate: Date) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }
        return dateArray;
    }

    useEffect(() => {
        const getLast7DaysActivity = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {
                id: organizationId,
                gt: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                lt: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
            }))
            setOrganization(result.data.getOrganization);
        }
        getLast7DaysActivity();
        const getPreviousResult = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {
                id: organizationId,
                gt: format(subDays(new Date(), 14), 'yyyy-MM-dd'),
                lt: format(addDays(new Date(), 8), 'yyyy-MM-dd'),
            }))
            setPreviousResult(result.data.getOrganization);
        }
        getLast7DaysActivity();
        getPreviousResult();
        return () => {

        };
    }, [organizationId]);

    if (!organization || !previousResult) {

        return (<ActivtityChartSkeleton/>);
    }
    labels.forEach(value => {
        series[format(value, 'yyyy-MM-dd')] = 0;
    })
    console.log('series', series);

    let lessonRecords = organization.Classrooms?.items.flatMap(classroom => classroom?.LessonRecords?.items);
    const all = Number(collect(lessonRecords).sum(item => item?.duration ?? 0));
    const previousAll = Number(collect(previousResult.Classrooms?.items.flatMap(classroom => classroom?.LessonRecords?.items)).sum(item => item?.duration ?? 0));
    const biggerThan = (previousAll - all) / previousAll * 100;
    lessonRecords?.forEach((lessonRecord) => {
        console.log(lessonRecord?.date);
        if (lessonRecord?.date) {
            series[lessonRecord?.date] += lessonRecord.duration;
        }
    })
    console.log(series);
    const dataChart: any = {name: 'Activity', data: []};
    for (const seriesKey in series) {
        dataChart.data.push(series[seriesKey]);
    }
    console.log(dataChart);

    const chartOptions = merge(apexOptions, {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        labels: labels?.map(value => format(value, 'yyyy-MM-dd')),

        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left'
        },
        grid: {
            row: {
                opacity: 0.5
            },
        },
        xaxis: {
            categories: labels?.map(value => format(value, 'yyyy-MM-dd')),

        }
    },);

    return (
        <Card>
            <CardHeader title="7 days activity" subheader={`${biggerThan >= 0 ? '+' : '-'}${biggerThan}% than 7 days ago`}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={[dataChart]} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
};

export default ActivityOrganizationLineChart;
