import React from 'react';
import PupilClassroomTable from "./PupilClassroomTable";
import {Container, Typography} from "@mui/material";
import SelectYearForClassroom from "./SelectYearForClassroom";

const ClassroomPageNew = () => {
    
    return (
        <Container sx={{textAlign: 'center'}}>
                <Typography sx={{mb: 5}} variant={'h3'}>Classroom Overview</Typography>
            <SelectYearForClassroom/>
            <PupilClassroomTable/>
        </Container>
    );
};

export default ClassroomPageNew;
