import React, {useContext, useEffect, useState} from 'react';
import {Icon} from '@iconify/react';
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {Attendance, Classroom, ClassroomLesson} from "../../../../API";
import {createAttendance, createClassroomLesson, updateAttendance, updateClassroomLesson} from 'src/graphql/mutations';
import {Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select} from "@mui/material";
import {DataGrid, GridColDef, GridToolbar, GridValueGetterParams} from "@mui/x-data-grid";
import Iconify from "../../../Iconify";
import useAuth from "../../../../hooks/useAuth";
import {renderRatingEditInputCell, renderReward} from "./Reward";
import CustomLoadingOverlay from './CustomLoadingOverlay';
import LessonDetails from "./LessonDetails";



interface GridConfigOptions {
    selectedClassroom: Classroom;
}

interface GridToolbarContainerProps {
    onApply: (options: GridConfigOptions) => void;
    classrooms: Classroom [];
    selectedClassroom: Classroom;
}

type AttendanceOfPupil = {
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
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          name
          id
        }
      }
    }
  }
}`
const getPupilsOfClassroomAttendanceQuery = `query MyQuery($eq: ID = "", $id: ID = "") {
  getClassroom(id: $id) {
    pupils {
      items {
        pupil {
          id
          firstName
          lastName
          Attendances(filter: {lessonID: {eq: $eq}}) {
            items {
              id
              pupilID
              present
              wasRewarded
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

async function makeAttendance(pupilId: string, lessonId: string) {
    const input = {
        lessonID: lessonId,
        pupilID: pupilId,
        present: true,
        wasRewarded: false,
    }
    const result: any = await API.graphql(graphqlOperation(createAttendance, {input}));
    console.log(result)
    return result.data.createAttendance;
}

async function addAttendanceForPupil(pupilId: string, lessonId: string) {
    return makeAttendance(pupilId, lessonId);
}


function SettingsPanel(props: GridToolbarContainerProps) {
    const {onApply, selectedClassroom, classrooms} = props;

    const [classroom, setClassroom] = useState(selectedClassroom);

    const handleDatasetChange = React.useCallback((event: any) => {

        const find = classrooms.find(value => value.id === event.target.value) as Classroom;
        console.log(find)
        setClassroom(find)
    }, []);
    const handleApplyChanges = React.useCallback(() => {
        onApply({
            selectedClassroom: classroom
        });
    }, [classroom, onApply]);


    return (
        <FormGroup className="MuiFormGroup-options" row>
            <FormControl variant="standard">
                <InputLabel>Classroom</InputLabel>
                <Select value={classroom.id} onChange={handleDatasetChange}>
                    {classrooms.map((classroom: Classroom) => (
                        <MenuItem key={classroom.id} value={classroom.id}>{classroom.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleApplyChanges}
                sx={{ml: 2}}
            >
                <Iconify icon={'eva:arrow-ios-forward-fill'} sx={{fontSize: 20}}/> Apply
            </Button>
        </FormGroup>
    )
}

const AttendanceSheetTable = (props: {}) => {
    const {user} = useAuth();
    const {lessonId} = useParams();

    const [classroomsOfTeacher, setClassroomsOfTeacher] = useState<null | Classroom[]>(null);
    const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
    const [pupils, setPupils] = useState<null | AttendanceOfPupil[]>(null);
    const setSelectedClassroomData = (classroom: Classroom) => {
        setSelectedClassroom(classroom);
        getAttendanceOfPupils(classroom.id);
        getClassroomCompleteness(classroom.id);
    }
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
    const fetchClassrooms = async () => {
        return API.graphql(graphqlOperation(classroomsOfTeacherQuery, {id: user?.email}));
    }
    const getClassroomsOfTeacher = () => {
        fetchClassrooms().then((result: any) => {
            const classrooms = result.data.getTeacher.classrooms.items.map((item: any) => item.classroom);
            setClassroomsOfTeacher(classrooms)
            if (classrooms.length > 0) {
                setSelectedClassroomData(classrooms[0]);
            }
        })
    }
    const fetchPupils = async (classroomId: string) => {
        return API.graphql(graphqlOperation(getPupilsOfClassroomAttendanceQuery, {id: classroomId, eq: lessonId}))
    }
    const getAttendance = async (data: any) => {
        return Promise.resolve(await data.data.getClassroom.pupils.items?.map(async (item: any) => {
            const pupil: any = item.pupil;
            if (!pupil) {
                return;
            }
            const noPreviousRecordsOfAttendanceInThisLesson = pupil.Attendances?.items?.length === 0;
            let attendance: Attendance;
            if (noPreviousRecordsOfAttendanceInThisLesson) {
                // @ts-ignore
                const response = await addAttendanceForPupil(pupil.id, lessonId);
                attendance = response
                console.log('res', response)
            } else {
                const [attendanceInLesson] = pupil.Attendances?.items as Attendance[];
                attendance = attendanceInLesson;
            }
            const attendanceOfPupil: AttendanceOfPupil = {
                id: pupil.id,
                attendanceId: attendance.id,
                firstName: pupil.firstName,
                lastName: pupil.lastName,
                newRecord: noPreviousRecordsOfAttendanceInThisLesson,
                present: noPreviousRecordsOfAttendanceInThisLesson ? true : attendance?.present ?? true,
                wasRewarded: attendance.wasRewarded ?? false,
                score: 1,
                receivesTrophy: false
            }
            return attendanceOfPupil;
        }));
    }
    const getAttendanceOfPupils = (classroomId: string) => {


        fetchPupils(classroomId).then((result: any) => {
            return getAttendance(result);
        }).then((data: any) => {
            Promise.all(data).then((result: any) => setPupils(result))
        })
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
        // {
        //     field: 'score',
        //     headerName: 'Score',
        //     flex: 1.3,
        //     renderCell: renderRating,
        //     renderEditCell: renderRatingEditInputCell,
        //     editable: true
        // },
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

        if (!selectedClassroom || selectedClassroom.id !== settings.selectedClassroom.id) {
            setPupils(null);
            setSelectedClassroomData(settings.selectedClassroom);
        }
    };
    useEffect(() => {

        getClassroomsOfTeacher();

        return () => {

        };
    }, []);


    return (
        <>
            {classroomData &&
            <Button color={classroomData.completed ? 'info' : 'success'} style={{marginBottom: 15}}
                    onClick={async () => {
                        const result: any = await API.graphql(graphqlOperation(updateClassroomLesson, {
                            input: {
                                id: classroomData.id,
                                completed: !classroomData.completed
                            }
                        }))
                        setClassroomData(result.data.updateClassroomLesson);

                    }
                    }
                    variant={'contained'}>{classroomData.completed ? 'Mark as Incomplete' : 'Complete Lesson'}</Button>
            }
            {(selectedClassroom && lessonId) &&
            <LessonDetails lessonId={lessonId} selectedClassroom={selectedClassroom}/>
            }
            <Box height={50}/>
            {classroomsOfTeacher && selectedClassroom &&
            <Box mb={1}>
                <SettingsPanel onApply={handleApplyClick} classrooms={classroomsOfTeacher}
                               selectedClassroom={selectedClassroom}/>
            </Box>
            }
            <DataGrid
                rows={pupils ?? []}
                columns={columns}
                autoPageSize={true}
                pageSize={10}
                autoHeight
                rowsPerPageOptions={[5]}
                loading={classroomsOfTeacher === null || pupils === null}
                components={{
                    Toolbar: GridToolbar,
                    LoadingOverlay: CustomLoadingOverlay,
                }}
                componentsProps={{}}
                onCellEditCommit={(params, event, details) => {
                    const attendanceOfPupil = pupils?.find(pupil => pupil.id === params.id) as AttendanceOfPupil;
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
                checkboxSelection
                disableSelectionOnClick
            />
        </>
    );
};

export default AttendanceSheetTable;
