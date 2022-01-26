import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {SleepDataContext, TerraDataContext} from "../ChildActivitiesSummary";
import ActivityWidgetSummary from "./ActivityWidgetSummary";
import CardSkeleton from "../../../../../../components/skeleton/CardSkeleton";
import {useTheme} from "@mui/material/styles";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Pupil} from "../../../../../../API";
import {format, subDays} from "date-fns";
import axios from "axios";
import {useParams} from "react-router-dom";

const pupilQuery = `query MyQuery($id: ID = "36bf48e8-2fed-4b2a-af1b-ca1d2eb8df6c") {
  getPupil(id: $id) {
    classrooms {
      items {
        classroom {
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
const ActivityWidgets = () => {
    const sleepData = useContext(SleepDataContext);
    const stepsData = useContext(TerraDataContext);
    const {pupilId} = useParams();
    const theme = useTheme();
    const [averageData, setAverageData] = useState<any>(null);

    useEffect(() => {
        const getAverage = async () => {
            setAverageData(null);
            const result: any = await API.graphql(graphqlOperation(pupilQuery, {id: pupilId}));
            const terraIds = result.data.getPupil?.classrooms.items
                ?.map((item: any) => item.classroom)
                .flatMap((item: Classroom) => item.pupils?.items)
                .map((item: any) => item.pupil)
                .filter((item: Pupil) => !!item.terraId)
                .map((item: Pupil) => item.terraId);
            var data = JSON.stringify({
                "idList": terraIds,
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

            axios(config)
                .then(function (response) {
                    console.log('Average', JSON.stringify(response.data));
                    setAverageData(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getAverage();
        return () => {

        };
    }, [pupilId]);
    return (
        <>
            <Grid item xs={12} md={4}>
                {stepsData ?
                    <ActivityWidgetSummary title={'Steps'}
                                           total={stepsData?.data[stepsData?.data?.length - 1]?.distance_data.steps ?? 0}
                                           percent={(((stepsData?.data[stepsData?.data?.length - 1]?.distance_data?.steps ?? 0) - (stepsData?.data[stepsData?.data?.length - 2]?.distance_data?.steps ?? 0))) / (stepsData?.data[stepsData?.data?.length - 2]?.distance_data?.steps ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={stepsData.data.map(value => value.distance_data.steps)}/>
                    :
                    <CardSkeleton/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {sleepData ?
                    <ActivityWidgetSummary title={'Sleep'}
                                           total={sleepData?.data[sleepData?.data?.length - 1]?.sleep_durations_data.asleep.duration_asleep_state / 60 / 60 ?? 0}
                                           percent={(((sleepData?.data[sleepData?.data?.length - 1]?.sleep_durations_data.asleep.duration_asleep_state ?? 0) - (sleepData?.data[sleepData?.data?.length - 2]?.sleep_durations_data.asleep.duration_asleep_state ?? 0))) / (sleepData?.data[sleepData?.data?.length - 2]?.sleep_durations_data.asleep.duration_asleep_state ?? 1) * 100}
                                           chartColor={theme.palette.chart.blue[0]}
                                           chartData={sleepData.data.map(value => value.sleep_durations_data.asleep.duration_asleep_state / 60 / 60)}/>
                    :
                    <CardSkeleton/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {averageData ?
                    <ActivityWidgetSummary title={"Average Steps in your child's classroom"}
                                           total={averageData[averageData?.length - 1]?.value ?? 0}
                                           percent={(((averageData[averageData?.length - 1]?.value ?? 0) - (averageData[averageData?.length - 2]?.value ?? 0))) / (averageData[averageData?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.red[0]}
                                           chartData={averageData?.map((item: any) => item.value)}/>
                    :
                    <CardSkeleton/>
                }
            </Grid>


        </>
    );
};

export default ActivityWidgets;
