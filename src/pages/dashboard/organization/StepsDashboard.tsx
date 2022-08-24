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

const StepsDashboard = () => {

    const {themeStretch} = useSettings();
    const {user} = useAuth();
    const {organizationId} = useParams();
    const [selectableClassrooms, setSelectableClassrooms] = useState<Classroom[] | null>(null);

    const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [startDate, setStartDate] = React.useState<Date>(subDays(new Date(), 6));
    const [endDate, setEndDate] = React.useState<Date>(new Date());
    const [loading, setLoading] = useState(false);

    const [organization, setOrganization] = useState<Organization | null>(null);

    const [numberOfMembers, setNumberOfMembers] = useState<number | null>(null);
    const [todaysSteps, setTodaysSteps] = useState<number | null>(null);
    const [totalSteps, setTotalSteps] = useState<number | null>(null);
    const [achievingStepsTarget, setAchievingStepsTarget] = useState<number | null>(null);
    const [averageDailySteps, setAverageDailySteps] = useState<number | null>(null);
    const [schoolAverage, setSchoolAverage] = useState<number | null>(null);
    const [last7DaysAverageDailySteps, setLast7DaysAverageDailySteps] = useState<any[] | null>(null);

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
        let terraIds = terraIdsForClassrooms(result.data.getOrganization);
        // set number of members (sum the number of members in each class)
        let classrooms: any[] = result?.data?.getOrganization?.Classrooms?.items ?? [];
        let memberSum = 0;
        classrooms.forEach((classroom: any) => memberSum += classroom.members.items.length);
        setNumberOfMembers(memberSum);
        // set todays' steps
        let requestBody: TerraWearables = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(new Date(), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "total"
        };
        let wearablesData = await getWearablesData(requestBody);
        setTodaysSteps(wearablesData?.data[0]?.value ?? 0);
        // set total steps
        requestBody = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "total"
        };
        wearablesData = await getWearablesData(requestBody);
        setTotalSteps(wearablesData?.data[0]?.value ?? 0);
        // set achieving steps target (get average daily steps for each user, then determine the percentage that are achieving their steps target)
        requestBody = {
            "idList": terraIds,
            "grouping": "user",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "average"
        };
        wearablesData = await getWearablesData(requestBody);
        let userAverageDailySteps = wearablesData?.data ?? [];
        if (userAverageDailySteps.length == 0) {
            setAchievingStepsTarget(0);
        }
        else {
            let achievedCount = 0;
            userAverageDailySteps.forEach((item: any) => {
                if (item.value >= 10000) achievedCount++;
            });
            setAchievingStepsTarget((achievedCount / userAverageDailySteps.length) * 100);
        }
        // set average daily steps
        requestBody = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "average"
        };
        wearablesData = await getWearablesData(requestBody);
        setAverageDailySteps(wearablesData?.data[0]?.value ?? 0);
        // set school average (get terra ids for all classrooms, then get the average)
        let allResult: any = await API.graphql(graphqlOperation(queryAllClassrooms, {id: organizationId}));
        let allTerraIds = terraIdsForClassrooms(allResult.data.getOrganization);
        requestBody = {
            "idList": allTerraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(startDate, "yyyy-MM-dd"),
            "endDate": format(endDate, "yyyy-MM-dd"),
            "returnType": "average"
        };
        wearablesData = await getWearablesData(requestBody);
        setSchoolAverage(wearablesData?.data[0]?.value ?? 0);
        // set last seven days average daily steps
        requestBody = {
            "idList": terraIds,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "day",
            "startDate": format(subDays(new Date(), 6), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "average"
        };
        wearablesData = await getWearablesData(requestBody);
        setLast7DaysAverageDailySteps(wearablesData?.data ?? []);

        setOrganization(result.data.getOrganization);
        setLoading(false);
    };

    const reset = async () => {
        setSelectableClassrooms(null);
        setSelectedClassroom(null);
        setSelectedPeriod('week');
        setStartDate(subDays(new Date(), 6));
        setEndDate(new Date());
        setLoading(false);
        setOrganization(null);

        setNumberOfMembers(null);
        setTodaysSteps(null);
        setTotalSteps(null);
        setAchievingStepsTarget(null);
        setAverageDailySteps(null);
        setSchoolAverage(null);
        setLast7DaysAverageDailySteps(null);
    };

    const terraIdsForClassrooms = (organization: Organization) => {
        let terraIds: string[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let members = classroom.members.items;
            members.forEach((member: any) => {
                let terraId: string = member.userInOrganization.user.terraId;
                if (terraId != null) terraIds.push(terraId);
            });
        });
        return terraIds;
    };

    const connectedUsersForClassrooms = (organization: Organization) => {
        let users: User[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let members = classroom.members.items;
            members.forEach((member: any) => {
                let theUser = member.userInOrganization.user as User;
                if (theUser.terraId != null) {
                    users.push(theUser);
                }
            });
        });
        return users;
    };

    const namesForClassrooms = (organization: Organization) => {
        let names: string[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let members = classroom.members.items;
            members.forEach((member: any) => {
                let name: string = member.userInOrganization.user.firstName + " " + member.userInOrganization.user.lastName;
                names.push(name);
            });
        });
        return names;
    };

    const handleClassroomChange = (event: SelectChangeEvent) => {
        setSelectedClassroom(selectableClassrooms?.find(item => item.id === event.target.value as string) ?? null);
    };

    const handleSelectedPeriodChange = (event: SelectChangeEvent) => {
        setSelectedPeriod(event.target.value as string);
        switch (event.target.value) {
            case 'week':
                setStartDate(subDays(new Date(), 6));
                setEndDate(new Date());
                break;
            case 'month':
                setStartDate(subDays(new Date(), 30));
                setEndDate(new Date());
                break;
            case 'term':
                setStartDate(subMonths(new Date(), 3));
                setEndDate(new Date());
                break;
            case 'year':
                setStartDate(subYears(new Date(), 1));
                setEndDate(new Date());
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
                                        <MenuItem value={'week'}>7 Days</MenuItem>
                                        <MenuItem value={'month'}>30 Days</MenuItem>
                                        <MenuItem value={'term'}>3 Months</MenuItem>
                                        <MenuItem value={'year'}>1 Year</MenuItem>
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
                            {numberOfMembers != null ?
                                <Card style={{backgroundColor:'#ffeeee', border:'4px solid red'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Number of Members</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{numberOfMembers.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {todaysSteps != null ?
                                <Card style={{backgroundColor:'#ffffee', border:'4px solid #ff7700'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Todays' Steps</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{todaysSteps.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {totalSteps != null ?
                                <Card style={{backgroundColor:'#eeffee', border:'4px solid green'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Total Steps</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{totalSteps.toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} container justifyContent={'space-evenly'} alignItems={'flex-end'} spacing={3} style={{marginTop:10}}>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {achievingStepsTarget != null ?
                                <Card style={{backgroundColor:'#eeeeff', border:'4px solid blue'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Achieving Steps Target</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{Math.floor(achievingStepsTarget) + " %"}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {averageDailySteps != null ?
                                <Card style={{backgroundColor:'#eeffff', border:'4px solid #009999'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Average Daily Steps</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{Math.floor(averageDailySteps).toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {schoolAverage != null ?
                                <Card style={{backgroundColor:'#ffeeff', border:'4px solid violet'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>School Average</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{Math.floor(schoolAverage).toLocaleString()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
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
                        {last7DaysAverageDailySteps != null ?
                            <StepsDailyBarChart data={last7DaysAverageDailySteps}/>
                            :
                            <Skeleton height={'760px'}/>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        {last7DaysAverageDailySteps != null ?
                            <StepsLeagueBarChart/>
                            :
                            <Skeleton height={'760px'}/>
                        }
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
};

export default StepsDashboard;
