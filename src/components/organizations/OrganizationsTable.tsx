import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {useContext, useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {Button, IconButton, Stack, Tooltip} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import {Link} from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {LoadingButton} from "@material-ui/lab";
import {GridCellParams} from "@mui/x-data-grid";
import {useSnackbar} from "notistack";
import {confirmOrganization, listUnconfirmedOrganizations} from "../../apiFunctions/apiFunctions";
import {Chip} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type Organization = {
    id: string,
    name: string,
    confirmed: boolean,
    type: string,
    username: string,
}
const SendButton = (params: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    return (
        <div>
            <Stack direction={'row'}>
                <Tooltip title={'Resend Invite Message'}>
                    <LoadingButton color={'secondary'} loading={loading} startIcon={<SendIcon/>} onClick={() => {
                        setLoading(true);
                        // resendCodeToTeacher({teacherEmail: params.id})
                        //     .then(value => {
                        //         setLoading(false);
                        //         enqueueSnackbar(`Invitation has been sent to ${params.id}`, {variant: 'success'})
                        //     });
                    }}>
                        Resend
                    </LoadingButton>
                </Tooltip>
            </Stack>
        </div>
    )
}
export default function OrganizationsTable() {
    const StatusActions = (params: any) => {
        const status: string = params.getValue(params.id, 'confirmed') as string;
        const [loading, setLoading] = useState(false);
        const {id, value, api, field} = params;

        if (status === 'CONFIRMED') {
            return <Chip label={status} color={'primary'}/>;
        }
        return (<Stack spacing={1} direction={'row'}>
            <Chip label={status} color={'warning'}/>
            <Tooltip title={'Confirm Organization'}>
                <LoadingButton loading={loading} variant={'contained'}  startIcon={<CheckIcon/>} onClick={() => {
                    setLoading(true);
                    confirmOrganization({email: params.getValue(params.id, 'username') as string}).then(result => {
                        setLoading(false);
                        params.api.setEditCellValue({id,field, value: 'CONFIRMED'});
                        api.commitCellChange({id, field});
                        api.setCellMode(id, field, 'view');
                    })
                }} color={'secondary'}>
                    Confirm
                </LoadingButton>
            </Tooltip>
        </Stack>);
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Email', flex: 1},
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: false,
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            editable: false,
        },
        {
            field: 'confirmed',
            headerName: 'Status',
            flex: 1,
            editable: false,
            renderCell: StatusActions

        },


    ];


    const getOrganizations = async () => {
        setOrganizations(null);
        const result: any = await listUnconfirmedOrganizations();
        const data = JSON.parse(result.users);
        let users = data.Users;
        console.log(users);
        users = users.filter((user: any) => {
            return user.Attributes.some((attribute: any) => {
                return attribute.Name === 'custom:organizationType';
            });
        })
            .map((user: any) => {
                return {
                    id: user.Attributes.filter((item: any) => item.Name === 'email')[0].Value,
                    name: user.Attributes.filter((item: any) => item.Name === 'custom:name')[0]?.Value ?? '',
                    confirmed: user.UserStatus,
                    type: user.Attributes.filter((item: any) => item.Name === 'custom:organizationType')[0].Value,
                    username: user.Username
                }
            })
        console.log(users)

        setOrganizations(users);

    }
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    useEffect(() => {

        getOrganizations()

        return () => {

        };
    }, []);

    return (
        <div>

            <div style={{width: '100%', display: 'flex'}}>
                <DataGrid
                    rows={organizations ?? []}
                    disableSelectionOnClick={true}
                    columns={columns}
                    loading={!organizations}
                    rowsPerPageOptions={[5, 20, 100]}
                    autoHeight
                />
            </div>
            <IconButton onClick={() => {
                getOrganizations()
            }}>
                <CachedIcon/>
            </IconButton>
        </div>
    );
}
