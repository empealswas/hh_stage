import * as Yup from 'yup'
import React, {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import Iconify from "../../../components/Iconify";
import {CloseIcon} from "../../../theme/overrides/CustomIcons";
import {LoadingButton} from "@mui/lab";
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {FormProvider, RHFTextField,} from '../../../components/hook-form';
import {useSnackbar} from "notistack";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {getUser} from "../../../graphql/queries";
import {createUserInOrganization} from "../../../graphql/mutations";
import {UserInOrganizationStatus as Status} from 'src/API';

const checkIfUserAlreadyInOrganizationQuery = `query MyQuery($id: ID = "", $eq: ID = "") {
  getOrganization(id: $id) {
    members(filter: {userID: {eq: $eq}}) {
      items {
        id
      }
    }
  }
}
`


type InviteUser = {
    email: string,
}

const InviteMemberDialog = () => {
    const [open, setOpen] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const {organizationId} = useParams();

//
    const handleClose = () => {
        setOpen(false);
    };
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const InviteMemberSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email(),
    })
    const defaultValues: InviteUser = {
        email: '',
    }
    const methods = useForm<InviteUser>({
        resolver: yupResolver(InviteMemberSchema),
        defaultValues,
    });
    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    const onSubmit = async (data: InviteUser) => {
        try {
            setMessage('');
            setError('');
            console.log(data);
            const result: any = await API.graphql(graphqlOperation(checkIfUserAlreadyInOrganizationQuery, {
                id: organizationId,
                eq: data.email
            }))
            console.log(result);
            if (result.data.getOrganization.members.items.length > 0) {
                setError(`User with email ${data.email} is already in the organization`)
                return;
            }
            //check if user does not exist.
            const userExistResult: any = await API.graphql(graphqlOperation(getUser, {id: data.email}));
            console.log(userExistResult);
            if (!userExistResult.data.getUser) {
                setError(`There is no user in the system with email ${data.email}, or their profile is not public`);
                return;
            }
            //add user to organization.
            const userAddToOrganizationResult: any = await API.graphql(graphqlOperation(createUserInOrganization, {
                input: {
                    userID: data.email,
                    status: Status.WAITING_FOR_USER_TO_APPROVE,
                    organizationID: organizationId,
                }
            }))
            console.log(userAddToOrganizationResult);
            setMessage(`Invite was successfully sent to ${data.email}`);
            enqueueSnackbar('Invite was sent!');
            reset();
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };
    return (
        <>
            <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'}/>}
                onClick={() => {
                    setOpen(true)
                }}
            >
                Invite Member
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            Add new member to organization
                        </Typography>
                    </Toolbar>
                    <DialogContent dividers>
                        <Stack direction={'column'} spacing={2}>
                            <Box color={'background.neutural'}>
                                <Stack direction='column' spacing={3}>
                                    <RHFTextField name="email" label="Email"/>
                                </Stack>
                            </Box>
                            {error && <Alert severity={'error'}>{error}</Alert>}
                            {message && <Alert severity={'success'}>{message}</Alert>}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button color={'inherit'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                            Invite
                        </LoadingButton>

                    </DialogActions>
                </FormProvider>
            </Dialog>
        </>
    );
};

export default InviteMemberDialog;



