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
import {useContext, useState} from "react";
import {UserContext} from "../App";
import {Button} from "@mui/material";
import {API} from "aws-amplify";

// ----------------------------------------------------------------------

export default function DashboardApp() {
    const user = useContext(UserContext);
    const [greeting, setGreeting] = useState('');
    user.getFirstName().then(data => {
        setGreeting(data);
    })
    return (
        <Page title="Dashboard | Healthy Habits">
            <Container maxWidth="xl">
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Welcome back, {greeting}</Typography>
                </Box>
                <img
                    src={'https://serverlessrepo-thumbnail-creator-resultsbucket-1orehh2pvqrw9.s3.amazonaws.com/1632428188589-Prayer_Hand_with_Logo.jpg'}/>
                <Grid container spacing={3}>
                    <Can I={'read'} a={'teacherDashboard'}>
                        <DashboardOfTeacher/>
                    </Can>
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
