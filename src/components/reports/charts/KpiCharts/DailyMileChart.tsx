import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
// import {useTheme, styled} from '@material-ui/core/styles';
// import {Card, CardHeader} from '@material-ui/core';
// import {BaseOptionChart} from "../../charts";
// import {fNumber, fPercent, fShortenNumber} from "../../../utils/formatNumber";
// import {API, graphqlOperation} from "aws-amplify";
// import {listPELessonRecords} from "../../../graphql/queries";
// import {useEffect, useState} from "react";
// import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
// utils
//

// ----------------------------------------------------------------------

// const CHART_HEIGHT = 372;
// const LEGEND_HEIGHT = 72;

export default function DailyMileChart(props: any) {

    console.log("DALY MILE CHARTS");
    console.log(props);
    const chartData = {
        type: 'line',
        height: 90,
        options: {
            chart: {
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#fff'],
            fill: {
                type: 'solid',
                opacity: 1
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: 'Total Order'
                },
                marker: {
                    show: false
                }
            }
        },
        series: [
            {
                name: 'series1',
                data: props["trace"]
            }
        ]
    };

  
    return (
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={90}/>
    );
}
