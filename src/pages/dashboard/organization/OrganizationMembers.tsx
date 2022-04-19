import React from 'react';
import Page from "../../../components/Page";
import {Button, Card, CardContent, Container, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {PATH_DASHBOARD} from "../../../routes/paths";
import Iconify from "../../../components/Iconify";
import OrganizationsTable from "../user/OrganizationsTable";
import useSettings from "../../../hooks/useSettings";
import OrganizationMembersTable from "./OrganizationMembersTable";
import InviteMemberDialog from "./InviteMemberDialog";
import MembersTabs from "./member/MembersTabs";

const OrganizationMembers = () => {


    const {themeStretch} = useSettings();
    return (
        <Container maxWidth={themeStretch ? false : 'lg'}>

            <Stack sx={{mb: 2}} justifyContent={{sx: 'center', md: 'space-between'}}
                   direction={{sx: 'column', md: 'row'}}>
                <Typography variant={'h4'}>Members of your organization</Typography>
                <InviteMemberDialog/>
            </Stack>

            <MembersTabs/>
        </Container>
    );
};

export default OrganizationMembers;
