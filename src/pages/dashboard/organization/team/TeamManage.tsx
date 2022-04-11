import React, {useEffect, useState} from 'react';

import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";

import {
    Box,
    Button, Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch, TextField
} from "@mui/material";

import {UserInOrganization, UserRole} from "../../../../API";
import {
    createUserInOrganizationInClassroom,
    deleteUserInOrganizationInClassroom,
    updateClassroom
} from "../../../../graphql/mutations";
import CustomLoadingOverlay from "../../../../components/section/lesson/attendance/CustomLoadingOverlay";
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    GridSelectionModel,
    GridToolbar, GridToolbarContainer,
    GridValueGetterParams
} from "@mui/x-data-grid";
import Iconify from "../../../../components/Iconify";
import LoadingScreen from "../../../../components/LoadingScreen";
import useSettings from "../../../../hooks/useSettings";
import {getClassroom} from "../../../../graphql/queries";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "notistack";

const getRolesQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    roles {
      items {
        id
        name
      }
    }
  }
}`;
const getPupilsQuery = `query MyQuery($id: ID = "") {
  getClassroom(id: $id) {
    members(limit: 10000) {
      items {
        userInOrganization {
          id
          roles {
            items {
              id
              userRole {
                id
                name
              }
            }
          }
          user {
            lastName
            id
            firstName
          }
          classrooms {
            items {
              classroomID
              id
            }
          }
        }
      }
    }
  }
}
`
const schoolQuery =
    `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    members(limit: 100000) {
      items {
        id
        user {
          id
          firstName
          lastName
          email
          createdAt
        }
        roles {
          items {
            userRole {
              id
              name
            }
          }
        }
        classrooms {
          items {
            id
          }
        }
      }
    }
  }
}
`;


interface GridConfigOptions {
    currentRole: UserRole;
    allRoles: UserRole[];
    type: 'all' | 'inThatClassroom';
    showAlreadyAssigned: boolean;
}

interface GridToolbarContainerProps {
    settings: GridConfigOptions;
    onApply: (options: GridConfigOptions) => void;
}

function SettingsPanel(props: GridToolbarContainerProps) {
    const {onApply, settings} = props;

    const [currentSet, setCurrentSet] = useState<UserRole>(settings.currentRole);
    const [typeOfPersons, setTypeOfPersons] = useState<'all' | 'inThatClassroom'>(settings.type);
    const [showAlreadyAssigned, setShowAlreadyAssigned] = useState(settings.showAlreadyAssigned);
    const handleDatasetChange = React.useCallback((event: any) => {
        let userRole = settings.allRoles?.find(value => value.id === event.target.value);
        if (userRole) {
            setCurrentSet(userRole);
        }
    }, []);
    const handleTypeOfPeopleChange = React.useCallback((event: any) => {
        setTypeOfPersons(event.target.value);

    }, []);
    const handleShowAlreadyAssigned = React.useCallback((event: any) => {
        setShowAlreadyAssigned(event.target.checked);

    }, []);
    const handleApplyChanges = React.useCallback(() => {
        onApply({
            currentRole: currentSet,
            allRoles: settings?.allRoles,
            type: typeOfPersons,
            showAlreadyAssigned: showAlreadyAssigned
        });
    }, [currentSet, typeOfPersons, onApply, showAlreadyAssigned]);
    useEffect(() => {
        handleApplyChanges();
        return () => {

        };
    }, [currentSet, typeOfPersons, showAlreadyAssigned]);

    if (!settings || !settings.allRoles || !settings.currentRole || !currentSet) {
        return (
            <></>
        );
    }
    return (
        <FormGroup className="MuiFormGroup-options" row>
            <Stack direction={'row'} spacing={3}>
                <FormControl variant="standard">
                    <InputLabel>Roles</InputLabel>
                    <Select disabled={typeOfPersons === 'inThatClassroom'} value={currentSet.id}
                            onChange={handleDatasetChange}>
                        {settings?.allRoles.map(role => (
                            <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel>Type</InputLabel>
                    <Select value={typeOfPersons} onChange={handleTypeOfPeopleChange}>
                        <MenuItem value={'inThatClassroom'}>In That Team</MenuItem>
                        <MenuItem value={'all'}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Switch disabled={typeOfPersons === 'inThatClassroom'}
                                     inputProps={{'aria-label': 'controlled'}} checked={showAlreadyAssigned}
                                     onChange={handleShowAlreadyAssigned}/>}
                    label={showAlreadyAssigned ? 'All' : 'Not Assigned'}/>
                {/*                <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={handleApplyChanges}
                    sx={{ml: 2}}
                >
                    <Iconify icon={'eva:arrow-ios-forward-fill'} sx={{width: 20, height: 20}}/> Apply
                </Button>*/}
            </Stack>
        </FormGroup>
    );
}


const TeamManage = () => {
    const {teamId, organizationId} = useParams();
    const settings = useSettings();
    const [usersInThatTeam, setUsersInThatTeam] = useState<null | UserInOrganization[]>(null);
    const [allUsersInOrganization, setAllUsersInOrganization] = useState<null | UserInOrganization[]>(null);
    const [rolesInOrganization, setRolesInOrganization] = useState<UserRole[] | null>(null);
    const [team, setTeam] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);
    const snackbar = useSnackbar();
    const [configOptions, setConfigOptions] = useState<GridConfigOptions | null>(null);
    const [currentSet, setCurrentSet] = useState<UserInOrganization[] | null>(null);

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
                `${params.row.firstName} ${params.row.lastName}`,
        },
    ];


    function applySettings(settings: GridConfigOptions) {
        if (settings.type === 'all') {
            setCurrentSet(allUsersInOrganization
                ?.filter((member) => member?.roles?.items.map(value => value?.userRole)
                    .find(value => value?.id === settings?.currentRole?.id) !== undefined)
                .filter((member) => {
                    if (settings.showAlreadyAssigned) {
                        return true;
                    }
                    return member?.classrooms?.items?.length === 0;
                }) ?? []);

        } else if (settings.type === 'inThatClassroom') {
            setCurrentSet(usersInThatTeam);
        }
    }

    const handleApplyClick = (settings: GridConfigOptions) => {
        console.log(settings);
        setConfigOptions(settings);
        applySettings(settings);
    };
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const getRolesAsync = async () => {
        setRolesInOrganization(null);
        const result: any = await API.graphql(graphqlOperation(getRolesQuery, {id: organizationId}));

        const roles = result.data.getOrganization.roles.items;
        setRolesInOrganization(roles);
    };
    const refreshTable = async () => {
        setSelectionModel([]);
        setUsersInThatTeam(null);
        setAllUsersInOrganization(null);
        const getPersonsInThatClassroom = async () => {
            const result: any = await API.graphql(graphqlOperation(getPupilsQuery, {id: teamId}));
            const members = result.data.getClassroom?.members.items.map((item: any) => item.userInOrganization);
            console.log(members);
            setUsersInThatTeam(members);
        }
        const getAllPersons = async () => {
            const result: any = await API.graphql(graphqlOperation(schoolQuery, {id: organizationId}));
            const allMembers = result.data.getOrganization.members.items;
            console.log('All', allMembers);
            setAllUsersInOrganization(allMembers);
        }
        await getAllPersons();
        await getPersonsInThatClassroom();
        await getRolesAsync();
    };
    useEffect(() => {
        const getTeamAsync = async () => {
            const result: any = await API.graphql(graphqlOperation(getClassroom, {id: teamId}))
            setTeamName(result.data.getClassroom.name);
            setTeam(result.data.getClassroom);
        };
        getTeamAsync();
        getRolesAsync()
        return () => {

        };
    }, []);

    useEffect(() => {
        refreshTable();
        return () => {

        };
    }, []);
    useEffect(() => {
        if (!configOptions && usersInThatTeam && allUsersInOrganization && rolesInOrganization) {
            let config: GridConfigOptions = {
                currentRole: rolesInOrganization[0],
                showAlreadyAssigned: true,
                allRoles: rolesInOrganization,
                type: 'inThatClassroom',
            };
            setConfigOptions(config)
            applySettings(config);
        }


        return () => {

        };
    }, [usersInThatTeam, allUsersInOrganization, rolesInOrganization]);
    useEffect(() => {
        if (configOptions) {
            applySettings(configOptions);
        }

        return () => {

        };
    }, [usersInThatTeam, allUsersInOrganization, rolesInOrganization]);

    const addPersonsToClassrooms = async () => {
        await selectionModel?.forEach((id) => {
            const input = {
                classroomID: teamId,
                userInOrganizationID: id
            };
            API.graphql(graphqlOperation(createUserInOrganizationInClassroom, {input}));
        });
    }
    const removePersonsFromClassrooms = async () => {
        await selectionModel?.forEach((id) => {
            const member = usersInThatTeam?.find((pupil: any) => pupil.id === id);
            console.log('removing row' + id)
            console.log("Member", member);
            member?.classrooms?.items?.forEach((item: any) => {
                if (item.classroomID !== teamId) {
                    return;
                }
                try {
                    API.graphql(graphqlOperation(deleteUserInOrganizationInClassroom, {input: {id: item.id}}))
                } catch (error) {
                    console.log(error);
                }
            })
        });

        setSelectionModel([]);
    }
    const CustomToolbar = () => {
        if (!configOptions) {
            return (
                <></>
            );
        }
        const buttonText = configOptions.type === 'all' ? 'Add to the team' : 'Remove from the team';
        let buttonAction: () => Promise<any>;
        if (configOptions.type === 'inThatClassroom') {
            buttonAction = removePersonsFromClassrooms;
        } else {
            buttonAction = addPersonsToClassrooms;
        }
        //

        return (
            <GridToolbarContainer style={{justifyContent: 'space-between', padding: 5}}>
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
                <GridToolbar style={{height: 'auto', padding: 0, paddingInline: 10}}/>
            </GridToolbarContainer>
        );
    }
    if (!configOptions) {
        return (
            <LoadingScreen/>);

    }
    return (
        <Stack direction={'column'} spacing={2}>
            {teamName &&
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>

                <TextField value={teamName} onChange={event => {
                    setTeamName(event.target.value);
                }
                } label={'Team Name'}>
                </TextField>
                    <LoadingButton variant={'contained'} loading={loading} onClick={async () => {
                        setLoading(true);
                        await API.graphql(graphqlOperation(updateClassroom, {
                            input: {
                                id: teamId,
                                name: teamName,
                            }
                        }))
                        snackbar.enqueueSnackbar("Team name updated");
                        setLoading(false);
                    }
                    }>
                        Change Name
                    </LoadingButton>
                </Stack>

            }
            {usersInThatTeam &&
                <Box mb={1}>
                    <SettingsPanel onApply={handleApplyClick} settings={configOptions}/>
                </Box>
            }
            <DataGrid
                rows={[...currentSet?.map(value => {
                    return {
                        id: value.id,
                        firstName: value.user?.firstName,
                        lastName: value.user?.lastName,
                    }
                }) ?? []]}
                columns={columns}
                autoPageSize={true}
                pageSize={10}
                autoHeight
                rowsPerPageOptions={[5]}
                loading={usersInThatTeam === null || allUsersInOrganization === null || rolesInOrganization === null}
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
                    if (configOptions?.type === 'inThatClassroom') {
                        return true;
                    }
                    return usersInThatTeam?.find((pupil: any) => pupil.id === params.id) === undefined;
                }}
                componentsProps={{}}

                checkboxSelection
                disableSelectionOnClick
            />
        </Stack>
    );
}
export default TeamManage;
