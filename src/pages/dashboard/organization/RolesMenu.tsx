import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Stack, TextField,
    Typography
} from "@mui/material";
import InviteMemberDialog from "./InviteMemberDialog";
import OrganizationMembersTable from "./OrganizationMembersTable";
import useSettings from "../../../hooks/useSettings";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {UserRole} from "../../../API";
import Iconify from "../../../components/Iconify";
import {LoadingButton} from "@mui/lab";
import {createUserRole, deleteUserRole} from "../../../graphql/mutations";


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
const RolesMenu = () => {
    const {themeStretch} = useSettings();
    const {organizationId} = useParams();
    const [roles, setRoles] = useState<UserRole[] | null>(null);
    const [roleText, setRoleText] = useState('');
    const [loading, setLoading] = useState(false);
    const addRoleToOrganization = async () => {
        if (!roleText) {
            return;
        }
        setLoading(true);
        try {
            const result: any = await API.graphql(graphqlOperation(createUserRole, {
                input: {
                    name: roleText,
                    organizationRolesId: organizationId,
                }
            }));
            setRoles(prevState => {
                if (prevState) {
                    const copy = [...prevState];
                    return [result.data.createUserRole, ...copy];
                } else {
                    return [result.data.createUserRole];
                }
            });
            setRoleText('');
            console.log(result)
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }
    const deleteRole = async (id: string) => {
        try {
            const result: any = await API.graphql(graphqlOperation(deleteUserRole, {
                input: {
                    id: id,
                }
            }))
            setRoles(prevState => {
                if (prevState) {
                    return prevState.filter(value => value.id !== result.data.deleteUserRole.id);
                }
                return prevState;
            })
        } catch (e) {
            console.error(e);
        }

    }
    const getRolesAsync = async () => {
        setRoles(null);
        const result: any = await API.graphql(graphqlOperation(getRolesQuery, {id: organizationId}));
        setRoles(result.data.getOrganization.roles.items);
    }
    useEffect(() => {
        getRolesAsync()
        return () => {

        };
    }, []);

    return (
        <Container maxWidth={themeStretch ? false : 'lg'}>

            <Stack sx={{mb: 2}} justifyContent={{sx: 'center', md: 'space-between'}}
                   direction={{sx: 'column', md: 'row'}}>
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                    <TextField required={true} value={roleText} onChange={event => setRoleText(event.target.value)}
                               label={'Create role'}/>
                    <LoadingButton onClick={addRoleToOrganization} loading={loading}
                                   variant={'contained'}>Add</LoadingButton>
                </Stack>

                <Typography variant={'h4'}>User roles in your organization</Typography>
            </Stack>
            <Card>
                <CardContent>

                    {roles ?
                        <List>
                            {roles.map(role => (
                                    <ListItem
                                        key={role.id}
                                        secondaryAction={
                                            <IconButton onClick={() => {
                                                deleteRole(role.id)
                                            }} edge="end" aria-label="delete">
                                                <Iconify icon={'mdi:delete'}/>
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={role.name}
                                        />
                                    </ListItem>
                                )
                            )
                            }
                        </List>
                        :
                        <Stack direction={'column'} spacing={1}>
                            {[0, 1, 2, 3, 4, 5].map(value => (
                                <Typography key={value} variant={'h4'}>
                                    <Skeleton variant={'text'}/>
                                </Typography>
                            ))}
                        </Stack>
                    }
                </CardContent>
            </Card>

        </Container>
    );
};

export default RolesMenu;
