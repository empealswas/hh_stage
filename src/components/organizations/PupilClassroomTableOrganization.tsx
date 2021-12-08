import React, {useEffect, useState} from 'react';
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    GridSelectionModel,
    GridToolbar,
    GridToolbarContainer,
    GridValueGetterParams,
} from '@material-ui/data-grid';
import {Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select} from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {Pupil, Teacher} from "../../API";
import CustomLoadingOverlay from "../../utils/CustomLoadingOverlay";
import {FormControlLabel, Stack, Switch} from "@mui/material";
import {
    createPupilClassroom,
    createTeacherClassroom,
    deletePupilClassroom,
    deleteTeacherClassroom
} from "../../graphql/mutations";


const getPupilsQuery = `query MyQuery($id: ID = "") {
  getClassroom(id: $id) {
    pupils(limit: 10000) {
      items {
        id
        pupil {
          classrooms(classroomID: {eq: $id}) {
            items {
              id
            }
          }
          id
          firstName
          lastName
        }
      }
    }
    teachers(limit: 10000) {
      items {
        id
        teacher {
          classrooms(classroomID: {eq: $id}) {
            items {
              id
            }
          }
          firstName
          id
          lastName
          email
        }
      }
    }
  }
}`
const schoolQuery =
    `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    AcceptedPupils {
      items {
        pupil {
          id
          firstName
          lastName
          classrooms {
            items {
              id
            }
          }
        }
      }
    }
    Teachers {
      items {
        teacher {
          id
          firstName
          lastName
          classrooms {
            items {
              id
            }
          }
        }
      }
    }
  }
}

`;


interface GridConfigOptions {
    currentSet: 'pupils' | 'teachers';
    type: 'all' | 'inThatClassroom';
    showAlreadyAssigned: boolean;
}

interface GridToolbarContainerProps {
    settings: GridConfigOptions;
    onApply: (options: GridConfigOptions) => void;
}

function SettingsPanel(props: GridToolbarContainerProps) {
    const {onApply, settings} = props;

    const [currentSet, setCurrentSet] = useState<'pupils' | 'teachers'>(settings.currentSet);
    const [typeOfPersons, setTypeOfPersons] = useState<'all' | 'inThatClassroom'>(settings.type);
    const [showAlreadyAssigned, setShowAlreadyAssigned] = useState(settings.showAlreadyAssigned);
    const handleDatasetChange = React.useCallback((event: any) => {
        setCurrentSet(event.target.value);
    }, []);
    const handleTypeOfPeopleChange = React.useCallback((event: any) => {
        setTypeOfPersons(event.target.value);
    }, []);
    const handleShowAlreadyAssigned = React.useCallback((event: any) => {
        setShowAlreadyAssigned(event.target.checked);
    }, []);
    const handleApplyChanges = React.useCallback(() => {
        onApply({
            currentSet: currentSet,
            type: typeOfPersons,
            showAlreadyAssigned: showAlreadyAssigned
        });
    }, [currentSet, typeOfPersons, onApply, showAlreadyAssigned]);


    return (
        <FormGroup className="MuiFormGroup-options" row>
            <Stack direction={'row'} spacing={3}>
                <FormControl variant="standard">
                    <InputLabel>Persons</InputLabel>
                    <Select value={currentSet} onChange={handleDatasetChange}>
                        <MenuItem key={'teachers'} value={'teachers'}>Teachers</MenuItem>
                        <MenuItem key={'pupils'} value={'pupils'}>Pupils</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel>Type</InputLabel>
                    <Select value={typeOfPersons} onChange={handleTypeOfPeopleChange}>
                        <MenuItem value={'inThatClassroom'}>In That Classroom</MenuItem>
                        <MenuItem value={'all'}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Switch inputProps={{'aria-label': 'controlled'}} checked={showAlreadyAssigned}
                                     onChange={handleShowAlreadyAssigned}/>}
                    label={showAlreadyAssigned ? 'All' : 'Not Assigned'}/>
                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={handleApplyChanges}
                    sx={{ml: 2}}
                >
                    <KeyboardArrowRightIcon fontSize="small"/> Apply
                </Button>
            </Stack>
        </FormGroup>
    )
}

const initialConfigOptions: GridConfigOptions = {
    type: 'inThatClassroom',
    currentSet: 'pupils',
    showAlreadyAssigned: false,
}
const PupilClassroomTableOrganization = (props:
                                 {}
) => {
    const {classroomId, organizationId} = useParams();

    const [pupils, setPupils] = useState<null | Pupil[]>(null);
    const [teachers, setTeachers] = useState<null | Teacher[]>(null);
    const [allPupils, setAllPupils] = useState<null | Pupil[]>(null);
    const [allTeachers, setAllTeachers] = useState<null | Teacher[]>(null);

    const [configOptions, setConfigOptions] = useState<GridConfigOptions>(initialConfigOptions);
    const [currentSet, setCurrentSet] = useState<Teacher[] | Pupil[] | null>(null);
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0.5},
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            flex: 1,
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
    ];


    function applySettings(settings: GridConfigOptions) {
        if (settings.type === 'all') {
            if (settings.currentSet === 'pupils') {
                setCurrentSet(allPupils?.filter(pupil => {
                    if (settings.showAlreadyAssigned) {
                        return true;
                    }
                    return pupil?.classrooms?.items?.length === 0
                }) ?? []);
            } else if (settings.currentSet === 'teachers') {
                setCurrentSet(allTeachers?.filter(teacher => {
                    if (settings.showAlreadyAssigned) {
                        return true;
                    }
                    return teacher?.classrooms?.items?.length === 0
                }) ?? []);
            }
        } else if (settings.type === 'inThatClassroom') {
            if (settings.currentSet === 'teachers') {
                setCurrentSet(teachers);
            } else if (settings.currentSet === 'pupils') {
                setCurrentSet(pupils);
            }
        }
    }

    const handleApplyClick = (settings: GridConfigOptions) => {
        console.log(settings);
        setConfigOptions(settings);
        applySettings(settings);
    };
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const refreshTable = async () => {
        setSelectionModel([]);
        setPupils(null);
        setAllPupils(null);
        const getPersonsInThatClassroom = async () => {
            const result: any = await API.graphql(graphqlOperation(getPupilsQuery, {id: classroomId}));
            const pupils = result.data.getClassroom?.pupils.items.map((item: any) => item.pupil);
            const teachers = result.data.getClassroom?.teachers.items.map((item: any) => item.teacher);
            setPupils(pupils);
            setTeachers(teachers);
        }
        const getAllPersons = async () => {
            const result: any = await API.graphql(graphqlOperation(schoolQuery, {id: organizationId}));
            const allPupils = result.data.getOrganization.AcceptedPupils.items.map((item: any) => item.pupil);
            const allTeachers = result.data.getOrganization?.Teachers.items.map((item: any) => item.teacher);
            setAllPupils(allPupils);
            setAllTeachers(allTeachers);
        }
        await getAllPersons();
        await getPersonsInThatClassroom();
    };
    useEffect(() => {
        refreshTable();
        return () => {

        };
    }, []);
    useEffect(() => {
        applySettings(configOptions);

        return () => {

        };
    }, [pupils, teachers, allPupils, allTeachers]);

    const addPersonsToClassrooms = async () => {
        if (configOptions.currentSet === 'pupils') {
            await selectionModel?.forEach((id) => {
                const input = {
                    classroomID: classroomId,
                    pupilID: id
                };
                API.graphql(graphqlOperation(createPupilClassroom, {input}));
            });
        } else {
            await selectionModel?.forEach((id) => {
                const input = {
                    classroomID: classroomId,
                    teacherID: id
                };
                try {
                    API.graphql(graphqlOperation(createTeacherClassroom, {input}));
                } catch (e) {
                    console.log(e)
                }
            });
        }
    }
    const removePersonsFromClassrooms = async () => {
        if (configOptions.currentSet === 'pupils') {
            await selectionModel?.forEach((id) => {
                const pupil = pupils?.find((pupil: any) => pupil.id === id);
                console.log('removing row' + id)
                pupil?.classrooms?.items?.forEach((item: any) => {
                    try {
                        API.graphql(graphqlOperation(deletePupilClassroom, {input: {id: item.id}}))
                    } catch (error) {
                        console.log(error);
                    }
                })
            });
        } else if (configOptions.currentSet === 'teachers') {
            await selectionModel?.forEach((id) => {
                console.log(id);
                const teacher = teachers?.find(teacher => teacher.id === id);
                console.log('teacher', teacher)
                teacher?.classrooms?.items?.forEach((item: any) => API.graphql(graphqlOperation(deleteTeacherClassroom, {input: {id: item.id}})))
            });
        }

        setSelectionModel([]);
    }
    const CustomToolbar = () => {
        const buttonText = configOptions.type === 'all' ? 'Add to Classroom' : 'Remove from Classroom'
        let buttonAction: () => Promise<any>;
        if (configOptions.type === 'inThatClassroom') {
            buttonAction = removePersonsFromClassrooms;
        } else {
            buttonAction = addPersonsToClassrooms;
        }
        //

        return (
            <GridToolbarContainer style={{justifyContent: 'space-between'}}>
                <Button onClick={() => {
                    buttonAction().then(value => {
                        refreshTable();
                    })
                }}
                        size={'small'}
                        color={configOptions.type === 'all' ? 'success' : 'error'}
                        variant={'contained'}
                        disabled={selectionModel.length === 0}

                >{buttonText}</Button>
                <GridToolbar/>
            </GridToolbarContainer>
        );
    }
    return (
        <>
            {pupils &&
            <Box mb={1}>
                <SettingsPanel onApply={handleApplyClick} settings={configOptions ?? initialConfigOptions}/>
            </Box>
            }
            <DataGrid
                rows={[...currentSet ?? []]}
                columns={columns}
                autoPageSize={true}
                pageSize={10}
                autoHeight
                rowsPerPageOptions={[5]}
                loading={pupils === null || teachers === null || allPupils === null || allTeachers === null}
                onSelectionModelChange={(newSelectionModel) => {
                    console.log(newSelectionModel)
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}

                components={{
                    Toolbar: CustomToolbar,
                    LoadingOverlay: CustomLoadingOverlay,
                }}
                isRowSelectable={(params: GridRowParams) => {
                    if (configOptions.type === 'inThatClassroom') {
                        return true;
                    }
                    if (configOptions.currentSet === 'pupils') {
                        return pupils?.find((pupil: any) => pupil.id === params.id) === undefined;
                    } else {
                        return teachers?.find(teacher => teacher.id === params.id) === undefined;
                    }
                }}
                componentsProps={{}}
                onCellEditCommit={(params, event, details) => {
                    // const attendanceOfPupil = pupils?.find(pupil => pupil.id === params.id) as AttendanceOfPupil;
                    // console.log(attendanceOfPupil);
                    // console.log(params)
                    // API.graphql(graphqlOperation(updateAttendance, {
                    //     input: {
                    //         id: attendanceOfPupil.attendanceId,
                    //         [params.field]: params.value
                    //     }
                    // }))
                }}
                checkboxSelection
                disableSelectionOnClick
            />
        </>
    );
}
export default PupilClassroomTableOrganization;
