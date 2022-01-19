import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Card, CardHeader, Box} from '@material-ui/core';
import {BaseOptionChart} from "../charts";
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import TotalGrowthBarChartSkeleton from "../reports/charts/TotalGrowthBarChartSkeleton";
import {SleepDataContext, TerraDataContext} from "../parent/ChildActivitiesSummary";
import {format, parseISO, subDays} from "date-fns";
import {fShortenNumber} from "../../utils/formatNumber";
import {useTheme} from "@mui/material/styles";
import {API, graphqlOperation} from "aws-amplify";
import {Pupil} from "../../API";
import axios from "axios";
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
const childQuery = `query MyQuery {
  listPupils(limit: 100000) {
    items {
      terraId
    }
  }
}`;

export default function SleepChart() {
    const sleepData = useContext(SleepDataContext);
    const baseOptions = BaseOptionChart();
    const theme = useTheme();
    const [averageData, setAverageData] = useState<any>(null);
    useEffect(() => {
        const getAverage = async () => {
            const result: any = await API.graphql(graphqlOperation(childQuery));
            const terraIds = result.data.listPupils?.items.filter((item: Pupil) => !!item.terraId).map((item: Pupil) => item.terraId);
            var data = JSON.stringify({
                "idList": terraIds,
                "grouping": "group",
                "category": "sleep",
                "subtype": "durationTotal",
                "period": "day",
                "startDate": format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                "endDate": format(subDays(new Date(), 0), 'yyyy-MM-dd'),
                "returnType": "average"
            });
            var config: any = {
                method: 'post',
                url: 'https://terra.healthyhabits.link/api/data/get-data',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log('Average Sleep', JSON.stringify(response.data));
                    setAverageData(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getAverage();
        return () => {

        };
    }, []);
    if (!sleepData || !averageData) {
        return (<TotalGrowthBarChartSkeleton/>);
    }
    console.log(sleepData)
    const chartOptions: any = merge(baseOptions, {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: false
                },
            },
            colors: ['#2897ff', '#00579f', theme.palette.warning.light],
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
            <CardHeader title="Sleep" subheader={format(new Date(), 'MMMM')}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart series={[
                    {
                        name: 'Light sleep',
                        type: 'column',
                        data: sleepData.data.map(value => Number(value.sleep_durations_data.asleep.duration_light_sleep_state / 60.0 / 60.0)),
                    },
                    {
                        name: 'Deep sleep',
                        type: 'column',
                        data: sleepData.data.map(value => Number(value.sleep_durations_data.asleep.duration_deep_sleep_state / 60.0 / 60.0)),
                    },
                    {
                        name: 'Average Sleep',
                        data: averageData.map((item: any) => item.value / 60 / 60),
                        type: 'line'
                    }

                ]} type="line" options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
