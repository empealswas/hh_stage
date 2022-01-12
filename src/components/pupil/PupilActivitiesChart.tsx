import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import {BaseOptionChart} from "../charts";
import {fNumber} from "../../utils/formatNumber";
// utils
//

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
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

const CHART_DATA = [6, 4, 6, 8];

export default function PupilActivitiesChart() {
    const theme = useTheme();

    const chartOptions: any = merge(BaseOptionChart(), {
        colors: [
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.primary.main,
            theme.palette.info.main,
        ],
        labels: ['Studying', 'Physical Activities', 'Well-being', 'Sleep'],
        stroke: { colors: [theme.palette.background.paper] },
        legend: { floating: true, horizontalAlign: 'center' },
        dataLabels: { enabled: true, dropShadow: { enabled: false } },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName: any) => fNumber(seriesName),
                title: {
                    formatter: (seriesName: any) => `#${seriesName} hours`
                }
            }
        },
        plotOptions: {
            pie: { donut: { labels: { show: false } } }
        }
    });

    return (
        <Card>
            <CardHeader title="Activities" subheader={"In development (dummy data)"} />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={300} />
            </ChartWrapperStyle>
        </Card>
    );
}
