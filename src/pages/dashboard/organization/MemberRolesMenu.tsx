import {paramCase} from 'change-case';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
// @mui
import {MenuItem, IconButton, Checkbox, FormGroup, FormControlLabel, CardContent, Card, Container} from '@mui/material';
// routes
// components
import {Organization, RolesOfUser, UserRole} from "../../../API";
import Iconify from "../../../components/Iconify";
import MenuPopover from "../../../components/MenuPopover";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {useTheme} from "@mui/material/styles";
import {API, graphqlOperation} from "aws-amplify";
import {createRolesOfUser, deleteRolesOfUser} from "../../../graphql/mutations";

// ----------------------------------------------------------------------

type Props = {
    id: string,
    roles: RolesOfUser[],
    allRoles: UserRole[],
    updateUsers: any
};

export default function MemberRolesMenu({id, roles, allRoles, updateUsers}: Props) {
    const [open, setOpen] = useState<HTMLElement | null>(null);

    const theme = useTheme();
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
        updateUsers();
    };


    // const [addedRoles, setAddedRoles] = useState<RolesOfUser[]>([]);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Iconify icon={'mdi:account'} width={20} height={20}/>
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                arrow="right-top"
                sx={{
                    mt: -1,
                    width: 160,
                    background: 'background.neutral',
                    '& .MuiMenuItem-root': {px: 1, typography: 'body2', borderRadius: 0.75},
                }}
            >
                <Container>
                    <FormGroup>
                        {allRoles?.map(value =>
                            <FormControlLabel
                                key={value.id}
                                onChange={async (event, checked) => {
                                    if (checked) {
                                        const result: any = await API.graphql(graphqlOperation(createRolesOfUser, {
                                            input: {
                                                userInOrganizationID: id,
                                                userRoleID: value.id,
                                            }
                                        }))
                                        /*                                     setAddedRoles(prevState => {
                                                                                 const copy = [...prevState];
                                                                                 copy.push(result.data.createRolesOfUser);
                                                                                 return copy;
                                                                             })*/
                                        console.log(result);
                                    } else {
                                        const idToDelete = roles.find(role => role.userRole.id === value.id)?.id;
                                        console.log(idToDelete)
                                        if (idToDelete) {
                                            const result: any = await API.graphql(graphqlOperation(deleteRolesOfUser, {
                                                input: {
                                                    id: idToDelete,
                                                }
                                            }));
                                            /*                            setAddedRoles(prevState => {
                                                                            const copy = [...prevState];
                                                                            return copy.filter(value1 => value1.id !== result.data.deleteRolesOfUser);
                                                                        })
                                                                        console.log(result);*/
                                        }
                                    }
                                }}
                                control={<Checkbox
                                    defaultChecked={!!roles.find(role => role.userRole.id === value.id)}/>}
                                label={String(value.name)}
                            />)}

                    </FormGroup>
                </Container>
            </MenuPopover>
        </>
    );
}
