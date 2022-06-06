import {useTheme} from "@mui/material/styles";
import {Box, Card, CardHeader} from "@mui/material";
import {BaseOptionChart} from "../../../../components/chart";
import {fNumber} from "../../../../utils/formatNumber";
import ReactApexChart from "react-apexcharts";
import merge from "lodash/merge";

export type PupilData = {
    pupilDisplayName: string,
    amountOfTrophies: number,
}
type Props = {
    data: any[];
}
export default function TopUsersByRewardsBarchart({data}: Props) {
    const theme = useTheme();
    console.log(data);


    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: {colors: [theme.palette.background.paper]},
        legend: {show: false, floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            marker: {show: false},
            y: {
                formatter: (seriesName: number) => fNumber(seriesName),
                title: {
                    formatter: (seriesName: number) => `Rewards`
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
            categories: data.map(value => value.user),
            show: true,
        },
        yaxis: {
            labels: {

                show: false,
            }
        },
    });
    return (
        <Card>
            <CardHeader title="Top Users by gained rewards"
                        subheader={'Rewards gained in lessons'}/>
            <Box sx={{mx: 3}} dir="ltr">
                <ReactApexChart type="bar" series={[ {
                    data: data.map(value => value.attendances.length)
                }]} options={chartOptions} height={400}/>
            </Box>
        </Card>
    );
}