import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl, FormControlLabel, FormGroup,
    IconButton,
    Stack, Switch,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import Iconify from "../../../../components/Iconify";
import {CloseIcon} from "../../../../theme/overrides/CustomIcons";
import {RolePermissions} from "../../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {createRolePermissions, updateRolePermissions, updateUserRole} from "../../../../graphql/mutations";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "notistack";

const getPermissionsQuery = `query MyQuery($id: ID = "") {
  getUserRole(id: $id) {
    id
    name
    permissions {
      id
      canAccessAttendanceSheet
      canDeleteLessons
      canRateLessons
      canCreateLesson
      canUpdateLesson
      canUploadContent
      canViewContent
      canCreateSection
      canDeleteSection
      canUpdateSection
      canViewDashboard
      canManageOrganization
    }
  }
}`
type Props = {
    roleId: string,
    name: string
}
const RoleChangePermissionsDialog = ({roleId, name}: Props) => {
    const [open, setOpen] = React.useState(false);
    const [permissions, setPermissions] = useState<RolePermissions | null>(null);
    const [roleName, setRoleName] = useState(name);
    const [loading, setLoading] = useState(false);
    const snackbar = useSnackbar();
    const handleOpen = () => {
        setLoading(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const getPermissions = async () => {
            const result: any = await API.graphql(graphqlOperation(getPermissionsQuery, {id: roleId}))
            console.log(result)
            if (!result.data.getUserRole.permissions) {
                const resultOfAddingPermissions: any = await API.graphql(graphqlOperation(createRolePermissions, {
                    input: {
                        rolePermissionsRoleId: roleId,
                    }
                }));
                const permissions = resultOfAddingPermissions.data.createRolePermissions;
                await API.graphql(graphqlOperation(updateUserRole, {
                    input: {
                        id: roleId,
                        userRolePermissionsId: permissions.id,
                    }
                }))
                console.log('Created', permissions);
                setPermissions(permissions)
            } else {
                console.log(result);
                setPermissions(result.data.getUserRole.permissions);
            }
        }
        getPermissions();
        return () => {

        };
    }, []);

    function PermissionsSearch() {
        return (
            <Stack spacing={2} sx={{width: 'auto'}}>
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    options={[{label: 'Allow access attendance sheet of a lesson'}]}
                    disableClearable
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search permission"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
            </Stack>
        );
    }

    return (
        <div>
            <Tooltip title={'Edit permissions'}>
                <IconButton onClick={handleOpen} edge="end" aria-label="Edit permissions">
                    <Iconify icon={'eva:edit-outline'}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Amending Role
                    </Typography>
                </Toolbar>
                <DialogContent dividers>
                    <Card>
                        <CardContent>
                            <FormControl sx={{minWidth: ('calc(200px + 10vw)')}}>
                                <Stack direction='column' spacing={3}>
                                    {/*<PermissionsSearch/>*/}
                                    {permissions ?
                                        <>
                                            <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={'space-between'}>
                                                <TextField label={'Role Name'} value={roleName} onChange={event => {
                                                    setRoleName(event.target.value);
                                                }}>
                                                </TextField>
                                                <LoadingButton variant={'contained'} loading={loading} onClick={ async ()=>{
                                                    setLoading(true);
                                                    const result: any = await API.graphql(graphqlOperation(updateUserRole, {
                                                        input: {
                                                            id: roleId,
                                                            name: roleName,
                                                        }
                                                    }));
                                                    snackbar.enqueueSnackbar('Role name updated');
                                                    setLoading(false);
                                                }
                                                }>
                                                    Change Name
                                                </LoadingButton>
                                            </Stack>
                                            <FormGroup>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canAccessAttendanceSheet: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)
                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canAccessAttendanceSheet)}/>}
                                                                  label="Can access attendance sheet of a lesson"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canDeleteLessons: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canDeleteLessons)}/>}
                                                                  label="Can delete lessons"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canCreateLesson: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canCreateLesson)}/>}
                                                                  label="Can create lessons"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canUpdateLesson: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canUpdateLesson)}/>}
                                                                  label="Can update lessons"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canUploadContent: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canUploadContent)}/>}
                                                                  label="Can upload content"/>

                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canViewContent: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canViewContent)}/>}
                                                                  label="Can view content"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canCreateSection: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canCreateSection)}/>}
                                                                  label="Can create sections"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canDeleteSection: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canDeleteSection)}/>}
                                                                  label="Can delete sections"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canUpdateSection: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canUpdateSection)}/>}
                                                                  label="Can update sections"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canViewDashboard: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions.canViewDashboard)}/>}
                                                                  label="Can view dashboard"/>
                                                <FormControlLabel control={<Switch
                                                    onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                        console.log(permissions);
                                                        const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                            input: {
                                                                id: permissions.id,
                                                                canManageOrganization: event.target.checked,
                                                            }
                                                        }))
                                                        console.log(result)
                                                        setPermissions(result.data.updateRolePermissions)

                                                    }
                                                    }
                                                    defaultChecked={Boolean(permissions?.canManageOrganization ?? false)}/>}
                                                                  label="Can manage organization"/>

                                                {/*                            <FormControlLabel control={<Switch
                                                onChange={async (event: React.ChangeEvent<HTMLInputElement>) => {
                                                    console.log(permissions);
                                                    const result: any = await API.graphql(graphqlOperation(updateRolePermissions, {
                                                        input: {
                                                            id: permissions.id,
                                                            canRateLessons: event.target.checked,
                                                        }
                                                    }))
                                                    console.log(result)
                                                    setPermissions(result.data.updateRolePermissions)

                                                }
                                                }
                                                defaultChecked={Boolean(permissions.canRateLessons)}/>}
                                                              label="Allow rate lessons"/>*/}
                                            </FormGroup>
                                        </>
                                        :
                                        <CircularProgress/>
                                    }
                                </Stack>
                            </FormControl>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button color={'inherit'} variant={'contained'} onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


export default RoleChangePermissionsDialog;
