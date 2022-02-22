import {sentenceCase} from 'change-case';
import {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import {useTheme} from '@mui/material/styles';
import {
    Card,
    Table,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination, Stack, CardContent,
} from '@mui/material';
import Iconify from "../../../../components/Iconify";
import {UserListHead, UserListToolbar, UserMoreMenu} from "../../../../sections/@dashboard/user/list";
import Label from "../../../../components/Label";
import useSettings from "../../../../hooks/useSettings";
import Page from "../../../../components/Page";
import {PATH_DASHBOARD} from "../../../../routes/paths";
import SearchNotFound from "../../../../components/SearchNotFound";
import {UserManager} from "../../../../@types/user";
import _mock, {_userList} from "../../../../_mock";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Scrollbar from "../../../../components/Scrollbar";
import {randomInArray} from "../../../../_mock/funcs";
import OrganizationsTable from "../../user/OrganizationsTable";
import useAuth from "../../../../hooks/useAuth";
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
    if (user?.isAdmin) {
        return (
            <Page title="User: Organization">
                <Container maxWidth={themeStretch ? false : 'lg'}>

                    <Stack sx={{mb: 2}} justifyContent={{sx: 'center', md: 'space-between'}}
                           direction={{sx: 'column', md: 'row'}}>
                        <Typography variant={'h4'}>Your organizations</Typography>
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

