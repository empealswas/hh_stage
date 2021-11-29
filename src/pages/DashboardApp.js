// material
import {Box, Grid, Container, Typography} from '@material-ui/core';
// components
import Page from '../components/Page';
import {
    AppTasks,
    AppNewUsers,
    AppBugReports,
    AppItemOrders,
    AppNewsUpdate,
    AppWeeklySales,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppCurrentSubject,
    AppConversionRates
} from '../components/_dashboard/app';
import DashboardOfTeacher from "../components/_dashboard/app/DashboardOfTeacher";
import {Can} from "../utils/Ability";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import {Button, duration} from "@mui/material";
import {API, graphqlOperation, navItem} from "aws-amplify";
import {useSnackbar} from 'notistack';
import SchoolHousesPage from "./SchoolHousesPage";
import {graphql} from "graphql";
import TopPupilsByRewardBarChart from "../components/reports/charts/TopPupilsByRewardPiechrat";
import TopActivitiesPieChart from "../components/reports/charts/TopActivitiesPieChart";
import TopPupilsByPhysicalActivities from "../components/reports/charts/TopPupilsByPhysicalActivities";
import ActivityGoalChart from "../components/reports/charts/ActivityGoalChart";
import {listPELessonRecords} from "../graphql/queries";
import axios from "axios";
import TotalActivities from "../components/cards/TotalActivities";
import TotalDailyMiles from "../components/cards/TotalDailyMiles";
import ActivityLineChart from "../components/reports/charts/ActivityLineChart";
import HeatMap from "../components/reports/charts/HeatMap";
import TimeCompletedCard from "../components/cards/TimeCompletedCard";
import AverageStepsChart from "../components/reports/charts/AverageStepsChart";
import AverageSleepChart from "../components/reports/charts/AverageSleepChart";
import {getAverage} from "../apiFunctions/apiFunctions";
import DashboardSettings from "../components/_dashboard/app/DashboardSettings";


// ----------------------------------------------------------------------



export default function DashboardApp() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const user = useContext(UserContext);
    console.log("maindashboard");
    console.log(user.getRole());

    return (
        <Page title="Dashboard | Healthy Habits">
            <Container>
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Welcome back, {user.firstName}</Typography>
                </Box>
                <Grid container spacing={5} >
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TotalActivities/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TotalDailyMiles user={user}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TimeCompletedCard/>
                    </Grid>
                    {/*<Grid item xs={12} md={6} lg={6}>*/}
                    {/*    <AverageStepsChart/>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} md={6} lg={6}>*/}
                    {/*    <AverageSleepChart/>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} md={6} lg={6}>
                        <TopActivitiesPieChart/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <ActivityGoalChart goalTime={10000}/>
                    </Grid>
                    {/*<Can I={'read'} a={'teacherDashboard'}>*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <DashboardOfTeacher/>*/}
                    {/*    </Grid>*/}
                    {/*</Can>*/}
                    {/*<Grid item xs={12} md={12} lg={12}>*/}
                    {/*    <ActivityLineChart/>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} md={12} lg={12}>*/}
                    {/*    <HeatMap/>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} md={6} lg={6}>
                        <TopPupilsByRewardBarChart/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TopPupilsByPhysicalActivities/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <SchoolHousesPage/>
                    </Grid>
                    {/*<DashboardSettings/>*/}

                </Grid>
            </Container>
        </Page>
    );
}
