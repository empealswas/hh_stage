import React, {ReactNode, useState} from 'react';
import {Button, Card, DialogActions, DialogContent, FormControl, Stack, TextField} from "@material-ui/core";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ProgressButton from "../../Buttons/ProgressButton";
import EditIcon from '@mui/icons-material/Edit';
import {Tooltip} from "@mui/material";
import YearPageForm from "./YearPageForm";
import {Form, FormikProvider, useFormik} from "formik";
import {LoadingButton} from "@material-ui/lab";
import * as Yup from "yup";
import {Delete} from "@material-ui/icons";

type EditDialogType = {
    title: string,
    children?: ReactNode,
    onSubmit: () => Promise<any>,
    isValid: boolean,
    open?: boolean,
}
const YearPageEditionModal = (props: EditDialogType) => {

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
                    <EditIcon fontSize={'large'}/>
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
                        <ProgressButton onClick={onSubmitDialog} success={success} loading={loading}
                                        disabled={loading || !props.isValid}/>
                    </DialogActions>
                </Form>
            </Dialog>
        </div>
    );
};

export default YearPageEditionModal;
