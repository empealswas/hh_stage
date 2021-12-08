import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {Pupil, SchoolHouse} from "../../API";
import {Container, IconButton, Stack, Tooltip} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import WatchIcon from '@mui/icons-material/Watch';
import FaceIcon from '@material-ui/icons/Face';
// @ts-ignore
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {onCreatePupil} from "../../graphql/subscriptions";
import {Link, useParams} from "react-router-dom";
import {listSchoolHouses} from "../../graphql/queries";
import {updateAttendance, updatePupil} from "../../graphql/mutations";


export default function PupilsOrganizationTable() {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID'},
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            flex: 1,
            editable: false
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 1,
            editable: false
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Actions',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     flex: 0.4,
        //     align: 'center',
        //     headerAlign: 'center',
        //     renderCell: (params) => {
        //         return (
        //             <Stack direction={'row'}>
        //                 <Tooltip title={'Personal Page'}>
        //                     <IconButton color={'success'} component={Link} to={`/dashboard/pupils/${params.id}`}>
        //                         <FaceIcon/>
        //                     </IconButton>
        //                 </Tooltip>
        //                 <Tooltip title={'Manage Account'}>
        //                     <IconButton color={'info'} component={Link} to={'#'}>
        //                         <EditRoundedIcon/>
        //                     </IconButton>
        //                 </Tooltip>
        //                 <Tooltip title={'Connect To Garmin'}>
        //                     <IconButton color={'primary'} onClick={() => {
        //                         window.open(`https://garmin.healthyhabits.link/auth/requestTokenForString/${params.id}/${params.getValue(params.id, 'firstName')}${params.getValue(params.id, 'lastName')}`, '_blank')
        //                     }}>
        //                         <WatchIcon/>
        //                     </IconButton>
        //                 </Tooltip>
        //             </Stack>
        //         )
        //     }
        //     ,
        // },


    ];
    const {organizationId} = useParams();

    async function getPupils() {
        return API.graphql(graphqlOperation(`query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
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
`, {id: organizationId},));
    }

    function loadPupils() {
        setPupils(null);
        getPupils().then((result: any) => {
            console.log(result);
            setPupils(result.data.getOrganization.AcceptedPupils.items.map((item: any) => item.pupil));
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
                    rows={pupils?.map((pupil, index) => {
                            return {
                                ...pupil
                            }
                        }
                    ) ?? []}

                    columns={columns}
                    loading={!pupils}
                    autoHeight={true}
                />
            </div>
            <IconButton onClick={loadPupils}>
                <CachedIcon/>
            </IconButton>
        </div>
    );
}
