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
import DailyMileCountCard from "../components/cards/DailyMileCountCard";
import TotalOrderLineChartCard from "../components/cards/TotalOrderLineChartCard";
import ActivityLineChart from "../components/reports/charts/ActivityLineChart";
import HeatMap from "../components/reports/charts/HeatMap";
import TimeCompletedCard from "../components/cards/TimeCompletedCard";
import AverageStepsChart from "../components/reports/charts/AverageStepsChart";
import AverageSleepChart from "../components/reports/charts/AverageSleepChart";
import {getAverage} from "../apiFunctions/apiFunctions";


// ----------------------------------------------------------------------



export default function DashboardApp() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const user = useContext(UserContext);
    const [greeting, setGreeting] = useState('');
    user.getFirstName().then(data => {
        setGreeting(data);

    })

    return (
        <Page title="Dashboard | Healthy Habits">
            <Container>
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Welcome back, {greeting}</Typography>
                </Box>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <DailyMileCountCard/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TotalOrderLineChartCard/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TimeCompletedCard/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <AverageStepsChart/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <AverageSleepChart/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TopActivitiesPieChart/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <ActivityGoalChart goalTime={100000}/>
                    </Grid>
                    <Can I={'read'} a={'teacherDashboard'}>
                        <Grid item xs={12}>
                            <DashboardOfTeacher/>
                        </Grid>
                    </Can>
                    <Grid item xs={12} md={12} lg={12}>
                        <ActivityLineChart/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <HeatMap/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TopPupilsByRewardBarChart/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TopPupilsByPhysicalActivities/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <SchoolHousesPage/>
                    </Grid>

                    {/*<Grid item xs={12} sm={6} md={3}>*/}
                    {/*  <AppWeeklySales />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} sm={6} md={3}>*/}
                    {/*  <AppNewUsers />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} sm={6} md={3}>*/}
                    {/*  <AppItemOrders />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} sm={6} md={3}>*/}
                    {/*  <AppBugReports />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={8}>*/}
                    {/*  <AppWebsiteVisits />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={4}>*/}
                    {/*  <AppCurrentVisits />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={8}>*/}
                    {/*  <AppConversionRates />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={4}>*/}
                    {/*  <AppCurrentSubject />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={8}>*/}
                    {/*  <AppNewsUpdate />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={4}>*/}
                    {/*  <AppOrderTimeline />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={4}>*/}
                    {/*  <AppTrafficBySite />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} md={6} lg={8}>*/}
                    {/*  <AppTasks />*/}
                    {/*</Grid>*/}
                </Grid>
            </Container>
        </Page>
    );
}
