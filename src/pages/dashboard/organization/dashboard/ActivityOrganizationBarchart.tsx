import React, {useEffect, useMemo} from 'react';
import {BaseOptionChart} from "../../../../components/chart";
import {addDays, format, getMonth, parseISO, subDays} from "date-fns";
import {Teacher} from "../../../../models/Teacher";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Organization, Pupil} from "../../../../API";
import axios from "axios";
import {Principal} from "../../../../models/Principal";
import merge from "lodash/merge";
import {fShortenNumber} from "../../../../utils/formatNumber";
import {Box, Card, CardHeader} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import collect, {Collection} from 'collect.js';

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
const ActivityOrganizationBarchart = ({organization}: { organization: Organization }) => {
    let apexOptions = BaseOptionChart();
    const items = collect(organization?.Classrooms?.items
        .flatMap(value => value?.LessonRecords?.items));
    const data: any = useMemo(() => {
        const result = items.groupBy(item => {
            return item?.activity;

        });
        return result.all();
    }, []);
    const series: { name: string, data: number[]; } [] = [];
    for (let label in data) {
        console.log(label);
        console.log(data);
        const dataForChart = [0, 0, 0, 0];
        data[label].items.forEach((item: any) => {

            const date = parseISO(String(item.date));
            const month = getMonth(date) + 1;
            console.log(month);
            if (month === 12 || month < 3) {
                dataForChart[0] += item?.duration ?? 0;
            } else if (month < 6) {
                dataForChart[1] += item?.duration ?? 0;

            } else if (month < 9) {
                dataForChart[2] += item?.duration ?? 0;
            } else {
                dataForChart[3] += item?.duration ?? 0;
            }
        })
        series.push({
            name: label,
            data: dataForChart,
        })
    }


//
    const chartOptions = merge(apexOptions, {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },

        xaxis: {
            categories: ['Winter', 'Spring', 'Summer', 'Autumn'],

            labels: {
                formatter: function (val: string) {
                    return val + " Minutes"
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val: string) {
                    return val + " Minutes"
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    });

    return (
        <Card>
            <CardHeader title="Skills Delivered" />
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="bar" series={series} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
};

export default ActivityOrganizationBarchart;
