import {  merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
import {BaseOptionChart} from "../charts";
import {ApexOptions} from "apexcharts";
//

// ----------------------------------------------------------------------

const CHART_DATA = [
    {
        name: 'Number of Steps',
        type: 'column',
        data: [6000, 5400, 11000, 8000, 5000, 10000, 1500]
    },

    // {
    //     name: 'Team B',
    //     type: 'area',
    //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    // },


];

export default function StepsChart() {
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: { width: [3] },
        plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
        fill: { type: ['solid', 'gradient', 'solid'] },
        labels: [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun',
        ],
        xaxis: { type: 'string' },
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

    return (
        <Card>
            <CardHeader title="Steps" subheader="(+43%) than last week" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}
