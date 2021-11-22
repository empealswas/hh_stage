import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {DataGrid, GridColDef, GridToolbar, GridValueGetterParams,} from '@material-ui/data-grid';
import {Box, Button, Checkbox, FormControl, FormGroup, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Icon} from '@iconify/react';
import trophyOutline from '@iconify/icons-mdi/trophy-outline';
import trophyIcon from '@iconify/icons-mdi/trophy';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {UserContext} from "../../App";
import {Attendance, Classroom} from "../../API";
import CustomLoadingOverlay from "../../utils/CustomLoadingOverlay";
import {createAttendance, updateAttendance} from "../../graphql/mutations";
import {renderReward, renderRatingEditInputCell} from "./Reward";
import {GridEditRowsModel, GridState} from "@mui/x-data-grid";


interface GridConfigOptions {
    selectedClassroom: Classroom;
}

interface GridToolbarContainerProps {
    onApply: (options: GridConfigOptions) => void;
    classrooms: Classroom [];
    selectedClassroom: Classroom;
}

export type AttendanceOfPupil = {
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
const getPupilsOfClassroomAttendanceQuery = `query MyQuery($id: ID = "") {
  getClassroom(id: $id) {
    pupils {
      items {
        pupil {
          id
          firstName
          lastName
        }
      }
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
                <KeyboardArrowRightIcon fontSize="small"/> Apply
            </Button>
        </FormGroup>
    )
}

const AttendanceSheetTableTest = (props:
                                      {
                                          setPupilsAttendance: Dispatch<SetStateAction<AttendanceOfPupil[] | null>>,
                                          setClassroomId: Dispatch<SetStateAction<string>>
                                      }) => {
    const teacher = useContext(UserContext);
    // const {lessonId} = useParams();
    //
    const [classroomsOfTeacher, setClassroomsOfTeacher] = useState<null | Classroom[]>(null);
    const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
    const [pupils, setPupils] = useState<null | AttendanceOfPupil[]>(null);
    const setSelectedClassroomData = (classroom: Classroom) => {
        setSelectedClassroom(classroom);
        props.setClassroomId(classroom.id);
        getAttendanceOfPupils(classroom.id);
    }
    const fetchClassrooms = async () => {
        return API.graphql(graphqlOperation(classroomsOfTeacherQuery, {id: teacher?.email}));
    }
    const getClassroomsOfTeacher = () => {
        fetchClassrooms().then((result: any) => {
            const classrooms = result.data.getTeacher.classrooms.items.map((item: any) => item.classroom);
            setClassroomsOfTeacher(classrooms)
            setSelectedClassroomData(classrooms[0])
        })
    }
    const fetchPupils = async (classroomId: string) => {
        return API.graphql(graphqlOperation(getPupilsOfClassroomAttendanceQuery, {id: classroomId}))
    }
    const getAttendance = (data: any) => {
        return data.data.getClassroom.pupils.items?.map((item: any) => {
            const pupil = item.pupil;
            const attendanceOfPupil: AttendanceOfPupil = {
                id: pupil.id,
                attendanceId: 'dummy',
                firstName: pupil.firstName,
                lastName: pupil.lastName,
                newRecord: true,
                present: true,
                wasRewarded: false,
                score: 1,
                receivesTrophy: false
            }
            return attendanceOfPupil;
        });
    }
    const getAttendanceOfPupils = (classroomId: string) => {
        fetchPupils(classroomId).then((result: any) => {
            const pupils = getAttendance(result);
            setPupils(pupils);
            props.setPupilsAttendance(pupils);
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
            valueGetter: (params: GridValueGetterParams) =>
                `${params.getValue(params.id, 'firstName') || ''} ${
                    params.getValue(params.id, 'lastName') || ''
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

    const handleEditRowsModelChange = React.useCallback((model: GridEditRowsModel) => {
        // console.log('model' , model)
        // const newPupils = [pupils.filter(pupil => pupil?.id !== model.id)]
        // props.setPupilsAttendance([pupils])
    }, []);

    return (
        <>
            {classroomsOfTeacher && selectedClassroom &&
            <Box mb={1}>
                <SettingsPanel onApply={handleApplyClick} classrooms={classroomsOfTeacher}
                               selectedClassroom={selectedClassroom}/>
            </Box>
            }
            <DataGrid
                rows={pupils ?? []}
                columns={columns}
                autoHeight
                rowsPerPageOptions={[5, 25, 100]}
                pagination={true}
                loading={classroomsOfTeacher === null || pupils === null}
                components={{
                    Toolbar: GridToolbar,
                    LoadingOverlay: CustomLoadingOverlay,
                }}

                onEditRowsModelChange={handleEditRowsModelChange}
                componentsProps={{}}
                onCellEditCommit={(params, event, details) => {
                    console.log(params);
                    setPupils(prevState => {
                        const pupil = prevState?.find(pupil => pupil.id === params.id);
                        // @ts-ignore
                        pupil[params.field] = params.value;
                        return prevState;
                    })
                    // const attendanceOfPupil = pupils?.find(pupil => pupil.id === params.id) as AttendanceOfPupil;
                    // console.log(attendanceOfPupil);
                    // console.log(params)
                    // const res = API.graphql(graphqlOperation(updateAttendance, {
                    //     input: {
                    //         id: attendanceOfPupil.attendanceId,
                    //         [params.field]: params.value
                    //     }
                    // }))
                    // console.log(res);
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

export default AttendanceSheetTableTest;
