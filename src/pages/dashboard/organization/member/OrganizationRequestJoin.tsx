import {DataGrid, GridCellParams, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {Button, Chip, IconButton, Menu, MenuItem, Stack, Tooltip} from "@mui/material";
import {useParams} from "react-router-dom";
import MemberRolesMenu from "../MemberRolesMenu";
import Iconify from "../../../../components/Iconify";
import {UserInOrganization, UserRole} from "../../../../API";
import useAuth from "../../../../hooks/useAuth";
import {LoadingButton} from "@mui/lab";
import {deleteUserInOrganization, updateUserInOrganization} from "../../../../graphql/mutations";

const query = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    members(limit: 1000000, filter: {status: {eq: WAITING_FOR_ORGANIZATION_TO_APPROVE}}) {
      items {
        id
        user {
          id
          firstName
          lastName
          email
        }
        roles {
          items {
            id
            userRole {
              organizationRolesId
              id
              name
            }
          }
        }
      }
    }
  }
}
`
const getRolesQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    roles {
      items {
        id
        name
      }
    }
  }
}`;
const MemberTableItem = (params: GridRenderCellParams) => {

    const roles: any = params.getValue(params.id, 'roles');
    const allRoles: any = params.getValue(params.id, 'allRoles');
    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);
    const acceptUser = async () => {
        setLoading(true);
        await API.graphql(graphqlOperation(updateUserInOrganization, {
            input: {
                id: params.id,
                status: "ACCEPTED",
            }
        }))
        setLoading(false);
        setAccepted(true);

    }
    const rejectUser = async () => {
        setLoading(true);
        await API.graphql(graphqlOperation(deleteUserInOrganization, {
            input: {
                id: params.id,
            }
        }))
        setRejected(true);
        setLoading(false);
    }
    if (accepted) {
        return (
            <Chip label="Accepted" color="success"/>
        )
    }
    if (rejected) {
        return (
            <Chip label="Rejected" color="error"/>
        )
    }
    return (
        <Stack direction={'row'} spacing={2}>
            <LoadingButton variant={'contained'} loading={loading} onClick={acceptUser}>Accept</LoadingButton>
            <LoadingButton variant={'contained'} color={'error'} loading={loading}
                           onClick={rejectUser}>Reject</LoadingButton>
        </Stack>
    );
}

export default function OrganizationRequestJoin() {
    const {user} = useAuth();
    const {organizationId} = useParams();
    const [roles, setRoles] = useState<UserRole[] | null>(null);

    const columns: GridColDef[] = [
        {field: 'id', flex: 0.2, headerName: 'Id', hide: true},
        {field: 'email', flex: 1, headerName: 'Email'},
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            editable: false
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
            editable: false
        },
        {
            field: 'roles',
            headerName: 'Actions',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 0.6,
            align: 'center',
            headerAlign: 'center',
            renderCell: MemberTableItem,
        },
        {
            field: 'allRoles',
            headerName: 'Actions',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 0.4,
            align: 'center',
            headerAlign: 'center',
            hide: true
        }

    ];
    const [members, setMembers] = useState<UserInOrganization[] | null>(null);

    async function getOrganizations() {
        setMembers(null);
        const result: any = await API.graphql(graphqlOperation(query, {id: organizationId}));
        setMembers(result.data.getOrganization.members?.items);
    }

    const getRolesAsync = async () => {
        setRoles(null);
        const result: any = await API.graphql(graphqlOperation(getRolesQuery, {id: organizationId}));
        setRoles(result.data.getOrganization.roles.items);
    }

    useEffect(() => {

        getRolesAsync();
        getOrganizations();
        return () => {

        };
    }, []);


    return (
        <div>
            <div style={{width: '100%', display: 'flex'}}>
                <DataGrid
                    rows={members?.map(value => {
                        return {
                            id: value?.id,
                            email: value?.user?.id,
                            firstName: value.user?.firstName,
                            lastName: value.user?.lastName,
                            roles: value.roles?.items,
                            allRoles: roles,
                        }
                    }) ?? []}
                    disableSelectionOnClick
                    columns={columns}
                    loading={!members || !roles}
                    autoHeight={true}
                />
            </div>
            <IconButton onClick={getOrganizations}>
                <Iconify icon={'mdi:cached'} sx={{height: 30, width: 30}}/>
            </IconButton>
        </div>

    );
}