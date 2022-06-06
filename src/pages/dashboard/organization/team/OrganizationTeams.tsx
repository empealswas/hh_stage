import React from 'react';
import AddClassroomModal from "./AddClassroomModal";
import useSettings from "../../../../hooks/useSettings";
import {Card, CardContent, Container, Stack, Typography} from "@mui/material";
import InviteMemberDialog from "../InviteMemberDialog";
import OrganizationMembersTable from "../OrganizationMembersTable";
import ClassroomsGrid from "./ClassroomsGrid";

const OrganizationTeams = () => {
    const {themeStretch} = useSettings();
    return (
        <Container maxWidth={themeStretch ? false : 'lg'}>

            <Stack sx={{mb: 2}} justifyContent={{sx: 'center', md: 'space-between'}}
                   direction={{sx: 'column', md: 'row'}}>
                <Typography variant={'h4'}>Teams in the organization</Typography>
                <AddClassroomModal/>
            </Stack>
            <Card>
                <CardContent>
                    <ClassroomsGrid/>
                </CardContent>
            </Card>
        </Container>
    );
};

export default OrganizationTeams;
