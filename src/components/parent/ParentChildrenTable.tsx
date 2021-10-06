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
    createPupilClassroom, createPupilParent,
    createTeacherClassroom,
    deletePupilClassroom, deletePupilParent,
    deleteTeacherClassroom
} from "../../graphql/mutations";


const childrenOfParent = `query MyQuery($id: ID = "") {
  getParent(id: $id) {
    children {
      items {
        Pupil {
          firstName
          id
          lastName
          parents {
            items {
              id
            }
          }
        }
      }
    }
  }
}`
const schoolQuery =
    `query MyQuery($id: ID = "") {
  getSchool(id: $id) {
    Pupils(limit: 10000) {
      items {
        firstName
        id
        lastName
      }
    }
  }
}
`;


interface GridConfigOptions {
    type: 'all' | 'assignedToParent';
    showAlreadyAssigned: boolean;
}

interface GridToolbarContainerProps {
    settings: GridConfigOptions;
    onApply: (options: GridConfigOptions) => void;
}

function SettingsPanel(props: GridToolbarContainerProps) {
    const {onApply, settings} = props;

    const [typeOfPersons, setTypeOfPersons] = useState<'all' | 'assignedToParent'>(settings.type);
    const [showAlreadyAssigned, setShowAlreadyAssigned] = useState(settings.showAlreadyAssigned);

    const handleTypeOfPeopleChange = React.useCallback((event: any) => {
        setTypeOfPersons(event.target.value);
    }, []);
    const handleShowAlreadyAssigned = React.useCallback((event: any) => {
        setShowAlreadyAssigned(event.target.checked);
    }, []);
    const handleApplyChanges = React.useCallback(() => {
        onApply({
            type: typeOfPersons,
            showAlreadyAssigned: showAlreadyAssigned
        });
    }, [typeOfPersons, onApply, showAlreadyAssigned]);


    return (
        <FormGroup className="MuiFormGroup-options" row>
            <Stack direction={'row'} spacing={3}>
                <FormControl variant="standard">
                    <InputLabel>Type</InputLabel>
                    <Select value={typeOfPersons} onChange={handleTypeOfPeopleChange}>
                        <MenuItem value={'assignedToParent'}>Assigned To Parent</MenuItem>
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
    type: 'assignedToParent',
    showAlreadyAssigned: false,
}
const ParentChildrenTable = () => {
    const {parentId, id} = useParams();

    const [pupilsOfParent, setPupilsOfParent] = useState<null | Pupil[]>(null);
    const [allPupils, setAllPupils] = useState<null | Pupil[]>(null);

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
            setCurrentSet(allPupils?.filter(pupil => {
                return true;
                // if (settings.showAlreadyAssigned) {
                //     return true;
                // }
                // return pupil?.classrooms?.items?.length === 0
            }) ?? []);

        } else if (settings.type === 'assignedToParent') {
            setCurrentSet(pupilsOfParent);
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
        setPupilsOfParent(null);
        setAllPupils(null);
        const getChildrenOfParent = async () => {
            const result: any = await API.graphql(graphqlOperation(childrenOfParent, {id: parentId}));
            const pupils = result.data.getParent?.children.items.map((item: any) => item.Pupil);
            setPupilsOfParent(pupils);
        }
        const getAllPersons = async () => {
            const result: any = await API.graphql(graphqlOperation(schoolQuery, {id: id}));
            const allPupils = result.data.getSchool.Pupils.items;
            setAllPupils(allPupils);
        }
        await getAllPersons();
        await getChildrenOfParent();
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
    }, [pupilsOfParent, allPupils]);

    const addPersonsToClassrooms = async () => {
            await selectionModel?.forEach((id) => {
                const input = {
                    parentID: parentId,
                    pupilID: id
                };
                API.graphql(graphqlOperation(createPupilParent, {input}));
            });
    }
    const detachPupilsFromParent = async () => {
            await selectionModel?.forEach((id) => {
                const pupil = pupilsOfParent?.find((pupil: any) => pupil.id === id);
                console.log('removing row' + id)
                pupil?.parents?.items?.forEach((item: any) => {
                    try {
                        API.graphql(graphqlOperation(deletePupilParent, {input: {id: item.id}}))
                    } catch (error) {
                        console.log(error);
                    }
                })
            });
        setSelectionModel([]);
    }
    const CustomToolbar = () => {
        const buttonText = configOptions.type === 'all' ? 'Assign to Parent' : 'Detach from Parent'
        let buttonAction: () => Promise<any>;
        if (configOptions.type === 'assignedToParent') {
            buttonAction = detachPupilsFromParent;
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
            {pupilsOfParent &&
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
                loading={pupilsOfParent === null || allPupils === null}
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
                    if (configOptions.type === 'assignedToParent') {
                        return true;
                    }

                    return pupilsOfParent?.find((pupil: any) => pupil.id === params.id) === undefined;

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
export default ParentChildrenTable;