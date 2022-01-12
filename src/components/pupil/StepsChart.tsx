import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Card, CardHeader, Box} from '@material-ui/core';
import {BaseOptionChart} from "../charts";
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import TotalGrowthBarChartSkeleton from "../reports/charts/TotalGrowthBarChartSkeleton";
import {TerraDataContext} from "../parent/ChildActivitiesSummary";
import {format, parseISO} from "date-fns";
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

export default function StepsChart(props: { pupilId: string }) {
    // const [chartData, setChartData] = useState<{ name: string, type: string, data: number[]; } | null>(null);
        const terraData = useContext(TerraDataContext);


    if (!terraData || terraData.status !== 'success') {
        return (<TotalGrowthBarChartSkeleton/>);
    }
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: { width: [5]},
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        labels: terraData.data.map(value =>
            `${format(parseISO(value.metadata.start_time), "eee do")} `
        ),
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y?.toFixed(0) ?? 'none'} steps`;
                    }
                    return y;
                }
            }
        }
    });
    return (
        <Card>
            <CardHeader title="Steps" subheader={format(new Date(), 'MMMM')}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={[{data: terraData.data.map(value => value.distance_data.steps),name: 'Number of Steps',
                    type: 'line'}, ]} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
