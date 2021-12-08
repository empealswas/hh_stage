import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button, Card, Paper, Stack, TextField} from "@material-ui/core";
import {CreateSectionInput, CreateSectionOptionsInput, School} from "../../API";
import ProgressButton from "../Buttons/ProgressButton";
import {API, graphqlOperation} from "aws-amplify";
import {createPupil, createSection, createSectionOptions} from "../../graphql/mutations";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import {addTeacherApi, addTeacherForOrganizationApi} from "../../apiFunctions/apiFunctions";
import AddingDialog from "../../utils/AddingDialog";
import LessonOptionComponent from "../Lesson/LessonContent/LessonOptionComponent";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {AddTeacherOrganizationRequest} from "../../apiFunctions/DTO/AddTeacherRequest";
import {useParams} from "react-router-dom";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddTeacherForOrganizationModal() {
    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('First name is required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Last name is required'),
        email: Yup.string().email().required('Email is required')

    });
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: RegisterSchema,
        isInitialValid: false,
        onSubmit: async () => {
            const parameters: AddTeacherOrganizationRequest = {
                email: formik.getFieldProps('email').value,
                firstName: formik.getFieldProps('firstName').value,
                lastName: formik.getFieldProps('lastName').value,
                organizationId: String(organizationId)
            }
            await addTeacherForOrganizationApi(parameters)
        }
    });

    const {organizationId} = useParams();

    const {touched, errors} = {...formik};
    return (
        <FormikProvider value={formik}>
            <AddingDialog title={"Adding new Teacher"}
                          buttonName={'Add Teacher'}
                          onSubmit={async () => {
                              await formik.handleSubmit();
                          }}>
                <TextField {...formik.getFieldProps('firstName')} error={Boolean(touched.firstName && errors.firstName)}
                           helperText={touched.firstName && errors.firstName} label={'First Name'}/>
                <TextField {...formik.getFieldProps('lastName')} error={Boolean(touched.lastName && errors.lastName)}
                           helperText={touched.lastName && errors.lastName}  label={'Last Name'}/>
                <TextField {...formik.getFieldProps('email')} error={Boolean(touched.email && errors.email)}
                           helperText={touched.email && errors.email}  type={'email'} label={'Email'}/>

            </AddingDialog>
        </FormikProvider>
    );
}
