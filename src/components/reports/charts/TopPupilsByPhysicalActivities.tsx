import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Box, Card, CardHeader} from '@material-ui/core';
// utils
import {fNumber} from '../../../utils/formatNumber';
//
import {BaseOptionChart} from '../../charts';
import {useTheme} from "@material-ui/core/styles";
import {useContext, useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {UserContext} from "../../../App";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
import {Pupil} from "../../../API";
import {Admin} from "../../../models/Admin";
import {Principal} from "../../../models/Principal";
import {Teacher} from "../../../models/Teacher";

// ----------------------------------------------------------------------

export type PupilData = {
    pupilDisplayName: string,
    minutesOfPhysicalActivities: number,
}
const pupilsByPhysicalActivitiesQuery = `query MyQuery {
  listPELessonRecords {
    items {
      id
      duration
      Attendances(filter: {present: {eq: true}}) {
        items {
          Pupil {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
}`
const teacherQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          pupils {
            items {
              pupil {
                firstName
                lastName
                Attendances(filter: {lessonRecordID: {attributeExists: true}, present: {eq: true}}) {
                  items {
                    lessonRecord {
                      activity
                      date
                      id
                      duration
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
export default function TopPupilsByPhysicalActivities() {
    const [pupilsByActivity, setPupilsByActivity] = useState<any>(null);
    const user = useContext(UserContext);

    const getPupilsByPhysicalActivities = async () => {
        let data: any;
        const pupils = {};

        if (user instanceof Admin || user instanceof Principal) {
        const result:any = await API.graphql(graphqlOperation(pupilsByPhysicalActivitiesQuery));
            data = result.data.listPELessonRecords.items
            data.map((item:any) => {
                return {duration: item.duration, attendances: item.Attendances}
            }).map((value:any) => {
                value.attendances?.items?.map((item:any) => {
                    const pupil = item.Pupil
                    // @ts-ignore
                    if (!pupils[`${pupil.firstName} ${pupil.lastName}`]) {
                        // @ts-ignore
                        pupils[`${pupil.firstName} ${pupil.lastName}`] = 0;
                    }
                    if (value.duration) {
                        // @ts-ignore
                        pupils[`${pupil.firstName} ${pupil.lastName}`] += value.duration;
                    }
                })
            })
        }else if (user instanceof Teacher) {
            const result: any = await API.graphql(graphqlOperation(teacherQuery, {id: user?.email}));
            data = result.data.getTeacher.classrooms.items
                .map((item: any) => item.classroom)
                .flatMap((item: any) => item.pupils.items)
                .map((item: any) => item.pupil)
                .map((pupil: Pupil)=>{
                    // @ts-ignore
                    pupils[`${pupil.firstName} ${pupil.lastName}`] = 0;
                    pupil.Attendances?.items?.map((item: any)=>item.lessonRecord).map(
                        (item: any) =>{
                            // @ts-ignore
                            pupils[`${pupil.firstName} ${pupil.lastName}`] += item.duration;
                        }
                    )
                })
        }

        setPupilsByActivity(pupils);
    }
    useEffect(() => {
        getPupilsByPhysicalActivities();
        return () => {

        };
    }, []);

    const values = [];
    for (let key in pupilsByActivity) {
        values.push({name: key, minutes: pupilsByActivity[key]})
    }
    const data = values.sort((a, b) => b.minutes - a.minutes).slice(0, 5);
    const theme = useTheme();
    const CHART_DATA = [{data: data.map(item => item.minutes)}];
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: {colors: [theme.palette.background.paper]},
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            marker: {show: false},
            y: {
                formatter: (seriesName: number) => fNumber(seriesName),
                title: {
                    formatter: (seriesName: number) => `${seriesName}`
                }
            }
        },
        plotOptions: {
            bar: {
                barHeight: '28%',
                distributed: true,
                horizontal: false,
                dataLabels: {
                    position: 'center'
                },
            }
        },
        xaxis: {
            categories: data.map(item => item.name)
        },
        yaxis: {
            labels: {

                show: false
            }
        },
    });
    if (!pupilsByActivity) {
        return (<TotalGrowthBarChartSkeleton/>);
    }
    return (
        <Card>
            <CardHeader title="Most active pupils" subheader={'Time spent in minutes on physical activities'}/>
            <Box sx={{mx: 3}} dir="ltr">
                <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={400}/>
            </Box>
        </Card>
    );
}
