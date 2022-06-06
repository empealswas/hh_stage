import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import {Card, CardHeader, Box} from '@mui/material';
import {BaseOptionChart} from "../../../components/chart";
import useAuth from "../../../hooks/useAuth";
import {useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Pupil} from "../../../API";
import {addDays, format, parseISO, subDays} from "date-fns";
import axios from "axios";
import {Teacher} from "../../../models/Teacher";
import {Principal} from "../../../models/Principal";
import {SkeletonProductItem} from "../../../components/skeleton";
import {fShortenNumber} from "../../../utils/formatNumber";
//

// ----------------------------------------------------------------------

const CHART_DATA = [
    {
        name: 'Team A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
        name: 'Team B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },
    {
        name: 'Team C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
];

const teacherQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          name
          pupils {
            items {
              pupil {
                terraId
              }
            }
          }
        }
      }
    }
  }
}
`

export default function AnalyticsStepsChart() {
    const {user} = useAuth();
    const [averageData, setAverageData] = useState<any[]>([]);
    // const [labels, setLabels] = useState<[] | null>(null);
    let apexOptions = BaseOptionChart();
    const labels = getDates(subDays(new Date(), 7), new Date());

    function getDates(startDate: Date, stopDate: Date) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }
        return dateArray;
    }

    useEffect(() => {
        const getAverage = async () => {
            if (user instanceof Teacher) {
                const result: any = await API.graphql(graphqlOperation(teacherQuery, {id: user?.email}));
                const classrooms: Classroom[] = result.data.getTeacher?.classrooms.items
                    .map((item: any) => item.classroom);
                const results: any[] = [];
                for (const item of classrooms) {
                    var data = JSON.stringify({
                        "idList": item.pupils?.items.map((item: any) => item.pupil).filter((item: Pupil) => !!item.terraId).map((pupil: Pupil) => pupil.terraId),
                        "grouping": "group",
                        "category": "daily",
                        "subtype": "steps",
                        "period": "day",
                        "startDate": format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                        "endDate": format(new Date(), 'yyyy-MM-dd'),
                        "returnType": "average"
                    });
                    var config: any = {
                        method: 'post',
                        url: 'https://terra.healthyhabits.link/api/data/get-data',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };
                    const result: any = await axios(config);
                    results.push({data: result.data, classroomName: item.name} );
                }
                const dataToChart = results.map((value, index) => {
                    const steps = value.data?.map((item: any) => item.value ?? 0) ?? [];
                    return {
                        name: String(value.classroomName),
                        type: index === 0 ? 'column' : index === 1 ? 'area' : 'line',
                        data: steps,
                    }
                })
                setAverageData(dataToChart);

            } else if (user instanceof Principal) {
                const results: any[] = [];

                var data = JSON.stringify({
                    "idList": (await user.getPupilsIds()).filter((item: any) => !!item.id).map((item: any)=> item.id),
                    "grouping": "group",
                    "category": "daily",
                    "subtype": "steps",
                    "period": "day",
                    "startDate": format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                    "endDate": format(new Date(), 'yyyy-MM-dd'),
                    "returnType": "average"
                });
                var config: any = {
                    method: 'post',
                    url: 'https://terra.healthyhabits.link/api/data/get-data',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                const result: any = await axios(config);
                results.push({data: result.data} );
            const dataToChart = results.map((value, index) => {
                const steps = value.data?.map((item: any) => item.value ?? 0) ?? [];
                return {
                    name: 'Your school',
                    type: 'area',
                    data: steps,
                }
            })
            setAverageData(dataToChart);
            }
        }
        getAverage();
        return () => {

        };
    }, []);

    const chartOptions = merge(apexOptions, {
        stroke: {width: [0, 2, 3]},
        plotOptions: {bar: {columnWidth: '14%'}},
        fill: {type: ['solid', 'gradient', 'solid']},
        labels: labels?.map(value => format(value, 'yyyy-MM-dd')),
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y: number) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} steps`;
                    }
                    return y;
                },
            },
        },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return fShortenNumber(value);
                }
            },
        },

    });

    return (
        <Card>
            <CardHeader title="Average steps for your classrooms" subheader="For the past 7 days"/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={averageData ?? []} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
