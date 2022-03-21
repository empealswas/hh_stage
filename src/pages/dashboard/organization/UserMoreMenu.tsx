import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import {MenuItem, IconButton, Tooltip, Divider, CircularProgress} from '@mui/material';
// routes
// components
import {Organization, UserInOrganization} from "../../../API";
import Iconify from "../../../components/Iconify";
import MenuPopover from "../../../components/MenuPopover";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {API, graphqlOperation} from "aws-amplify";
import {deleteUserInOrganization, deleteUserInOrganizationInClassroom} from "../../../graphql/mutations";
import {useSnackbar} from "notistack";

// ----------------------------------------------------------------------

type Props = {
    id: string,
    setMembers: React.Dispatch<React.SetStateAction<UserInOrganization[] | null>>,
};
const deleteFromClassroom = `query MyQuery($eq: ID = "") {
  listUserInOrganizationInClassrooms(limit: 10000000, filter: {userInOrganizationID: {eq: $eq}}) {
    items {
      id
    }
  }
}
`
const deleteQuery = `mutation MyMutation($id: ID = "") {
  deleteUserInOrganization(input: {id: $id}) {
    classrooms {
      items {
        id
      }
    }
  }
}`

export default function UserMoreMenu({id, setMembers}: Props) {
    const [open, setOpen] = useState<HTMLElement | null>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };
    const snackbar = useSnackbar();
    const [loading, setLoading] = useState(false);
    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };
    const removeUserFromOrganization = async () => {
        setLoading(true);
        try {
            const result: any = await API.graphql(graphqlOperation(deleteQuery, {
                id: id
            }))
            for (const classroom of result.data.deleteUserInOrganization.classrooms.items) {
                await API.graphql(graphqlOperation(deleteFromClassroom, {
                    id: classroom.id
                }))
            }


            console.log(result);
            snackbar.enqueueSnackbar('User was removed from the organization');
            setMembers(prevState => {
                return prevState?.filter(item => item.id !== id) ?? prevState;
            })
            handleClose();
        } catch (e) {
            console.error(e);
            snackbar.enqueueSnackbar(e.message, {});
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Tooltip title={'More'}>
                <IconButton onClick={handleOpen}>
                    <Iconify icon={'eva:more-vertical-fill'} width={20} height={20}/>
                </IconButton>
            </Tooltip>

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
                    '& .MuiMenuItem-root': {px: 1, typography: 'body2', borderRadius: 0.75},
                }}
            >

                {/*<Divider sx={{borderStyle: 'dashed'}}/>*/}
                {loading ?
                    <CircularProgress/>
                    :
                    <MenuItem onClick={removeUserFromOrganization} sx={{color: 'error.main'}}>
                        <Iconify icon={'eva:person-delete-outline'} sx={{...ICON}}/>
                        Remove
                    </MenuItem>

                }

            </MenuPopover>
        </>
    );
}
