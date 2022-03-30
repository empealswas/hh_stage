import React, {useEffect, useState} from 'react';
import {getWearablesData} from "../apiFunctions/apiFunctions";
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextareaAutosize, TextField
} from "@mui/material";
import {LoadingButton, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {API, graphqlOperation} from "aws-amplify";
import {listUsers} from "../graphql/queries";
import {Section, User} from "../API";
import {format, parseISO} from "date-fns";
import {deleteUserInOrganizationInClassroom, updateSection} from "../graphql/mutations";

const query = `query MyQuery {
  listSections(filter: {isPlacedInContentStore: {eq: true}}, limit: 100000) {
    items {
      id
      name
    }
  }
}
`
const TestPage = () => {
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [grouping, setGrouping] = useState<'user' | 'group'>("group");
    const [category, setCategory] = useState<'activity' | 'daily' | 'sleep'>("sleep");
    const [subtype, setSubtype] = useState<'steps' | 'distance' | 'duration' | 'calories' | 'durationTotal' | 'durationRem' | 'durationDeep' | 'durationAwake' | 'durationOther' | 'efficiency'>('durationTotal');
    const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year' | 'millennium'>('day');
    const [startDay, setStartDay] = useState<Date>(parseISO("2021-01-10"));
    const [endDate, setEndDate] = useState<Date>(parseISO("2022-03-31"));
    const [returnType, setReturnType] = useState<'total' | 'average' | 'stanine'>("average");
    const handleGroupingChange = (event: SelectChangeEvent) => {
        setGrouping(event.target.value as any);
    };
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as any);
    };
    const handleSubtypeChange = (event: SelectChangeEvent) => {
        setSubtype(event.target.value as any);
    };
    const handlePeriodChange = (event: SelectChangeEvent) => {
        setPeriod(event.target.value as any);
    };
    const handleReturnTypeChange = (event: SelectChangeEvent) => {
        setReturnType(event.target.value as any);
    };
    const search = async () => {
        setLoading(true);
        const result: any = await API.graphql(graphqlOperation(listUsers));

        let params = {
            idList: result.data.listUsers?.items?.filter((user: User) => !!user.terraId).map((user: User) => user.terraId),
            grouping: grouping,
            category: category,
            subtype: subtype,
            period: period,
            startDate: format(startDay, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
            returnType: returnType
        };
        console.log(params);
        getWearablesData(params).then(value => {
            setValue(JSON.stringify(value));
            console.log('VALUE', value);
        }).catch(error => {
            console.error(error);
            setValue(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }
    return (
        <Container>
            <Stack direction={'column'} spacing={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Grouping</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={grouping}
                        label="Grouping"
                        onChange={handleGroupingChange}
                    >
                        <MenuItem value={'user'}>User</MenuItem>
                        <MenuItem value={'group'}>Group</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>

                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value={'activity'}>Activity</MenuItem>
                        <MenuItem value={'daily'}>Daily</MenuItem>
                        <MenuItem value={'sleep'}>Sleep</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>

                    <InputLabel id="demo-simple-select-label">Subtype</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subtype}
                        label="Subtype"
                        onChange={handleSubtypeChange}
                    >
                        <MenuItem value={'steps'}>steps</MenuItem>
                        <MenuItem value={'distance'}>distance</MenuItem>
                        <MenuItem value={'duration'}>duration</MenuItem>
                        <MenuItem value={'calories'}>calories</MenuItem>
                        <MenuItem value={'durationTotal'}>durationTotal</MenuItem>
                        <MenuItem value={'durationRem'}>durationRem</MenuItem>
                        <MenuItem value={'durationDeep'}>durationDeep</MenuItem>
                        <MenuItem value={'durationAwake'}>durationAwake</MenuItem>
                        <MenuItem value={'durationOther'}>durationOther</MenuItem>
                        <MenuItem value={'efficiency'}>efficiency</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>

                    <InputLabel id="demo-simple-select-label">Period</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={period}
                        label="Period"
                        onChange={handlePeriodChange}
                    >
                        <MenuItem value={'day'}>day</MenuItem>
                        <MenuItem value={'week'}>week</MenuItem>
                        <MenuItem value={'month'}>month</MenuItem>
                        <MenuItem value={'year'}>millennium</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Return Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={returnType}
                        label="Period"
                        onChange={handleReturnTypeChange}
                    >
                        <MenuItem value={'total'}>total</MenuItem>
                        <MenuItem value={'average'}>average</MenuItem>
                        <MenuItem value={'stanine'}>stanine</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Start Date"
                        value={startDay}
                        onChange={(newValue) => {
                            if (newValue) {
                                setStartDay(newValue);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => {
                            if (newValue) {
                                setEndDate(newValue);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LoadingButton loading={loading} variant={'contained'} onClick={search}>Test</LoadingButton>
{/*                <LoadingButton variant={'contained'} onClick={async () => {
                    setLoading(true);
                    const query1 =
                        `query MyQuery($id: ID = "16f21789-4fdb-4157-b9ba-1865e61e1915") {
  getOrganization(id: $id) {
    members(limit: 100000) {
      items {
        id
      }
    }
    Classrooms(filter: {id: {eq: "f92ce805-fd78-40f0-af4a-ba08c0122f0d"}}) {
      items {
        members(limit: 10000) {
          items {
            id
            userInOrganizationID
          }
        }
      }
    }
  }
}
`
                    const result: any = await API.graphql(graphqlOperation(query1));
                    for (const item of result.data.getOrganization?.Classrooms.items[0].members.items) {
                        if (result.data.getOrganization.members.items.find((member: any) => member.id === item.userInOrganizationID) === undefined) {
                            console.log("ITEM", item.userInOrganizationID);
                            const deleted = await API.graphql(graphqlOperation(deleteUserInOrganizationInClassroom, {
                                input: {
                                    id: item.id
                                }
                            }))
                            console.log(deleted);

                        }
                    }
                    setLoading(false);
                }} loading={loading}>Function</LoadingButton>*/}
                <TextareaAutosize minRows={5} value={value}></TextareaAutosize>
            </Stack>
        </Container>
    );
};

export default TestPage;
