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
import EditDialog from "./EditDialog";
import {API, graphqlOperation} from "aws-amplify";
import {updateCurriculum} from "../../../graphql/mutations";
import {useParams} from "react-router-dom";

const YearPageForm = () => {
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First name required'),
    });
    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            API.graphql(graphqlOperation(updateCurriculum, {
                input: {
                    id: id,
                    name: getFieldProps('name').value
                }
            }));
            formik.setSubmitting(false);
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid} = formik;
    return (
        <FormikProvider value={formik}>
            <EditDialog title={'Editing Year Page'} isValid={isValid} onSubmit={async () => {
                handleSubmit();
            }}>
                <TextField
                    fullWidth
                    required={true}
                    label="Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                />
            </EditDialog>
        </FormikProvider>
    );
};

export default YearPageForm;
