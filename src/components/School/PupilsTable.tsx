import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { SchoolManagementContext } from "./SchoolManagement";
import { API, graphqlOperation } from "aws-amplify";
import { Pupil, SchoolHouse } from "../../API";
import { Container, IconButton, Stack, Tooltip, Button } from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import WatchIcon from '@mui/icons-material/Watch';
import FaceIcon from '@material-ui/icons/Face';
// @ts-ignore
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
import { onCreatePupil } from "../../graphql/subscriptions";
import { Link } from "react-router-dom";
import { RenderHouseCell, renderHouseEdit } from "./PupilsTableRenders";
import { listSchoolHouses } from "../../graphql/queries";
import { updateAttendance, updatePupil } from "../../graphql/mutations";


export default function PupilsTable() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            flex: 1,
            editable: true
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 1,
            editable: true
        },
        {
            field: 'schoolHouseID',
            headerName: 'House',
            flex: 0.4,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: params => {
                return renderHouseEdit(params, houses ?? [])
            },
            renderEditCell: params => {
                return renderHouseEdit(params, houses ?? []);
            }
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
                                <FaceIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Manage Account'}>
                            <IconButton color={'info'} component={Link} to={'#'}>
                                <EditRoundedIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Connect To Garmin'}>
                            <IconButton color={'primary'} onClick={() => {
                                window.open(`https://garmin.healthyhabits.link/auth/requestTokenForString/${params.id}/${params.getValue(params.id, 'firstName')}${params.getValue(params.id, 'lastName')}`, '_blank')
                            }}>
                                <WatchIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
            ,
        },


    ];
    const school = useContext(SchoolManagementContext);
    const [houses, setHouses] = useState<SchoolHouse[] | null>(null);

    async function getPupils() {
        console.log('school Id', school?.id)
        return API.graphql(graphqlOperation(`query MyQuery($id: ID = "", $limit: Int = 10000) {
  getSchool(id: $id) {
    Pupils(limit: $limit) {
      items {
        firstName
        lastName
        id
        schoolHouseID
      }
    }
  }
}

`, { id: school?.id }));
    }

    function loadPupils() {
        setPupils(null);
        setHouses(null);
        const getHouses = async () => {
            const result: any = await API.graphql(graphqlOperation(listSchoolHouses));
            setHouses(result.data.listSchoolHouses.items);
        }
        getHouses()
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

            <div style={{ width: '100%', display: 'flex' }}>
                <DataGrid
                    onCellEditCommit={(params, event, details) => {
                        const pupil = pupils?.find(pupil => pupil.id === params.id) as Pupil;

                        const res = API.graphql(graphqlOperation(updatePupil, {
                            input: {
                                id: pupil.id,
                                [params.field]: params.value
                            }
                        }))
                        console.log(res)
                    }}
                    rows={pupils?.map((pupil, index) => {
                        return {
                            house: pupil.schoolHouseID,
                            ...pupil
                        }
                    }
                    ) ?? []}

                    columns={columns}
                    loading={!pupils || !houses}

                    autoHeight={true}
                />
            </div>

            <IconButton onClick={loadPupils}>
                <CachedIcon />
            </IconButton>
        </div>
    );
}
