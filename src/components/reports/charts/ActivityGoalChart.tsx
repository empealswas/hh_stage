import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {useTheme, styled} from '@material-ui/core/styles';
import {Card, CardHeader} from '@material-ui/core';
import {BaseOptionChart} from "../../charts";
import {fNumber, fPercent} from "../../../utils/formatNumber";
// utils
//

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({theme}) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': {height: CHART_HEIGHT},
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible'
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
    }
}));

// ----------------------------------------------------------------------


export default function ActivityGoalChart(props: { gainedTimeInMinutes: number, goalTime: number}) {
    const theme = useTheme();
    const chartOptions: any = merge(BaseOptionChart(), {
        labels: ['Progress'],
        stroke: {colors: [theme.palette.background.paper]},
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},

        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName: any) => fPercent(seriesName * 100),
                title: {
                    formatter: (seriesName: any) => {
                        if (seriesName === 'null') {
                            return 'Undefined';
                        }
                        return `${seriesName}`;
                    }
                }
            }
        },
        plotOptions: {
            pie: {donut: {labels: {show: false}}}
        }
    });
    const progress = props.gainedTimeInMinutes / props.goalTime * 100;
    return (
        <Card>
            <CardHeader title={`Activities goal: ${props.gainedTimeInMinutes}/${props.goalTime}`}
                        subheader={'Minutes of activities collected by all pupils'}/>
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="radialBar" series={[progress]} options={chartOptions} height={280}/>
            </ChartWrapperStyle>
        </Card>
    );
}
