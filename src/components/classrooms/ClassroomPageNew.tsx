import React from 'react';
import PupilClassroomTable from "../tables/PupilClassroomTable";
import {Container, Typography} from "@mui/material";

const ClassroomPageNew = () => {
    return (
        <Container sx={{textAlign: 'center'}}>
                <Typography sx={{mb: 5}} variant={'h3'}>Classroom Overview</Typography>
            <PupilClassroomTable/>
        </Container>
    );
};

export default ClassroomPageNew;
