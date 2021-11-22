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

export type HouseData = {
    houseName: string,
    amountOfTrophies: number,
}
export default function SchoolHousesBarchart(props: {houses: HouseData[]}) {
    const {houses} = {...props};
    // console.log(houses)
    const theme = useTheme();
    const data: number [] = houses.map(house => house.amountOfTrophies)
const CHART_DATA = [{data: data }];
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: { colors: [theme.palette.background.paper] },
        colors: ['#faa044','#1687F1', '#00A24F', '#e8092a'],
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
            categories: houses.map(house => house.houseName)
        },
        yaxis: {
            labels: {

                show: false
            }
        },
    });

    return (
        <Card>
            <CardHeader title="Trophies of Houses" />
            <Box sx={{ mx: 3 }} dir="ltr">
                <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={400} />
            </Box>
        </Card>
    );
}
