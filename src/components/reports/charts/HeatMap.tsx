import React from 'react';
import HeatMap from '@uiw/react-heat-map';
import {Box, Card, CardHeader} from "@material-ui/core";
import ReactApexChart from "react-apexcharts";

const value: any = [
    {date: '2016/01/11', count: 2},
    {date: '2016/04/12', count: 2},
    {date: '2016/05/01', count: 5},
    {date: '2016/05/02', count: 5},
    {date: '2016/05/03', count: 1},
    {date: '2016/05/04', count: 11},
    {date: '2016/05/08', count: 32},
];
const HeatMapChart = () => {
    return (
        <Card>
            <CardHeader title="Activity" subheader="(+43%) than last week"/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">

                <HeatMap
                    value={value}
                    width={'100%'}
                    startDate={new Date('2016/01/01')}
                    rectSize={14}
                />
            </Box>

        </Card>
    )
}

export default HeatMapChart;
