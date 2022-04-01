import {Link as RouterLink} from 'react-router-dom';
// @mui
import {useTheme} from '@mui/material/styles';
import {Button, Card, CardContent, Container, Stack, Typography,} from '@mui/material';
import Iconify from "../../../../components/Iconify";
import useSettings from "../../../../hooks/useSettings";
import Page from "../../../../components/Page";
import {PATH_DASHBOARD} from "../../../../routes/paths";
import OrganizationsTable from "../../user/OrganizationsTable";
import useAuth from "../../../../hooks/useAuth";
import useLocales from "../../../../hooks/useLocales";
// routes
// hooks
// @types
// _mock_
// components

// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'isVerified', label: 'Verified', alignRight: false},
    {id: 'status', label: 'Status', alignRight: false},
];

// ----------------------------------------------------------------------

export default function OrganizationsList() {

    const theme = useTheme();

    const {themeStretch} = useSettings();
    const {user} = useAuth();
    const {translate} = useLocales();
    if (user?.isAdmin) {
        return (
            <Page title="User: Organization">
                <Container maxWidth={themeStretch ? false : 'lg'}>

                    <Stack sx={{mb: 2}} justifyContent={{sx: 'center', md: 'space-between'}}
                           direction={{sx: 'column', md: 'row'}}>
                        <Typography variant={'h4'}>{translate('Your Organizations')}</Typography>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.user.newOrganization}
                            startIcon={<Iconify icon={'eva:plus-fill'}/>}
                        >
                            New Organization
                        </Button>
                    </Stack>
                    <Card>
                        <CardContent>
                            <OrganizationsTable/>
                        </CardContent>
                    </Card>
                </Container>
            </Page>
        )
    }
    return (
        <Page title="User: Organization">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <CardContent>
                        <Button variant={'contained'} fullWidth component={RouterLink} to={'/dashboard/organization'}>Discover Organizations</Button>
                    </CardContent>
                </Card>
            </Container>
        </Page>
    )

}

// ----------------------------------------------------------------------

