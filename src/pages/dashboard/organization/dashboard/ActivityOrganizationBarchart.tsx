import React, {useEffect, useMemo} from 'react';
import {BaseOptionChart} from "../../../../components/chart";
import {addDays, format, getMonth, parseISO, subDays} from "date-fns";
import {Teacher} from "../../../../models/Teacher";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Organization, Pupil} from "../../../../API";
import axios from "axios";
import {Principal} from "../../../../models/Principal";
import merge from "lodash/merge";
import {fNumber, fShortenNumber} from "../../../../utils/formatNumber";
import {Box, Card, CardHeader} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import collect, {Collection} from 'collect.js';
import {useTheme} from "@mui/material/styles";

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
    const series: { name: string, data: number; } [] = [];
    for (let label in data) {
        console.log(label);
        console.log(data);
        const dataForChart = 0;
        collect(data[label].items).sum()
        series.push({
            name: label,
            data: Number(collect(data[label].items).sum((item: any) => item?.duration ?? 0)),

        });
    }
    console.log(series)

    const theme = useTheme();

//
    const chartOptions = merge(apexOptions, {
        colors: [
            theme.palette.primary.main,
            theme.palette.chart.blue[0],
            theme.palette.chart.violet[0],
            theme.palette.chart.yellow[0],
        ],

        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            formatter: function (val: any, opt: any) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + 'mins'
            },
            offsetX: 0,
            dropShadow: {
                enabled: true
            }
        },

        tooltip: {
            marker: {show: false},
            y: {
                formatter: (seriesName: string) => fNumber(seriesName) + ' Min',
                title: {
                    formatter: () => '',
                },
            },
        },
        xaxis: {
            categories: series.map(value => value.name),
        },
        plotOptions: {
            bar: {
                horizontal: true, barHeight: '70%', borderRadius: 2, dataLabels: {
                    position: 'bottom'
                },
            },
        },

    });

    return (
        <Card>
            <CardHeader title="Skills Delivered"/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="bar" series={[{data: series.map(value => value?.data)}]} options={chartOptions}
                                height={364}/>
            </Box>
        </Card>
    );
};

export default ActivityOrganizationBarchart;
