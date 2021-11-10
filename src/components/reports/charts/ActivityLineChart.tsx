import { merge, } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
import { BaseOptionChart } from "../../charts";
import { ApexOptions } from "apexcharts";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";

import {useContext, useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {compareAsc, compareDesc, parseISO} from "date-fns";
import {UserContext} from "../../../App";

//

// ----------------------------------------------------------------------

const query = `query MyQuery {
  listPELessonRecords(limit: 1000) {
    items {
      id
      date
    }
  }
}
`
const teacherQuery =`query MyQuery($id: ID = "") {
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

export default function ActivityLineChart() {

    const [data, setData] = useState<any[][] | null>(null);
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
                series.push([key, lessonsByDate[key]]);
            }
            console.log('SERIES', series)
            setData(series);
        }
        getData()
        return () => {

        };
    }, []);

    var options: any = merge(BaseOptionChart(), {

        chart: {
            id: 'chart2', 
            type: 'line',
            height: 230,
            toolbar: { autoSelected: 'pan', download: true, selection: true,
                zoom: true, zoomin: true, zoomout: true, pan: true, show: true
            }
        },
        colors: ['#546E7A'],
        stroke: { width: 3 },
        dataLabels: { enabled: false },
        fill: { opacity: 1, },
        markers: { size: 0 },
        xaxis: { type: 'datetime' }
    });
    
    var optionsLine: any = {
        chart: {
            id: 'chart1',
            height: 130,
            type: 'area',
            brush: { target: 'chart2', enabled: true },
            selection: {
                enabled: true,
                xaxis: {
                    min: data?.length ?? 0 > 0 ? data?.[0][0] : new Date().toDateString(),
                    max:  data?.length ?? 0 > 0 ? data?.[data?.length - 1][0]   : new Date().toDateString()
                }
            },
        },
        colors: ['#008FFB'],
        fill: {
            type: 'gradient',
            gradient: { opacityFrom: 0.91, opacityTo: 0.1,}
        },
        xaxis: {
            type: 'datetime',
            tooltip: { enabled: false}
        },
        yaxis: {
            tickAmount: 2
        }
    };
    function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

    // var data = generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 185, {
    //     min: 30,
    //     max: 90
    // })
    if (!data) {
        return (
            <TotalGrowthBarChartSkeleton />
        )
    }
    return (
        <Card>
            <CardHeader title="Activity" subheader="" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <div id="wrapper">
                    <div id="chart-line2"><ReactApexChart options={options} series={[
                        {
                            name: "series1",
                            data: data,
                        },
                    ]}
                        type="line" height={230} /></div>
                    <div id="chart-line"><ReactApexChart options={optionsLine} series={[
                        {
                            name: "series1",
                            data: data,
                        },
                    ]}
                        type="area" height={130} /></div>
                </div>

            </Box>
        </Card>
    );
}
