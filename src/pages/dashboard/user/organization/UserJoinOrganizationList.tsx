import {DataGrid, GridCellParams, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {Button, Chip, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {useParams} from "react-router-dom";
import Iconify from "../../../../components/Iconify";
import {UserInOrganization, UserRole} from "../../../../API";
import useAuth from "../../../../hooks/useAuth";
import {LoadingButton} from "@mui/lab";
import {updateUserInOrganization} from "../../../../graphql/mutations";

const query = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    organizations(limit: 10000, filter: {status: {eq: WAITING_FOR_USER_TO_APPROVE}}) {
      items {
        status
        id
        createdAt
        organization {
          id
          name
          owner {
            lastName
            firstName
          }
          type
        }
      }
    }
  }
}
`

const MemberTableItem = (params: GridRenderCellParams) => {

    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);
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
    if (accepted) {
        return (
            <Chip label="Accepted" color="success" />
        )
    }
    return (
        <LoadingButton variant={'contained'} loading={loading} onClick={acceptUser}>Accept</LoadingButton>
    );
}

export default function UserJoinOrganizationList() {
    const {user} = useAuth();

    const columns: GridColDef[] = [
        {field: 'id', flex: 0.2, headerName: 'Id', hide: true},
        {
            field: 'name',
            headerName: 'Organization Name',
            flex: 1,
            editable: false
        },
        {
            field: 'type',
            headerName: 'Organization Type',
            flex: 1,
            editable: false
        },
        {
            field: 'owner',
            headerName: 'Owner',
            flex: 1,
            editable: false
        },
        {
            field: 'roles',
            headerName: 'Actions',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 0.4,
            align: 'center',
            headerAlign: 'center',
            renderCell: MemberTableItem,
        },

    ];
    const [members, setMembers] = useState<UserInOrganization[] | null>(null);

    async function getOrganizations() {
        setMembers(null);
        const result: any = await API.graphql(graphqlOperation(query, {id: user?.email}));
        setMembers(result.data.getUser.organizations?.items);
    }


    useEffect(() => {

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
                            name: value?.organization?.name,
                            type: value?.organization?.type,
                            owner: `${value?.organization?.owner?.firstName} ${value?.organization?.owner?.lastName}`
                        }
                    }) ?? []}
                    disableSelectionOnClick
                    columns={columns}
                    loading={!members}
                    autoHeight={true}
                />
            </div>
            <IconButton onClick={getOrganizations}>
                <Iconify icon={'mdi:cached'} sx={{height: 30, width: 30}}/>
            </IconButton>
        </div>

    );
}