import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button, Card, Paper, Stack, TextField} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {createClassroom} from "../../graphql/mutations";
import ProgressButton from "../Buttons/ProgressButton";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import AddingDialog from "../../utils/AddingDialog";
import {CreateClassroomInput} from "../../API";
import * as Yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {AddTeacherOrganizationRequest} from "../../apiFunctions/DTO/AddTeacherRequest";
import {addTeacherForOrganizationApi} from "../../apiFunctions/apiFunctions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddClassroomModal() {
    const {id, organizationId} = useParams();
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('First name is required'),


    });
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: RegisterSchema,
        isInitialValid: false,
        onSubmit: async () => {
            await addClassroom();
        }
    });


    async function addClassroom() {
        const input: CreateClassroomInput = {
            name: formik.getFieldProps('name').value,
        }
        if (id) {
            input.schoolID = id;
        }
        if (organizationId) {
            input.organizationClassroomsId = organizationId;
        }
        await API.graphql(graphqlOperation(createClassroom, {input}));
    }

    return (
        <FormikProvider value={formik}>
            <AddingDialog title={'Adding new Classroom'} buttonName={'Add Classroom'} onSubmit={addClassroom}>
                <TextField {...formik.getFieldProps('name')} error={Boolean(formik.touched.name && formik.errors.name)}
                           helperText={formik.touched.name && formik.errors.name}label={'Name of Classroom'}/>
            </AddingDialog>
        </FormikProvider>

    );
}
