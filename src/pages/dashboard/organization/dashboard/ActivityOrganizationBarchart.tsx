import React, {useEffect, useMemo} from 'react';
import {BaseOptionChart} from "../../../../components/chart";
import {addDays, format, getMonth, parseISO, subDays} from "date-fns";
import {Teacher} from "../../../../models/Teacher";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Organization, Pupil} from "../../../../API";
import axios from "axios";
import {Principal} from "../../../../models/Principal";
import merge from "lodash/merge";
import {fNumber, fPercent, fShortenNumber} from "../../../../utils/formatNumber";
import {Box, Card, CardHeader} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import collect, {Collection} from 'collect.js';
import {styled, useTheme} from "@mui/material/styles";

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
const CHART_HEIGHT = 600;
const LEGEND_HEIGHT = 120;
const ChartWrapperStyle = styled('div')(({theme}) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(0),
    '& .apexcharts-canvas svg': {height: CHART_HEIGHT},
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
}));
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
    console.log(items);
    const all = items.sum(item => (item?.duration ?? 0) * (item?.Attendances?.items?.length ?? 0)) as number;
    console.log('All', all);
    for (let label in data) {
        series.push({
            name: label,
            data: Number(collect(data[label].items)
                .sum((item: any) => ((item?.duration ?? 0) * (item?.Attendances?.items?.length ?? 0)) / all)),
        });
    }
    console.log(series)

    const theme = useTheme();

//
    const chartOptions: any = merge(BaseOptionChart(), {

        labels: series.map(value => value.name),
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName: any) => fPercent(seriesName * 100),
                title: {
                    formatter: (seriesName: any) => {
                        if (seriesName === 'null') {
                            return 'Undefined';
                        }
                        return `${seriesName}`;
                    }
                }
            }
        },
        plotOptions: {
            pie: {donut: {labels: {show: false}}}
        }
    });

    return (
        <Card>
            <CardHeader title="Activities"/>

            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="pie" series={series.map(value => value?.data)} options={chartOptions}
                                height={500}/>
            </ChartWrapperStyle>
        </Card>
    );
};

export default ActivityOrganizationBarchart;
