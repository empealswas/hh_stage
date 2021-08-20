import {filter} from 'lodash';
import {Icon} from '@iconify/react';
import {sentenceCase} from 'change-case';
import {useState} from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import {Link as RouterLink} from 'react-router-dom';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import ProgressButton from "../components/Buttons/ProgressButton";


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'company', label: 'Company', alignRight: false},
    {id: 'role', label: 'Role', alignRight: false},
    {id: 'isVerified', label: 'Verified', alignRight: false},
    {id: 'status', label: 'Status', alignRight: false},
    {id: ''}
];

// ----------------------------------------------------------------------


const ParentSection = () => {

    return (
    // @ts-ignore
        <Page>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Children
                    </Typography>
                </Stack>
                <ProgressButton error={true} success={false} loading={false} onClick={()=>{}} disabled={false}/>
            </Container>
        </Page>
    );
}
export default ParentSection;