import useSettings from "../../../../hooks/useSettings";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import Iconify from "../../../../components/Iconify";
import OrganizationGeneral from "../OrganizationGeneral";
import RolesMenu from "../RolesMenu";
import OrganizationMembers from "../OrganizationMembers";
import OrganizationTeams from "../team/OrganizationTeams";
import Page from "../../../../components/Page";
import {Box, Container, Tab, Tabs} from "@mui/material";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../../routes/paths";
import {capitalCase} from "change-case";
import OrganizationMembersTable from "../OrganizationMembersTable";
import OrganizationMembersSentRequest from "./OrganizationMembersSentRequest";
import OrganizationRequestJoin from "./OrganizationRequestJoin";

const MembersTabs = () => {
    const {themeStretch} = useSettings();

    const [currentTab, setCurrentTab] = useState('accepted');

    const ACCOUNT_TABS = [
        {
            value: 'accepted',
            icon: <Iconify icon={'mdi:check-decagram'} width={20} height={20}/>,
            component: <OrganizationMembersTable/>
            ,
        },
        {
            value: 'Request Sent',
            icon: <Iconify icon={'mdi:arrow-right-thin'} width={20} height={20}/>,
            component: <OrganizationMembersSentRequest/>,
        },
        {
            value: 'Join Request',
            icon: <Iconify icon={'mdi:arrow-left-thin'} width={20} height={20}/>,
            component: <OrganizationRequestJoin/>,
        },

    ];

    return (
        <>
            <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => setCurrentTab(value)}
            >
                {ACCOUNT_TABS.map((tab) => (
                    <Tab
                        disableRipple
                        key={tab.value}
                        label={capitalCase(tab.value)}
                        icon={tab.icon}
                        value={tab.value}
                    />
                ))}
            </Tabs>

            <Box sx={{mb: 5}}/>

            {ACCOUNT_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return isMatched && <Box  key={tab.value}>{tab.component}</Box>;
            })}
        </>

    );
};

export default MembersTabs;