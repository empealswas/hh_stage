import { merge, } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { BaseOptionChart } from "../../charts";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
import axios from "axios";
import { API, graphqlOperation } from "aws-amplify";
import { listPupils } from "../../../graphql/queries";
import { secondsToHours } from "date-fns";
import { fShortenNumber } from "../../../utils/formatNumber";
import { GarminSleepSummaryModel } from '../../../models/garminDataModels/garminSleepModel';
//

// ----------------------------------------------------------------------

const CHART_DATA = [
    {
        name: 'Number of Steps',
        type: 'column',
        data: [6000, 5400, 11000, 8000, 5000, 10000, 1500]
    },
];

export default function AverageSleepChart() {
    const [chartData, setChartData] = useState<{ name: string, type: string, data: number[]; } | null>(null);
    const [labels, setLabels] = useState<String[]>([]);
    useEffect(() => {
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }
        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://analytics.healthyhabits.link/api/garminSleep/dates/start/2021-07-01/end/2021-11-01/period/daily/groupedby/group",
                requestOptions)
                .then(response => response.text())
                .then(result => {
                    const response = JSON.parse(result);
                    const sleepData: GarminSleepSummaryModel[] = JSON.parse(result);
                    const data: number[] = [];
                    const periods: String[] = [];
                    console.log("RESULT- sleep data...", sleepData)
                    response.map((item: any) => {
                        data.push(secondsToHours(item.duration));

                        periods.push(item.period);
                    })
                    setChartData({
                        name: 'Hours',
                        type: 'column',
                        data: data
                    })
                    setLabels(periods);

                })
                .catch(error => console.log('error', error));
        }
        getData();


    }, [])
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: { width: [3] },
        plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
        fill: { type: ['solid', 'gradient', 'solid'] },
        labels: labels,
        xaxis: { type: 'string' },
        colors: ['#0e3ae0'],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} steps`;
                    }
                    return y;
                }
            }
        }
    });
    if (!chartData) {
        return (<TotalGrowthBarChartSkeleton />);
    }
    return (
        <Card>
            <CardHeader title="Hours of Sleep" subheader="Average hours of sleep of all pupils" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="line" series={[chartData]} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
