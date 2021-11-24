import React, { useContext, useEffect, useState } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { UserContext } from "../../../App";
import { Classroom, Lesson, Pupil, Term } from '../../../API';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Stack } from "@material-ui/core";

import { GarminQueryData } from '../../../models/garminDataModels/garminQueryData';
import DailiesOverview from './garmin-metrics/dailies-data/DailiesOverview';
import { Box, Button, CardHeader } from "@mui/material";
import { healthyHabitsIdModel } from '../../../models/healthyHabitIdsModel';
import SleepOverview from './garmin-metrics/sleep-data/SleepOverview';
import SedentaryOverview from './garmin-metrics/sedentary-data/SedentaryOverview';
import TabCard from "../../reports/charts/GarminWearablesCharts/TabCard";
import ActivityOverview from './garmin-metrics/activity-data/ActivityOverview';
import TotalAverageSwitch from '../../_garmin-selectors/total-average-switch';
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const teacherQuery = `query MyQuery($id: ID = "") {
    getTeacher(id: $id) {
      classrooms {
        items {
          classroom {
            pupils {
              items {
                pupil {
                  lastName
                  id
                  firstName
                }
              }
            }
          }
        }
      }
    }
  }`

const DashboardOfTeacher = () => {
    const today = new Date();
    const dailySubstract = 7;
    var pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - dailySubstract);
    var todayDate: string = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
    var prevDate: string = pastDate.getFullYear() + "-" + String(pastDate.getMonth() + 1).padStart(2, '0') + "-" + String(pastDate.getDate()).padStart(2, '0');

    var queryData = new GarminQueryData(prevDate, todayDate, 'daily', 'group');
    const customization = useSelector((state: any) => state.customization);
    const user = useContext(UserContext);


    ///////////////////////////////////////////////////////////////////////////////////////
    // Can this be moved out into some kind of service? ///////////////////////////////////
    const [periodState, setPeriodState] = useState("daily");
    const [metricState, setMetricState] = useState("steps");
    const [groupByState, setGroupByState] = useState("group");
    const [startDateState, setStartDateState] = useState(prevDate);
    const [endDateState, setEndDateState] = useState(todayDate);
    const [listOfHealthyHabitsIdsState, setHealthyHabitsIds] = useState<healthyHabitsIdModel>();
    const [listOfHHidsAndUserNamesState, setHHidsAndUsernames] = useState<any[]>();


    const backClick = () => {
        console.log("Backwards");
        var setEndDate = new Date(endDateState);
        todayDate = setEndDate.getFullYear() + "-" + String(setEndDate.getMonth() + 1).padStart(2, '0') + "-" + String(setEndDate.getDate()).padStart(2, '0');
        var setStartDate = new Date(todayDate);

        // make thios a case statement & think about default condition
        if (queryData.period === 'daily') {
            setEndDate.setDate(setEndDate.getDate() - 1);
            todayDate = setEndDate.getFullYear() + "-" + String(setEndDate.getMonth() + 1).padStart(2, '0') + "-" + String(setEndDate.getDate()).padStart(2, '0');
            setStartDate = new Date(todayDate);
            setStartDate.setDate(setStartDate.getDate() - 6);
        } else if (queryData.period === 'weekly') {
            setEndDate.setDate(setEndDate.getDate() - 6);
            todayDate = setEndDate.getFullYear() + "-" + String(setEndDate.getMonth() + 1).padStart(2, '0') + "-" + String(setEndDate.getDate()).padStart(2, '0');
            setStartDate = new Date(todayDate);
            setStartDate.setDate(setStartDate.getDate() - 27);
        } else if (queryData.period === 'monthly') {
            setEndDate.setDate(setEndDate.getDate() - 28);
            todayDate = setEndDate.getFullYear() + "-" + String(setEndDate.getMonth() + 1).padStart(2, '0') + "-" + String(setEndDate.getDate()).padStart(2, '0');
            setStartDate = new Date(todayDate);
            setStartDate.setDate(setStartDate.getDate() - 85);
        } else {
            setEndDate.setDate(setEndDate.getDate() - 1);
            todayDate = setEndDate.getFullYear() + "-" + String(setEndDate.getMonth() + 1).padStart(2, '0') + "-" + String(setEndDate.getDate()).padStart(2, '0');
            setStartDate = new Date(todayDate);
            setStartDate.setDate(setStartDate.getDate() - 6);
        }
        prevDate = setStartDate.getFullYear() + "-" + String(setStartDate.getMonth() + 1).padStart(2, '0') + "-" + String(setStartDate.getDate()).padStart(2, '0');

        setStartDateState(prevDate);
        setEndDateState(todayDate);
    };

    const forwardClick = () => {
        console.log("Forwards");

        var setEndDate = new Date(endDateState);
        setEndDate.setDate(setEndDate.getDate() + 6);
        todayDate = setEndDate.getFullYear() + "-" + String(setEndDate.getMonth() + 1).padStart(2, '0') + "-" + String(setEndDate.getDate()).padStart(2, '0');
        var setStartDate = new Date(todayDate);

        // make thios a case statement & think about default condition
        if (queryData.period === 'daily') {
            setStartDate.setDate(setStartDate.getDate() - 6);
        } else if (queryData.period === 'weekly') {
            setStartDate.setDate(setStartDate.getDate() - 27);
        } else if (queryData.period === 'monthly') {
            setStartDate.setDate(setStartDate.getDate() - 85);
        } else {
            setStartDate.setDate(setStartDate.getDate() - 6);
        }
        prevDate = setStartDate.getFullYear() + "-" + String(setStartDate.getMonth() + 1).padStart(2, '0') + "-" + String(setStartDate.getDate()).padStart(2, '0');

        setStartDateState(prevDate);
        setEndDateState(todayDate);
    };


    //////////////////////////////////////
    /////  get  Healthy habits Ids //////
    /////////////////////////////////////
    useEffect(() => {
        const getAllUsers = async () => {
            const users: string[] = [];
            const usernames: any[] = [];
            var hhUsers = new healthyHabitsIdModel([]);
            ////////////////////////////////////////////////////////////////////


            // const result: any = await API.graphql(graphqlOperation(listPupils));
            // result.data.listPupils?.items.forEach((item: Pupil) => {
            //     users.push(item.id);
            //     var name = item.firstName+ " "+ item.lastName;
            //     usernames.push({'id':item.id, 'name': name})
            //     hhUsers.id.push(item.id)
            // })
            // setHealthyHabitsIds(hhUsers);
            // setHHidsAndUsernames(usernames);
            // console.log(usernames.length);
            // console.warn(usernames); 
            ////////////////////////////////////
            const result: any = await API.graphql(graphqlOperation(teacherQuery, { id: user?.email }));
            result.data.getTeacher?.classrooms.items
                .map((item: any) => item.classroom)
                .flatMap((item: Classroom) => item.pupils?.items).forEach((pupil: any) => {

                    users.push(pupil.pupil.id);
                    var name = pupil.pupil.firstName + " " + pupil.pupil.lastName;
                    usernames.push({ 'id': pupil.pupil.id, 'name': name });
                    hhUsers.id.push(pupil.pupil.id);
                });

            setHealthyHabitsIds(hhUsers);
            setHHidsAndUsernames(usernames);
            //////////////////////////////////////
        }
        getAllUsers();
    }, []);

    useEffect(() => {
        queryData.endDate = endDateState;
        queryData.startDate = startDateState;
        queryData.period = customization.period;
        queryData.groupedBy = groupByState;
    }, [customization.period, periodState, groupByState, startDateState, endDateState, listOfHealthyHabitsIdsState]);

    const theme: any = useTheme();
    const Metrics = () => {
        return (
            <>
                {customization.showSteps &&
                    <Grid item>
                        <Card sx={{ backgroundColor: theme.palette.secondary.light }}>
                            <CardHeader title={'Steps'} />
                            <CardContent>
                                <DailiesOverview idList={listOfHealthyHabitsIdsState} usernames={listOfHHidsAndUserNamesState}
                                    startDate={startDateState} endDate={endDateState}
                                    timePeriod={customization.period} grouping={groupByState} />
                            </CardContent>
                        </Card>
                    </Grid>
                }
                {customization.showSleep &&
                    <Grid item>
                        <Card sx={{ backgroundColor: theme.palette.primary.light }}>
                            <CardHeader title={'Sleep'} />
                            <CardContent>
                                <SleepOverview idList={listOfHealthyHabitsIdsState} usernames={listOfHHidsAndUserNamesState}
                                    startDate={startDateState} endDate={endDateState}
                                    timePeriod={customization.period} grouping={groupByState} />
                            </CardContent>
                        </Card>
                    </Grid>
                }
                {customization.showSedentary &&
                    <Grid item>
                        <Card sx={{ backgroundColor: theme.palette.warning.light }}>
                            <CardHeader title={'Sedentary'} />
                            <CardContent>
                                <SedentaryOverview idList={listOfHealthyHabitsIdsState} usernames={listOfHHidsAndUserNamesState}
                                    startDate={startDateState} endDate={endDateState}
                                    timePeriod={customization.period} grouping={groupByState} />
                            </CardContent>
                        </Card>
                    </Grid>
                }
                {customization.showActivity &&
                    <Grid item>
                        <Card sx={{ backgroundColor: theme.palette.success.light }}>
                            <CardHeader title={'Activity'} />
                            <CardContent>
                                <ActivityOverview idList={listOfHealthyHabitsIdsState} usernames={listOfHHidsAndUserNamesState}
                                    startDate={startDateState} endDate={endDateState}
                                    timePeriod={customization.period} grouping={groupByState} />
                            </CardContent>
                        </Card>
                    </Grid>
                }
            </>
        );
    }

    return (
        <Stack direction={'column'}>
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start" spacing={4}>
                <Metrics />
            </Grid>
        </Stack>
    );
};

export default DashboardOfTeacher;