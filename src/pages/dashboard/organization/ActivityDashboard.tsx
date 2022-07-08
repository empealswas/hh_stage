import {merge,} from 'lodash';
import {BaseOptionChart} from "../../../components/chart";
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
    Typography,
    Accordion,
    AccordionDetails,
    Checkbox,
    Button,
    Card,
    CardHeader,
    Box
} from "@mui/material";
import {fShortenNumber} from "../../../utils/formatNumber";
import {useTheme} from "@mui/material/styles";
import ReactApexChart from 'react-apexcharts';
import AccordionSummary from "@mui/material/AccordionSummary";
import Iconify from "../../../components/Iconify";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
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
import {Classroom, Organization, Pupil, User, UserInOrganization, UserInOrganizationInClassroom} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {getWearablesData, TerraWearables} from "../../../apiFunctions/apiFunctions";
import {format, parseISO, subDays, subMonths, subYears} from "date-fns";
import StepsActivityChart from "./activity/StepsActivityChart";
import SleepActivityChart from "./activity/SleepActivityChart";
import UsersDetailsAccordion from "./activity/UsersDetailsAccordion";
import { flexbox } from '@mui/system';

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
}`

const ActivityDashboard = () => {

    const {user} = useAuth();
    const {themeStretch} = useSettings();
    const {organizationId} = useParams();

    const [organization, setOrganization] = useState<Organization | null>(null);
    const [classrooms, setClassrooms] = useState<Classroom[] | null>(null);
    const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [startDate, setStartDate] = React.useState<Date | null>(subDays(new Date(), 6));
    const [endDate, setEndDate] = React.useState<Date | null>(new Date());

    const [userSelectionModels, setUserSelectionModels] = useState<any>(null);
    
    const [userStepsData, setUserStepsData] = useState<any>(null);
    const [averageStepsData, setAverageStepsData] = useState<any>(null);
    //const [averageSleepData, setAverageSleepData] = useState<any>(null);

    const theme = useTheme();
    let basedOptions = BaseOptionChart();

    const chartOptions: any = merge(basedOptions, {
        stroke: {width: [5, 3]},
        colors: [theme.palette.success.light, theme.palette.warning.light],
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        labels: userStepsData?.map((value: any) =>
            `${format(parseISO(value.date), "eee do")}`
        ) ?? averageStepsData?.map((value: any) =>
            `${format(parseISO(value.date), "eee do")} `),
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return fShortenNumber(value);
                }
            },
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y?.toFixed(0) ?? 'none'} steps`;
                    }
                    return y;
                }
            }
        }
    });

    const MemberTableItem = (params: GridRenderCellParams) => {
        const terraId = params.getValue(params.id, 'terraId');
        if (terraId) {
            let selected = false;
            for (let i = 0; i < userSelectionModels.length; i++) {
                if (terraId == userSelectionModels[i].terraId) {
                    selected = userSelectionModels[i].selected;
                    break;
                }
            }
            return <Checkbox id={terraId as string} defaultChecked={selected} onChange={checkboxChange} />
        }
        else {
            return <Button variant={'contained'} disabled={true}>Not Connected</Button>
        }
    }

    const columns: GridColDef[] = [
        {field: 'id', flex: 0.2, headerName: 'Id', hide: true},
        {field: 'terraId', flex: 0.2, headerName: 'TerraId', hide: true},
        {
            field: 'firstName',
            headerName: 'First Name',
            sortable: false,
            flex: 1,
            editable: false
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            sortable: false,
            flex: 1,
            editable: false
        },
        {
            field: 'roles',
            headerName: 'Select User(s)',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 0.6,
            align: 'center',
            headerAlign: 'center',
            renderCell: MemberTableItem,
        },
    ];

    const setAllUsersSelected = (selected: any) => {
        let models = [];
        let users = selectedClassroom?.members?.items ?? [];
        for (let i = 0; i < users.length; i++) {
            let terraId = users[i]?.userInOrganization?.user?.terraId ?? null;
            if (terraId) {
                models.push({terraId, selected});
            }
        }
        setUserSelectionModels(models);
    }

    const checkboxChange = (event: any) => {
        let terraId = event.target.id;
        for (let i = 0; i < userSelectionModels.length; i++) {
            if (terraId == userSelectionModels[i].terraId) {
                userSelectionModels[i].selected = event.target.checked;
                break;
            }
        }
    };

    const deselectButtonClick = () => {
        setAllUsersSelected(false);
    };

    const selectButtonClick = () => {
        setAllUsersSelected(true);
    };

    const handleSelectedTeamChange = (event: SelectChangeEvent) => {
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
                setStartDate(subDays(new Date(), 6));
                setEndDate(new Date());
                break;
            case 'fortnight':
                setStartDate(subDays(new Date(), 13));
                setEndDate(new Date());
                break;
        }
    };

    const reset = async () => {
        setOrganization(null);
        setClassrooms(null);
        setSelectedClassroom(null);
        setSelectedPeriod('week');
        setStartDate(subDays(new Date(), 6));
        setEndDate(new Date());
        setUserStepsData(null);
        setAverageStepsData(null);
        //setAverageSleepData(null);
        getOrganizationAsync();
    }

    const getOrganizationAsync = async () => {
        setOrganization(null);
        const result: any = await API.graphql(graphqlOperation(query, {id: organizationId}))
        console.log(result)
        setOrganization(result.data.getOrganization);
        let theClassrooms = result.data.getOrganization?.Classrooms?.items;
        theClassrooms.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setSelectedClassroom(theClassrooms[0] ?? null);
        setClassrooms(theClassrooms);
    }

    const getResults = async () => {
        if (!classrooms || !selectedClassroom) {
            return;
        }
        // get current-user terra id
        let terraId: any = "";
        let users = selectedClassroom?.members?.items ?? [];
        for (let i = 0; i < users.length; i++) {
            let aUser = users[i]?.userInOrganization?.user;
            if (user?.email == aUser?.id) {
                terraId = aUser?.terraId;
                break;
            }
        }
        // get terra ids
        let terraIds: any = [];
        for (let i = 0; i < userSelectionModels.length; i++) {
            if (userSelectionModels[i].selected) {
                terraIds.push(userSelectionModels[i].terraId);
            }
        }
        setUserStepsData(null);
        setAverageStepsData(null);
        //setAverageSleepData(null);

        async function getUserStepsData() {
            const data: TerraWearables = {
                idList: [terraId],
                grouping: "user",
                category: "daily",
                subtype: "steps",
                period: "day",
                startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
                endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
                returnType: "total"
            };
            const wearablesResult: any = await getWearablesData(data);
            setUserStepsData(wearablesResult?.data ?? []);
        }

        async function getAverageStepsData() {
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

        /*
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
        */

        getUserStepsData();
        getAverageStepsData();
        //getAverageSleep()
    }

    useEffect(() => {
        setAllUsersSelected(false);
        return () => {};
    }, [selectedClassroom]);

    useEffect(() => {
        getResults();
        return () => {};
    }, [classrooms]);

    useEffect(() => {
        reset();
        getOrganizationAsync();
        return () => {};
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
                                <FormControl sx={{minWidth: 150}}>
                                    <InputLabel id="demo-simple-team-label">Team</InputLabel>
                                    <Select
                                        labelId="demo-simple-team-label"
                                        id="demo-simple-team-select"
                                        value={selectedClassroom?.id ?? ''}
                                        label="Team"
                                        onChange={handleSelectedTeamChange}
                                    >
                                        {classrooms.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{minWidth: 150}}>
                                    <InputLabel id="demo-simple-period-label">Period</InputLabel>
                                    <Select
                                        labelId="demo-simple-period-label"
                                        id="demo-simple-period-select"
                                        value={selectedPeriod}
                                        label="Period"
                                        onChange={handleSelectedPeriodChange}
                                    >
                                        <MenuItem value={'week'}>7 Days</MenuItem>
                                        <MenuItem value={'fortnight'}>14 Days</MenuItem>
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
                                        inputFormat={'dd MMM yyyy'}
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
                                        inputFormat={'dd MMM yyyy'}
                                    />
                                </LocalizationProvider>
                                <LoadingButton loading={!organization} variant={'contained'}
                                               onClick={getResults}>Apply</LoadingButton>
                                <LoadingButton loading={!organization} variant={'contained'} color={'secondary'}
                                               onClick={reset}>Reset</LoadingButton>
                            </Stack>
                        </Grid>
                    }
                    {selectedClassroom &&
                        <Grid item xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<Iconify icon={'ic:baseline-expand-more'} sx={{width: 40, height: 40}}/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Show Users</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{width: '100%', display: 'flex'}}>
                                        <DataGrid
                                            rows={selectedClassroom?.members?.items.map(value => value?.userInOrganization.user as User) ?? []}
                                            disableSelectionOnClick
                                            columns={columns}
                                            autoHeight={true}
                                        />
                                    </div>
                                    {/*
                                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                                        <Button variant='contained' onClick={() => deselectButtonClick()}>Deselect all</Button>
                                        <Button variant='contained' style={{marginLeft:8}} onClick={() => selectButtonClick()}>Select all</Button>
                                    </div>
                                    */}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        {userStepsData && averageStepsData ?
                            <Card>
                                <CardHeader title="Steps" subheader={''}/>
                                <Box sx={{p: 3, pb: 1}} dir="ltr">
                                    <ReactApexChart
                                        type="line"
                                        series={[
                                            {data: userStepsData?.map((item: any) => item.value) ?? [], name: 'For User', type: 'line'},
                                            {data: averageStepsData?.map((item: any) => item.value) ?? [], name: 'Average For Selected Users', type: 'line'}
                                        ]}
                                        options={chartOptions}
                                        height={364}
                                    />
                                </Box>
                            </Card>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>
                    {/*
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
                    */}
                </Grid>
            </Container>
        </Page>
    );
};

export default ActivityDashboard;
