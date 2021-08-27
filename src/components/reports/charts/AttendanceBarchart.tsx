import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import {useTheme} from "@material-ui/core/styles";

// ----------------------------------------------------------------------


export default function AttendanceBarchart(props: {amountOfPresent: number, amountOfAbsent: number}) {
    const theme = useTheme();
const CHART_DATA = [{ data: [props.amountOfPresent, props.amountOfAbsent] }];
    const chartOptions: any = merge(BaseOptionChart(), {
        colors: ['#6bf562', '#f64fa1'],
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            marker: { show: false },
            y: {
                formatter: (seriesName:number) => fNumber(seriesName),
                title: {
                    formatter: (seriesName: number) => `${seriesName}`
                }
            }
        },
        plotOptions: {
            bar: {
                barHeight: '28%',
                distributed: true,
                horizontal: false,
                dataLabels: {
                    position: 'center'
                },
            }
        },
        xaxis: {
            categories: [
                'Present',
                'Absent',
            ]
        },
        yaxis: {
            labels: {
                show: false
            }
        },
    });

    return (
        <Card>
            <CardHeader title="Attendance" />
            <Box sx={{ mx: 3 }} dir="ltr">
                <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={400} />
            </Box>
        </Card>
    );
}
