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

const OrganizationManage = () => {
    const { themeStretch } = useSettings();

    const [currentTab, setCurrentTab] = useState('general');

    const ACCOUNT_TABS = [
        {
            value: 'general',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
            component: <AccountGeneral />,
        },
        {value: 'members',
            icon: <Iconify icon={'ic:baseline-escalator-warning'} width={20} height={20} />,
            component: <ChildrenList />,
        },
        {value: 'participants',
            icon: <Iconify icon={'codicon:organization'} width={20} height={20} />,
            component: <OrganizationsList />,
        },


    ];

    return (
        <Page title="User: Account Settings">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Account"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'User', href: PATH_DASHBOARD.user.root },
                        { name: 'Account Settings' },
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
