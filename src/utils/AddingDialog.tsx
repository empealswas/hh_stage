import React, {ReactElement, ReactNode, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Button,
    Card,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl,
    Paper, Stack,
    TextField
} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {Link as RouterLink} from "react-router-dom";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import ProgressButton from "../components/Buttons/ProgressButton";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AddingDialogProps {
    title: string,
    buttonName: string,
    children?: ReactNode,
    onSubmit: () => Promise<any>,
}

export default function AddingDialog(props: AddingDialogProps) {
    const [open, setOpen] = React.useState(false);
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
        setLoading(true);
        props.onSubmit()
            .then(
                value => {
                    setSuccess(true);
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
        <>
            <Button variant="contained"
                    startIcon={<Icon icon={plusFill}/>} onClick={handleOpen}>
                {props.buttonName}
            </Button>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        {props.title}
                    </Typography>
                </Toolbar>
                <DialogContent dividers>
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 'fit-content',
                        padding: '20px',
                        mt: 3,
                        mb: 3
                    }}>
                        <FormControl sx={{minWidth: ('calc(200px + 10vw)')}}>
                            <Stack direction='column' spacing={3} title={'123'}>
                                {props.children}
                            </Stack>
                        </FormControl>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button color={'inherit'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                    <ProgressButton onClick={onSubmitDialog}
                                    success={success}
                                    loading={loading}
                                    error={error}
                                    onClickWhenSuccess={handleClose}
                                    disabled={loading}/>
                </DialogActions>
            </Dialog>
        </>
    );
}
