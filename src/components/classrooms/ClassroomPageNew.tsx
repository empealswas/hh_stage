import React from 'react';
import PupilClassroomTable from "./PupilClassroomTable";
import {Container, Stack, Typography} from "@mui/material";
import SelectYearForClassroom from "./SelectYearForClassroom";

const ClassroomPageNew = () => {

    return (
        <Container sx={{textAlign: 'center'}}>
            <Stack spacing={3} direction={'column'} >
                <Typography variant={'h3'}>Classroom Overview</Typography>
                <SelectYearForClassroom/>
                <PupilClassroomTable/>
            </Stack>
        </Container>
    );
};

export default ClassroomPageNew;
