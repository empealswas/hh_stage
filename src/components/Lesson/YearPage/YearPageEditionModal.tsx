import React, {useState} from 'react';
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


const YearPageEditionModal = () => {

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
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First name required'),
    });

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            console.log('submitting');
            formik.setSubmitting(false);
            setSuccess(true);
        }
    });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <div>
            <Tooltip title={'Edit'}>
                <IconButton onClick={handleOpen}>
                    <EditIcon fontSize={'large'}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        123
                    </Typography>
                </Toolbar>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                                        <TextField
                                            fullWidth
                                            required={true}
                                            label="Name"
                                            {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Stack>
                                </Stack>
                            </Card>
                        </DialogContent>
                        <DialogActions>
                            <Button color={'inherit'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                            <ProgressButton onClick={handleSubmit} success={success} loading={isSubmitting} disabled={isSubmitting}/>
                        </DialogActions>
                    </Form>
                </FormikProvider>
            </Dialog>
        </div>
    );
};

export default YearPageEditionModal;
