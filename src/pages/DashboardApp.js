// material
import {Box, Container, Grid, Typography} from '@material-ui/core';
// components
import Page from '../components/Page';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../App";
import {API, graphqlOperation} from "aws-amplify";
import {useSnackbar} from 'notistack';
import SchoolHousesPage from "./SchoolHousesPage";
import TopPupilsByRewardBarChart from "../components/reports/charts/TopPupilsByRewardPiechrat";
import TopActivitiesPieChart from "../components/reports/charts/TopActivitiesPieChart";
import TopPupilsByPhysicalActivities from "../components/reports/charts/TopPupilsByPhysicalActivities";
import ActivityGoalChart from "../components/reports/charts/ActivityGoalChart";
import TotalActivities from "../components/cards/TotalActivities";
import TotalDailyMiles from "../components/cards/TotalDailyMiles";
import TimeCompletedCard from "../components/cards/TimeCompletedCard";
import {Organization} from "../models/Organization";
import OrganizationAdminOverview from "../components/organizations/OrganizationAdminOverview";
import TotalActivitiesAlt from '../components/cards/TotalActivitiesAlt';
import ActivitiesDuration from '../components/cards/ActivitiesDuration';
import ActivitiesTotal from '../components/cards/ActivitiesTotal';
import {useNavigate} from "react-router-dom";


export default function DashboardApp() {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user instanceof Organization) {
            navigate(`../organization/${user.email}`)
        }
    }, [])
    return (
        <Page title="Dashboard | Healthy Habits">
            <Container maxWidth="xl">
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Welcome back, {user.firstName}</Typography>
                </Box>
                {/*{user instanceof Organization ?*/}
                {/*    <OrganizationAdminOverview/>*/}
                {/*    :*/}
                {/*    <Grid container spacing={5}>*/}
                {/*        <Grid item xs={12} sm={6} md={4} lg={4}>*/}

                {/*            /!* <TotalActivities/> *!/*/}
                {/*            <ActivitiesTotal/>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} sm={6} md={4} lg={4}>*/}
                {/*            <TotalDailyMiles/>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} sm={6} md={4} lg={4}>*/}
                {/*            <ActivitiesDuration/>*/}
                {/*            /!* <TimeCompletedCard /> *!/*/}
                {/*        </Grid>*/}
                {/*        /!*<Grid item xs={12} md={6} lg={6}>*!/*/}
                {/*        /!*    <AverageStepsChart/>*!/*/}
                {/*        /!*</Grid>*!/*/}
                {/*        /!*<Grid item xs={12} md={6} lg={6}>*!/*/}
                {/*        /!*    <AverageSleepChart/>*!/*/}
                {/*        /!*</Grid>*!/*/}
                {/*        <Grid item xs={12} md={6} lg={6}>*/}
                {/*            <TopActivitiesPieChart/>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} md={6} lg={6}>*/}
                {/*            <ActivityGoalChart goalTime={10000}/>*/}
                {/*        </Grid>*/}
                {/*        /!*<Can I={'read'} a={'teacherDashboard'}>*!/*/}
                {/*        /!*    <Grid item xs={12}>*!/*/}
                {/*        /!*        <DashboardOfTeacher/>*!/*/}
                {/*        /!*    </Grid>*!/*/}
                {/*        /!*</Can>*!/*/}
                {/*        /!*<Grid item xs={12} md={12} lg={12}>*!/*/}
                {/*        /!*    <ActivityLineChart/>*!/*/}
                {/*        /!*</Grid>*!/*/}
                {/*        /!*<Grid item xs={12} md={12} lg={12}>*!/*/}
                {/*        /!*    <HeatMap/>*!/*/}
                {/*        /!*</Grid>*!/*/}
                {/*        <Grid item xs={12} md={6} lg={6}>*/}
                {/*            <TopPupilsByRewardBarChart/>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} md={6} lg={6}>*/}
                {/*            <TopPupilsByPhysicalActivities/>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12} md={12} lg={12}>*/}
                {/*            <SchoolHousesPage/>*/}
                {/*        </Grid>*/}
                {/*        /!*<DashboardSettings/>*!/*/}

                {/*    </Grid>*/}
                {/*}*/}

            </Container>
        </Page>
    );
};
