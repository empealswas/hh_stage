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
import {compareAsc, format, parseISO, subDays, subMonths, subYears} from "date-fns";
import {LoadingButton} from "@mui/lab";
import {BankingWidgetSummary} from "../../../sections/@dashboard/general/banking";
import {values} from "lodash";
import TopUsersByRewardsBarchart from "./dashboard/TopUsersByRewardsBarchart";
import { getAverageDailySleepSeconds, getAverageDailyActivitySeconds, getAverageDailySteps } from "../../../apiFunctions/apiFunctions";

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

const queryAllClassroomsWithAllLessons = `query MyQuery($id: ID = "") {
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
                terraId
              }
            }
          }
        }
        LessonRecords(limit: 1000000, filter: {isCompleted: {eq: true}}) {
          items {
            date
            id
            duration
            activity
            rating
            Attendances(limit: 10000000, filter: {present: {eq: true}}) {
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

const queryClassroomWithAllLessons = `query MyQuery($id: ID = "", $cid: ID = "") {
  getOrganization(id: $id) {
    Classrooms(limit: 1000000, filter: {id: {eq: $cid}}) {
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
        LessonRecords(limit: 1000000, filter: {isCompleted: {eq: true}}) {
          items {
            date
            id
            duration
            activity
            rating
            Attendances(limit: 10000000, filter: {present: {eq: true}}) {
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

const queryAllClassroomsWithLessonsInTimePeriod = `query MyQuery($id: ID = "", $gt: String = "", $lt: String = "") {
  getOrganization(id: $id) {
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
        LessonRecords(limit: 10000000, filter: {date: {gt: $gt, lt: $lt}, isCompleted: {eq: true}}) {
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

const queryClassroomWithLessonsInTimePeriod = `query MyQuery($id: ID = "", $cid: ID = "", $gt: String = "", $lt: String = "") {
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
        LessonRecords(limit: 10000000, filter: {date: {gt: $gt, lt: $lt}, isCompleted: {eq: true}}) {
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
    const [selectedPeriod, setSelectedPeriod] = useState('none');
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [loading, setLoading] = useState(false);

    const [organization, setOrganization] = useState<Organization | null>(null);

    const [averageDailySleep, setAverageDailySleep] = useState<number | null>(null);
    const [averageSedentaryTime, setAverageSedentaryTime] = useState<number | null>(null);
    const [achievingStepsTarget, setAchievingStepsTarget] = useState<number | null>(null);

    const loadSelectableClassrooms = async () => {
        const result: any = await API.graphql(graphqlOperation(querySelectableClassrooms, {id: organizationId}));
        let classrooms: any[] = result.data.getOrganization?.Classrooms?.items;
        setSelectableClassrooms(classrooms.sort((a, b) => a.name.localeCompare(b.name)));
    };

    const reset = () => {
        setSelectableClassrooms(null);
        setSelectedClassroom(null);
        setSelectedPeriod('none');
        setStartDate(null);
        setEndDate(null);
        setLoading(false);
        setOrganization(null);
        setAverageDailySleep(null);
        setAverageSedentaryTime(null);
        setAchievingStepsTarget(null);
    };

    const terraIdsForClassrooms = (organization: Organization) => {
        let terraIds: any[] = [];
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        classrooms.forEach((classroom: any) => {
            let members = classroom.members.items;
            members.forEach((member: any) => {
                let terraId = member.userInOrganization.user.terraId;
                if (terraId != null) terraIds.push(terraId);
            });
        });
        return terraIds;
    };

    const numberOfMembers = () => {
        //sum the number of members in each class
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        let memberSum = 0;
        classrooms.forEach((classroom: any) => memberSum += classroom.members.items.length);
        return memberSum;
    };

    const numberOfActivities = () => {
        // sum the number of PELessonRecords in each class
        let classrooms: any[] = organization?.Classrooms?.items ?? [];
        let activitiesSum = 0;
        classrooms.forEach((classroom: any) => activitiesSum += classroom.LessonRecords.items.length);
        return activitiesSum;
    };

    const totalActivityTime = () => {
        // sum the duration * attendances in each PELessonRecord in each class
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
            let userCredentials = groupByUser[name].items[0].UserInOrganization.user;
            usersByTrophies.push({
                user: userCredentials?.firstName + " " + userCredentials?.lastName,
                attendances: groupByUser[name].items.filter((item: any) => item?.wasRewarded ?? false)
            });
        }
        return usersByTrophies.sort((a, b) =>  b.attendances.length - a.attendances.length).slice(0, 5);
    };

    const handleClassroomChange = (event: SelectChangeEvent) => {
        setSelectedClassroom(selectableClassrooms?.find(item => item.id === event.target.value as string) ?? null);
    };

    const handleSelectedPeriodChange = (event: SelectChangeEvent) => {
        setSelectedPeriod(event.target.value as string);
        switch (event.target.value) {
            case 'week':
                setStartDate(subDays(new Date(), 7));
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
            case 'none':
                setStartDate(null);
                setEndDate(null);
        }
    };

    const applyButtonClick = async () => {
        setLoading(true);
        let result: any = null;
        if (selectedClassroom == null) {
            // all classrooms
            if (!startDate || !endDate) {
                // all time
                result = await API.graphql(graphqlOperation(queryAllClassroomsWithAllLessons, {id: organizationId}));
            }
            else {
                // time period
                result = await API.graphql(graphqlOperation(queryAllClassroomsWithLessonsInTimePeriod, {
                    id: organizationId,
                    gt: format(startDate, 'yyyy-MM-dd'),
                    lt: format(endDate, 'yyyy-MM-dd')
                }));
            }
        }
        else {
            // specific classroom
            if (!startDate || !endDate) {
                // all time
                result = await API.graphql(graphqlOperation(queryClassroomWithAllLessons, {
                    id: organizationId,
                    cid: selectedClassroom.id
                }));
            }
            else {
                // time period
                result = await API.graphql(graphqlOperation(queryClassroomWithLessonsInTimePeriod, {
                    id: organizationId,
                    cid: selectedClassroom.id,
                    gt: format(startDate, 'yyyy-MM-dd'),
                    lt: format(endDate, 'yyyy-MM-dd')
                }));
            }
        }
        let terraIds = terraIdsForClassrooms(result.data.getOrganization);
        let theAverageDailySleepSeconds = await getAverageDailySleepSeconds(terraIds, startDate, endDate);
        let theAverageDailyActivitySeconds = await getAverageDailyActivitySeconds(terraIds, startDate, endDate);
        let theAverageDailySteps = await getAverageDailySteps(terraIds, startDate, endDate);
        setAverageDailySleep(theAverageDailySleepSeconds / 3600);
        setAverageSedentaryTime((86400 - theAverageDailySleepSeconds - theAverageDailyActivitySeconds) / 3600);
        if (theAverageDailySteps.length == 0) {
            setAchievingStepsTarget(0);
        }
        else {
            let achievedCount = 0;
            theAverageDailySteps.forEach((item: any) => {
                if (item.value >= 10000) achievedCount++;
            });
            setAchievingStepsTarget((achievedCount / theAverageDailySteps.length) * 100);
        }
        setOrganization(result.data.getOrganization);
        setLoading(false);
    };

    const resetButtonClick = () => {
        reset();
        loadSelectableClassrooms();
    };

    useEffect(() => {
        reset();
        loadSelectableClassrooms();
        return () => {};
    }, [organizationId]);

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
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'week'}>7 Days</MenuItem>
                                        <MenuItem value={'month'}>30 Days</MenuItem>
                                        <MenuItem value={'term'}>3 Months</MenuItem>
                                        <MenuItem value={'year'}>1 Year</MenuItem>
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        // @ts-ignore
                                        renderInput={(params) => <TextField style={{minWidth: 200}} {...params} />}
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="End Date"
                                        // @ts-ignore
                                        renderInput={(params) => <TextField style={{minWidth: 200}} {...params} />}
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                    />

                                </LocalizationProvider>
                                <LoadingButton loading={loading} variant={'contained'}
                                               onClick={applyButtonClick}>Apply</LoadingButton>
                                <LoadingButton loading={false} variant={'contained'} color={'secondary'}
                                               onClick={resetButtonClick}>Reset</LoadingButton>
                            </Stack>
                        </Grid>
                    }

                    <Grid item xs={12} container justifyContent={'space-evenly'} alignItems={'flex-end'} spacing={3} style={{marginTop:10}}>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {organization != null ?
                                <Card style={{backgroundColor:'#ffeeee', border:'4px solid red'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Number of Members</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{numberOfMembers()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'300px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {organization != null ?
                                <Card style={{backgroundColor:'#ffffee', border:'4px solid #ff7700'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Number of Activities</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{numberOfActivities()}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'300px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {organization != null ?
                                <Card style={{backgroundColor:'#eeffee', border:'4px solid green'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Total Activity Time</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{totalActivityTime() + " mins"}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'300px'}/>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} container justifyContent={'space-evenly'} alignItems={'flex-end'} spacing={3} style={{marginTop:10}}>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {achievingStepsTarget != null ?
                                <Card style={{backgroundColor:'#eeeeff', border:'4px solid blue'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Achieving Steps Target</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{achievingStepsTarget.toFixed(2) + " %"}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'300px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {averageDailySleep != null ?
                                <Card style={{backgroundColor:'#eeffff', border:'4px solid #009999'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Average Daily Sleep</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{averageDailySleep.toFixed(2) + " hrs"}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'300px'}/>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            {averageSedentaryTime != null ?
                                <Card style={{backgroundColor:'#ffeeff', border:'4px solid violet'}}>
                                    <CardContent>
                                        <Typography variant={'h5'} textAlign={'center'}>Average Sedentary Time</Typography>
                                        <Typography variant={'h3'} textAlign={'center'}>{averageSedentaryTime.toFixed(2) + " hrs"}</Typography>
                                    </CardContent>
                                </Card>
                                :
                                <CardSkeleton height={'300px'}/>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12}>
                        {organization != null ?
                            <ActivityOrganizationBarchart organization={organization}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>

                    <Grid item xs={12}>
                        {organization != null ?
                            <TopUsersByRewardsBarchart data={usersByRewards()}/>
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
