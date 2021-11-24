import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {useContext, useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {Button, IconButton, Stack, Tooltip} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import {Link, useParams} from "react-router-dom";
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
import {listOrganizations} from "../../graphql/queries";
import {Organization} from "../../API";
import {createPupilOrganizationRequest} from "../../graphql/mutations";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const query = `query MyQuery($pupilId: ID = "") {
  listOrganizations {
    items {
      AcceptedPupils(pupilID: {eq: $pupilId}) {
        items {
          id
        }
      }
      WaitingForAcceptPupils(pupilID: {eq: $pupilId}) {
        items {
          id
        }
      }
      type
      name
      id
    }
  }
}`
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

type OrganizationTable = {
    id: string
    name: string
    type: string
    status: 'accepted' | 'waitingForAccept' | 'none';
}

const RequestButton = (params: any) =>{
    const [loading, setLoading] = useState<boolean>(false);
    const status = params.getValue(params.id, 'status');
    const {pupilId} = useParams();
    const {id, value, api, field} = params;

    const sendRequest = async () =>{
        setLoading(true);
        const result: any = await API.graphql(graphqlOperation(createPupilOrganizationRequest, {input: {
                organizationID: params.id,
                pupilID: pupilId,
            }}));
        console.log(result)
        params.api.setEditCellValue({id: params.id, field: 'status', value: 'waitingForAccept'});
        api.commitCellChange({id, field});
        api.setCellMode(id, field, 'view');
        setLoading(false);

    }
    if (status === 'accepted') {
        return <Chip label={'Accepted'} color={'success'}/>
    }
    if (status === 'waitingForAccept') {
        return <Chip label={'Waiting for Accept'} color={'warning'}/>
    }
    return (<LoadingButton loading={loading} onClick={sendRequest} variant={'contained'} color={'primary'} >
        Send request
    </LoadingButton>);
}
export default function OrganizationsLinkTable() {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', flex: 0.4},
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
            field: 'status',
            headerName: 'Actions',
            flex: 1,
            editable: false,
            renderCell: RequestButton
        },


    ];
    const {pupilId} = useParams();
    const getOrganizations = async () => {
        setOrganizations(null);
        const result: any = await API.graphql(graphqlOperation(query, {pupilId: pupilId}));
        let items = result.data.listOrganizations.items.map((item: Organization) => {
            let status = 'none';
            if (item.WaitingForAcceptPupils?.items?.length ?? 0 > 1) {
                status = 'waitingForAccept'
            } else if (item.AcceptedPupils?.items?.length ?? 0 > 1) {
                status = 'accepted';
            }
            return {
                id: item.id,
                name: item.name,
                type: item.type,
                status: status
            };
        });
        setOrganizations(items);

    }
    const [organizations, setOrganizations] = useState<OrganizationTable[] | null>(null);
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
