import React, {useState} from 'react';
import useSettings from "../../../hooks/useSettings";
import Iconify from "../../../components/Iconify";
import {AccountChangePassword, AccountGeneral} from "../../../sections/@dashboard/user/account";
import ChildrenList from "../parent/child/ChildrenList";
import OrganizationsList from "../parent/child/OrganizationsList";
import Page from "../../../components/Page";
import {Box, Container, Tab, Tabs} from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {capitalCase} from "change-case";
import OrganizationMembers from "./OrganizationMembers";
import RolesMenu from "./RolesMenu";
import OrganizationTeams from "./team/OrganizationTeams";
import {useParams} from "react-router-dom";
import OrganizationGeneral from "./OrganizationGeneral";

const OrganizationManage = () => {
    const { themeStretch } = useSettings();

    const [currentTab, setCurrentTab] = useState('general');
    const {organizationId} = useParams();

    const ACCOUNT_TABS = [
        {
            value: 'general',
            icon: <Iconify icon={'mdi:cog-box'} width={20} height={20} />,
            component: <OrganizationGeneral />,
        },
        {
            value: 'roles',
            icon: <Iconify icon={'mdi:shield-crown-outline'} width={20} height={20} />,
            component: <RolesMenu />,
        },
        {value: 'members',
            icon: <Iconify icon={'mdi:account-group'} width={20} height={20} />,
            component: <OrganizationMembers />,
        },
        {value: 'teams',
            icon: <Iconify icon={'mdi:google-classroom'} width={20} height={20} />,
            component: <OrganizationTeams />,
        },

    ];

    return (
        <Page title="Organization: Manage">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Organization"
                    links={[
                        { name: 'Organization Content', href: `${PATH_DASHBOARD.root}/organization/${organizationId}` },
                        { name: 'Organization Manage' },
                    ]}
                />

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

                <Box sx={{ mb: 5 }} />

                {ACCOUNT_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })}
            </Container>
        </Page>
    );
};

export default OrganizationManage;
