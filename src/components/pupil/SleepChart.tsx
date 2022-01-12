import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Card, CardHeader, Box} from '@material-ui/core';
import {BaseOptionChart} from "../charts";
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import TotalGrowthBarChartSkeleton from "../reports/charts/TotalGrowthBarChartSkeleton";
import {SleepDataContext, TerraDataContext} from "../parent/ChildActivitiesSummary";
import {format, parseISO} from "date-fns";
import {fShortenNumber} from "../../utils/formatNumber";
//

// ----------------------------------------------------------------------


//example of chart data
const CHART_DATA = [
    {
        name: 'Number of Steps',
        type: 'column',
        data: [6000, 5400, 11000, 8000, 5000, 10000, 1500]
    },
];

export default function SleepChart() {
    const sleepData = useContext(SleepDataContext);


    if (!sleepData || sleepData.status !== 'success') {
        return (<TotalGrowthBarChartSkeleton/>);
    }
    console.log(sleepData)
    const chartOptions: any = merge(BaseOptionChart(), {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            colors: ['#165e9e', '#093c66'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return fShortenNumber(value) + " hrs";
                }
            },
        },
            xaxis: {
                type: 'category',
                categories: sleepData.data.map(value => {
                        if (!value.metadata?.start_time) {
                            return 'Null'
                        }
                    return `${format(parseISO(value.metadata.start_time), "eee do")}`;
                }
                )
            },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y?.toFixed(0) ?? 'none'} hrs`;
                    }
                    return y;
                }
            }
        },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        }
    );
    return (
        <Card>
            <CardHeader title="Sleep" subheader={format(new Date(), 'MMMM')}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart series={[
                    {
                        name: 'Light sleep',
                        data: sleepData.data.map(value => Number(value.sleep_durations_data.asleep.duration_light_sleep_state / 60 / 60).toFixed(0)),
                    },
                    {
                        name: 'Deep sleep',
                        data: sleepData.data.map(value => Number(value.sleep_durations_data.asleep.duration_deep_sleep_state/60/60).toFixed(0)),
                    },

                ]} type="bar" options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
