import {useLocation, useParams} from 'react-router-dom';
// @mui
import {Container} from '@mui/material';
import Page from "../../../../components/Page";
import OrganizationNewForm from "../../user/OrganizationNewForm";
import useSettings from "../../../../hooks/useSettings";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../../routes/paths";
import TeamManage from "./TeamManage";

// redux
// routes
// components

// ----------------------------------------------------------------------

export default function TeamManageOverview() {
    const {themeStretch} = useSettings();
    const {organizationId} = useParams();

    return (
        <Page title="Teams: Manage">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={'Manage team'}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Organization', href: `${PATH_DASHBOARD.root}/organization/${organizationId}` },
                        { name: 'Organization Manage', href: `${PATH_DASHBOARD.root}/organization/${organizationId}/manage`},
                        { name: 'Team Manage'},
                    ]}
                />

                <TeamManage/>
            </Container>
        </Page>
    );
}
