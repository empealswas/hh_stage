import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {SchoolManagementContext} from "./SchoolManagement";
import {API, graphqlOperation} from "aws-amplify";
import {Pupil} from "../../API";
import {Container, IconButton, Stack, Tooltip} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import FaceIcon from '@material-ui/icons/Face';
// @ts-ignore
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {onCreatePupil} from "../../graphql/subscriptions";
import {Link} from "react-router-dom";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        flex: 1,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        flex: 1,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Actions',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 0.4,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <Stack direction={'row'}>
                    <Tooltip title={'Personal Page'}>
                        <IconButton color={'success'} component={Link} to={`/dashboard/pupils/${params.id}`}>
                            <FaceIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Manage Account'}>
                        <IconButton color={'info'} component={Link} to={'#'}>
                            <EditRoundedIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
        ,
    },
];


export default function PupilsTable() {
    const school = useContext(SchoolManagementContext);

    async function getPupils() {
        console.log('school Id', school?.id)
        return API.graphql(graphqlOperation(`query MyQuery($id: ID = "") {
  getSchool(id: $id) {
    Pupils {
      items {
        firstName
        lastName
        id
      }
    }
  }
}
`, {id: school?.id}));
    }

    function loadPupils() {
        setPupils(null);
        getPupils().then((result: any) => {
            console.log(result);
            setPupils(result.data.getSchool.Pupils.items);
        })
    }

    function getOnCreateTeacherSubscriber() {
        // @ts-ignore
        return API.graphql(graphqlOperation(onCreatePupil)).subscribe({
            next: (data: any) => (
                loadPupils()
            ),
            error: () => {

            }
        });

    }

    useEffect(() => {
        loadPupils()
        let subscriber: any = getOnCreateTeacherSubscriber();
        return () => {
            subscriber.unsubscribe();
        }
    }, [])
    const [pupils, setPupils] = useState<Pupil[] | null>(null);
    return (
        <div>

            <div style={{width: '100%', display: 'flex'}}>
                <DataGrid
                    rows={pupils?.map((pupil, index) => (pupil)) ?? []}
                    columns={columns}
                    disableSelectionOnClick={true}
                    pageSize={5}
                    loading={!pupils}
                    onCellClick={params => {
                        console.log(params)
                    }}
                    autoHeight
                />
            </div>
            <IconButton onClick={loadPupils}>
                <CachedIcon/>
            </IconButton>
        </div>
    );
}
