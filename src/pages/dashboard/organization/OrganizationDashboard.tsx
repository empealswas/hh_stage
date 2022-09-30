import React, {useEffect, useMemo, useState} from 'react';
import Page from "../../../components/Page";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, Card, CardContent} from "@mui/material";
import CardSkeleton from "../../../components/skeleton/CardSkeleton";
import useSettings from 'src/hooks/useSettings';
import useAuth from "../../../hooks/useAuth";
import AnalyticsWidgetSummary from 'src/sections/@dashboard/general/analytics/AnalyticsWidgetSummary';
import {Attendance, Classroom, Lesson, Organization, PELessonRecord, UserInOrganization} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import ActivityOrganizationBarchart from "./dashboard/ActivityOrganizationBarchart";
import ActivtityChartSkeleton from "../../../components/skeleton/ActivtityChartSkeleton";
import {collect, Collection} from "collect.js";
import ActivityOrganizationLineChart from "./dashboard/ActivityOrganizationLineChart";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {compareAsc, format, parseISO, subDays, subMonths, subYears, differenceInCalendarDays} from "date-fns";
import {LoadingButton} from "@mui/lab";
import {BankingWidgetSummary} from "../../../sections/@dashboard/general/banking";
import {values} from "lodash";
import TotalActivitiesBarchart from "./dashboard/TotalActivitiesBarchart";

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

const queryAllClassrooms = `query MyQuery($id: ID = "", $ge: String = "", $le: String = "") {
  getOrganization(id: $id) {
    members(limit: 10000000) {
      items {
        userID
      }
    }
    Classrooms(sortDirection: ASC) {
      items {
        id
        name
        members {
          items {
            id
            userInOrganization {
              user {
                terraId
              }
            }
          }
        }
        LessonRecords(limit: 10000000, filter: {date: {ge: $ge, le: $le}, isCompleted: {eq: true}}) {
          items {
            date
            id
            duration
            activity
            rating
            Attendances(filter: {present: {eq: true}}, limit: 10000000) {
              items {
                id
                wasRewarded
                userInOrganizationAttendancesId
                UserInOrganization {
                  user {
                    lastName
                    firstName
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const queryClassroom = `query MyQuery($id: ID = "", $cid: ID = "", $ge: String = "", $le: String = "") {
  getOrganization(id: $id) {
    Classrooms(sortDirection: ASC, limit: 1000000, filter: {id: {eq: $cid}}) {
      items {
        id
        name
        members {
          items {
            id
            userInOrganization {
              user {
                terraId
              }
            }
          }
        }
        LessonRecords(limit: 10000000, filter: {date: {ge: $ge, le: $le}, isCompleted: {eq: true}}) {
          items {
            date
            id
            duration
            activity
            rating
            Attendances(filter: {present: {eq: true}}, limit: 10000000) {
              items {
                id
                wasRewarded
                userInOrganizationAttendancesId
                UserInOrganization {
                  user {
                    lastName
                    firstName
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

const OrganizationDashboard = () => {

    const {themeStretch} = useSettings();
    const {user} = useAuth();
    const {organizationId} = useParams();
    const [selectableClassrooms, setSelectableClassrooms] = useState<Classroom[] | null>(null);

    const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [startDate, setStartDate] = React.useState<Date | null>(subDays(new Date(), 6));
    const [endDate, setEndDate] = React.useState<Date | null>(new Date());
    const [loading, setLoading] = useState(false);
    const [numberOfWeeks, setNumberOfWeeks] = useState(0);

    const [allClassrooms, setAllClassrooms] = useState<Classroom[] | null>(null);
    const [organization, setOrganization] = useState<Organization | null>(null);


    const loadSelectableClassrooms = async () => {
        const result: any = await API.graphql(graphqlOperation(querySelectableClassrooms, {id: organizationId}));
        let classrooms: any[] = result.data.getOrganization?.Classrooms?.items;
        setSelectableClassrooms(classrooms.sort((a, b) => a.name.localeCompare(b.name)));
    };

    const getResults = async () => {
        setLoading(true);
        let numberOfDays = differenceInCalendarDays(endDate as Date, startDate as Date) + 1;
        setNumberOfWeeks(numberOfDays / 7);
        let result: any = null;
        if (selectedClassroom == null) {
            // all classrooms
            result = await API.graphql(graphqlOperation(queryAllClassrooms, {
                id: organizationId,
                ge: format(startDate as Date, 'yyyy-MM-dd'),
                le: format(endDate as Date, 'yyyy-MM-dd')
            }));
            setAllClassrooms(result?.data?.getOrganization?.Classrooms?.items ?? []);
        }
        else {
            // specific classroom
            result = await API.graphql(graphqlOperation(queryClassroom, {
                id: organizationId,
                cid: selectedClassroom.id,
                ge: format(startDate as Date, 'yyyy-MM-dd'),
                le: format(endDate as Date, 'yyyy-MM-dd')
            }));
        }
        setOrganization(result.data.getOrganization);
        setLoading(false);
    };

    const reset = () => {
        setSelectableClassrooms(null);
        setSelectedClassroom(null);
        setSelectedPeriod('week');
        setStartDate(subDays(new Date(), 6));
        setEndDate(new Date());
        setLoading(false);
        setOrganization(null);
    };

    const numberOfMembers = () => {
        if (selectedClassroom == null) {
            return organization?.members?.items?.length ?? 0;
        }
        else {
            return organization?.Classrooms?.items[0]?.members?.items?.length ?? 0;
        }
    };

    const numberOfActivities = () => {
        // sum the number of LessonRecords in each class
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        let activitiesSum = 0;
        classrooms.forEach((classroom: any) => activitiesSum += classroom.LessonRecords.items.length);
        return activitiesSum;
    };

    const totalActivityTime = () => {
        // sum the duration * attendances in each LessonRecord in each class
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        let totalActivityTimeSum = 0;
        classrooms.forEach((classroom: any) => {
            let lessonRecords = classroom.LessonRecords.items;
            lessonRecords.forEach((lessonRecord: any) => {
                totalActivityTimeSum += lessonRecord.duration * lessonRecord.Attendances.items.length;
            });
        });
        return totalActivityTimeSum;
    };

    const averageWeeklyParticipation = () => {
        // get average member time
        let memberCount = numberOfMembers();
        let averageMemberTime = 0;
        if (memberCount > 0) {
            averageMemberTime = totalActivityTime() / memberCount;
        }
        return averageMemberTime / numberOfWeeks;
    };

    /*
    const usersByRewards = () => {
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        const lessonRecords = classrooms.flatMap(value => value?.LessonRecords?.items).sort((a, b) => {
            if (!a || !b) return 0;
            else return compareAsc(parseISO(a?.date), parseISO(b?.date));
        });
        const groupByDate: any = collect(lessonRecords).groupBy(item => item?.date).all();
        const groupByUser: any = collect(lessonRecords?.flatMap(lessonRecord => lessonRecord?.Attendances?.items))
            .groupBy((item: any) => item?.userInOrganizationAttendancesId)
            .all();
        const usersByTrophies = [];
        for (const name in groupByUser) {
            let userCredentials = groupByUser[name].items[0].UserInOrganization?.user ?? null;
            if (userCredentials != null) {
                usersByTrophies.push({
                    user: userCredentials?.firstName + " " + userCredentials?.lastName,
                    attendances: groupByUser[name].items.filter((item: any) => item?.wasRewarded ?? false)
                });
            }
        }
        return usersByTrophies.sort((a, b) =>  b.attendances.length - a.attendances.length).slice(0, 5);
    };
    */

    const totalActivities = () => {
        // increment the total for each LessonRecord in each classroom
        let activities: any[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let lessonRecords = classroom.LessonRecords.items;
            lessonRecords.forEach((lessonRecord: any) => {
                // if lesson title exists in activities, then increment the activity total for this title
                let title = lessonRecord.activity;
                let exists = false;
                for (let activity of activities) {
                    if (activity.title == title) {
                        activity.total += 1;
                        exists = true;
                        break;
                    }
                }
                // if lesson title does not exist, then push a new activity
                if (!exists) activities.push({title, total: 1});
            });
        });
        return activities;
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
                                    onChange={(newValue) => {
                                        setStartDate(newValue);
                                    }}
                                    inputFormat={"dd MMM yyyy"}
                                />
                                <DatePicker
                                    label="End Date"
                                    // @ts-ignore
                                    renderInput={(params) => <TextField style={{minWidth: 200}} {...params} />}
                                    value={endDate}
                                    onChange={(newValue) => {
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

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            {organization != null ?
                                <Card style={{backgroundColor:'#ffeeee', border:'4px solid red'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Participants</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{numberOfMembers()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            {organization != null ?
                                <Card style={{backgroundColor:'#ffffee', border:'4px solid #ff7700'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Activities</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{numberOfActivities()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} container justifyContent={'space-evenly'} alignItems={'flex-end'} spacing={3} style={{marginTop:10}}>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            {organization != null ?
                                <Card style={{backgroundColor:'#eeffee', border:'4px solid green'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Total Activity Time</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{totalActivityTime().toLocaleString() + " mins"}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            {organization != null ?
                                <Card style={{backgroundColor:'#ffeeff', border:'4px solid #bb00bb'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Average Weekly Participation</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{Math.floor(averageWeeklyParticipation()) + " mins, (" + Math.floor((averageWeeklyParticipation() / 120) * 100) + "%)"}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'135px'}/>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} style={{marginTop:30}}>
                        {organization != null ?
                            <ActivityOrganizationBarchart organization={organization}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        {organization != null ?
                            <TotalActivitiesBarchart data={totalActivities()}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
};

export default OrganizationDashboard;
