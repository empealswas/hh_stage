import React, {useContext, useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import {StepsDataContext, SleepDataContext} from "../ChildActivitiesSummary";
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
import sl from 'date-fns/locale/sl';

const userQuery = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    terraId
  }
}`

const ActivityWidgets = () => {

    const stepsData = useContext(StepsDataContext);
    const sleepData = useContext(SleepDataContext);
    const {user} = useAuth();
    const theme = useTheme();

    const [activityData, setActivityData] = useState<any | null>(null);

    useEffect(() => {
        const getActivityData = async () => {
            setActivityData(null);
            let result: any = await API.graphql(graphqlOperation(userQuery, {id: user?.email}));
            let terraId = result.data.getUser.terraId;
            let startDate = subDays(new Date(), 6);
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
                    <ActivityWidgetSummary title={'Todays\' Steps'}
                                           total={stepsData?.data[stepsData?.data?.length - 1]?.value ?? 0}
                                           percent={(((stepsData?.data[stepsData?.data?.length - 1]?.value ?? 0) - (stepsData?.data[stepsData?.data?.length - 2]?.value ?? 0))) / (stepsData?.data[stepsData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={stepsData.data.map((item: any) => item.value)}/>
                    :
                    <CardSkeleton/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {sleepData ?
                    <ActivityWidgetSummary title={'Todays\' Sleep'}
                                           total={(sleepData?.data[sleepData?.data?.length - 1]?.sleep_durations_data.asleep.duration_asleep_state / 60 / 60 ?? 0).toFixed(1) + " hrs"}
                                           percent={(((sleepData?.data[sleepData?.data?.length - 1]?.sleep_durations_data.asleep.duration_asleep_state ?? 0) - (sleepData?.data[sleepData?.data?.length - 2]?.sleep_durations_data.asleep.duration_asleep_state ?? 0))) / (sleepData?.data[sleepData?.data?.length - 2]?.sleep_durations_data.asleep.duration_asleep_state ?? 1) * 100}
                                           chartColor={theme.palette.chart.blue[0]}
                                           chartData={sleepData.data.map((value: any) => value.sleep_durations_data.asleep.duration_asleep_state / 60 / 60)}/>
                    :
                    <CardSkeleton/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {activityData ?
                    <ActivityWidgetSummary title={'Todays\' Activity'}
                                           total={Math.floor(activityData?.data[activityData?.data?.length - 1]?.value / 60 ?? 0) + " mins"}
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
