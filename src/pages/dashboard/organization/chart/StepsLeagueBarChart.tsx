import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import {format, parseISO, subDays} from "date-fns";
import {useTheme} from "@mui/material/styles";
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";
import {BaseOptionChart} from "../../../../components/chart";
import {Pupil, Organization} from "../../../../API";
import {SkeletonPost} from "../../../../components/skeleton";
import {fShortenNumber} from "../../../../utils/formatNumber";
import {Box, Card, CardHeader, Skeleton} from "@mui/material";
import ActivtityChartSkeleton from "../../../../components/skeleton/ActivtityChartSkeleton";
import {getWearablesData, TerraWearables} from "../../../../apiFunctions/apiFunctions";

export default function StepsLeagueBarChart({names}: { names: any }, {values}: { values: any }) {

    const [stepsData, setStepsData] = useState<any>(values);

    const baseOptions = BaseOptionChart();
    const theme = useTheme();

    useEffect(() => {
        return () => {};
    }, []);

    useEffect(() => {
        return () => {};
    }, [values]);

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
                        return fShortenNumber(value);
                    }
                },
            },
            xaxis: {
                type: 'category',
                categories: stepsData.map((item: any) => {
                        if (!item.date) {
                            return 'N/A'
                        }
                        return `${format(parseISO(item.date), "eee do")}`;
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
                            return `${Math.floor(y) ?? 'none'}`;
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
            <CardHeader title="Daily Steps" subheader={'Last 7 days'}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart series={[
                    {
                        name: "Steps",
                        type: 'column',
                        data: stepsData.map((item: any) => Number(item.value)),
                    },
                ]} type="line" options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
