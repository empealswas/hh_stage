import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import {format, parseISO, subDays} from "date-fns";
import {useTheme} from "@mui/material/styles";
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";
import {SleepDataContext} from "./ChildActivitiesSummary";
import {BaseOptionChart} from "../../../../../components/chart";
import {Pupil} from "../../../../../API";
import {SkeletonPost} from "../../../../../components/skeleton";
import {fShortenNumber} from "../../../../../utils/formatNumber";
import {Box, Card, CardHeader, Skeleton} from "@mui/material";
import ActivtityChartSkeleton from "../../../../../components/skeleton/ActivtityChartSkeleton";
import {getWearablesData, TerraWearables} from "../../../../../apiFunctions/apiFunctions";
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
    const baseOptions = BaseOptionChart();
    const theme = useTheme();

    useEffect(() => {
        return () => {};
    }, []);

    if (!sleepData ) {
        return (<ActivtityChartSkeleton />);
    }

    const chartOptions: any = merge(baseOptions, {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: false
                },
            },
            colors: ['#2897ff', theme.palette.warning.light],
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [1, 1, 2]
            },

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
                categories: sleepData.data.data.map((item: any) => {
                        
                        if (!item.metadata?.end_time) {
                            return 'N/A'
                        }
                        return `${format(parseISO(item.metadata.end_time), "eee do")}`;
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
                            return `${y?.toFixed(1) ?? 'none'} hrs`;
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
            grid: {
                show: true
            }
        }
    );

    return (
        <Card>
            <CardHeader title="Sleep" subheader={'Last 7 days'}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart series={[
                    {
                        name: "Duration Asleep",
                        type: 'column',
                        data: sleepData.data.data.map((item: any) => Number(item.sleep_durations_data.asleep.duration_asleep_state_seconds / 60.0 / 60.0)),
                    },
                ]} type="line" options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
