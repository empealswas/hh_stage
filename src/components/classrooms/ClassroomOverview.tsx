import React from 'react';
import AddClassroomModal from "./AddClassroomModal";
import ClassroomsTable from "./ClassroomsTable";
import {Container, Stack, Typography} from "@material-ui/core";
import AddSubjectModal from "../Lesson/Subject/AddSubjectModal";
import SubjectsGrid from "../Lesson/Subject/SubjectsGrid";


const ClassroomOverview = () => {

return(
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                Classrooms
            </Typography>
        <AddClassroomModal/>
        </Stack>
        <ClassroomsTable/>
    </Container>
)

};

export default ClassroomOverview;
