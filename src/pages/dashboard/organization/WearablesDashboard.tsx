import React, {useEffect, useMemo, useState} from 'react';
import Page from "../../../components/Page";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, Card, CardContent, Skeleton, Accordion, AccordionDetails} from "@mui/material";
import CardSkeleton from "../../../components/skeleton/CardSkeleton";
import useSettings from 'src/hooks/useSettings';
import useAuth from "../../../hooks/useAuth";
import AnalyticsWidgetSummary from 'src/sections/@dashboard/general/analytics/AnalyticsWidgetSummary';
import {Attendance, Classroom, Lesson, Organization, PELessonRecord, UserInOrganization, User} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import ActivityOrganizationBarchart from "./dashboard/ActivityOrganizationBarchart";
import ActivtityChartSkeleton from "../../../components/skeleton/ActivtityChartSkeleton";
import {collect, Collection} from "collect.js";
import ActivityOrganizationLineChart from "./dashboard/ActivityOrganizationLineChart";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {compareAsc, format, parseISO, subDays, subMonths, subYears} from "date-fns";
import {LoadingButton} from "@mui/lab";
import {BankingWidgetSummary} from "../../../sections/@dashboard/general/banking";
import {values} from "lodash";
import TopUsersByRewardsBarchart from "./dashboard/TopUsersByRewardsBarchart";
import { TerraWearables, getWearablesData } from "../../../apiFunctions/apiFunctions";
import StepsDailyBarChart from "./chart/StepsDailyBarChart";
import StepsLeagueBarChart from "./chart/StepsLeagueBarChart";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import AccordionSummary from "@mui/material/AccordionSummary";
import Iconify from "../../../components/Iconify";

const querySelectableClassrooms = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    Classrooms {
      items {
        id
        name
      }
    }
  }
}`;

const queryAllClassrooms = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    Classrooms {
      items {
        id
        name
        members {
          items {
            id
            userInOrganization {
              user {
                id
                firstName
                lastName
                terraId
              }
            }
          }
        }
      }
    }
  }
}`;

const queryClassroom = `query MyQuery($id: ID = "", $cid: ID = "") {
  getOrganization(id: $id) {
    Classrooms(limit: 10000000, filter: {id: {eq: $cid}}) {
      items {
        id
        name
        members {
          items {
            id
            userInOrganization {
              user {
                id
                firstName
                lastName
                terraId
              }
            }
          }
        }
      }
    }
  }
}`;

const WearablesDashboard = () => {

    const {themeStretch} = useSettings();
    const {user} = useAuth();
    const {organizationId} = useParams();
    const [selectableClassrooms, setSelectableClassrooms] = useState<Classroom[] | null>(null);

    const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [startDate, setStartDate] = React.useState<Date>(subDays(new Date(), 7));
    const [endDate, setEndDate] = React.useState<Date>(subDays(new Date(), 1));
    const [loading, setLoading] = useState(false);

    const [organization, setOrganization] = useState<Organization | null>(null);

    const [participants, setParticipants] = useState<number | null>(null);
    const [connectedMembers, setConnectedMembers] = useState<number | null>(null);
    const [yesterdaysSteps, setYesterdaysSteps] = useState<number | null>(null);
    const [totalSteps, setTotalSteps] = useState<number | null>(null);
    const [averageDailySteps, setAverageDailySteps] = useState<number | null>(null);
    const [stepsTargetData, setStepsTargetData] = useState<any[] | null>(null);
    const [sleepTargetData, setSleepTargetData] = useState<any[] | null>(null);
    const [activityTargetData, setActivityTargetData] = useState<any[] | null>(null);
    const [achieving24hrMovementTarget, setAchieving24hrMovementTarget] = useState<number | null>(null);
    const [last7DaysTotalDailySteps, setLast7DaysTotalDailySteps] = useState<any[] | null>(null);
    const [leagueTableSteps, setLeagueTableSteps] = useState<any[] | null>(null);

    // set daily threshold targets
    const stepsThreshold = 10000;
    const sleepThreshold = 9 * 60 * 60;
    const activityThreshold = 1 * 60 * 60;

    const columns: GridColDef[] = [
        {field: 'id', flex: 0.2, headerName: 'Id', hide: true},
        {field: 'terraId', flex: 0.2, headerName: 'TerraId', hide: true},
        {
            field: 'firstName',
            headerName: 'First Name',
            sortable: true,
            flex: 1,
            editable: false
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            sortable: true,
            flex: 1,
            editable: false
        }
    ];

    const loadSelectableClassrooms = async () => {
        const result: any = await API.graphql(graphqlOperation(querySelectableClassrooms, {id: organizationId}));
        let classrooms: any[] = result.data.getOrganization?.Classrooms?.items;
        setSelectableClassrooms(classrooms.sort((a, b) => a.name.localeCompare(b.name)));
    };

    const getYesterdaysSteps = async (terraIds: any) => {
        let requestBody: TerraWearables = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(subDays(new Date(), 1), "yyyy-MM-dd"),
            "endDate": format(subDays(new Date(), 1), "yyyy-MM-dd"),
            "returnType": "total"
        };
        let wearablesData = await getWearablesData(requestBody);
        setYesterdaysSteps(wearablesData?.data[0]?.value ?? 0);
    };

    const getTotalSteps = async (terraIds: any) => {
        let requestBody: TerraWearables = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "total"
        };
        let wearablesData = await getWearablesData(requestBody);
        setTotalSteps(wearablesData?.data[0]?.value ?? 0);
    };

    const getAverageDailySteps = async (terraIds: any) => {
        let requestBody: TerraWearables = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "average"
        };
        let wearablesData = await getWearablesData(requestBody);
        setAverageDailySteps(wearablesData?.data[0]?.value ?? 0);
    };

    const getTargets = async (terraIds: any) => {
        // get steps target data
        let requestBody: TerraWearables = {
            "idList": terraIds,
            "grouping": "user",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "average"
        };
        let stepsData = await getWearablesData(requestBody);
        // get sleep target data
        requestBody = {
            "idList": terraIds,
            "grouping": "user",
            "category": "sleep",
            "subtype": "durationTotal",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "average"
        };
        let sleepData = await getWearablesData(requestBody);
        // get activity target data
        requestBody = {
            "idList": terraIds,
            "grouping": "user",
            "category": "activity",
            "subtype": "duration",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "average"
        };
        let activityData = await getWearablesData(requestBody);
        // determine the number of members that have achieved all three targets
        let achievedCount = 0;
        for (let terraId of terraIds) {
            let stepsValue = stepsData?.data?.find((item: any) => item.terraId == terraId)?.value ?? 0;
            let sleepValue = sleepData?.data?.find((item: any) => item.terraId == terraId)?.value ?? 0;
            let activityValue = activityData?.data?.find((item: any) => item.terraId == terraId)?.value ?? 0;
            if (stepsValue >= stepsThreshold && sleepValue >= sleepThreshold && activityValue >= activityThreshold) {
                achievedCount ++;
            }
        }
        // set values
        setStepsTargetData(stepsData?.data ?? []);
        setSleepTargetData(sleepData?.data ?? []);
        setActivityTargetData(activityData?.data ?? []);
        setAchieving24hrMovementTarget(achievedCount);
    };

    const getLast7DaysTotalDailySteps = async (terraIds: any) => {
        let requestBody: TerraWearables = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "day",
            "startDate": format(subDays(new Date(), 7), "yyyy-MM-dd"),
            "endDate": format(subDays(new Date(), 1), "yyyy-MM-dd"),
            "returnType": "total"
        };
        let wearablesData = await getWearablesData(requestBody);
        setLast7DaysTotalDailySteps(wearablesData?.data ?? []);
    };

    const getLeagueTableSteps = async (terraIds: any, organization: any) => {
        let requestBody: TerraWearables = {
            "idList": terraIds,
            "grouping": "user",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "total"
        };
        let wearablesData = await getWearablesData(requestBody);
        wearablesData?.data?.sort((a: any, b: any) => b.value - a.value);
        setLeagueTableSteps(wearablesData?.data?.slice(0, 20).map((item: any) => ({name: nameForTerraId(item.terraId, organization), value: item.value})) ?? []);
    };

    const getResults = async () => {
        setLoading(true);
        let result: any = null;
        if (selectedClassroom == null) {
            // all classrooms
            result = await API.graphql(graphqlOperation(queryAllClassrooms, {id: organizationId}));
        }
        else {
            // specific classroom
            result = await API.graphql(graphqlOperation(queryClassroom, {
                id: organizationId,
                cid: selectedClassroom.id
            }));
        }
        let theOrganization = result.data.getOrganization;
        let terraIds = terraIdsForClassrooms(theOrganization);
        setParticipants(usersForClassrooms(theOrganization).length);
        setConnectedMembers(terraIds.length);
        await getYesterdaysSteps(terraIds);
        await getTotalSteps(terraIds);
        await getAverageDailySteps(terraIds);
        await getTargets(terraIds);
        await getLast7DaysTotalDailySteps(terraIds);
        await getLeagueTableSteps(terraIds, theOrganization);
        setOrganization(theOrganization);
        setLoading(false);
    };

    const reset = async () => {
        setSelectableClassrooms(null);
        setSelectedClassroom(null);
        setSelectedPeriod('week');
        setStartDate(subDays(new Date(), 7));
        setEndDate(subDays(new Date(), 1));
        setLoading(false);
        setOrganization(null);

        setParticipants(null);
        setConnectedMembers(null);
        setYesterdaysSteps(null);
        setTotalSteps(null);
        setAverageDailySteps(null);
        setStepsTargetData(null);
        setSleepTargetData(null);
        setActivityTargetData(null);
        setAchieving24hrMovementTarget(null);
        setLast7DaysTotalDailySteps(null);
        setLeagueTableSteps(null);
    };

    const terraIdsForClassrooms = (organization: Organization) => {
        // get terra ids
        let terraIds: string[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let members = classroom.members.items;
            members.forEach((member: any) => {
                let terraId: string = member.userInOrganization.user.terraId;
                if (terraId != null) terraIds.push(terraId);
            });
        });
        // remove duplicates
        return Array.from(new Set(terraIds));
    };

    const connectedUsersForClassrooms = (organization: Organization) => {
        let users: User[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let members = classroom.members.items;
            members.forEach((member: any) => {
                let theUser = member.userInOrganization.user as User;
                if (theUser.terraId != null) {
                    let userExists = users.some((user: any) => user.terraId == theUser.terraId);
                    if (!userExists) {
                        users.push(theUser);
                    }
                }
            });
        });
        return users;
    };

    const usersForClassrooms = (organization: Organization) => {
        let users: User[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let members = classroom.members.items;
            members.forEach((member: any) => {
                let theUser = member.userInOrganization.user as User;
                let userExists = users.some((user: any) => user.id == theUser.id);
                if (!userExists) {
                    users.push(theUser);
                }
            });
        });
        return users;
    };

    const nameForTerraId = (terraId: any, organization: Organization) => {
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        for (let classroom of classrooms) {
            let members = classroom.members.items;
            for (let member of members) {
                let theUser = member.userInOrganization.user;
                if (theUser.terraId == terraId) {
                    return theUser.firstName + " " + theUser.lastName;
                }
            }
        }
        return "";
    };

    const getStepsTargetText = () => {
        let achievedCount = 0;
        stepsTargetData?.forEach((item: any) => {
            if (item.value >= stepsThreshold) achievedCount ++;
        });
        let percentage = 0;
        if (connectedMembers != null && connectedMembers > 0) {
            percentage = (achievedCount / connectedMembers) * 100;
        }
        return achievedCount.toLocaleString() + " (" + Math.floor(percentage) + "%)";
    };

    const getSleepTargetText = () => {
        let achievedCount = 0;
        sleepTargetData?.forEach((item: any) => {
            if (item.value >= sleepThreshold) achievedCount ++;
        });
        let percentage = 0;
        if (connectedMembers != null && connectedMembers > 0) {
            percentage = (achievedCount / connectedMembers) * 100;
        }
        return achievedCount.toLocaleString() + " (" + Math.floor(percentage) + "%)";
    };

    const getActivityTargetText = () => {
        let achievedCount = 0;
        activityTargetData?.forEach((item: any) => {
            if (item.value >= activityThreshold) achievedCount ++;
        });
        let percentage = 0;
        if (connectedMembers != null && connectedMembers > 0) {
            percentage = (achievedCount / connectedMembers) * 100;
        }
        return achievedCount.toLocaleString() + " (" + Math.floor(percentage) + "%)";
    };

    const getAchieving24hrMovementTargetText = () => {
        let percentage = 0;
        if (achieving24hrMovementTarget != null && connectedMembers != null) {
            if (connectedMembers > 0) {
                percentage = (achieving24hrMovementTarget / connectedMembers) * 100;
            }
            return achieving24hrMovementTarget.toLocaleString() + " (" + Math.floor(percentage) + "%)";
        }
        else return "";
    };

    const handleClassroomChange = (event: SelectChangeEvent) => {
        setSelectedClassroom(selectableClassrooms?.find(item => item.id === event.target.value as string) ?? null);
    };

    const handleSelectedPeriodChange = (event: SelectChangeEvent) => {
        setSelectedPeriod(event.target.value as string);
        switch (event.target.value) {
            case 'week':
                setStartDate(subDays(new Date(), 7));
                setEndDate(subDays(new Date(), 1));
                break;
            case 'month':
                setStartDate(subDays(new Date(), 31));
                setEndDate(subDays(new Date(), 1));
                break;
            case 'term':
                setStartDate(subMonths(new Date(), 3));
                setEndDate(subDays(new Date(), 1));
                break;
            case 'year':
                setStartDate(subYears(new Date(), 1));
                setEndDate(subDays(new Date(), 1));
                break;
        }
    };

    const applyButtonClick = () => {
        getResults();
    };

    const resetButtonClick = () => {
        reset();
        loadSelectableClassrooms();
    };

    useEffect(() => {
        loadSelectableClassrooms();
        getResults();
        return () => {};
    }, []);

    return (
        <Page title="General: Analytics">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h4" sx={{mb: 5}}>
                    Hi, {user?.firstName}, welcome back!
                </Typography>
                <Grid container spacing={3}>
                    {selectableClassrooms &&
                        <Grid item xs={12}>
                            <Stack direction={{xs: 'column', sm: 'row'}} spacing={3}>
                                <FormControl sx={{minWidth: 150}}>
                                    <InputLabel id="demo-simple-team-select">Team</InputLabel>
                                    <Select
                                        labelId="demo-simple-team-select"
                                        id="demo-simple-team-select-id"
                                        value={selectedClassroom?.id ?? "all"}
                                        label="Team"
                                        onChange={handleClassroomChange}
                                    >
                                        <MenuItem value="all">
                                            <em>All</em>
                                        </MenuItem>
                                        {selectableClassrooms?.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{minWidth: 150}}>
                                    <InputLabel id="demo-simple-select-label">Period</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedPeriod}
                                        label="Period"
                                        onChange={handleSelectedPeriodChange}
                                    >
                                        {/*
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        */}
                                        <MenuItem value={'week'}>Week</MenuItem>
                                        <MenuItem value={'month'}>Month</MenuItem>
                                        <MenuItem value={'term'}>Quarter</MenuItem>
                                        <MenuItem value={'year'}>Year</MenuItem>
                                    </Select>
                                </FormControl>
                                <DatePicker
                                    label="Start Date"
                                    // @ts-ignore
                                    renderInput={(params) => <TextField style={{minWidth: 200}} {...params} />}
                                    value={startDate}
                                    onChange={(newValue: any) => {
                                        setStartDate(newValue);
                                    }}
                                    inputFormat={"dd MMM yyyy"}
                                />
                                <DatePicker
                                    label="End Date"
                                    // @ts-ignore
                                    renderInput={(params) => <TextField style={{minWidth: 200}} {...params} />}
                                    value={endDate}
                                    onChange={(newValue: any) => {
                                        setEndDate(newValue);
                                    }}
                                    inputFormat={"dd MMM yyyy"}
                                />
                                <LoadingButton loading={loading} variant={'contained'}
                                               onClick={() => applyButtonClick()}>Apply</LoadingButton>
                                <LoadingButton loading={false} variant={'contained'} color={'secondary'}
                                               onClick={() => resetButtonClick()}>Reset</LoadingButton>
                            </Stack>
                        </Grid>
                    }

                    <Grid item xs={12} container justifyContent={'space-evenly'} alignItems={'flex-end'} spacing={3} style={{marginTop:10}}>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {participants != null ?
                                <Card style={{backgroundColor: '#eeffee', border: '4px solid green', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Participants</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{participants.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {connectedMembers != null ?
                                <Card style={{backgroundColor: '#ffeeee', border: '4px solid red', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Connected</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{connectedMembers.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {yesterdaysSteps != null ?
                                <Card style={{backgroundColor: '#ffffee', border: '4px solid #ff7700', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Yesterdays' Steps</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{yesterdaysSteps.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} container justifyContent={'space-evenly'} alignItems={'flex-end'} spacing={3} style={{marginTop:10}}>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {totalSteps != null ?
                                <Card style={{backgroundColor: '#ffffee', border: '4px solid #ff7700', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Total Steps</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{totalSteps.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {averageDailySteps != null ?
                                <Card style={{backgroundColor: '#eeffff', border: '4px solid #009999', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Average Daily Steps</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{Math.floor(averageDailySteps).toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {stepsTargetData != null && connectedMembers != null ?
                                <Card style={{backgroundColor: '#eeeeff', border: '4px solid blue', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Steps Target</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{getStepsTargetText()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} container justifyContent={'space-evenly'} alignItems={'flex-end'} spacing={3} style={{marginTop:10}}>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {sleepTargetData != null && connectedMembers != null ?
                                <Card style={{backgroundColor: '#ffeeee', border: '4px solid red', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Sleep Target</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{getSleepTargetText()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {activityTargetData != null && connectedMembers != null ?
                                <Card style={{backgroundColor: '#ffeeff', border: '4px solid violet', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Active Target</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{getActivityTargetText()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {achieving24hrMovementTarget != null && connectedMembers != null ?
                                <Card style={{backgroundColor: '#eeffee', border: '4px solid green', height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>24 hr Movement Target</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{getAchieving24hrMovementTargetText()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'160px'}/>
                            }
                        </Grid>

                    </Grid>

                    {organization &&
                        <Grid item xs={12} style={{marginTop:10}}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Iconify icon={'ic:baseline-expand-more'} sx={{width: 40, height: 40}}/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Connected Members</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{width: '100%', display: 'flex'}}>
                                        <DataGrid
                                            rows={connectedUsersForClassrooms(organization)}
                                            disableSelectionOnClick
                                            columns={columns}
                                            autoHeight={true}
                                        />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        {leagueTableSteps != null ?
                            <StepsLeagueBarChart data={leagueTableSteps} />
                            :
                            <Skeleton height={'350px'}/>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        {last7DaysTotalDailySteps != null ?
                            <StepsDailyBarChart data={last7DaysTotalDailySteps}/>
                            :
                            <Skeleton height={'760px'}/>
                        }
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
};

export default WearablesDashboard;
