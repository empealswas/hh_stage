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
import {Organization, Pupil} from "../../API";
import {
    createPupilOrganizationAccepted,
    createPupilOrganizationRequest,
    deletePupilOrganizationRequest
} from "../../graphql/mutations";
import {UserContext} from "../../App";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const query = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    WaitingForAcceptPupils {
      items {
        pupil {
          id
          firstName
          lastName
        }
      }
    }
    AcceptedPupils {
      items {
        pupil {
          firstName
          id
          lastName
        }
      }
    }
  }
}
`
const getRequestsOfPupil = `query MyQuery($id: ID = "", $pupilId: ID = "") {
  getOrganization(id: $id) {
    WaitingForAcceptPupils(pupilID: {eq: $pupilId}) {
      items {
        id
      }
    }
  }
}
`
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
    firstName: string
    lastName: string
    status: 'accepted' | 'waitingForAccept' | 'none';
}


export default function OrganizationPupilsList() {
    const user = useContext(UserContext);

    const RequestButton = (params: any) => {
        const [loading, setLoading] = useState<boolean>(false);
        const status = params.getValue(params.id, 'status');
        const {pupilId} = useParams();
        const {id, value, api, field} = params;

        const sendRequest = async () => {
            setLoading(true);
            let result: any = await API.graphql(graphqlOperation(getRequestsOfPupil, {id: user?.email, pupilId: id}));
            let item: any;
            for (item of result.data.getOrganization.WaitingForAcceptPupils.items) {
                console.log(item);
                await API.graphql(graphqlOperation(deletePupilOrganizationRequest, {input: {id: item.id}}));

            }
            const input = {
                pupilID: id,
                organizationID: user?.email
            }
            console.log(input);
            result = await API.graphql(graphqlOperation(createPupilOrganizationAccepted, {input}));



            console.log(result)
            params.api.setEditCellValue({id: params.id, field: 'status', value: 'accepted'});
            api.commitCellChange({id, field});
            api.setCellMode(id, field, 'view');
            setLoading(false);

        }
        if (status === 'accepted') {
            return <Chip label={'Accepted'} color={'success'}/>
        }
        return (<LoadingButton loading={loading} onClick={sendRequest} variant={'contained'} color={'primary'}>
            Accept
        </LoadingButton>);
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Id', flex: 0.4},
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            editable: false,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
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

    const getOrganizations = async () => {
        setOrganizations(null);
        const result: any = await API.graphql(graphqlOperation(query, {id: user?.email}));

        let items: OrganizationTable[] = [];
        result.data.getOrganization.WaitingForAcceptPupils.items
            .map((item: any) => item.pupil).forEach((pupil: Pupil) => {
            items.push({
                id: pupil.id,
                firstName: pupil.firstName ?? '',
                lastName: pupil.lastName ?? '',
                status: 'waitingForAccept'
            })
        })
        result.data.getOrganization?.AcceptedPupils.items
            .map((item: any) => item.pupil).forEach((pupil: Pupil) => {
            items.push({
                id: pupil.id,
                firstName: pupil.firstName ?? '',
                lastName: pupil.lastName ?? '',
                status: 'accepted'
            })
        })


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
