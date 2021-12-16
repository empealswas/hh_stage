import * as React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@material-ui/data-grid';
import {useContext, useEffect, useState} from "react";
import {SchoolManagementContext} from "./SchoolManagement";
import {API, graphqlOperation} from "aws-amplify";
import {Button, IconButton, Stack, Tooltip} from "@material-ui/core";
import CachedIcon from '@material-ui/icons/Cached';
import {Pupil, Teacher} from "../../API";
import {onCreateTeacher} from "../../graphql/subscriptions";
import {updatePupil, updateTeacher} from "../../graphql/mutations";
import {Link} from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SendIcon from '@mui/icons-material/Send';
import {resendCodeToTeacher} from "../../apiFunctions/apiFunctions";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {LoadingButton} from "@material-ui/lab";
import {GridCellParams} from "@mui/x-data-grid";
import {useSnackbar} from "notistack";
import {Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SendButton = (params: { id: string }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const ResendPasswordModal = (props: {open: boolean, onClose: any}) => {
        const [password, setPassword] = useState('');

        const { onClose, open } = props;
        const handleClose = () => {
            onClose();
        };
        return (
            <Dialog fullWidth={true} onClose={handleClose} open={open}>
                <DialogTitle>Resend invitation message</DialogTitle>
                <DialogContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField id="outlined-basic" variant="outlined" label={'Temporary password(optional)'} value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                        <LoadingButton loading={loading} startIcon={<SendIcon/>} onClick={() => {
                            setLoading(true);
                            resendCodeToTeacher({teacherEmail: params.id, password: password})
                                .then(value => {
                                    setOpen(true);
                                    setLoading(false);
                                    enqueueSnackbar(`Invitation has been sent to ${params.id}`, {variant: 'success'})
                                });
                        }}>
                            Resend
                        </LoadingButton>
                    </Stack>
                </DialogContent>
            </Dialog>
        );
    }
    return (
        <div>
            <Stack direction={'row'}>
                <Button variant={'contained'} onClick={handleClickOpen}>Resend password</Button>
                <ResendPasswordModal   open={open} onClose={handleClose}/>
            </Stack>
        </div>
    )
}
export default function TeachersTable() {
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
            flex: 0.4,
            align: 'center',
            headerAlign: 'center',
            renderCell: params => {
                return (<SendButton id={params.getValue(params.id, 'id') as string}/>);
            }
        }
    ];
    const school = useContext(SchoolManagementContext);

    async function getTeachers() {
        console.log(school)
        return API.graphql(graphqlOperation(`query MyQuery($filter: ModelTeacherFilterInput = {}) {
  listTeachers(filter: $filter) {
    items {
      id
      firstName
      lastName
    }
  }
}
`, {filter: {schoolID: {eq: school?.id}}}));
    }

    function loadTeachers() {
        setTeachers(null);
        getTeachers().then((teachers: any) => {
            console.log(teachers);
            setTeachers(teachers.data.listTeachers.items);
        })
    }

    function getOnCreateTeacherSubscriber() {
        // @ts-ignore
        return API.graphql(graphqlOperation(onCreateTeacher)).subscribe({
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
    const [teachers, setTeachers] = useState<Teacher[] | null>(null);

    return (
        <div>

            <div style={{width: '100%', display: 'flex'}}>
                <DataGrid
                    rows={teachers?.map((teacher, index) => ({
                        id: teacher.id,
                        lastName: teacher.lastName,
                        firstName: teacher.firstName,
                    })) ?? []}
                    onCellEditCommit={(params, event, details) => {
                        const teacher = teachers?.find(teacher => teacher.id === params.id) as Teacher;

                        const res = API.graphql(graphqlOperation(updateTeacher, {
                            input: {
                                id: teacher.id,
                                [params.field]: params.value
                            }
                        }))
                        console.log(res)
                    }}
                    disableSelectionOnClick={true}
                    columns={columns}
                    loading={!teachers}
                    rowsPerPageOptions={[5, 20, 100]}
                    autoHeight
                />
            </div>

            <IconButton onClick={loadTeachers}>
                <CachedIcon />
            </IconButton>
        </div>
    );
}
