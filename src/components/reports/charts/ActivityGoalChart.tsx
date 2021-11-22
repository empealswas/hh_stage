import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {useTheme, styled} from '@material-ui/core/styles';
import {Card, CardHeader} from '@material-ui/core';
import {BaseOptionChart} from "../../charts";
import {fNumber, fPercent, fShortenNumber} from "../../../utils/formatNumber";
import {API, graphqlOperation} from "aws-amplify";
import {listPELessonRecords} from "../../../graphql/queries";
import {useEffect, useState} from "react";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
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

const query=`query MyQuery {
  listPELessonRecords (limit: 10000) {
    items {
      id
      duration
      date
      Attendances {
        items {
          Pupil {
            id
          }
        }
      }
    }
  }
}`
export default function ActivityGoalChart(props: { gainedTimeInMinutes: number, goalTime: number}) {
    const theme = useTheme();
    const [allDuration, setAllDuration] = useState<number | null>(null);
    const getDuration = async () => {
        const result: any = await API.graphql(graphqlOperation(query));
        // console.log(result)
        let duration = 0;
        result.data.listPELessonRecords.items.map((item:any) => {
            duration += (item.duration ?? 0) * item.Attendances.items.length;
        })
        setAllDuration(duration);
    }
    useEffect(() => {
        getDuration()
        return () => {

        };
    }, []);

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
    if (!allDuration) {
        return (
            <TotalGrowthBarChartSkeleton/>
        );
    }
    const progress = fShortenNumber(allDuration / props.goalTime * 100);
    return (
        <Card>
            <CardHeader title={`Activities goal: ${allDuration}/${props.goalTime}`}
                        subheader={'Minutes of activities collected by all pupils'}/>
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="radialBar" series={[progress]} options={chartOptions} height={280}/>
            </ChartWrapperStyle>
        </Card>
    );
}
