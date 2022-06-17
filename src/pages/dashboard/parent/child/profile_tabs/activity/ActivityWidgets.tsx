import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {SleepDataContext, TerraDataContext} from "../ChildActivitiesSummary";
import ActivityWidgetSummary from "./ActivityWidgetSummary";
import CardSkeleton from "../../../../../../components/skeleton/CardSkeleton";
import {useTheme} from "@mui/material/styles";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Pupil, User} from "../../../../../../API";
import {format, subDays} from "date-fns";
import axios from "axios";
import {useParams} from "react-router-dom";
import useAuth from "../../../../../../hooks/useAuth";
import {getWearablesData, TerraWearables} from "../../../../../../apiFunctions/apiFunctions";

const pupilQuery = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    organizations {
      items {
        classrooms {
          items {
            classroom {
              members {
                items {
                  userInOrganization {
                    user {
                      id
                      terraId
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
const ActivityWidgets = () => {
    const sleepData = useContext(SleepDataContext);
    const stepsData = useContext(TerraDataContext);
    const {user} = useAuth();
    const theme = useTheme();
    const [averageData, setAverageData] = useState<any>(null);

    useEffect(() => {
        const getAverage = async () => {
            setAverageData(null);
            const result: any = await API.graphql(graphqlOperation(pupilQuery, {id: user?.email}));
            console.log('DATA', result);

            const terraIds = result.data.getUser?.organizations.items
                ?.flatMap((item: any) => item.classrooms.items)
                .filter((item: any) => !!item.classroom)
                .map((item: any) => item.classroom)
                .flatMap((item: any) => item.members.items)
                .map((item: any) => item.userInOrganization.user)
                .filter((item: User) => !!item.terraId)
                .map((item: Pupil) => item.terraId);

            var data: TerraWearables = {
                "idList": terraIds,
                "grouping": "group",
                "category": "daily",
                "subtype": "steps",
                "period": "day",
                "startDate": format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                "endDate": format(new Date(), 'yyyy-MM-dd'),
                "returnType": "average"
            };
            const wearableData: any = await getWearablesData(data);
            setAverageData(wearableData?.data ?? []);
        }
        getAverage();
        return () => {

        };
    }, []);
    return (
        <>
            <Grid item xs={12} md={4}>
                {stepsData ?
                    <ActivityWidgetSummary title={'Today\'s Steps'}
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
                    <ActivityWidgetSummary title={'Today\'s Sleep (hours)'}
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
                    <ActivityWidgetSummary title={"Average Steps of your team"}
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
