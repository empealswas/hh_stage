import React from 'react';
import * as Yup from "yup";
import {Form, FormikConsumer, FormikProvider, useFormik, useFormikContext} from "formik";
import {Button, IconButton, InputAdornment, Stack, TextField} from "@material-ui/core";
import {Icon} from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {LoadingButton} from "@material-ui/lab";
import {DialogActions} from "@mui/material";
import ProgressButton from "../../Buttons/ProgressButton";
import {API, graphqlOperation} from "aws-amplify";
import {updateCurriculum} from "../../../graphql/mutations";
import {useParams} from "react-router-dom";
import AddingDialog from "../../../utils/AddingDialog";
import {addParentApi, addTeacherApi} from "../../../apiFunctions/apiFunctions";
import {AddParentRequest} from "../../../apiFunctions/DTO/AddTeacherRequest";

const YearPageForm = () => {
    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First name required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First name required'),
        email: Yup.string().email().required('Email is required')

    });
    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            const parameters: AddParentRequest = {
                email: getFieldProps('email').value,
                firstName: getFieldProps('firstName').value,
                lastName: getFieldProps('lastName').value
            }

            const response = await addParentApi(parameters);
            console.log('response', response);
            
            formik.setSubmitting(false);
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid} = formik;
    return (
        <FormikProvider value={formik}>
            <AddingDialog title={"Adding new Parent"} buttonName={'Add Parent'} onSubmit={async () => {
                handleSubmit();
            }}>
                <TextField
                    fullWidth
                    required={true}
                    label="First Name"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                /> 
                <TextField
                    fullWidth
                    required={true}
                    label="Last Name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                />
                <TextField
                    fullWidth
                    required={true}
                    label="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
            </AddingDialog>
        </FormikProvider>
    );
};

export default YearPageForm;
