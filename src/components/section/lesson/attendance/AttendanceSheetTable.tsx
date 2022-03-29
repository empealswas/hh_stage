import React, {useContext, useEffect, useState} from 'react';
import {Icon} from '@iconify/react';
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {
    Attendance,
    Classroom,
    ClassroomLesson,
    CreateAttendanceInput,
    PELessonRecord,
    UserInOrganization, UserRole
} from "../../../../API";
import {createAttendance, createClassroomLesson, updateAttendance, updateClassroomLesson} from 'src/graphql/mutations';
import {Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {DataGrid, GridColDef, GridToolbar, GridValueGetterParams} from "@mui/x-data-grid";
import Iconify from "../../../Iconify";
import useAuth from "../../../../hooks/useAuth";
import {renderRatingEditInputCell, renderReward} from "./Reward";
import CustomLoadingOverlay from './CustomLoadingOverlay';
import LessonDetails from "./LessonDetails";
import {LoadingButton} from "@mui/lab";


interface GridConfigOptions {
    selectedClassroom: Classroom;
    selectedUserRole: UserRole;
}

interface GridToolbarContainerProps {
    onApply: (options: GridConfigOptions) => void;
    classrooms: Classroom [];
    roles: UserRole[];
    selectedClassroom: Classroom;
    selectedUserRole: UserRole;
}

type AttendanceOfUser = {
    id: string,
    attendanceId: string,
    firstName: string,
    lastName: string,
    present: boolean,
    score: number,
    receivesTrophy: boolean,
    newRecord: boolean,
    wasRewarded: boolean
}

const classroomsOfTeacherQuery = `query MyQuery($id: ID = "") {
  getUserInOrganization(id: $id) {
    classrooms {
      items {
        userInOrganization {
          user {
            firstName
            lastName
            id
          }
        }
      }
    }
  }
}`
const getMembersOfClassroomAttendanceQuery = `query MyQuery($id: ID = "", $eq: ID = "") {
  getClassroom(id: $id) {
    members {
      items {
        userInOrganization {
          id
          user {
            lastName
            firstName
            id
          }
          Attendances(filter: {lessonID: {eq: $eq}}) {
            items {
              id
              present
              wasRewarded
            }
          }
          roles {
            items {
              userRole {
                name
                id
              }
            }
          }
        }
      }
    }
  }
}
`
const classroomCompleteQuery = `query MyQuery($classroom: ID = "", $lesson: ID = "") {
  listClassroomLessons(filter: {classroomID: {eq: $classroom}, lessonID: {eq: $lesson}}) {
    items {
      id
      completed
    }
  }
}
`


async function addAttendanceForPupil(userInOrganizationId: string, lessonId: string, lessonRecordId: string) {
    const input: CreateAttendanceInput = {
        lessonID: lessonId,
        userInOrganizationAttendancesId: userInOrganizationId,
        lessonRecordID: lessonRecordId,
        present: true,
        wasRewarded: false,
    }
    const result: any = await API.graphql(graphqlOperation(createAttendance, {input}));
    console.log(result)
    return result.data.createAttendance;
}


function SettingsPanel(props: GridToolbarContainerProps) {
    const {onApply, selectedClassroom, classrooms, selectedUserRole, roles} = props;

    const [classroom, setClassroom] = useState(selectedClassroom);
    const [selectedRole, setSelectedRole] = useState<UserRole>(selectedUserRole);

    const handleDatasetChange = React.useCallback((event: any) => {

        const find = classrooms.find(value => value.id === event.target.value) as Classroom;
        setClassroom(find)
    }, []);
    const handleRoleChange = React.useCallback((event: any) => {

        const find = roles.find(value => value.id === event.target.value) as UserRole;
        console.log(find);
        setSelectedRole(find)
    }, []);


    const handleApplyChanges = React.useCallback(() => {
        onApply({
            selectedClassroom: classroom,
            selectedUserRole: selectedRole
        });
    }, [classroom, selectedRole, onApply]);



    useEffect(() => {
        console.log('applying')
        handleApplyChanges();
        return () => {

        };
    }, [classroom, selectedRole]);


    return (
        <FormGroup className="MuiFormGroup-options" row>
            <Stack direction={'row'} spacing={3}>
                <FormControl variant="standard">
                    <InputLabel>Classroom</InputLabel>
                    <Select value={classroom.id} onChange={handleDatasetChange}>
                        {classrooms.map((classroom: Classroom) => (
                            <MenuItem key={classroom.id} value={classroom.id}>{classroom.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel>Role</InputLabel>
                    <Select value={selectedRole.id} onChange={handleRoleChange}>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
{/*                        <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleApplyChanges}
                sx={{ml: 2}}
            >
                <Iconify icon={'eva:arrow-ios-forward-fill'} sx={{fontSize: 20}}/> Apply
            </Button>*/}
        </FormGroup>
    )
}

type Props = {
    userInOrganization: UserInOrganization,
    roles: UserRole[]
}
const AttendanceSheetTable = ({userInOrganization, roles}: Props) => {
    const {lessonId} = useParams();
    const [lessonRecord, setLessonRecord] = useState<PELessonRecord | null>(null);

    const classrooms = userInOrganization.classrooms?.items.map(value => value?.classroom) as Classroom[];
    const [selectedClassroom, setSelectedClassroom] = useState<Classroom>(classrooms[0]);
    const [selectedRole, setSelectedRole] = useState<UserRole>(roles[0]);
    const [completeLessonLoading, setCompleteLessonLoading] = useState(false);

    const [pupils, setPupils] = useState<null | AttendanceOfUser[]>(null);
    const setSelectedClassroomData = (settings: GridConfigOptions, lessonRecord: PELessonRecord) => {
        setSelectedClassroom(settings.selectedClassroom);
        setSelectedRole(settings.selectedUserRole);
        console.log('Applying', settings.selectedUserRole);
        getAttendanceOfPupils(settings.selectedClassroom.id, lessonRecord.id, settings.selectedUserRole);
        getClassroomCompleteness(settings.selectedClassroom.id);
    }

    useEffect(() => {
        if (lessonRecord) {
            setSelectedClassroomData({selectedClassroom: selectedClassroom, selectedUserRole: selectedRole}, lessonRecord);
        }
        return () => {

        };
    }, [lessonRecord]);
    const [classroomData, setClassroomData] = useState<ClassroomLesson | null>(null);
    const getClassroomCompleteness = async (selectedClassroomId: string) => {
        const classroomDetails: any = await API.graphql(graphqlOperation(classroomCompleteQuery, {
            classroom: selectedClassroomId,
            lesson: lessonId
        }))
        let classroomLesson: ClassroomLesson;
        if (classroomDetails.data.listClassroomLessons?.items.length === 0) {
            const createdClassroomLesson: any = await API.graphql(graphqlOperation(createClassroomLesson, {
                input: {
                    lessonID: lessonId,
                    classroomID: selectedClassroomId,
                    completed: false
                }
            }));
            classroomLesson = createdClassroomLesson.data.createClassroomLesson
        } else {
            classroomLesson = classroomDetails.data.listClassroomLessons?.items[0];
        }
        setClassroomData(classroomLesson);
        console.log('classroomDetails', classroomDetails);
    }


    const getAttendance = async (members: UserInOrganization[], lessonRecordId: string) => {
        return Promise.resolve(await Promise.all(members.map(async (member) => {
            if (!member) {
                return;
            }
            const noPreviousRecordsOfAttendanceInThisLesson = member.Attendances?.items?.length === 0;
            let attendance: Attendance;
            if (noPreviousRecordsOfAttendanceInThisLesson) {
                // @ts-ignore
                const response = await addAttendanceForPupil(member.id, lessonId, lessonRecordId);
                attendance = response
                console.log('res', response)
            } else {
                const [attendanceInLesson] = member.Attendances?.items as Attendance[];
                attendance = attendanceInLesson;
            }
            const attendanceOfPupil: AttendanceOfUser = {
                id: member.id,
                attendanceId: attendance.id,
                firstName: member.user?.firstName as string,
                lastName: member.user?.lastName as string,
                newRecord: noPreviousRecordsOfAttendanceInThisLesson,
                present: noPreviousRecordsOfAttendanceInThisLesson ? true : attendance?.present ?? true,
                wasRewarded: attendance.wasRewarded ?? false,
                score: 1,
                receivesTrophy: false
            }
            return attendanceOfPupil;
        })));
    }
    const getAttendanceOfPupils = async (classroomId: string, lessonRecordId: string, userRole: UserRole) => {
        const result: any = await API.graphql(graphqlOperation(getMembersOfClassroomAttendanceQuery, {
            id: classroomId,
            eq: lessonId
        }))
        console.log(result.data.getClassroom.members.items);
        const members: UserInOrganization[] = result.data.getClassroom.members.items
            .map((item: any) => item.userInOrganization)
            .filter((userInOrganization: UserInOrganization) => {
                const rolesOfUser = userInOrganization.roles?.items?.map(value => value?.userRole);
                console.log("Roles of user", rolesOfUser);
                console.log('Selected roles', selectedRole);
                return rolesOfUser?.find(value => value?.id === userRole.id) !== undefined;
            });
        console.log(members);
        const pupilsAttendance = await getAttendance(members, lessonRecordId) as AttendanceOfUser[];

        setPupils(pupilsAttendance);
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            flex: 1,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            flex: 1,
            valueGetter: (params: any) =>
                `${params?.getValue(params.id, 'firstName') || ''} ${
                    params?.getValue(params.id, 'lastName') || ''
                }`,
        },
        {
            field: 'present',
            headerName: 'Present',
            headerAlign: 'center',
            flex: 1,
            type: 'boolean',
            editable: true,
        },
        {
            field: 'wasRewarded',
            headerName: 'Reward',
            align: 'center',
            headerAlign: 'center',
            flex: 0.7,
            type: 'boolean',
            editable: true,
            renderEditCell: renderRatingEditInputCell,
            renderCell: renderReward
        }
    ];

    const handleApplyClick = (settings: GridConfigOptions) => {
        console.log(settings)
            setPupils(null);
            if (lessonRecord) {
                setSelectedClassroomData(settings, lessonRecord);
            }
    };


    return (
        <>
            {classroomData &&
                <LoadingButton loading={completeLessonLoading} color={classroomData.completed ? 'info' : 'success'} style={{marginBottom: 15}}
                        onClick={async () => {
                            setCompleteLessonLoading(true);
                            const result: any = await API.graphql(graphqlOperation(updateClassroomLesson, {
                                input: {
                                    id: classroomData.id,
                                    completed: !classroomData.completed
                                }
                            }))
                            setCompleteLessonLoading(false);
                            setClassroomData(result.data.updateClassroomLesson);

                        }
                        }
                               variant={'contained'}>{classroomData.completed ? 'Mark as Incomplete' : 'Complete Lesson'}</LoadingButton>
            }
            {(selectedClassroom && lessonId) &&
                <LessonDetails lessonId={lessonId} selectedClassroom={selectedClassroom}
                               setLessonRecord={setLessonRecord}/>
            }
            <Box height={50}/>
            {classrooms && selectedClassroom &&
                <Box mb={1}>
                    <SettingsPanel onApply={handleApplyClick} classrooms={classrooms}
                                   selectedClassroom={selectedClassroom} roles={roles} selectedUserRole={selectedRole}/>
                </Box>
            }
            <DataGrid
                rows={pupils ?? []}
                columns={columns}
                autoPageSize={true}
                pageSize={10}
                autoHeight
                rowsPerPageOptions={[5]}
                loading={classrooms === null || pupils === null}
                components={{
                    Toolbar: GridToolbar,
                    LoadingOverlay: CustomLoadingOverlay,
                }}
                componentsProps={{}}
                onCellEditCommit={(params, event, details) => {
                    const attendanceOfPupil = pupils?.find(pupil => pupil.id === params.id) as AttendanceOfUser;
                    console.log(attendanceOfPupil);
                    console.log(params)
                    const res = API.graphql(graphqlOperation(updateAttendance, {
                        input: {
                            id: attendanceOfPupil.attendanceId,
                            [params.field]: params.value
                        }
                    }))
                    // const element = data.find(value => value.id === params.id);
                    // if (element) {
                    //     // @ts-ignore
                    //     element[params.field] = !element[params.field]
                    //     // @ts-ignore
                    //     console.log('field', element[params.field])
                    // }
                    // setData(prevState => [...data]);
                }}
                disableSelectionOnClick
            />
        </>
    );
};

export default AttendanceSheetTable;
