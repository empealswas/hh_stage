import React from 'react';
import {merge} from "lodash";
import {format, parseISO} from "date-fns";
import {fShortenNumber} from "../../../../utils/formatNumber";
import {Box, Card, CardHeader} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {BaseOptionChart} from "../../../../components/chart";
import {useTheme} from "@mui/material/styles";

type Props = {
    labels: string[];
    values: string[];
}
const SleepActivityChart = ({labels, values}: Props) => {
    let basedOptions = BaseOptionChart();
    console.log('labels', labels);
    console.log('values', values);
    const theme = useTheme();
    const chartOptions: any = merge(basedOptions, {
        stroke: {width: [5, 3]},
        colors: ["#2897ff"],
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        labels: labels,
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return fShortenNumber(value);
                }
            },
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y?.toFixed(2) ?? 'none'} hrs`;
                    }
                    return y;
                }
            }
        }
    });
    return (
        <Card>
            <CardHeader title="Sleep" subheader={'Average'}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line"
                                options={chartOptions} height={364}
                                series={[{
                    data: values, name: 'Sleep',
                    type: 'line'
                }]} />
            </Box>
        </Card>
    );
};

export default SleepActivityChart;
