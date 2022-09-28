import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import { parseISO, subDays } from "date-fns";
import React, { useContext, useEffect, useState } from 'react';
import {useTheme} from "@mui/material/styles";
import {Intervention, User} from "../../../../../../../API";
import useAuth from "../../../../../../../hooks/useAuth";
import {onCreateIntervention} from "../../../../../../../graphql/subscriptions";
import InterventionMenu from "./InterventionMenu";
import {ShopProductSort} from "../../../../../../../sections/@dashboard/e-commerce/shop";
import ProductSort from "./ProductSort";
import CardSkeleton from "../../../../../../../components/skeleton/CardSkeleton";
import { getInterventionActivityMinutes, getInterventionDailySteps, getInterventionSleepDuration, getInterventionWeeklyAvgSteps } from "../../../../../../../apiFunctions/apiFunctions";

const InterventionsList = (props: { user: User }) => {

    const [activityMinutes, setActivityMinutes] = useState<any>(null);
    const [dailySteps, setDailySteps] = useState<any>(null);
    const [sleepDuration, setSleepDuration] = useState<any>(null);
    const [weeklyAvgSteps, setWeeklyAvgSteps] = useState<any>(null);

    const theme = useTheme();
    console.log(theme);

    /*
    const loadActivityMinutes = async () => {
        setActivityMinutes(null);
        const result = await getActivityMinutes(props.user.terraId, new Date(), props.user.firstName);
        if (result.status == "success") {
            setActivityMinutes(result.data);
        }
    };

    const loadDailySteps = async () => {
        setDailySteps(null);
        const result = await getDailySteps(props.user.terraId, new Date(), props.user.firstName);
        if (result.status == "success") {
            setDailySteps(result.data);
        }
    };

    const loadSleepDuration = async () => {
        setSleepDuration(null);
        const result = await getSleepDuration(props.user.terraId, new Date(), props.user.firstName);
        if (result.status == "success") {
            setSleepDuration(result.data);
        }
    };

    const loadWeeklyAvgSteps = async () => {
        setWeeklyAvgSteps(null);
        const result = await getWeeklyAvgSteps(props.user.terraId, subDays(new Date(), 7), new Date(), props.user.firstName);
        if (result.status == "success") {
            setWeeklyAvgSteps(result.data);
        }
    };
    */

    const loadInterventions = async () => {

        setActivityMinutes(null);
        let result = await getInterventionActivityMinutes(props.user.terraId, new Date(), props.user.firstName);
        if (result.status == "success") {
            setActivityMinutes(result.data);
        }

        setDailySteps(null);
        result = await getInterventionDailySteps(props.user.terraId, new Date(), props.user.firstName);
        if (result.status == "success") {
            setDailySteps(result.data);
        }

        setSleepDuration(null);
        result = await getInterventionSleepDuration(props.user.terraId, subDays(new Date(), 1), props.user.firstName);
        if (result.status == "success") {
            setSleepDuration(result.data);
        }

        setWeeklyAvgSteps(null);
        result = await getInterventionWeeklyAvgSteps(props.user.terraId, subDays(new Date(), 6), new Date(), props.user.firstName);
        if (result.status == "success") {
            setWeeklyAvgSteps(result.data);
        }

    };

    useEffect(() => {
        //loadActivityMinutes();
        //loadDailySteps();
        //loadSleepDuration();
        //loadWeeklyAvgSteps();
        loadInterventions();
        return () => {};
    }, [props.user]);

    return (
        <div>
            <>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        { activityMinutes != null ?
                            <Card>
                                <CardHeader title={'Activity Minutes'} subheader={new Date(activityMinutes.DateRequested).toLocaleDateString()} />
                                <CardContent>
                                    <Typography variant={'body1'}>{activityMinutes.InterventionMessage}</Typography>
                                </CardContent>
                            </Card>
                            :
                            <CardSkeleton />
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        { dailySteps != null ?
                            <Card>
                                <CardHeader title={'Daily Steps'} subheader={new Date(dailySteps.RequestedDate).toLocaleDateString()} />
                                <CardContent>
                                    <Typography variant={'body1'}>{dailySteps.InterventionMessage}</Typography>
                                </CardContent>
                            </Card>
                            :
                            <CardSkeleton />
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        { sleepDuration != null ?
                            <Card>
                                <CardHeader title={'Sleep Duration'} subheader={new Date(sleepDuration.DateRequested).toLocaleDateString()} />
                                <CardContent>
                                    <Typography variant={'body1'}>{sleepDuration.InterventionMessages}</Typography>
                                </CardContent>
                            </Card>
                            :
                            <CardSkeleton />
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        { weeklyAvgSteps != null ?
                            <Card>
                                <CardHeader title={'Daily Average Steps'} subheader={new Date(weeklyAvgSteps.WeekStartDate).toLocaleDateString() + " - " + new Date(weeklyAvgSteps.CurrentDate).toLocaleDateString()} />
                                <CardContent>
                                    <Typography variant={'body1'}>{weeklyAvgSteps.InterventionMessage}</Typography>
                                </CardContent>
                            </Card>
                            :
                            <CardSkeleton />
                        }
                    </Grid>
                </Grid>
            </>
        </div>
    );
};

export default InterventionsList;
