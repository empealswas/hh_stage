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
import {getDailyActivitySeconds} from "../../../../../../apiFunctions/apiFunctions";

const userQuery = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    terraId
  }
}`

const ActivityWidgets = () => {
    const sleepData = useContext(SleepDataContext);
    const stepsData = useContext(TerraDataContext);
    const {user} = useAuth();
    const theme = useTheme();

    const [activityData, setActivityData] = useState<any | null>(null);

    useEffect(() => {
        const getActivityData = async () => {
            setActivityData(null);
            let result: any = await API.graphql(graphqlOperation(userQuery, {id: user?.email}));
            let terraId = result.data.getUser.terraId;
            let startDate = subDays(new Date(), 7);
            let endDate = new Date();
            let theActivityData = await getDailyActivitySeconds(terraId, startDate, endDate);
            setActivityData(theActivityData);
        }
        getActivityData();
        return () => {};
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
                {activityData ?
                    <ActivityWidgetSummary title={'Today\'s Activity (mins)'}
                                           total={activityData?.data[activityData?.data?.length - 1]?.value / 60 ?? 0}
                                           percent={(((activityData?.data[activityData?.data?.length - 1]?.value ?? 0) - (activityData?.data[activityData?.data?.length - 2]?.value ?? 0))) / (activityData?.data[activityData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={activityData.data.map((item: any) => item.value / 60)}/>
                    :
                    <CardSkeleton/>
                }
            </Grid>
        </>
    );
};

export default ActivityWidgets;
