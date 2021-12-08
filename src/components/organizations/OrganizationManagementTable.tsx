import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {Container, Stack, Typography} from "@material-ui/core";
import {Organization} from "../../API";
import Box from '@mui/material/Box';
import LinearProgressBottom from "../../utils/LinearProgressBottom";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {getOrganization} from "../../graphql/queries";
import PupilsOrganizationTable from "./PupilsOrganizationTable";
import PupilsAcceptList from "./PupilsAcceptList";
import OrganizationTeachersTable from "./OrganizationTeachersTable";
import AddTeacherForOrganizationModal from "./AddTeacherForOrganizationModal";
import {Button} from "@mui/material";


const OrganizationManagementTable = () => {
    const {organizationId} = useParams();
    console.log(organizationId)
    async function getSchool() {
        return API.graphql(graphqlOperation(getOrganization, {id: organizationId}))
    }

    useEffect(() => {
        loadTeachers()
    }, []);

    function loadTeachers() {
        getSchool().then((result: any) => {
            console.log(result);
            setSchool(result.data.getOrganization);
        })
    }


    const [school, setSchool] = useState<Organization | null>(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        school ?
            <Container>
                <Container sx={{textAlign: 'center'}}>
                    <Typography variant={'h2'}>{school?.name}</Typography>
                </Container>
                <Button component={Link} to={'classrooms'}>Go to Classrooms</Button>
                <Box sx={{width: '100%', typography: 'body1'}}>
                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Pupils" value="1"/>
                                <Tab label="Teachers" value="2"/>
                                <Tab label="Requests" value="3"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" gutterBottom>
                                    Pupils
                                </Typography>
                            </Stack>
                            <PupilsOrganizationTable/>
                        </TabPanel>
                        <TabPanel value="2">
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h4" gutterBottom>
                                    Teachers
                                </Typography>
                                <AddTeacherForOrganizationModal />
                            </Stack>
                            <OrganizationTeachersTable/>
                        </TabPanel>
                        <TabPanel value={'3'}>
                            <PupilsAcceptList/>
                        </TabPanel>
                    </TabContext>
                </Box>
</Container>
:
    <LinearProgressBottom/>


)
    ;

};

export default OrganizationManagementTable;
