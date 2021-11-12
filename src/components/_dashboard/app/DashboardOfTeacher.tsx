import React, {useContext, useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {UserContext} from "../../../App";
import {Classroom, Lesson, Term} from '../../../API';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Stack} from "@material-ui/core";
import {GarminQueryData} from '../../../models/garminDataModels/garminQueryData';


import {listPupils} from '../../../graphql/queries';


import RadioButtonSelector from '../../_garmin-selectors/radio-button-selector';
import GarminMetricSelector from '../../_garmin-selectors/garin-metric-selector';
import DailiesOverview from './garmin-metrics/dailies-data/DailiesOverview';
import GroupBySelector from '../../_garmin-selectors/group-by-selector';
import {Box, Button} from "@mui/material";

import { healthyHabitsIdModel } from '../../../models/healthyHabitIdsModel';
import SleepOverview from './garmin-metrics/sleep-data/SleepOverview';
import SedentaryOverview from './garmin-metrics/sedentary-data/SedentaryOverview';

const DashboardOfTeacher = () => {
    const today = new Date();
    const dailySubstract = 7;
    var pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - dailySubstract);
    var todayDate: string = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
    var prevDate: string = pastDate.getFullYear() + "-" + String(pastDate.getMonth() + 1).padStart(2, '0') + "-" + String(pastDate.getDate()).padStart(2, '0');

    var queryData = new GarminQueryData(prevDate, todayDate, 'daily', 'group');

   

    const user = useContext(UserContext);
    const [lessons, setLessons] = useState<null | Lesson[]>(null);
    const [classrooms, setClassrooms] = useState<null | Classroom[]>(null);
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const [terms, setTerms] = useState<Term[] | null>(null);

    ///////////////////////////////////////////////////////////////////////////////////////
    // Can this be moved out into some kind of service? ///////////////////////////////////
    const [periodState, setPeriodState] = useState("daily");
    const [metricState, setMetricState] = useState("steps");
    const [groupByState, setGroupByState] = useState("group");
    const [startDateState, setStartDateState] = useState(prevDate);
    const [endDateState, setEndDateState] = useState(todayDate);
    const [listOfHealthyHabitsIdsState, setHealthyHabitsIds] = useState<healthyHabitsIdModel>();

 
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
            var hhUsers = new healthyHabitsIdModel([]);
            const result: any = await API.graphql(graphqlOperation(listPupils));

            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
                hhUsers.id.push(item.id)
            })
            setHealthyHabitsIds(hhUsers);
        }
        getAllUsers();
    }, []);

    useEffect(() => {
        queryData.endDate = endDateState;
        queryData.startDate = startDateState;
        queryData.period = periodState;
        queryData.groupedBy = groupByState;

        console.log(groupByState);
        console.log(queryData.groupedBy);

        // healthyHabitIdList.data = listOfHealthyHabitsIdsState;
        // console.log(listOfHealthyHabitsIdsState);

    }, [periodState, groupByState, startDateState, endDateState, listOfHealthyHabitsIdsState]);


    const Metrics = () => {
        if (metricState === 'sedentary') {
            return (
                <Grid item xs={12}>
                   <SedentaryOverview idList={listOfHealthyHabitsIdsState} startDate={startDateState} endDate={endDateState} timePeriod={periodState} grouping={groupByState} />
                </Grid>
                
            );
        }
        if (metricState === 'steps') {
            return (
                <Grid item xs={12}>
                    <DailiesOverview idList={listOfHealthyHabitsIdsState} startDate={startDateState} endDate={endDateState} timePeriod={periodState} grouping={groupByState} />
                </Grid>
                
            );
        }
        if (metricState === 'sleep') {
            return (
                <Grid item xs={12}>
                  <SleepOverview idList={listOfHealthyHabitsIdsState} startDate={startDateState} endDate={endDateState} timePeriod={periodState} grouping={groupByState} />
                </Grid>
                
            );
        }
        return <Typography>Nothing selected</Typography>
    }

    return (
        <Stack direction={'column'}>
            <Typography variant={'h3'} textAlign={'center'} padding={5}>Plots for the teacher view</Typography>
            <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start" spacing={4}>
                <Grid item>
                    <Card sx={{minHeight: 150}}>
                        <CardContent>
                            <Stack spacing={2}>
                                <RadioButtonSelector periodChanger={setPeriodState} period={periodState}/>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}
                                       spacing={1}>
                                    <Button variant={'contained'} color={'secondary'} onClick={backClick}>back</Button>
                                    <Typography>{startDateState} : {endDateState}</Typography>
                                    <Button variant={'contained'} color={'secondary'}
                                            onClick={forwardClick}>forward</Button>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card sx={{minHeight: 150}}>
                        <CardContent>
                            <GarminMetricSelector metricChanger={setMetricState} metric={metricState}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card sx={{minHeight: 150}}>
                        <CardContent>
                            <GroupBySelector groupByChanger={setGroupByState} group={groupByState}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box height={20}/>
            <Grid xs={12} container spacing={2}>
                <Metrics/>
            </Grid>

        </Stack>

    );
};

export default DashboardOfTeacher;
