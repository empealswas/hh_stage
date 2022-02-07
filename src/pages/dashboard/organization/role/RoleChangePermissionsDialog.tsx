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
import {createRolePermissions, updateRolePermissions} from "../../../../graphql/mutations";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const getPermissionsQuery = `query MyQuery($id: ID = "") {
  getUserRole(id: $id) {
    id
    permissions {
      id
      canAccessAttendanceSheet
    }
  }
}`
type Props = {
    roleId: string,
    name: string
}
const RoleChangePermissionsDialog = ({roleId, name}: Props) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState<RolePermissions | null>(null);
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
                console.log('Created', resultOfAddingPermissions.data.createRolePermissions);
                setPermissions(resultOfAddingPermissions.data.createRolePermissions)
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
                        Permissions of role {name}
                    </Typography>
                </Toolbar>
                <DialogContent dividers>
                    <Card>
                        <CardContent>
                            <FormControl sx={{minWidth: ('calc(200px + 10vw)')}}>
                                <Stack direction='column' spacing={3}>
                                    <PermissionsSearch/>
                                    {permissions ?
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
                                                    setPermissions(result.data.updateRolePermissions);
                                                }
                                                }
                                                defaultChecked={Boolean(permissions.canAccessAttendanceSheet)}/>}
                                                              label="Allow access attendance sheet of a lesson"/>
                                        </FormGroup>
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
