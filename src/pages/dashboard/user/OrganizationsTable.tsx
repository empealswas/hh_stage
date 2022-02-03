import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {Organization} from "../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {listOrganizations} from "../../../graphql/queries";
import {IconButton} from "@mui/material";
import Iconify from "../../../components/Iconify";
import useAuth from "../../../hooks/useAuth";
const query =`query MyQuery($id: ID = "") {
  getUser(id: $id) {
    ownedOrganizations {
      items {
        name
        id
        type
      }
    }
  }
}
`
export default function OrganizationsTable() {
    const {user} = useAuth();
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID'},
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            flex: 1,
            editable: false
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            editable: false
        },

    ];
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    async function getOrganizations() {
        setOrganizations(null);
        const result:any = await API.graphql(graphqlOperation(query, {id: user?.email}));
        setOrganizations(result.data.getUser.ownedOrganizations?.items);
    }
    useEffect(() => {


        getOrganizations();
        return () => {

        };
    }, []);
    const mapOrganizations = () => {
      return organizations?.map(value => {
          return {
              id: value.id,
              name: value.name,
              type: value.type
          }
      })
    }

    return (
        <div>

            <div style={{width: '100%', display: 'flex'}}>
                <DataGrid

                    rows={ mapOrganizations() ?? []}

                    columns={columns}
                    loading={!organizations}
                    autoHeight={true}
                />
            </div>

            <IconButton onClick={getOrganizations}>
                <Iconify icon={'mdi:cached'} sx={{height: 30, width: 30}}/>
            </IconButton>
        </div>
    );
}