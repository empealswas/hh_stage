import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Card, CardHeader, Box} from '@material-ui/core';
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import {BaseOptionChart} from "../../charts";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
import axios from "axios";
import {API, graphqlOperation} from "aws-amplify";
import {listPupils} from "../../../graphql/queries";

import { GarminDailiesSummaryModel } from '../../../models/garminDataModels/garminDailiesModel';
import {UserContext} from "../../../App";
import {Classroom} from "../../../API";
import {Teacher} from "../../../models/Teacher";
import {Principal} from "../../../models/Principal";
import {Admin} from "../../../models/Admin";


// ----------------------------------------------------------------------

const CHART_DATA = [
    {
        name: 'Number of Steps',
        type: 'column',
        data: [6000, 5400, 11000, 8000, 5000, 10000, 1500]
    },

    // {
    //     name: 'Team B',
    //     type: 'area',
    //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    // },


];
const teacherQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          pupils {
            items {
              pupilID
            }
          }
        }
      }
    }
  }
}`

export default function AverageStepsChart() {
    const [chartData, setChartData] = useState<{ name: string, type: string, data: number[]; } | null>(null);
    const [labels, setLabels] = useState<String []>([]);
    const user = useContext(UserContext);
    useEffect(() => {
            const getAllUsers = async () => {
                const users: String [] = [];

                if (user instanceof Admin || user instanceof Principal) {
                    const result: any = await API.graphql(graphqlOperation(listPupils));
                    result.data.listPupils?.items.forEach((item: any) => {
                        users.push(item.id);
                    });
                } else if (user instanceof Teacher) {
                    const result: any = await API.graphql(graphqlOperation(teacherQuery, {id: user?.email}));
                    result.data.getTeacher?.classrooms.items
                        .map((item: any) => item.classroom)
                        .flatMap((item: Classroom) => item.pupils?.items).forEach((pupil: any) => {
                        users.push(pupil.pupilID);
                    });
                }
                // console.log(users)
                return users;
            }
            const getData = async () => {
                const users = await getAllUsers();
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify(users);

                var requestOptions: any = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };


                fetch("https://analytics.healthyhabits.link/api/garminDailies/dates/start/2021-07-01/end/2021-11-01/period/daily/groupedby/group",
                    requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const response = JSON.parse(result);
                        const data: number [] = [];
                        const periods: String [] = [];
                        // console.log("RESULT", result)
                        response.map((item: any) => {
                            data.push(item.totalSteps);
                            periods.push(item.period);
                        })
                        setChartData({
                            name: 'Number of Steps',
                            type: 'column',
                            data: data
                        })
                        setLabels(periods);

                    })
                    .catch(error => console.log('error', error));
            }
            getData();


        }, []
    )
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: {width: [3]},
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        fill: {type: ['solid', 'gradient', 'solid']},
        labels: labels,
        xaxis: {type: 'string'},
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} steps`;
                    }
                    return y;
                }
            }
        }
    });
    if (!chartData) {
        return (<TotalGrowthBarChartSkeleton/>);
    }
    return (
        <Card>
            <CardHeader title="Steps" subheader="Average steps of all pupils"/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={[chartData]} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
