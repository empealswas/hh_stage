import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {useContext, useEffect, useState} from "react";
import {format, formatISO, parseISO, subDays} from "date-fns";
import {StepsDataContext} from "./ChildActivitiesSummary";
import {BaseOptionChart} from "../../../../../components/chart";
import {Card, CardHeader, Skeleton} from "@mui/material";
import {styled} from "@mui/material/styles";
import ActivtityChartSkeleton from "../../../../../components/skeleton/ActivtityChartSkeleton";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {Attendance, PELessonRecord, UserInOrganization} from "../../../../../API";
import {fPercent} from "../../../../../utils/formatNumber";
import useAuth from "../../../../../hooks/useAuth";
// utils
//

// ----------------------------------------------------------------------

const CHART_HEIGHT = 700;
const LEGEND_HEIGHT = 200;


// ----------------------------------------------------------------------

const CHART_DATA = [6, 4, 6, 8];

const activityQuery = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    organizations {
      items {
        Attendances {
          items {
            lessonRecord {
              activity
              id
              duration
              date
              notes
              rating
            }
          }
        }
      }
    }
  }
}
`

export default function PupilActivitiesChart() {
    const {user} = useAuth();
    // const [activities, setActivities] = useState<{name: string, durationInMinutes: number}[] | null>(null);
    const [data, setData] = useState<{names: string[], series: number[]}| null>(null);


    useEffect(() => {
        const fetchData = async () => {
            setData(null);
            let startDateIso = format(subDays(new Date(), 6), "yyyy-MM-dd");
            let endDateIso = format(new Date(), "yyyy-MM-dd");
            const result: any = await API.graphql(graphqlOperation(activityQuery, {id: user?.email}))
            const lessonRecords: PELessonRecord[] = result.data.getUser?.organizations.items.flatMap((item: UserInOrganization) => item.Attendances?.items).map((item: Attendance) => item.lessonRecord).filter((item: PELessonRecord) => !!item);
            const activities = lessonRecords.reduce((acc: any, value: any) => {
                if (!value) {
                    return acc;
                }
                let dateIso = value.date;
                if (!(dateIso >= startDateIso && dateIso <= endDateIso)) return acc;
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
                    chartData.push(value );
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
    }, [user]);

    if (!data) {
        return (<ActivtityChartSkeleton/>);
    }
    const extraHeight = data.series.length * 2;
    const ChartWrapperStyle = styled('div')(({theme}) => ({
        height: CHART_HEIGHT + extraHeight,
        marginTop: theme.spacing(0),
        '& .apexcharts-canvas svg': {height: CHART_HEIGHT + extraHeight},
        '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
            overflow: 'visible'
        },
        '& .apexcharts-legend': {
            height: LEGEND_HEIGHT,
            alignContent: 'center',
            position: 'relative !important',
            borderTop: `solid 1px ${theme.palette.divider}`,
            top: `calc(${CHART_HEIGHT + extraHeight - LEGEND_HEIGHT}px) !important`
        }
    }));
    console.log("Series", data.series);

    const chartOptions: any = merge(BaseOptionChart(), {
        labels: data.names,
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName: any) => "",
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
            <CardHeader title="Activities" subheader={"Last 7 days"}/>
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="pie"
                                series={data.series}
                                options={chartOptions} height={500 + extraHeight}/>
            </ChartWrapperStyle>
        </Card>
    );
}
