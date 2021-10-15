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


// ----------------------------------------------------------------------
const topByRewardsQuery = `query MyQuery {
  listPupils(limit: 10000) {
    items {
      Attendances(filter: {wasRewarded: {eq: true}}) {
        items {
          wasRewarded
        }
      }
      id
      firstName
      lastName
    }
  }
}`

const activityQuery = `query MyQuery {
  listPELessonRecords {
    items {
      id
      activity
      duration
    }
  }
}
`;

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
export default function DashboardApp() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const user = useContext(UserContext);
    const [greeting, setGreeting] = useState('');
    user.getFirstName().then(data => {
        setGreeting(data);
    })

    const getTopPupilsByTrophies = async () => {
        const result = await API.graphql(graphqlOperation(topByRewardsQuery));
        const pupilsWithTrophies = result.data.listPupils.items.map(item => {
            return {
                pupilDisplayName: `${item.firstName} ${item.lastName}`,
                amountOfTrophies: item.Attendances.items.length
            }
        }).sort((a, b) => b.amountOfTrophies - a.amountOfTrophies).slice(0, 5);
        return pupilsWithTrophies;
    }
    const getActivities = async () => {
        const result = await API.graphql(graphqlOperation(activityQuery));
        const data = result.data.listPELessonRecords.items.reduce((acc, value) => {
            if (!acc[value.activity]) {
                acc[value.activity] = [];
            }

            acc[value.activity].push(value);

            return acc;
        }, {});
        setActivities(data);
    }
    const getPupilsByPhysicalActivities = async () => {
        const result = await API.graphql(graphqlOperation(pupilsByPhysicalActivitiesQuery));
        const pupils = {};
        const data = result.data.listPELessonRecords.items.map(item => {
            return {duration: item.duration, attendances: item.Attendances}
        }).map(value => {
            value.attendances?.items?.map(item => {
                const pupil = item.Pupil
                if (!pupils[`${pupil.firstName} ${pupil.lastName}`]) {
                    pupils[`${pupil.firstName} ${pupil.lastName}`] = 0;
                }
                if (value.duration) {
                    pupils[`${pupil.firstName} ${pupil.lastName}`] += value.duration;
                }
            })
        })
        setPupilsByActivity(pupils);
    }
    const [pupilsByRewards, setPupilsByRewards] = useState(null);
    const [activities, setActivities] = useState(null);
    const [pupilsByActivity, setPupilsByActivity] = useState(null);
    const [allDuration, setAllDuration] = useState(null);
    useEffect(() => {
        getTopPupilsByTrophies().then(result => {
            setPupilsByRewards(result);
        })
        getActivities()
        getPupilsByPhysicalActivities()
        const getDuration = async () => {
            const result = await API.graphql(graphqlOperation(listPELessonRecords));
            let duration = 0;
            console.log('---------------------------')
            result.data.listPELessonRecords.items.map(item => {
                duration += item.duration ?? 0;
            })
            console.log('Duration', duration)
            setAllDuration(duration);
        }
        getDuration();
        return () => {

        };
    }, []);

    return (
        <Page title="Dashboard | Healthy Habits">
            <Container>
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Welcome back, {greeting}</Typography>
                </Box>
                <Grid container spacing={5}>
                    {/*<Button onClick={()=>{*/}
                    {/*    enqueueSnackbar('Hello Snackbar', {variant: 'success'});*/}
                    {/*}}>*/}
                    {/*    Test Button*/}
                    {/*</Button>*/}
                    <Can I={'read'} a={'teacherDashboard'}>
                        <DashboardOfTeacher/>
                    </Can>
                    <Grid item xs={12} md={12} lg={12}>
                        <SchoolHousesPage/>
                    </Grid>
                    {pupilsByRewards &&
                    <Grid item xs={12} md={12} lg={12}>
                        <TopPupilsByRewardBarChart pupils={pupilsByRewards}/>
                    </Grid>
                    }
                    {pupilsByActivity &&
                    <Grid item xs={12} md={12} lg={12}>
                        <TopActivitiesPieChart activities={activities}/>
                    </Grid>
                    }
                    {pupilsByActivity &&
                    <Grid item xs={12} md={12} lg={12}>
                        <TopPupilsByPhysicalActivities pupils={pupilsByActivity}/>
                    </Grid>
                    }
                    {allDuration &&
                    <Grid item xs={12} md={12} lg={12}>
                        <ActivityGoalChart gainedTimeInMinutes={allDuration} goalTime={10000}/>
                    </Grid>
                    }
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
