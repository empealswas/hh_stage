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

export type PupilData = {
    pupilDisplayName: string,
    amountOfTrophies: number,
}
export default function TopPupilsByRewardPiechrat(props: {pupils: PupilData[]}) {
    const {pupils} = {...props};
    console.log(pupils)
    const theme = useTheme();
    const data: number [] = pupils.map(house => house.amountOfTrophies).sort((a, b) => a - b);
const CHART_DATA = [{data: data }];
    const chartOptions: any = merge(BaseOptionChart(), {
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
            categories: pupils.map(house => house.pupilDisplayName)
        },
        yaxis: {
            labels: {

                show: false
            }
        },
    });

    return (
        <Card>
            <CardHeader title="Top Pupils by gained rewards" />
            <Box sx={{ mx: 3 }} dir="ltr">
                <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={400} />
            </Box>
        </Card>
    );
}
