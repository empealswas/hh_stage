import React, {useEffect, useMemo, useState} from 'react';
import Page from "../../../components/Page";
import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
    Card,
    CardHeader,
    CardContent
} from "@mui/material";
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

const query = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    Classrooms {
      items {
        id
        name
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
}
`

const advancedQueryAllClassrooms = `query MyQuery($id: ID = "", $gt: String = "", $lt: String = "") {
  getOrganization(id: $id) {
    Classrooms(sortDirection: ASC) {
      items {
        id
        name
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
  }
`
const participantsQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    members(limit: 10000000) {
      items {
        Attendances(limit: 1) {
          items {
            present
            Lesson {
              id
            }
          }
        }
      }
    }
  }
}

`
type DashboardValues = {
    trainingSessionsData?: number[];
    participantsData?: number[];
    totalParticipants?: number;
    durationData?: number[];
    totalDuration?: number;
    totalTrainingQuality?: number;
    qualityData?: number[];
    usersByRewards?: any[];
}
const OrganizationDashboard = () => {
    const {user} = useAuth();
    const {themeStretch} = useSettings();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [classrooms, setClassrooms] = useState<Classroom[] | null>(null);
    const {organizationId} = useParams();
    const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null);
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('none');
    const [participants, setParticipants] = useState<number | null>(null);

    const handleChange = (event: SelectChangeEvent) => {

        if (!event.target.value) {
            setSelectedClassroom(null);
            return;
        }
        setSelectedClassroom(classrooms?.find(item => item.id === event.target.value as string) ?? null)
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
    const getResultWithFilters = async () => {
        let organization: Organization;
        setOrganization(null);
        if (!startDate || !endDate) {
            const result: any = await API.graphql(graphqlOperation(query, {id: organizationId}))
            console.log(result)
            if (selectedClassroom) {
                organization = {
                    ...result.data.getOrganization,
                    Classrooms: {
                        items: result.data.getOrganization?.Classrooms.items.filter((item: any) => item.id === selectedClassroom.id),
                    },
                };
                console.log(organization);
            } else {
                organization = result.data.getOrganization;
            }
        } else {
            const result: any = await API.graphql(graphqlOperation(advancedQueryAllClassrooms, {
                id: organizationId,
                gt: format(startDate, 'yyyy-MM-dd'),
                lt: format(endDate, 'yyyy-MM-dd'),

            }));
            if (selectedClassroom) {
                organization = {
                    ...result.data.getOrganization,
                    Classrooms: {
                        items: result.data.getOrganization?.Classrooms.items.filter((item: any) => item.id === selectedClassroom.id),
                    },
                };
                console.log(organization);
            } else {
                organization = result.data.getOrganization;
            }
        }
        setOrganization(organization);
    };
    const reset = async () => {
        setSelectedClassroom(null);
        setStartDate(null);
        setEndDate(null);
        getOrganizationAsync();
    }
    const getOrganizationAsync = async () => {
        setOrganization(null);
        const result: any = await API.graphql(graphqlOperation(query, {id: organizationId}))
        console.log(result)
        setOrganization(result.data.getOrganization);
        setClassrooms(result.data.getOrganization?.Classrooms?.items);
    }
    useEffect(() => {

        getOrganizationAsync();
        const getParticipants = async () => {
            const result: any = await API.graphql(graphqlOperation(participantsQuery, {
                id: organizationId
            }));
            setParticipants(result.data.getOrganization?.members.items.filter((member: UserInOrganization) => member.Attendances?.items?.length ?? 0 > 0).length)
        }
        getParticipants();
        return () => {

        };
    }, [organizationId]);
    const lessonRecords = organization?.Classrooms?.items
        .flatMap(value => value?.LessonRecords?.items).sort((a, b) => {
            if (!a || !b) {
                return 0;
            } else {
                return compareAsc(parseISO(a?.date), parseISO(b?.date));
            }
        });

    const dashboardValues: DashboardValues = useMemo(() => {
        const values: DashboardValues = {};
        if (!organization) {
            return values;
        }
        const groupByDate: any = collect(lessonRecords).groupBy(item => item?.date).all();
        const groupByUser: any = collect(lessonRecords?.flatMap(lessonRecord => lessonRecord?.Attendances?.items))
            .groupBy((item: any) => item?.userInOrganizationAttendancesId)
            .all();
        console.log('group', groupByUser);
        const usersByTrophies = [];
        for (const name in groupByUser) {
            let userCredentials = groupByUser[name].items[0].UserInOrganization.user;
            usersByTrophies.push({
                user: userCredentials?.firstName + " " + userCredentials?.lastName,
                attendances: groupByUser[name].items.filter((item: any) => item?.wasRewarded ?? false),
            })
        }
        console.log(usersByTrophies);
        values.usersByRewards = usersByTrophies.sort((a, b) =>  b.attendances.length - a.attendances.length).slice(0, 5);

        console.log("Users" ,values.usersByRewards);

        console.log(groupByDate)
        const trainingSessionsData = [];
        const participants = [];
        let totalParticipants = 0;
        let totalDuration = 0;
        const durationsData = [];
        let totalQuality = 0;
        const qualityData = [];

        for (const amount in groupByDate) {

            let lessonRecords: PELessonRecord[] = groupByDate[amount]?.items;
            if (lessonRecords?.length) {
                trainingSessionsData.push(lessonRecords?.length);
            }
            let amountOfParticipants = 0;
            let durations = 0;
            let qualityAmount = 0;

            lessonRecords?.forEach((item: PELessonRecord) => {
                amountOfParticipants += item?.Attendances?.items?.length ?? 0;
                durations += item?.duration ?? 0;
                qualityAmount += item?.rating ?? 0;
            })
            qualityAmount = (qualityAmount / lessonRecords?.length ?? 1) * 20;

            qualityData.push(qualityAmount);
            totalParticipants += lessonRecords?.reduce((total: any, value: any) => total + value?.Attendances?.items?.length ?? 0, 0)
            totalDuration += lessonRecords?.reduce((total: any, value: any) => total + (value?.duration ?? 0) * (value.Attendances?.items?.length), 0)
            totalQuality += lessonRecords?.reduce((total: any, value: any) => total + value?.rating ?? 0, 0)
            participants.push(amountOfParticipants);
            durationsData.push(durations);
        }
        values.totalTrainingQuality = totalQuality / (lessonRecords?.length ?? 1) * 20;
        values.qualityData = qualityData;
        values.totalDuration = totalDuration;
        values.durationData = durationsData;
        values.trainingSessionsData = trainingSessionsData;
        values.totalParticipants = totalParticipants;
        values.participantsData = participants;

        return values;
    }, [organization]);

    return (
        <Page title="General: Analytics">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h4" sx={{mb: 5}}>
                    Hi, {user?.firstName}, welcome back!
                </Typography>
                <Grid container spacing={3}>
                    {classrooms &&
                        <Grid item xs={12}>
                            <Stack direction={{xs: 'column', sm: 'row'}} spacing={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-team-select">Team</InputLabel>
                                    <Select
                                        labelId="demo-simple-team-select"
                                        id="demo-simple-team-select-id"
                                        value={selectedClassroom?.id ?? ''}
                                        label="Team"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        {classrooms.map(item => <MenuItem key={item.id}
                                                                          value={item.id}>{item.name}</MenuItem>)}
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
                                        renderInput={(params) => <TextField style={{minWidth: 200}}
                                                                            {...params} />}
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
                                <LoadingButton loading={!organization} variant={'contained'}
                                               onClick={getResultWithFilters}>Apply</LoadingButton>
                                <LoadingButton loading={!organization} variant={'contained'} color={'secondary'}
                                               onClick={reset}>Reset</LoadingButton>
                            </Stack>
                        </Grid>
                    }

                    {/*
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        {organization ?
                            <BankingWidgetSummary
                                title="Total Number of Activities"
                                icon={'akar-icons:trophy'}
                                percent={2.6}
                                color={'warning'}
                                total={lessonRecords?.length ?? 0}
                                chartData={dashboardValues?.trainingSessionsData ?? []}
                            />
                            :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        {participants ?
                            <BankingWidgetSummary
                                title="Total Participants"
                                icon={'ant-design:user-add-outlined'}
                                percent={2.6}
                                color={'info'}
                                total={participants}
                                chartData={dashboardValues?.participantsData ?? []}
                            />
                            :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        {organization ?
                            <BankingWidgetSummary
                                title="Total Minutes"
                                icon={'bx:bx-time-five'}
                                percent={2.6}
                                total={dashboardValues?.totalDuration ?? 0}
                                chartData={dashboardValues?.durationData ?? []}
                            />
                            :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        {organization ?
                            <BankingWidgetSummary
                                title="Training Quality(%)"
                                icon={'akar-icons:star'}
                                percent={2.6}
                                color={'secondary'}
                                total={dashboardValues?.totalTrainingQuality ?? 0}
                                chartData={dashboardValues?.qualityData ?? []}
                            />
                            :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>
                    */}

                    <Grid item xs={12} sm={6} md={6} lg={3}>
                        {organization ?
                            <Card>
                                <CardHeader title={'Number of Members'} />
                                <CardContent>
                                    <Typography variant={'h1'}>{0}</Typography>
                                </CardContent>
                            </Card>
                            :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>




                    <Grid item xs={12}>
                        {organization ?
                            <ActivityOrganizationBarchart organization={organization}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {organization && dashboardValues.usersByRewards ?
                            <TopUsersByRewardsBarchart data={dashboardValues.usersByRewards}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>

                    {/*                    <Grid item xs={12}>
                        {organization ?
                            <ActivityOrganizationLineChart organization={organization}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>*/}

                    {/*          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid>*/}
                </Grid>
            </Container>
        </Page>
    );
};

export default OrganizationDashboard;
