import React from 'react';
import {Container, Typography} from "@mui/material";
import {Box} from "@material-ui/core";
import Page from "../../Page";
import DashboardSettings from "../app/DashboardSettings";
import DashboardOfTeacher from "../app/DashboardOfTeacher";
import {Can} from "../../../utils/Ability";

const Wearables = () => {
    return (
        // @ts-ignore
        <Page title="Dashboard | Healthy Habits">
            <Container>
                <Box sx={{pb: 5}}>
                    <Typography variant="h4">Wearables</Typography>
                </Box>
                <Can I={'read'} a={'teacherDashboard'}>
                    <DashboardOfTeacher/>
                </Can>
                <DashboardSettings/>
            </Container>
        </Page>
    );
};

export default Wearables;
