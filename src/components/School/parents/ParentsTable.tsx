import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {useContext, useEffect, useState} from "react";
import {SchoolManagementContext} from "../SchoolManagement";
import {API, graphqlOperation} from "aws-amplify";
import {Button, IconButton, Stack, Tooltip} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import {Parent, Pupil, Teacher} from "../../../API";
import {onCreateParent, onCreateTeacher} from "../../../graphql/subscriptions";
import {updateParent, updatePupil, updateTeacher} from "../../../graphql/mutations";
import {Link} from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SendIcon from '@mui/icons-material/Send';
import {resendCodeToTeacher} from "../../../apiFunctions/apiFunctions";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {LoadingButton} from "@material-ui/lab";
import {GridCellParams} from "@mui/x-data-grid";
import {useSnackbar} from "notistack";
import {listParents} from "../../../graphql/queries";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SendButton = (params: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    return (
        <div>
            <Stack direction={'row'}>
                <Tooltip title={'Resend Invite Message'}>
                    <LoadingButton color={'secondary'} loading={loading} startIcon={<SendIcon />} onClick={() => {
                        setLoading(true);
                        resendCodeToTeacher({teacherEmail: params.id})
                            .then(value => {
                                setLoading(false);
                                enqueueSnackbar(`Invitation has been sent to ${params.id}`, {variant: 'success'})
                            });
                    }}>
                        Resend
                    </LoadingButton>
                </Tooltip>
            </Stack>
        </div>
    )
}
export default function ParentsTable() {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'Email', flex: 1},
        {
            field: 'firstName',
            headerName: 'First name',
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
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.getValue(params.id, 'firstName') || ''} ${
                    params.getValue(params.id, 'lastName') || ''
                }`,
        },
        {
            field: 'fullName',
            headerName: 'Actions',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 0.6,
            align: 'center',
            headerAlign: 'center',
            renderCell: params => {
                return (<Stack direction={'row'} spacing={2}>
                    <SendButton id={params.getValue(params.id, 'id') as string}/>
                    <Tooltip title={'Assign Children'}>
                        <IconButton color={'success'} component={Link} to={`parent/${params.id}`}>
                            <FaceIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>);
            }
        }
    ];
    const school = useContext(SchoolManagementContext);

    async function getParents() {
        console.log(school)
        return API.graphql(graphqlOperation(listParents));
    }

    function loadTeachers() {
        setParents(null);
        getParents().then((parents: any) => {
            console.log(parents);
            setParents(parents.data.listParents.items);
        })
    }

    function getOnCreateTeacherSubscriber() {
        // @ts-ignore
        return API.graphql(graphqlOperation(onCreateParent)).subscribe({
            next: (data: any) => (
                loadTeachers()
            ),
            error: () => {

            }
        });

    }

    useEffect(() => {
        loadTeachers()
        let subscriber: any = getOnCreateTeacherSubscriber();
        return () => {
            subscriber.unsubscribe();
        }
    }, [])
    const [parents, setParents] = useState<Parent[] | null>(null);

    return (
        <div>

            <div style={{width: '100%', display: 'flex'}}>
                <DataGrid
                    rows={parents?.map((teacher, index) => ({
                        id: teacher.id,
                        lastName: teacher.lastName,
                        firstName: teacher.firstName,
                    })) ?? []}
                    onCellEditCommit={(params, event, details) => {
                        const parent = parents?.find(teacher => teacher.id === params.id) as Parent;

                        const res = API.graphql(graphqlOperation(updateParent, {
                            input: {
                                id: parent.id,
                                [params.field]: params.value
                            }
                        }))
                        console.log(res)
                    }}
                    disableSelectionOnClick={true}
                    columns={columns}
                    loading={!parents}
                    rowsPerPageOptions={[5, 20, 100]}
                    autoHeight
                />
            </div>
            <Button startIcon={<CachedIcon/>} onClick={() => {
                loadTeachers();
            }}/>
        </div>
    );
}
