import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {useContext} from "react";
import {format, formatISO, parseISO, subDays} from "date-fns";
import {TerraDataContext} from "./ChildActivitiesSummary";
import {BaseOptionChart} from "../../../../../components/chart";
import {Card, CardHeader, Skeleton} from "@mui/material";
import {styled} from "@mui/material/styles";
import ActivtityChartSkeleton from "../../../../../components/skeleton/ActivtityChartSkeleton";
// utils
//

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;



// ----------------------------------------------------------------------

const CHART_DATA = [6, 4, 6, 8];
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
export default function PupilActivitiesChart() {
    const activityData = useContext(TerraDataContext);
    if (!activityData || activityData.status !== 'success') {
        return (<ActivtityChartSkeleton />);


    }
    console.log('ISO', subDays(new Date(), 1).toISOString())
    const yesterdayData = activityData.data
        .find(value => format(parseISO(value.metadata.start_time), 'yyyy/MM/dd') === format(subDays(new Date(), 1), 'yyyy/MM/dd'));

    console.log('Yesterday', yesterdayData);
    const chartOptions: any = merge(BaseOptionChart(), {

        labels: ['Active time', 'Inactive time'],
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName: any) => (seriesName/60),
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
