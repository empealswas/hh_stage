import React from 'react';
import * as Yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {TextField} from "@material-ui/core";
import {useParams} from "react-router-dom";
import AddingDialog from "../../../utils/AddingDialog";
import {addParentApi, addPrincipalApi} from "../../../apiFunctions/apiFunctions";
import {AddParentRequest} from "../../../apiFunctions/DTO/AddTeacherRequest";
import {School} from "../../../API";

const AddPrincipalModal = (props: {school: School}) => {
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
            const parameters: any = {
                email: getFieldProps('email').value,
                firstName: getFieldProps('firstName').value,
                lastName: getFieldProps('lastName').value,
                schoolId: props.school.id,
            }
            const response = await addPrincipalApi(parameters);
            console.log('response', response);
            
            formik.setSubmitting(false);
            return;
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid} = formik;
    return (
        <FormikProvider value={formik}>
            <AddingDialog title={"Adding new Principal"} buttonName={'Add Principal'} onSubmit={async () => {
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

export default AddPrincipalModal;
