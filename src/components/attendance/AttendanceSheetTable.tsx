import React, {useContext, useEffect, useState} from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector, GridValueGetterParams, GridToolbar, GridColDef,
} from '@material-ui/data-grid';
import {Box, Button, Checkbox, FormControl, FormGroup, InputLabel, MenuItem, Rating, Select} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Icon} from '@iconify/react';
import trophyOutline from '@iconify/icons-mdi/trophy-outline';
import trophyIcon from '@iconify/icons-mdi/trophy';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {UserContext} from "../../App";
import {Attendance, Classroom, Pupil} from "../../API";
import CustomLoadingOverlay from "../../utils/CustomLoadingOverlay";
import {renderRating, renderRatingEditInputCell} from "./PerformanceStars";



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
    firstName: string,
    lastName: string,
    present: boolean,
    score: number,
    receivesTrophy: boolean,
    newRecord: boolean,
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
            }
          }
        }
      }
    }
  }
}
`


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

const AttendanceSheetTable = (props: {}) => {
    const teacher = useContext(UserContext);
    const {lessonId} = useParams();
    const [classroomsOfTeacher, setClassroomsOfTeacher] = useState<null | Classroom[]>(null);
    const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
    const [pupils, setPupils] = useState<null | AttendanceOfPupil[]>(null);
    const setSelectedClassroomData = (classroom: Classroom) => {
        setSelectedClassroom(classroom);
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
        console.log(selectedClassroom?.id)
        console.log(lessonId);
        return API.graphql(graphqlOperation(getPupilsOfClassroomAttendanceQuery, {id: classroomId, eq: lessonId}))
    }
    const getAttendanceOfPupils = (classroomId: string) => {
        fetchPupils(classroomId).then((result: any) => {
            const attendanceOfPupils: AttendanceOfPupil[] = result.data.getClassroom.pupils.items?.map((item: any) => {
                const pupil = item.pupil;
                const noPreviousRecordsOfAttendance = pupil.Attendances?.items?.length === 0;
                const [attendanceInLesson] = pupil.Attendances?.items as Attendance[]
                const attendanceOfPupil: AttendanceOfPupil = {
                    id: pupil.id,
                    firstName: pupil.firstName,
                    lastName: pupil.lastName,
                    newRecord: noPreviousRecordsOfAttendance,
                    present: noPreviousRecordsOfAttendance ? true : attendanceInLesson?.present ?? true,
                    score: 1,
                    receivesTrophy: false
                }
                return attendanceOfPupil;
            })
            setPupils(attendanceOfPupils);
        })
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0.4},
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
        {
            field: 'score',
            headerName: 'Score',
            flex: 1.3,
            renderCell: renderRating,
            renderEditCell: renderRatingEditInputCell,
            editable: true
        },
        {
            field: 'reward',
            headerName: 'Reward',
            align: 'center',
            headerAlign: 'center',
            flex: 0.7,
            editable: true,
            renderEditCell: params => {
                return (
                    <Checkbox value={params.getValue(params.id, 'reward') as boolean} color={'warning'}
                              icon={<Icon icon={trophyOutline} height={30} width={30}/>}
                              checkedIcon={<Icon icon={trophyIcon} height={30} width={30}/>}/>
                )
            },
            renderCell: (params) => {
                const hasReward = params.getValue(params.id, 'reward') as boolean;
                return <Icon color={'orange'} icon={hasReward ? trophyIcon : trophyOutline} height={30} width={30}/>
            }
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
            {classroomsOfTeacher && selectedClassroom &&
            <Box mb={1}>
                <SettingsPanel onApply={handleApplyClick} classrooms={classroomsOfTeacher}
                               selectedClassroom={selectedClassroom}/>
            </Box>
            }
            {}
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
                    console.log(params);
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
