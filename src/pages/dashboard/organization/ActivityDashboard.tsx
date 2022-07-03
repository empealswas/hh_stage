import React, {useEffect, useState} from 'react';
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
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {LoadingButton} from "@mui/lab";
import {BankingWidgetSummary} from "../../../sections/@dashboard/general/banking";
import CardSkeleton from "../../../components/skeleton/CardSkeleton";
import ActivityOrganizationBarchart from "./dashboard/ActivityOrganizationBarchart";
import ActivtityChartSkeleton from "../../../components/skeleton/ActivtityChartSkeleton";
import ActivityOrganizationLineChart from "./dashboard/ActivityOrganizationLineChart";
import useAuth from "../../../hooks/useAuth";
import useSettings from "../../../hooks/useSettings";
import {Classroom, Organization, Pupil, User, UserInOrganization} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {getWearablesData, TerraWearables} from "../../../apiFunctions/apiFunctions";
import {format, parseISO, subDays, subMonths, subYears} from "date-fns";
import StepsActivityChart from "./activity/StepsActivityChart";
import SleepActivityChart from "./activity/SleepActivityChart";
import UsersDetailsAccordion from "./activity/UsersDetailsAccordion";

const query = `query MyQuery($id: ID = "") {
    getOrganization(id: $id) {
        Classrooms {
            items {
                id
                name
                members {
                    items {
                        userInOrganization {
                            user {
                                lastName
                                firstName
                                terraId
                                id
                            }
                        }
                    }
                }
            }
        }
    }
}

`
const ActivityDashboard = () => {
    const {user} = useAuth();
    const {themeStretch} = useSettings();
    const [averageStepsData, setAverageStepsData] = useState<any>(null);
    const [averageSleepData, setAverageSleepData] = useState<any>(null);

    const [organization, setOrganization] = useState<Organization | null>(null);
    const [classrooms, setClassrooms] = useState<Classroom[] | null>(null);
    const {organizationId} = useParams();
    const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null);
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('none');

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
            case 'none':
                setStartDate(null);
                setEndDate(null);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        if (!event.target.value) {
            setSelectedClassroom(null);
            return;
        }
        setSelectedClassroom(classrooms?.find(item => item.id === event.target.value as string) ?? null)
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
        console.log(result.data.getOrganization?.Classrooms?.items);
        setClassrooms(result.data.getOrganization?.Classrooms?.items);
    }

    const getAverage = async () => {
        if (!classrooms) {
            return;
        }
        setAverageStepsData(null);
        setAverageSleepData(null);
        let terraIds: string[] = [];

        if (selectedClassroom) {
            terraIds = selectedClassroom.members?.items
                .map(value => value?.userInOrganization)
                .map((userInOrganization => userInOrganization?.user))
                .filter(value => !!value?.terraId).map(value => value?.terraId ?? "") ?? [];
        } else {
            terraIds = classrooms?.flatMap(value => value.members?.items)
                .map(value => value?.userInOrganization)
                .map((userInOrganization => userInOrganization?.user))
                .filter(value => !!value?.terraId).map(value => value?.terraId ?? "") ?? [];
        }

        async function getAverageSteps() {
            const data: TerraWearables = {
                idList: terraIds,
                grouping: "group",
                category: "daily",
                subtype: "steps",
                period: "day",
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
                endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
                returnType: "average"
            };
            const wearablesResult: any = await getWearablesData(data);
            setAverageStepsData(wearablesResult?.data ?? []);
        }

        async function getAverageSleep() {
            const data: TerraWearables = {
                idList: terraIds,
                grouping: "group",
                category: "sleep",
                subtype: "durationTotal",
                period: "day",
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
                endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
                returnType: "average"
            };
            const wearablesResult: any = await getWearablesData(data);
            setAverageSleepData(wearablesResult?.data ?? []);
        }

        getAverageSteps();
        getAverageSleep()
    }

    useEffect(() => {
        getAverage();
        return () => {

        };
    }, [selectedClassroom, classrooms]);

    useEffect(() => {

        getOrganizationAsync();
        return () => {

        };
    }, [organizationId]);

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
                                        renderInput={(params) => <TextField {...params} style={{minWidth: 200}} />}
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
                                        renderInput={(params) => <TextField {...params} style={{minWidth: 200}} />}
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                    />

                                </LocalizationProvider>
                                <LoadingButton loading={!organization} variant={'contained'}
                                               onClick={getAverage}>Apply</LoadingButton>
                                <LoadingButton loading={!organization} variant={'contained'} color={'secondary'}
                                               onClick={reset}>Reset</LoadingButton>
                            </Stack>

                        </Grid>
                    }
                    {(selectedClassroom || classrooms) &&
                        <Grid item xs={12}>
                            <UsersDetailsAccordion
                                users={selectedClassroom ? selectedClassroom?.members?.items.map(value => value?.userInOrganization.user as User) ?? []
                                    : classrooms?.flatMap(value => value.members?.items).map(value => value?.userInOrganization.user as User) ?? []
                                }
                            />
                        </Grid>

                    }
                    <Grid item xs={12}>
                        {averageStepsData ?
                            <StepsActivityChart
                                labels={averageStepsData.map((item: any) => format(parseISO(item.date), 'yyyy-MM-dd'))}
                                values={averageStepsData.map((item: any) => item.value)}
                            />
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {averageSleepData ?
                            <SleepActivityChart
                                labels={averageSleepData.map((item: any) => format(parseISO(item.date), 'yyyy-MM-dd'))}
                                values={averageSleepData.map((item: any) => item.value / 60.0 / 60.0)}
                            />
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>

                </Grid>
            </Container>
        </Page>
    );
};

export default ActivityDashboard;
