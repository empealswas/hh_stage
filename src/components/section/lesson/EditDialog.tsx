import React, {ReactNode, useState} from 'react';
import Icon from "@iconify/react";

import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton, Stack,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import Iconify from "../../Iconify";
import {CloseIcon} from "../../../theme/overrides/CustomIcons";
import {LoadingButton} from "@mui/lab";

type EditDialogType = {
    title: string,
    children?: ReactNode,
    onSubmit: () => Promise<any>,
    isValid: boolean,
    open?: boolean,
}
const EditDialog = (props: EditDialogType) => {

    const [open, setOpen] = React.useState(props.open ?? false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleOpen = () => {
        setLoading(false);
        setSuccess(false);
        setError(false);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onSubmitDialog = () => {
        if (!props.isValid) {
            return;
        }
        setLoading(true);
        props.onSubmit()
            .then(
                value => {
                    setSuccess(true);
                handleClose()
                }
            ).catch(error => {
            console.log(error);
            setError(true);
            setSuccess(false);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div>
            <Tooltip title={'Edit'}>
                <IconButton onClick={handleOpen}>
                    <Iconify icon={'eva:edit-outline'} sx={{fontSize: 30}}/>

                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <Toolbar sx={{alignContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        {props.title}
                    </Typography>
                </Toolbar>
                <Form autoComplete="off" noValidate onSubmit={event => {
                    event.preventDefault();
                    onSubmitDialog();
                }}>
                    <DialogContent dividers>
                        <Card sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 'fit-content',
                            padding: '20px',
                            mt: 3,
                            mb: 3
                        }}>
                            <Stack spacing={3}>
                                <Stack direction={{xs: 'column'}} spacing={2}>
                                    {props.children}
                                </Stack>
                            </Stack>
                        </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button color={'inherit'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                        <LoadingButton onClick={onSubmitDialog}  loading={loading}
                                        disabled={loading || !props.isValid}/>
                    </DialogActions>
                </Form>
            </Dialog>
        </div>
    );
};

export default EditDialog;
