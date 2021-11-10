import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {useTheme, styled} from '@material-ui/core/styles';
import {Card, CardHeader} from '@material-ui/core';
import {BaseOptionChart} from "../../charts";
import {fNumber, fPercent} from "../../../utils/formatNumber";
import {API, graphqlOperation} from "aws-amplify";
import {useContext, useEffect, useState} from "react";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
import {UserContext} from "../../../App";
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
const activityQuery = `query MyQuery {
  listPELessonRecords {
    items {
      id
      activity
      duration
    }
  }
}
`;
const teacherQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          pupils {
            items {
              pupil {
                Attendances(filter: {lessonRecordID: {attributeExists: true}}) {
                  items {
                    lessonRecord {
                      activity
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`


export default function TopActivitiesPieChart(props: { activities: any }) {
    const theme = useTheme();

    const [activities, setActivities] = useState<any>(null);
    const user = useContext(UserContext);
    const getActivities = async () => {
        let data: [] = [];
        if (user?.isAdmin()) {
            const result: any = await API.graphql(graphqlOperation(activityQuery));
            data = result.data.listPELessonRecords.items;
        } else if (user?.isTeacher()) {
            const result: any = await API.graphql(graphqlOperation(teacherQuery, {id: user?.email}));
            data = result.data.getTeacher.classrooms.items
                .map((item: any) => item.classroom)
                .flatMap((item: any) => item.pupils.items)
                .map((item: any) => item.pupil)
                .flatMap((item: any) => item.Attendances.items)
                .map((item: any) => item.lessonRecord);
        }
        data = data.reduce((acc: any, value: any) => {
            if (!acc[value.activity]) {
                acc[value.activity] = [];
            }

            acc[value.activity].push(value);

            return acc;
        }, {});
        setActivities(data);
    };


    useEffect(() => {
        getActivities()
    }, [])


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
            all += value.length;
        }
    }
    for (let key in activities) {
        if (key !== null) {
            let value = activities[key];
            chartData.push(value.length / all);
        }
    }

    const CHART_DATA = chartData;
    const chartOptions: any = merge(BaseOptionChart(), {
        labels: names,
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
    if (!activities) {
        return (
            <TotalGrowthBarChartSkeleton/>
        );
    }
    return (
        <Card>
            <CardHeader title="Activities" subheader={'Physical activities in percentages'}/>
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280}/>
            </ChartWrapperStyle>
        </Card>
    );
}
