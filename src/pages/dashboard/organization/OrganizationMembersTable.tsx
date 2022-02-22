import useAuth from "../../../hooks/useAuth";
import {DataGrid, GridCellParams, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import OrganizationMoreMenu from "../user/OrganizationMoreMenu";
import {useEffect, useState} from "react";
import {Organization, User, UserInOrganization, UserRole} from "../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {Button, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import Iconify from "../../../components/Iconify";
import {useParams} from "react-router-dom";
import MemberRolesMenu from "./MemberRolesMenu";

const query = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    members(filter: {status: {eq: ACCEPTED}}) {
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

export default function OrganizationMembersTable() {
    const {user} = useAuth();
    const {organizationId} = useParams();
    const [roles, setRoles] = useState<UserRole[] | null>(null);
    const MemberTableItem = (params: GridRenderCellParams) => {

        const roles: any = params.getValue(params.id, 'roles');
        const allRoles: any = params.getValue(params.id, 'allRoles');

        return (
            <MemberRolesMenu id={String(params.id)} roles={roles} allRoles={allRoles} updateUsers={getOrganizations}/>
        );
    }
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
            headerName: 'Roles',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 0.4,
            align: 'center',
            headerAlign: 'center',
            renderCell: MemberTableItem,
        },
        {
            field: 'allRoles',
            headerName: 'Roles',
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