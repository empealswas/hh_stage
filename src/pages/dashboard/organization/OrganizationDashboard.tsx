
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
    Typography
} from "@mui/material";
import CardSkeleton from "../../../components/skeleton/CardSkeleton";
import useSettings from 'src/hooks/useSettings';
import useAuth from "../../../hooks/useAuth";
import AnalyticsWidgetSummary from 'src/sections/@dashboard/general/analytics/AnalyticsWidgetSummary';
import {Classroom, Lesson, Organization, PELessonRecord} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import ActivityOrganizationBarchart from "./dashboard/ActivityOrganizationBarchart";
import ActivtityChartSkeleton from "../../../components/skeleton/ActivtityChartSkeleton";
import {collect} from "collect.js";
import ActivityOrganizationLineChart from "./dashboard/ActivityOrganizationLineChart";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {compareAsc, format, parseISO} from "date-fns";
import {LoadingButton} from "@mui/lab";
import {BankingWidgetSummary} from "../../../sections/@dashboard/general/banking";
import {values} from "lodash";

const query = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    Classrooms {
      items {
        id
        name
        LessonRecords(limit: 10000) {
          items {
            date
            id
            duration
            activity
            rating
            Attendances(limit: 100000, filter: {present: {eq: true}}) {
              items {
                id
              }
            }
          }
        }
      }
    }
    members(limit: 10000) {
      items {
        id
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
        LessonRecords(limit: 100000, filter: {date: {gt: $gt, lt: $lt}}) {
          items {
            date
            id
            duration
            activity
            rating
            Attendances(filter: {present: {eq: true}}, limit: 100000) {
              items {
                id
              }
            }
          }
        }
      }
    }
    members(limit: 10000) {
      items {
        id
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

    const handleChange = (event: SelectChangeEvent) => {
        if (!event.target.value) {
            setSelectedClassroom(null);
            return;
        }
        setSelectedClassroom(classrooms?.find(item => item.id === event.target.value as string) ?? null)
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
            totalDuration += lessonRecords?.reduce((total: any, value: any) => total + value?.duration ?? 0, 0)
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
                                    <InputLabel id="demo-simple-select-label">Team</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedClassroom?.id ?? ''}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>All</em>
                                        </MenuItem>
                                        {classrooms.map(item => <MenuItem key={item.id}
                                                                          value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        // @ts-ignore
                                        renderInput={(params) => <TextField {...params} />}
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
                                        renderInput={(params) => <TextField {...params} />}
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
                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <BankingWidgetSummary
                                title="Training Sessions"
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
                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <BankingWidgetSummary
                                title="Total Participants"
                                icon={'ant-design:user-add-outlined'}
                                percent={2.6}
                                color={'info'}
                                total={dashboardValues?.totalParticipants ?? 0}
                                chartData={dashboardValues?.participantsData ?? []}
                            />
                            :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <BankingWidgetSummary
                                title="Total Hours"
                                icon={'bx:bx-time-five'}
                                percent={2.6}
                                total={dashboardValues?.totalDuration ?? 0}
                                chartData={dashboardValues?.durationData ?? []}
                            />
                            :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
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

                    <Grid item xs={12}>
                        {organization ?
                            <ActivityOrganizationBarchart organization={organization}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {organization ?
                            <ActivityOrganizationLineChart organization={organization}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>

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
