import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Box, Card, CardHeader} from '@material-ui/core';
// utils
import {fNumber} from '../../../utils/formatNumber';
//
import {BaseOptionChart} from '../../charts';
import {useTheme} from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export type PupilData = {
    pupilDisplayName: string,
    minutesOfPhysicalActivities: number,
}
export default function TopPupilsByPhysicalActivities(props: { pupils: any }) {
    const {pupils} = {...props};
    const values = [];
    for (let key in pupils) {
        values.push({name: key, minutes: pupils[key]})
    }
    const data = values.sort((a, b) => b.minutes - a.minutes).slice(0, 5);
    // console.log(pupils)
    const theme = useTheme();
    const CHART_DATA = [{data: data.map(item => item.minutes)}];
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: {colors: [theme.palette.background.paper]},
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            marker: {show: false},
            y: {
                formatter: (seriesName: number) => fNumber(seriesName),
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
            categories: data.map(item => item.name)
        },
        yaxis: {
            labels: {

                show: false
            }
        },
    });

    return (
        <Card>
            <CardHeader title="Most active pupils" subheader={'Time spent in minutes on physical activities'}/>
            <Box sx={{mx: 3}} dir="ltr">
                <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={400}/>
            </Box>
        </Card>
    );
}
