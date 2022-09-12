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
    const [selectedSeriesData, setSelectedSeriesData] = useState('Steps');
    const [loading, setLoading] = useState(false);

    const [userSelectionModels, setUserSelectionModels] = useState<any>(null);
    
    const [seriesData, setSeriesData] = useState<any>(null);

    const theme = useTheme();
    let basedOptions = BaseOptionChart();

    const getChartDates = () => {
        if (seriesData == null || seriesData.length == 0) return [];
        let dateCount = seriesData[0].data?.length ?? 0;
        if (dateCount == 0) {
            return [];
        }
        else {
            let currentDate = new Date();
            let dates = [];
            for (let i = 0; i < dateCount; i++) {
                dates.push(subDays(currentDate, dateCount - 1 - i));
            }
            return dates;
        }
    };

    const getTooltipPrecision = () => {
        switch (selectedSeriesData) {
            case 'Steps' : return 0;
            case 'Sleep' : return 1;
            case 'Active' : return 0;
        }
    };

    const getTooltipUnit = () => {
        switch (selectedSeriesData) {
            case 'Steps' : return 'steps';
            case 'Sleep' : return 'hours';
            case 'Active' : return 'minutes';
        }
    };

    const chartOptions: any = merge(basedOptions, {
        stroke: {width: [5, 3]},
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        labels: getChartDates().map((date: any) =>
            `${format(date, "eee do")}`
        ),
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
                        return `${y?.toFixed(getTooltipPrecision()) ?? 'none'} ${getTooltipUnit()}`;
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
                if (terraId == userSelectionModels[i].user.terraId) {
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
        let members = selectedClassroom?.members?.items ?? [];
        for (let i = 0; i < members.length; i++) {
            let theUser = members[i]?.userInOrganization.user;
            let terraId = theUser?.terraId ?? null;
            if (terraId) {
                models.push({user: theUser, selected});
            }
        }
        setUserSelectionModels(models);
    }

    const checkboxChange = (event: any) => {
        let terraId = event.target.id;
        for (let i = 0; i < userSelectionModels.length; i++) {
            if (terraId == userSelectionModels[i].user.terraId) {
                userSelectionModels[i].selected = event.target.checked;
                break;
            }
        }
    };

    const handleSelectedTeamChange = (event: SelectChangeEvent) => {
        if (!event.target.value) {
            setSelectedClassroom(null);
            return;
        }
        setSelectedClassroom(classrooms?.find((item: any) => item.id === event.target.value as string) ?? null)
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

    const handleSelectedSeriesDataChange = (event: SelectChangeEvent) => {
        setSelectedSeriesData(event.target.value as string);
    };

    const reset = async () => {
        setOrganization(null);
        setClassrooms(null);
        setSelectedClassroom(null);
        setSelectedPeriod('week');
        setStartDate(subDays(new Date(), 6));
        setEndDate(new Date());
        setSelectedSeriesData('Steps');
        setLoading(false);
        setUserSelectionModels(null);
        setSeriesData(null);
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

    const getUserStepsData = async (terraId: any) => {
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
        return wearablesResult?.data ?? [];
    }

    const getAverageStepsData = async (classroomTerraIds: any) => {
        const data: TerraWearables = {
            idList: classroomTerraIds,
            grouping: "group",
            category: "daily",
            subtype: "steps",
            period: "day",
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
            returnType: "average"
        };
        const wearablesResult: any = await getWearablesData(data);
        return wearablesResult?.data ?? [];
    }

    const getStepsSeriesData = async (terraId: any, classroomTerraIds: any) => {
        let theSeriesData = [];
        // push current-users' steps data to series
        if (terraId) {
            let userStepsData = await getUserStepsData(terraId);
            theSeriesData.push({data: userStepsData?.map((item: any) => item.value) ?? [], name: 'For User', type: 'line'});
        }
        // push average steps data to series
        if (classroomTerraIds.length > 0) {
            let averageStepsData = await getAverageStepsData(classroomTerraIds);
            theSeriesData.push({data: averageStepsData?.map((item: any) => item.value) ?? [], name: 'Average For Team', type: 'line'});
        }
        // push selected-users' steps data to series
        for (let i = 0; i < userSelectionModels.length; i++) {
            if (userSelectionModels[i].selected) {
                let theUser = userSelectionModels[i].user;
                let name = theUser.firstName + " " + theUser.lastName;
                let userStepsData = await getUserStepsData(theUser.terraId);
                theSeriesData.push({data: userStepsData?.map((item: any) => item.value) ?? [], name, type: 'line'});
            }
        }
        return theSeriesData;
    };

    const getUserSleepData = async (terraId: any) => {
        const data: TerraWearables = {
            idList: [terraId],
            grouping: "user",
            category: "sleep",
            subtype: "durationTotal",
            period: "day",
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
            returnType: "total"
        };
        const wearablesResult: any = await getWearablesData(data);
        return wearablesResult?.data ?? [];
    }

    const getAverageSleepData = async (classroomTerraIds: any) => {
        const data: TerraWearables = {
            idList: classroomTerraIds,
            grouping: "group",
            category: "sleep",
            subtype: "durationTotal",
            period: "day",
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
            returnType: "average"
        };
        const wearablesResult: any = await getWearablesData(data);
        return wearablesResult?.data ?? [];
    }

    const getSleepSeriesData = async (terraId: any, classroomTerraIds: any) => {
        let theSeriesData = [];
        // push current-users' sleep data to series
        if (terraId) {
            let userSleepData = await getUserSleepData(terraId);
            theSeriesData.push({data: userSleepData?.map((item: any) => item.value / 60 / 60) ?? [], name: 'For User', type: 'line'});
        }
        // push average sleep data to series
        if (classroomTerraIds.length > 0) {
            let averageSleepData = await getAverageSleepData(classroomTerraIds);
            theSeriesData.push({data: averageSleepData?.map((item: any) => item.value / 60 / 60) ?? [], name: 'Average For Team', type: 'line'});
        }
        // push selected-users' sleep data to series
        for (let i = 0; i < userSelectionModels.length; i++) {
            if (userSelectionModels[i].selected) {
                let theUser = userSelectionModels[i].user;
                let name = theUser.firstName + " " + theUser.lastName;
                let userSleepData = await getUserSleepData(theUser.terraId);
                theSeriesData.push({data: userSleepData?.map((item: any) => item.value / 60 / 60) ?? [], name, type: 'line'});
            }
        }
        return theSeriesData;
    };

    const getUserActiveData = async (terraId: any) => {
        const data: TerraWearables = {
            idList: [terraId],
            grouping: "user",
            category: "activity",
            subtype: "duration",
            period: "day",
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
            returnType: "total"
        };
        const wearablesResult: any = await getWearablesData(data);
        return wearablesResult?.data ?? [];
    }

    const getAverageActiveData = async (classroomTerraIds: any) => {
        const data: TerraWearables = {
            idList: classroomTerraIds,
            grouping: "group",
            category: "activity",
            subtype: "duration",
            period: "day",
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            endDate: format(endDate ?? new Date(), 'yyyy-MM-dd'),
            returnType: "average"
        };
        const wearablesResult: any = await getWearablesData(data);
        return wearablesResult?.data ?? [];
    }

    const getActiveSeriesData = async (terraId: any, classroomTerraIds: any) => {
        let theSeriesData = [];
        // push current-users' active data to series
        if (terraId) {
            let userActiveData = await getUserActiveData(terraId);
            theSeriesData.push({data: userActiveData?.map((item: any) => item.value / 60) ?? [], name: 'For User', type: 'line'});
        }
        // push average active data to series
        if (classroomTerraIds.length > 0) {
            let averageActiveData = await getAverageActiveData(classroomTerraIds);
            theSeriesData.push({data: averageActiveData?.map((item: any) => item.value / 60) ?? [], name: 'Average For Team', type: 'line'});
        }
        // push selected-users' active data to series
        for (let i = 0; i < userSelectionModels.length; i++) {
            if (userSelectionModels[i].selected) {
                let theUser = userSelectionModels[i].user;
                let name = theUser.firstName + " " + theUser.lastName;
                let userActiveData = await getUserActiveData(theUser.terraId);
                theSeriesData.push({data: userActiveData?.map((item: any) => item.value / 60) ?? [], name, type: 'line'});
            }
        }
        return theSeriesData;
    };

    const getResults = async () => {
        setLoading(true);
        if (!classrooms || !selectedClassroom) {
            setLoading(false);
            return;
        }
        let users = selectedClassroom?.members?.items ?? [];
        // get current-user terra id
        let terraId: any = null;
        for (let i = 0; i < users.length; i++) {
            let aUser = users[i]?.userInOrganization?.user;
            if (user?.email == aUser?.id) {
                terraId = aUser?.terraId;
                break;
            }
        }
        // get classroom terraIds
        let classroomTerraIds: any = [];
        for (let i = 0; i < users.length; i++) {
            let terraId = users[i]?.userInOrganization?.user?.terraId ?? null;
            if (terraId != null) {
                classroomTerraIds.push(terraId);
            }
        }
        // set series data
        let theSeriesData = null;
        switch (selectedSeriesData) {
            case 'Steps' : theSeriesData = await getStepsSeriesData(terraId, classroomTerraIds); break;
            case 'Sleep' : theSeriesData = await getSleepSeriesData(terraId, classroomTerraIds); break;
            case 'Active' : theSeriesData = await getActiveSeriesData(terraId, classroomTerraIds); break;
        }
        setSeriesData(theSeriesData);
        setLoading(false);
    }

    useEffect(() => {
        getOrganizationAsync();
        return () => {};
    }, []);

    useEffect(() => {
        getResults();
        return () => {};
    }, [classrooms, selectedSeriesData]);

    useEffect(() => {
        setAllUsersSelected(false);
        return () => {};
    }, [selectedClassroom]);

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
                                        {classrooms?.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
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
                                <LoadingButton loading={loading} variant={'contained'}
                                               onClick={() => getResults()}>Apply</LoadingButton>
                                <LoadingButton loading={!organization} variant={'contained'} color={'secondary'}
                                               onClick={() => reset()}>Reset</LoadingButton>
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
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    }
                    <Grid item xs={12} style={{marginTop:70}}>
                        <FormControl sx={{minWidth: 150}}>
                            <InputLabel id="demo-simple-series-data-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-series-data-label"
                                id="demo-simple-series-data-select"
                                value={selectedSeriesData}
                                label="Type"
                                onChange={(event) => handleSelectedSeriesDataChange(event)}
                            >
                                <MenuItem value={'Steps'}>Steps</MenuItem>
                                <MenuItem value={'Sleep'}>Sleep</MenuItem>
                                <MenuItem value={'Active'}>Active</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {seriesData ?
                            <Card>
                                <Box sx={{p: 3, pb: 1}} dir="ltr">
                                    <ReactApexChart
                                        type="line"
                                        series={seriesData}
                                        options={chartOptions}
                                        height={364}
                                    />
                                </Box>
                            </Card>
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
