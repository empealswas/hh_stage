import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {useContext, useEffect, useState} from "react";
import {format, formatISO, parseISO, subDays} from "date-fns";
import {TerraDataContext} from "./ChildActivitiesSummary";
import {BaseOptionChart} from "../../../../../components/chart";
import {Card, CardHeader, Skeleton} from "@mui/material";
import {styled} from "@mui/material/styles";
import ActivtityChartSkeleton from "../../../../../components/skeleton/ActivtityChartSkeleton";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {Attendance, PELessonRecord} from "../../../../../API";
import {fPercent} from "../../../../../utils/formatNumber";
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
const activityQuery = `query MyQuery($id: ID = "") {
  getPupil(id: $id) {
    Attendances(limit: 10000, filter: {present: {eq: true}}) {
      items {
        lessonRecord {
          activity
          duration
        }
      }
    }
  }
}
`
export default function PupilActivitiesChart() {
    const {pupilId} = useParams();
    // const [activities, setActivities] = useState<{name: string, durationInMinutes: number}[] | null>(null);
    const [data, setData] = useState<{names: string[], series: number[]}| null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setData(null);

            const result: any = await API.graphql(graphqlOperation(activityQuery, {id: pupilId}))
            const lessonRecords: PELessonRecord[] = result.data.getPupil.Attendances.items.map((item: Attendance) => item.lessonRecord).filter((item: PELessonRecord) => !!item);
            const activities = lessonRecords.reduce((acc: any, value: any) => {
                if (!value) {
                    return acc;
                }
                if (!acc[value.activity]) {
                    acc[value.activity] = 0;
                }

                acc[value.activity] += value.duration;

                return acc;
            }, {});
            let all: number = 0;
            const chartData = [];
            const names = [];
            // console.log(activities)
            for (let key in activities) {
                // console.log(key);
                if (key !== null) {
                    let value = activities[key];
                    if (key === 'null') {
                        names.push('Undefined');
                    } else {

                        names.push(`${key}`);
                    }
                    all += value;
                }
            }
            for (let key in activities) {
                if (key !== null) {
                    let value = activities[key];
                    chartData.push(value / all);
                }
            }
            setData({
                names: names,
                series: chartData,
            })

        }
        fetchData();
        return () => {

        };
    }, [pupilId]);

    if (!data) {
        return (<ActivtityChartSkeleton/>);
    }


    const chartOptions: any = merge(BaseOptionChart(), {

        labels: data.names,
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

    return (
        <Card>
            <CardHeader title="Activities" subheader={"All time activity"}/>
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="pie"
                                series={data.series}
                                options={chartOptions} height={300}/>
            </ChartWrapperStyle>
        </Card>
    );
}
