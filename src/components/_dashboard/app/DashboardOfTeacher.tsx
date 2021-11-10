import React, { useContext, useEffect, useState } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { UserContext } from "../../../App";
import { Classroom, Lesson, Term } from '../../../API';
import Grid from "@material-ui/core/Grid";
import { Connect } from "aws-amplify-react";
import { IConnectState } from "aws-amplify-react/lib/API/GraphQL/Connect";
import CardSkeleton from "../../skeletons/CardSkeleton";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Container, Stack } from "@material-ui/core";
import ChooseLessonPlanSearchField, { LessonPlansSearchField } from "../../reports/ChooseSubjectSearchField";
import TermReport from "../../reports/TermReport";
import SchoolHousesPage from "../../../pages/SchoolHousesPage";
import ActivityLineChart from '../../reports/charts/ActivityLineChart';
import HeatMapChart from '../../reports/charts/HeatMap';
import DailiesMixedData from '../../reports/charts/GarminWearablesCharts/DailiesMixedData';
import { GarminQueryData } from '../../../models/garminDataModels/garminQueryData';
import DailiesStepsTarget from '../../reports/charts/GarminWearablesCharts/GarminDailiesStepsTarget';

import { GarminSleepSummaryModel } from '../../../models/garminDataModels/garminSleepModel';
import { GarminDailiesSummaryModel } from '../../../models/garminDataModels/garminDailiesModel';
import { GarminEpochsSummaryDataModel } from '../../../models/garminDataModels/garminEpochsModel';
import { listPupils } from '../../../graphql/queries';
// import { number } from 'yup';
import { ApexRadialGraphModel } from '../../../models/garminDataModels/ApexRadialGraphData';
// import GaminMetricsRadialChart from '../../reports/charts/GarminWearablesCharts/GaminMetricsRadialChart';
import GarminMetricsRadialChart from '../../reports/charts/GarminWearablesCharts/GaminMetricsRadialChart';
import StepIntensityDonut from '../../reports/charts/GarminWearablesCharts/StepIntensityDonut';
import DailiesStepsDistribution from '../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution';
import DailiesStanineContourPlot from '../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot';
import RadioButtonSelector from '../../_garmin-selectors/radio-button-selector';
import GarminMetricSelector from '../../_garmin-selectors/garin-metric-selector';
import DailiesOverview from '../../reports/charts/GarminWearablesCharts/dailies-data/DailiesOverview';
import GroupBySelector from '../../_garmin-selectors/group-by-selector';

const query =/*GraphQL*/`query MyQuery($id: ID = "") {
    getTeacher(id: $id) {
        classrooms {
            items {
                classroom {
                    id
                    name
                    yearGroup {
                        subjects {
                            items {
                                subject {
                                    SubjectTerms {
                                        items {
                                            term {
                                                nam
                                                id
                                                TermLessons {
                                                    items {
                                                        lesson {
                                                            id
                                                            description
                                                            title
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
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
    const dailySubstract= 7;
    var pastDate = new Date();
    pastDate.setDate(pastDate.getDate()-dailySubstract);
    var todayDate: string = today.getFullYear() +"-"+String(today.getMonth() + 1).padStart(2, '0')+"-"+ String(today.getDate()).padStart(2, '0');
    var prevDate: string = pastDate.getFullYear() +"-"+String(pastDate.getMonth() + 1).padStart(2, '0')+"-"+ String(pastDate.getDate()).padStart(2, '0');
    var queryData = new GarminQueryData('2021-10-01', '2021-11-05', 'daily', 'group');
    const user = useContext(UserContext);
    const [lessons, setLessons] = useState<null | Lesson[]>(null);
    const [classrooms, setClassrooms] = useState<null | Classroom[]>(null);
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const [terms, setTerms] = useState<Term[] | null>(null);

    ///////////////////////////////////////////////////////////////////////////////////////
    // Can this be moved out into some kind of service? ///////////////////////////////////
    const [periodState, setPeriodState]=useState("daily");
    const [metricState, setMetricState]=useState("dailies");
    const [groupByState, setGroupByState]=useState("group");
    const [startDateState, setStartDateState]=useState(prevDate);
    const [endDateState, setEndDateState]=useState(todayDate);
    
    // set of constants to get all the garmin data
    const [sleepDataGroup, setSleepGroup] = useState<GarminSleepSummaryModel[] | null>(null);
    const [sleepDataUser, setSleepUser] = useState<GarminSleepSummaryModel[] | null>(null);
    const [sleepZvalueGroup, setSleepZvalueGroup] = useState<GarminSleepSummaryModel[] | null>(null);
    const [sleepZvalueUser, setSleepZvalueUser] = useState<GarminSleepSummaryModel[] | null>(null);

    const [dailiesDataGroup, setDailiesGroup] = useState<GarminDailiesSummaryModel[] | null>(null);
    const [dailiesDataUser, setDailiesUser] = useState<GarminDailiesSummaryModel[] | null>(null);
    const [dailiesZvalueGroup, setDailiesZvalueGroup] = useState<GarminDailiesSummaryModel[] | null>(null);
    const [dailiesZvalueUser, setDailiesZvalueUser] = useState<GarminDailiesSummaryModel[] | null>(null);

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

    
    const backClick = () =>{
        console.log("Backwards");
        var setEndDate = new Date(endDateState);
        setEndDate.setDate(setEndDate.getDate() - 6);
        todayDate = setEndDate.getFullYear() +"-"+String(setEndDate.getMonth() + 1).padStart(2, '0')+"-"+ String(setEndDate.getDate()).padStart(2, '0');
        var setStartDate= new Date(todayDate);

        // make thios a case statement & think about default condition
        if(queryData.period==='daily') {
            setStartDate.setDate(setStartDate.getDate()-6);
        }else if(queryData.period==='weekly') {
            setStartDate.setDate(setStartDate.getDate()-27);
        }else if(queryData.period==='monthly') {
            setStartDate.setDate(setStartDate.getDate()-85);
        } else {
            setStartDate.setDate(setStartDate.getDate()-6);   
        }
        prevDate =  setStartDate.getFullYear() +"-"+String(setStartDate.getMonth() + 1).padStart(2, '0')+"-"+ String(setStartDate.getDate()).padStart(2, '0');

        setStartDateState(todayDate);
        setEndDateState(prevDate);
    };

    const forwardClick = () =>{
        console.log("Forwards");
     
        var setEndDate = new Date(endDateState);
        setEndDate.setDate(setEndDate.getDate() + 6);
        todayDate = setEndDate.getFullYear() +"-"+String(setEndDate.getMonth() + 1).padStart(2, '0')+"-"+ String(setEndDate.getDate()).padStart(2, '0');
        var setStartDate= new Date(todayDate);

        // make thios a case statement & think about default condition
        if(queryData.period==='daily') {
            setStartDate.setDate(setStartDate.getDate()-6);
        }else if(queryData.period==='weekly') {
            setStartDate.setDate(setStartDate.getDate()-27);
        }else if(queryData.period==='monthly') {
            setStartDate.setDate(setStartDate.getDate()-85);
        } else {
            setStartDate.setDate(setStartDate.getDate()-6);   
        }
        prevDate =  setStartDate.getFullYear() +"-"+String(setStartDate.getMonth() + 1).padStart(2, '0')+"-"+ String(setStartDate.getDate()).padStart(2, '0');

        setStartDateState(todayDate);
        setEndDateState(prevDate);
    };
    // const queryURL: string = `https://analytics.healthyhabits.link/api/garminDailies/dates/start/${props.startDate}/end/${props.endDate}/period/${props.period}//groupedby/${props.groupedBy}`;
    // fetch data from db- set headers
    // the a fetch for each set of garmin data
    useEffect(() => {
        console.log(user);
        const fetchLessons = async (): Promise<any> => {
            const lessonsData: any = await API.graphql(graphqlOperation(query, { id: user?.email }));
            const terms: Term[] = lessonsData.data.getTeacher.classrooms.items
                .filter((item: any) => !!item?.classroom?.yearGroup)
                .flatMap((item: any) => item?.classroom?.yearGroup?.subjects?.items)
                .flatMap((item: any) => item?.subject.SubjectTerms.items)
                .flatMap((item: any) => item?.term)
            const lessons: Lesson[] = terms
                .flatMap(term => term?.TermLessons?.items)
                .flatMap((item: any) => item?.lesson)
            setTerms(terms);
            setClassrooms(lessonsData.data.getTeacher.classrooms.items.map((item: any) => item.classroom));
            setLessons(lessons);
        };
        fetchLessons()
        return () => {

        };


    }, []);

    ///////////////////////////////////
    /////  get dailies User data //////
    //////////////////////////////////
    useEffect(() => {
        console.log("periodState inside useEffect!!!");
        console.log(periodState);
        const dailiesDailyUser: string = dailiesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;

        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(dailiesDailyUser, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
                    setDailiesUser(garminData);
                })
                .catch(error => console.log('error', error));
        }
        getData();
    }, []);

    ///////////////////////////////////
    /////  get dailies group data /////
    ///////////////////////////////////
    useEffect(() => {
        const dailiesDailyGroup: string = dailiesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(dailiesDailyGroup, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
                    setDailiesGroup(garminData);
                })
                .catch(error => console.log('error', error));
        }
        getData();
    }, []);

    /////////////////////////////////////
    /////  get dailies User z-values ////
    /////////////////////////////////////
    useEffect(() => {
        const dailiesZvaluesUserUrl: string = dailiesZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

        //     // send request
        //     fetch(dailiesZvaluesUserUrl, requestOptions)
        //         .then(response => response.text())
        //         .then(result => {
        //             var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
        //             setDailiesZvalueUser(garminData);
        //         })
        //         .catch(error => console.log('error', error));
        }
        // getData();
    }, []);

    //////////////////////////////////////
    /////  get dailies Group z-values ////
    //////////////////////////////////////
    useEffect(() => {
        const dailiesZvaluesGroupUrl: string = dailiesZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

        //     // send request
        //     fetch(dailiesZvaluesGroupUrl, requestOptions)
        //         .then(response => response.text())
        //         .then(result => {
        //             var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
        //             setDailiesZvalueGroup(garminData);
        //         })
        //         .catch(error => console.log('error', error));
        }
        // getData();
    }, []);

    ///////////////////////////////////
    /////  get sleep User data ////////
    //////////////////////////////////
    useEffect(() => {
        const sleepDailyUser: string = sleepBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(sleepDailyUser, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
                    setSleepUser(garminData);
                })
                .catch(error => console.log('error', error));
        }
        getData();
    }, []);

    //////////////////////////////////
    /////  get sleep Group data //////
    //////////////////////////////////
    useEffect(() => {
        const sleepDailyGroup: string = sleepBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(sleepDailyGroup, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
                    setSleepGroup(garminData);
                })
                .catch(error => console.log('error', error));
        }
        getData();
    }, []);


    ////////////////////////////////////
    /////  get sleep User z-values /////
    ////////////////////////////////////
    useEffect(() => {
        const sleepZvaluesUserUrl: string = sleepZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // // send request
            // fetch(sleepZvaluesUserUrl, requestOptions)
            //     .then(response => response.text())
            //     .then(result => {
            //         var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
            //         setSleepZvalueUser(garminData);
            //     })
            //     .catch(error => console.log('error', error));
        }
        // getData();
    }, []);

    /////////////////////////////////////
    /////  get sleep group z-values /////
    /////////////////////////////////////
    useEffect(() => {
        const sleepZvaluesGroupUrl: string = sleepZvaluesBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

        //     // send request
        //     fetch(sleepZvaluesGroupUrl, requestOptions)
        //         .then(response => response.text())
        //         .then(result => {
        //             var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
        //             setSleepZvalueGroup(garminData);
        //         })
        //         .catch(error => console.log('error', error));
         }
        // getData();
    }, []);

    ///////////////////////////////////
    /////  get Epoch User data /////
    //////////////////////////////////
    useEffect(() => {
        const epochsDailyUser: string = epochsBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + userOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(epochsDailyUser, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
                    setEpochsUser(garminData);
                })
                .catch(error => console.log('error', error));
        }
        getData();
    }, []);
    ///////////////////////////////////
    /////  get Epoch group data /////
    //////////////////////////////////
    useEffect(() => {
        const epochsDailyGroup: string = epochsBaseUrl + startDateOpt + endUrl + endDateOpt + periodUrl + dailyOpt + groupedByUrl + groupOpt;
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(epochsDailyGroup, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
                    setEpochsGroup(garminData);
                })
                .catch(error => console.log('error', error));
        }
        getData();
    }, []);

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

    useEffect(()=>{
        queryData.endDate=endDateState;
        queryData.startDate=startDateState;
        queryData.period=periodState;
        
        queryData.groupedBy=groupByState;
        console.log("Has changed" + queryData.period +" : "+ queryData.groupedBy +" : "+queryData.startDate +" : "+queryData.endDate);

    }, [periodState, groupByState, startDateState, endDateState]);

    
  
    var userDailies: GarminDailiesSummaryModel[] = [];
    if (dailiesDataUser) {
        // console.log(dailiesDataUser);
        userDailies = dailiesDataUser;

    };
    if (dailiesDataGroup) {
        radialGraphData.steps = dailiesDataGroup[dailiesDataGroup.length - 1].totalSteps;
        stepsIntensityData = dailiesDataGroup[dailiesDataGroup.length - 2];
    };

    if (sleepDataUser) {
        // console.log(sleepDataUser);
    };
    if (sleepDataGroup) {
        // console.log(sleepDataGroup)
        radialGraphData.sleep = sleepDataGroup[sleepDataGroup.length - 1].duration / 60;
    };
    if (!epochsDataUser) {
        // console.log(epochsDataUser)

    };
    if (epochsDataGroup) {
        // console.log(epochsDataGroup);
        radialGraphData.active = (epochsDataGroup[epochsDataGroup.length - 1].active + epochsDataGroup[epochsDataGroup.length - 1].highlyActive) / 60;
        radialGraphData.sedentary = epochsDataGroup[epochsDataGroup.length - 1].sedentary / 60;
    };
   

    if(metricState==="sedentary"){
    return (
        <Container>

            <h1>Plots for the teacher view</h1>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <RadioButtonSelector periodChanger={setPeriodState}/>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <button onClick={backClick}>back</button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <h6>2021-07-01 : 2021-07-01</h6>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <button onClick={forwardClick}>forward</button>
                        </Grid>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <GarminMetricSelector metricChanger={setMetricState}/>
                        <h2>{metricState}</h2>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <GroupBySelector groupByChanger={setGroupByState}/>
                        <h2>{groupByState}</h2>
                    </Card>
                </Grid>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    {/* <DailiesMixedData {...queryData}/> */}
                    <DailiesStepsTarget {...queryData} />

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <GarminMetricsRadialChart {...radialGraphData} />
                </Grid>

            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <StepIntensityDonut {...stepsIntensityData} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <DailiesStepsDistribution data={userDailies} />
                </Grid>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <DailiesStanineContourPlot />
                </Grid>

            </Stack>
            {/* <Grid item xs={12} md={12} lg={6}> */}
            {/* <> */}
            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}> */}
            {/* <Typography variant="h4" gutterBottom> */}
            {/* Reports for tony */}
            {/* </Typography> */}
            {/* <LessonPlansSearchField terms={terms} setSelectedTerm={setSelectedTerm}/> */}
            {/* </Stack> */}
            {/* {selectedTerm && <TermReport term={selectedTerm}/>} */}
            {/* </> */}
            {/* </Grid> */}
        </Container>);
    } else if(metricState==="dailies"){
        return (
            <Container>
    
                <h1>Dailies</h1>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <RadioButtonSelector periodChanger={setPeriodState}/>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <button>back</button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <h6>2021-07-01 : 2021-07-01</h6>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <button>forward</button>
                        </Grid>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <GarminMetricSelector metricChanger={setMetricState}/>
                        <h2>{metricState}</h2>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <GroupBySelector groupByChanger={setGroupByState}/>
                        <h2>{groupByState}</h2>
                    </Card>
                </Grid>
            </Stack>
                <Stack>
                    <DailiesOverview />
                </Stack>
            </Container>);
    } else if(metricState==="sleep"){
        return (
            <Container>
    
                <h1>Sleep</h1>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <RadioButtonSelector periodChanger={setPeriodState}/>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <button>back</button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <h6>2021-07-01 : 2021-07-01</h6>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3}>
                            <button>forward</button>
                        </Grid>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <GarminMetricSelector metricChanger={setMetricState}/>
                        <h2>{metricState}</h2>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4}>
                    <Card variant="outlined">
                        <GroupBySelector groupByChanger={setGroupByState}/>
                        <h2>{groupByState}</h2>
                    </Card>
                </Grid>
            </Stack>
            </Container>);
    } else {
        <h1>Nothing selected</h1>
    }
    // <Typography variant={'h5'}>
    //     Your Classrooms:
    //     {classrooms?.map(classroom => `${classroom.name} | `)}
    // </Typography>
    // {/*<iframe width="100%" height="480px"*/}
    // {/*        src="https://forms.office.com/Pages/ResponsePage.aspx?id=in39BuFKQUe0esKCthc7aECUiEqJcetGu0bHPjzEkcFUNjFRWVhQTERaOUQ4WFZEMFcwSldLUlZTSC4u&embed=true"*/}
    // {/*        frameBorder="0"*/}
    // {/*        style={{maxWidth: '100%', maxHeight: "100vh"}}*/}
    // {/*        allowFullScreen*/}
    // {/*>*/}
    // {/*</iframe>*/}

    // {/*<Grid container*/
    // }
    // {/*      direction="row"*/
    // }
    // {/*      justifyContent="flex-start"*/
    // }
    // {/*      alignItems="flex-start" spacing={2}*/
    // }
    // {/*>*/
    // }
    // {/*    <Grid item xs={12} minHeight={200}>*/
    // }
    // {/*        <Grid container justifyContent="center" spacing={2}*/
    // }
    // {/*              style={{flexGrow: 1, display: 'flex', flexWrap: 'wrap'}}>*/
    // }
    // {/*            {lessons ?*/
    // }
    // {/*                lessons.map((lesson: Lesson, index) => (*/
    // }
    // {/*                    <Grid key={index} item xs={12} sm={6} md={3} maxWidth={300} minWidth={200}>*/
    // }
    // {/*                        <Link component={RouterLink} to={`../curricula/subjects/terms/lessons/${lesson.id}`}*/
    // }
    // {/*                              underline={'none'}>*/
    // }
    // {/*                            <Card style={{height: '100%'}}>*/
    // }
    // {/*                                <CardActionArea style={{height: '100%'}}>*/
    // }
    // {/*                                    <CardContent style={{textAlign: 'center'}}>*/
    // }
    // {/*                                        <Typography variant="h5" component="h2">*/
    // }
    // {/*                                            {lesson.title}*/
    // }
    // {/*                                        </Typography>*/
    // }
    // {/*                                    </CardContent>*/
    // }
    // {/*                                </CardActionArea>*/
    // }
    // {/*                            </Card>*/
    // }
    // {/*                        </Link>*/
    // }
    // {/*                    </Grid>*/
    // }
    // {/*                ))*/
    // }
    // {/*                :*/
    // }
    // {/*                [0, 1, 2, 3, 4, 5].map((value) => (*/
    // }
    // {/*                    <CardSkeleton key={value}/>*/
    // }
    // {/*                ))*/
    // }
    // {/*            }*/
    // }
    // {/*        </Grid>*/
    // }
    // {/*    </Grid>*/
    // }
    // {/*</Grid>*/
    // }
    // // </Container>
    // // )
};

export default DashboardOfTeacher;
