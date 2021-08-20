import React, {createContext, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {Button, Container, List, ListItem, ListItemText, Stack, Typography} from "@material-ui/core";
import {School} from "../../API";
import AddTeacherModal from "./AddTeacherModal";
import TeachersTable from "./TeachersTable";
import AddPupilModal from "./AddPupilModal";
import PupilsTable from "./PupilsTable";
import LinearProgressBottom from "../../utils/LinearProgressBottom";
import AddSubjectModal from "../Lesson/Subject/AddSubjectModal";
import SubjectsGrid from "../Lesson/Subject/SubjectsGrid";


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

    function showAddTeacherModal() {

    }

    const [school, setSchool] = useState<School | null>(null);
    return (
        school ?
            <Container>
                <SchoolManagementContext.Provider value={school}>
                    <Container sx={{textAlign: 'center'}}>
                        <Typography variant={'h2'}>{school?.name}</Typography>
                    </Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Teachers
                        </Typography>
                        <AddTeacherModal school={school}/>
                    </Stack>
                    <TeachersTable/>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Pupils
                        </Typography>
                        <AddPupilModal school={school}/>
                    </Stack>
                    <PupilsTable/>
                </SchoolManagementContext.Provider>
            </Container>
            :
            <LinearProgressBottom/>


    );

};

export default SchoolManagement;
