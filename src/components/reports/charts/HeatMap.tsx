import React, {useContext, useEffect, useState} from 'react';
import HeatMap from '@uiw/react-heat-map';
import {Box, Card, CardHeader} from "@material-ui/core";
import ReactApexChart from "react-apexcharts";
import {API, graphqlOperation} from "aws-amplify";
import {compareDesc, format, parse, parseISO, toDate} from "date-fns";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
import {UserContext} from "../../../App";

const value: any = [
    {date: '2016/01/11', count: 2},
    {date: '2016/04/12', count: 2},
    {date: '2016/05/01', count: 5},
    {date: '2016/05/02', count: 5},
    {date: '2016/05/03', count: 1},
    {date: '2016/05/04', count: 11},
    {date: '2016/05/08', count: 32},
];
const query = `query MyQuery {
  listPELessonRecords(limit: 1000) {
    items {
      id
      date
    }
  }
}
`
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
                      date
                      id
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
}`
const HeatMapChart = () => {
    const [data, setData] = useState<any[] | null>(null);
    const user = useContext(UserContext);
    useEffect(() => {
        const getData = async () => {
            let lessons: [] = [];
            if (user?.isAdmin()) {
                const result: any = await API.graphql(graphqlOperation(query));
                lessons = result.data.listPELessonRecords.items;
            } else if (user?.isTeacher()) {
                const result: any = await API.graphql(graphqlOperation(teacherQuery, {id: user?.email}));
                lessons = result.data.getTeacher.classrooms.items
                    .map((item: any) => item.classroom)
                    .flatMap((item: any) => item.pupils.items)
                    .map((item: any) => item.pupil)
                    .flatMap((item: any) => item.Attendances.items)
                    .map((item: any) => item.lessonRecord);
            }

            const lessonsByDate = lessons
                .filter((item: any) => !!item.date)
                .sort((a: { date: string; }, b: { date: string; }) => {
                    return compareDesc(parseISO(b.date), parseISO(a.date));
                })
                .reduce((acc: any, value: any) => {
                    if (!acc[value.date]) {
                        acc[value.date] = 0;
                    }
                    acc[value.date] = acc[value.date] + 1;
                    return acc;
                }, {});
            const series: any = [];
            for (let key in lessonsByDate) {
                series.push({
                    date: format(parseISO(key), 'yyyy/MM/dd'),
                    count: lessonsByDate[key]
                })
            }
            setData(series);
        }
        getData()
        return () => {

        };
    }, []);

    if (!data) {
        return (
            <TotalGrowthBarChartSkeleton/>
        );
    }

    return (
        <Card>
            <CardHeader title="Activity" subheader="Heat Map of Physical Activities"/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">

                <HeatMap
                    value={data}
                    startDate={parse(data[0].date, 'yyyy/MM/dd', new Date())}
                    width={'100%'}
                    rectSize={14}
                />
            </Box>

        </Card>
    );
}

export default HeatMapChart;
