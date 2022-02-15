import React, {useEffect, useMemo, useState} from 'react';
import Page from "../../../components/Page";
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack, TextField,
    Typography
} from "@mui/material";
import ActivityWidgetSummary from "../parent/child/profile_tabs/activity/ActivityWidgetSummary";
import {Teacher} from "../../../models/Teacher";
import CardSkeleton from "../../../components/skeleton/CardSkeleton";
import AnalyticsStepsChart from "../analytics/AnalyticsStepsChart";
import AnalyticsSleepChart from "../analytics/AnalyticsSleepChart";
import useSettings from 'src/hooks/useSettings';
import useAuth from "../../../hooks/useAuth";
import AnalyticsWidgetSummary from 'src/sections/@dashboard/general/analytics/AnalyticsWidgetSummary';
import {
    AnalyticsConversionRates,
    AnalyticsCurrentSubject, AnalyticsCurrentVisits, AnalyticsNewsUpdate, AnalyticsOrderTimeline,
    AnalyticsTasks, AnalyticsTrafficBySite, AnalyticsWebsiteVisits
} from "../../../sections/@dashboard/general/analytics";
import {Classroom, Organization, PELessonRecord} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import ActivityOrganizationBarchart from "./dashboard/ActivityOrganizationBarchart";
import ActivtityChartSkeleton from "../../../components/skeleton/ActivtityChartSkeleton";
import {collect} from "collect.js";
import ActivityOrganizationLineChart from "./dashboard/ActivityOrganizationLineChart";
import {age} from "../../../_mock/number";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {format} from "date-fns";
import {LoadingButton} from "@mui/lab";

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
        LessonRecords(limit: 10000, filter: {date: {gt: $gt, lt: $lt}}) {
          items {
            date
            id
            duration
            activity
            rating
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
}`
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
        if (!startDate || !endDate) {
            return;
        }
        setOrganization(null);
        if (!selectedClassroom) {
            const result: any = await API.graphql(graphqlOperation(advancedQueryAllClassrooms, {
                id: organizationId,
                gt: format(startDate, 'yyyy-MM-dd'),
                lt: format(endDate, 'yyyy-MM-dd'),

            }));
            organization = result.data.getOrganization;
        } else {
            console.log('Cll', selectedClassroom)
            const result: any = await API.graphql(graphqlOperation(advancedQueryAllClassrooms, {
                id: organizationId,
                classroomId: selectedClassroom.id,
                gt: format(startDate, 'yyyy-MM-dd'),
                lt: format(endDate, 'yyyy-MM-dd'),
            }));
            organization = result.data.getOrganization;
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
    /*    const trainingSessionsAmount = useMemo(() => {
            if (!organization) {
                return null;
            }
            return organization.Classrooms?.items
                .flatMap(value => value?.LessonRecords?.items as PELessonRecord[]).length;
        }, [organization]);*/
    const sum = organization?.Classrooms?.items
        .flatMap(value => value?.LessonRecords?.items)
        .map(value => value?.rating ?? 0)
        .reduce((accumulator, curr) => accumulator + curr, 0) ?? 0;
    const all = organization?.Classrooms?.items
        .flatMap(value => value?.LessonRecords?.items).length ?? 1;
    const averageRating = useMemo(() => {
        if (!organization) {
            return 0;
        }
        const sum = collect(organization?.Classrooms?.items
            .flatMap(value => value?.LessonRecords?.items)).avg((value: PELessonRecord) => value?.rating ?? 0);
        return sum * 20;
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
                                <LoadingButton loading={!organization} variant={'contained'} onClick={getResultWithFilters}>Apply</LoadingButton>
                                <LoadingButton loading={!organization} variant={'contained'} color={'secondary'} onClick={reset}>Reset</LoadingButton>
                            </Stack>
                        </Grid>
                    }
                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Training Sessions"
                                total={organization.Classrooms?.items
                                    .flatMap(value => value?.LessonRecords?.items).length ?? 0}
                                color="warning"
                                icon={'akar-icons:trophy'}
                            /> :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Total Participants"
                                total={organization?.members?.items.length ?? 0}
                                color="info"
                                icon={'ant-design:user-add-outlined'}
                            />
                            :
                            <CardSkeleton height={'300px'}/>

                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Total Hours"
                                total={(organization.Classrooms?.items
                                    .flatMap(value => value?.LessonRecords?.items)
                                    .map(value => value?.duration ?? 0)
                                    .reduce((accumulator, curr) => accumulator + curr, 0) ?? 0) / 60.0
                                }
                                icon={'bx:bx-time-five'}
                            />
                            :
                            <CardSkeleton height={'300px'}/>

                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Training Quality(%)"
                                total={averageRating}
                                color="secondary"
                                icon={'akar-icons:star'}
                            /> :
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
