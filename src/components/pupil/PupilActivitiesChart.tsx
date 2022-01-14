import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {useTheme, styled} from '@material-ui/core/styles';
import {Card, CardHeader} from '@material-ui/core';
import {BaseOptionChart} from "../charts";
import {fNumber} from "../../utils/formatNumber";
import {useContext} from "react";
import {TerraDataContext} from "../parent/ChildActivitiesSummary";
import TotalGrowthBarChartSkeleton from "../reports/charts/TotalGrowthBarChartSkeleton";
import {format, formatISO, parseISO, subDays} from "date-fns";
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

const CHART_DATA = [6, 4, 6, 8];

export default function PupilActivitiesChart() {
    const theme = useTheme();
    const activityData = useContext(TerraDataContext);
    if (!activityData || activityData.status !== 'success') {
        return (<TotalGrowthBarChartSkeleton/>);
    }
    console.log('ISO', subDays(new Date(), 1).toISOString())
    const yesterdayData = activityData.data
        .find(value => format(parseISO(value.metadata.start_time), 'yyyy/MM/dd') === format(subDays(new Date(), 1), 'yyyy/MM/dd'));

    console.log('Yesterday', yesterdayData);
    const chartOptions: any = merge(BaseOptionChart(), {
        colors: [
            theme.palette.primary.main,
            theme.palette.grey["600"],
        ],
        labels: ['Active time', 'Inactive time'],
        stroke: {colors: [theme.palette.background.paper]},
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName: any) => fNumber(seriesName/60),
                title: {
                    formatter: (seriesName: any) => `${seriesName} minutes`
                }
            }
        },
        plotOptions: {
            pie: {donut: {labels: {show: false}}}
        }
    });

    return (
        <Card>
            <CardHeader title="Activities" subheader={"Yesterday"}/>
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="pie" series={[yesterdayData?.active_durations_data?.activity_seconds ?? 0, yesterdayData?.active_durations_data?.inactivity_seconds ?? 0]} options={chartOptions} height={300}/>
            </ChartWrapperStyle>
        </Card>
    );
}
