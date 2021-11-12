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

import {GarminSleepSummaryModel} from '../../../models/garminDataModels/garminSleepModel';
import {GarminDailiesSummaryModel} from '../../../models/garminDataModels/garminDailiesModel';
import {GarminEpochsSummaryDataModel} from '../../../models/garminDataModels/garminEpochsModel';
import {listPupils} from '../../../graphql/queries';

import {ApexRadialGraphModel} from '../../../models/garminDataModels/ApexRadialGraphData';
// import GaminMetricsRadialChart from '../../reports/charts/GarminWearablesCharts/GaminMetricsRadialChart';
import DailiesStanineContourPlot from '../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot';
import RadioButtonSelector from '../../_garmin-selectors/radio-button-selector';
import GarminMetricSelector from '../../_garmin-selectors/garin-metric-selector';
import DailiesOverview from './garmin-metrics/dailies-data/DailiesOverview';
import GroupBySelector from '../../_garmin-selectors/group-by-selector';
import {Box, Button} from "@mui/material";
import StepIntensityDonut from "../../reports/charts/GarminWearablesCharts/StepIntensityDonut";
import DailiesStepsDistribution from "../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution";
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
    const [metricState, setMetricState] = useState("dailies");
    const [groupByState, setGroupByState] = useState("group");
    const [startDateState, setStartDateState] = useState(prevDate);
    const [endDateState, setEndDateState] = useState(todayDate);
    const [listOfHealthyHabitsIdsState, setHealthyHabitsIds] = useState<healthyHabitsIdModel>();

    // set of constants to get all the garmin data
    const [sleepDataGroup, setSleepGroup] = useState<GarminSleepSummaryModel[] | null>(null);
    const [sleepDataUser, setSleepUser] = useState<GarminSleepSummaryModel[] | null>(null);
    const [sleepZvalueGroup, setSleepZvalueGroup] = useState<GarminSleepSummaryModel[] | null>(null);
    const [sleepZvalueUser, setSleepZvalueUser] = useState<GarminSleepSummaryModel[] | null>(null);

    const [dailiesDataGroup, setDailiesGroup] = useState<GarminDailiesSummaryModel[] | null>(null);
    const [dailiesDataUser, setDailiesUser] = useState<GarminDailiesSummaryModel[] | null>(null);


    const [epochsDataGroup, setEpochsGroup] = useState<GarminEpochsSummaryDataModel[] | null>(null);
    const [epochsDataUser, setEpochsUser] = useState<GarminEpochsSummaryDataModel[] | null>(null);
    const [epochsZvalueGroup, setEpochsZvalueGroup] = useState<GarminEpochsSummaryDataModel[] | null>(null);
    const [epochsZvalueUser, setEpochsZvalueUser] = useState<GarminEpochsSummaryDataModel[] | null>(null);

    const sleepBaseUrl: string = "https://analytics.healthyhabits.link/api/garminSleep/dates/start/";
    const sleepZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminSleep/z-values/dates/start/";

    const dailiesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/dates/start/";
    const dailiesZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/z-values/dates/start/";

    const epochsBaseUrl: string = "https://analytics.healthyhabits.link/api/garminEpochs/dates/start/";
    const epochsZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminEpochs/z-values/dates/start/";

    const activitiesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminActivities/dates/start/";
    const activitiesZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminActivities/z-values/dates/start/";


    const startDateOpt: string = "2021-10-01";

    const endUrl: string = "/end/";
    const endDateOpt: string = "2021-11-25";

    const periodUrl: string = "/period/";
    const noneOpt: string = "none";
    const dailyOpt: string = "daily";
    const weeklyOpt: string = "weekly";
    const monthlyOpt: string = "monthly";

    const groupedByUrl: string = "/groupedby/"
    const userOpt: string = "user";
    const groupOpt: string = "group";

    var radialGraphData = new ApexRadialGraphModel(0, 0, 0, 0);
    var stepsIntensityData!: GarminDailiesSummaryModel;


    const backClick = () => {
        console.log("Backwards");
        var setEndDate = new Date(endDateState);
        setEndDate.setDate(setEndDate.getDate() - 6);
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
    // const queryURL: string = `https://analytics.healthyhabits.link/api/garminDailies/dates/start/${props.startDate}/end/${props.endDate}/period/${props.period}//groupedby/${props.groupedBy}`;
    // fetch data from db- set headers
    // the a fetch for each set of garmin data

    ///////////////////////////////////
    /////  get dailies User data //////
    //////////////////////////////////
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
            // listOfHealthyHabitsIdsState;
        }
        getAllUsers();
    }, []);


    // useEffect(() => {
    //     console.log("periodState inside useEffect!!!");
    //     console.log(periodState);
    //     const dailiesDailyUser: string = dailiesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;

    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(dailiesDailyUser, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
    //                 setDailiesUser(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);

    // ///////////////////////////////////
    // /////  get dailies group data /////
    // ///////////////////////////////////
    // useEffect(() => {
    //     const dailiesDailyGroup: string = dailiesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(dailiesDailyGroup, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
    //                 setDailiesGroup(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);

   
    // ///////////////////////////////////
    // /////  get sleep User data ////////
    // //////////////////////////////////
    // useEffect(() => {
    //     const sleepDailyUser: string = sleepBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(sleepDailyUser, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
    //                 setSleepUser(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);

    // //////////////////////////////////
    // /////  get sleep Group data //////
    // //////////////////////////////////
    // useEffect(() => {
    //     const sleepDailyGroup: string = sleepBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(sleepDailyGroup, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
    //                 setSleepGroup(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);


    // ////////////////////////////////////
    // /////  get sleep User z-values /////
    // ////////////////////////////////////
    // useEffect(() => {
    //     const sleepZvaluesUserUrl: string = sleepZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // // send request
    //         // fetch(sleepZvaluesUserUrl, requestOptions)
    //         //     .then(response => response.text())
    //         //     .then(result => {
    //         //         var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
    //         //         setSleepZvalueUser(garminData);
    //         //     })
    //         //     .catch(error => console.log('error', error));
    //     }
    //     // getData();
    // }, []);

    /////////////////////////////////////
    /////  get sleep group z-values /////
    // /////////////////////////////////////
    // useEffect(() => {
    //     const sleepZvaluesGroupUrl: string = sleepZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         //     // send request
    //         //     fetch(sleepZvaluesGroupUrl, requestOptions)
    //         //         .then(response => response.text())
    //         //         .then(result => {
    //         //             var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
    //         //             setSleepZvalueGroup(garminData);
    //         //         })
    //         //         .catch(error => console.log('error', error));
    //     }
    //     // getData();
    // }, []);

    ///////////////////////////////////
    /////  get Epoch User data /////
    //////////////////////////////////
    // useEffect(() => {
    //     const epochsDailyUser: string = epochsBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(epochsDailyUser, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
    //                 setEpochsUser(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);
    // ///////////////////////////////////
    // /////  get Epoch group data /////
    // //////////////////////////////////
    // useEffect(() => {
    //     const epochsDailyGroup: string = epochsBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(epochsDailyGroup, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
    //                 setEpochsGroup(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);

    // ////////////////////////////////////
    // /////  get epoch User z-values /////
    // ////////////////////////////////////
    // useEffect(() => {
    //     const epochsZvaluesUserUrl: string = epochsZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(epochsZvaluesUserUrl, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
    //                 setEpochsZvalueUser(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);

    // /////////////////////////////////////
    // /////  get epoch Group z-values /////
    // /////////////////////////////////////
    // useEffect(() => {
    //     const epochZvaluesGroupUrl: string = epochsZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
    //     const getAllUsers = async () => {
    //         const users: String[] = [];
    //         const result: any = await API.graphql(graphqlOperation(listPupils));
    //         result.data.listPupils?.items.forEach((item: any) => {
    //             users.push(item.id);
    //         })
    //         return users;
    //     }

    //     const getData = async () => {
    //         const users = await getAllUsers();
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         var raw = JSON.stringify(users);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };

    //         // send request
    //         fetch(epochZvaluesGroupUrl, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
    //                 setEpochsZvalueGroup(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    //     getData();
    // }, []);

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


    // var userDailies: GarminDailiesSummaryModel[] = [];
    // if (dailiesDataUser) {
    //     // console.log(dailiesDataUser);
    //     userDailies = dailiesDataUser;
    // }
    // ;
    // if (dailiesDataGroup) {
    //     radialGraphData.steps = dailiesDataGroup[dailiesDataGroup.length - 1].totalSteps;
    //     stepsIntensityData = dailiesDataGroup[dailiesDataGroup.length - 2];
    // }
    // ;

    // if (sleepDataUser) {
    //     // console.log(sleepDataUser);
    // }
    // ;
    // if (sleepDataGroup) {
    //     // console.log(sleepDataGroup)
    //     radialGraphData.sleep = sleepDataGroup[sleepDataGroup.length - 1].duration / 60;
    // }
    // ;
    // if (!epochsDataUser) {
    //     // console.log(epochsDataUser)

    // }
    // ;
    // if (epochsDataGroup) {
    //     // console.log(epochsDataGroup);
    //     radialGraphData.active = (epochsDataGroup[epochsDataGroup.length - 1].active + epochsDataGroup[epochsDataGroup.length - 1].highlyActive) / 60;
    //     radialGraphData.sedentary = epochsDataGroup[epochsDataGroup.length - 1].sedentary / 60;
    // }
    // ;
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
