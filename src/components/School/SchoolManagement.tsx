import React, {createContext, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {Button, Container, List, ListItem, ListItemText, Stack, Typography} from "@material-ui/core";
import {School} from "../../API";
import AddTeacherModal from "./AddTeacherModal";
import TeachersTable from "./TeachersTable";
import Box from '@mui/material/Box';
import AddPupilModal from "./AddPupilModal";
import PupilsTable from "./PupilsTable";
import LinearProgressBottom from "../../utils/LinearProgressBottom";
import AddSubjectModal from "../Lesson/Subject/AddSubjectModal";
import SubjectsGrid from "../Lesson/Subject/SubjectsGrid";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddParentModal from "./parents/AddParentModal";
import ParentsTable from "./parents/ParentsTable";

export const SchoolManagementContext = createContext<School | null>(null);

const SchoolManagement = () => {
    const {id} = useParams();

    async function getSchool() {
        console.log(id)
        return API.graphql(graphqlOperation(`query MyQuery($id: ID = "") {
  getSchool(id: $id) {
    name
    id
  }
}

`, {id}))
    }

    useEffect(() => {
        loadTeachers()
    }, []);

    function loadTeachers() {
        getSchool().then((result: any) => {
            console.log(result);
            setSchool(result.data.getSchool);
        })
    }


    const [school, setSchool] = useState<School | null>(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        school ?
            <Container>
                <SchoolManagementContext.Provider value={school}>
                    <Container sx={{textAlign: 'center'}}>
                        <Typography variant={'h2'}>{school?.name}</Typography>
                    </Container>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Pupils" value="1"/>
                                    <Tab label="Teachers" value="2"/>
                                    <Tab label="Parents" value="3"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                    <Typography variant="h4" gutterBottom>
                                        Pupils
                                    </Typography>
                                    <AddPupilModal school={school}/>
                                </Stack>
                                <PupilsTable/>
                            </TabPanel>
                            <TabPanel value="2">
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                    <Typography variant="h4" gutterBottom>
                                        Teachers
                                    </Typography>
                                    <AddTeacherModal school={school}/>
                                </Stack>
                                    <TeachersTable/>
                            </TabPanel>
                            <TabPanel value="3">
                                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" gutterBottom>
                                    Parents
                                </Typography>
                                <AddParentModal/>
                            </Stack>
                                <ParentsTable/>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </SchoolManagementContext.Provider>
            </Container>
            :
            <LinearProgressBottom/>


    );

};

export default SchoolManagement;
