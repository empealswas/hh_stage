import React from 'react';
import {Container, Typography} from "@mui/material";
import PupilClassroomTable from "../classrooms/PupilClassroomTable";
import PupilClassroomTableOrganization from "./PupilClassroomTableOrganization";

const OrganizationTeamOverview = () => {
    
    return (
        <Container sx={{textAlign: 'center'}}>
                <Typography sx={{mb: 5}} variant={'h3'}>Classroom Overview</Typography>
                <PupilClassroomTableOrganization/>
        </Container>
    );
};

export default OrganizationTeamOverview;
