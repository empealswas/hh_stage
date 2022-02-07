import React from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import * as Yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {CreateClassroomInput} from "../../../../API";
import {createClassroom} from "../../../../graphql/mutations";
import {TextField} from "@mui/material";
import AddingDialog from "../../../../components/dialog/AddingDialog";


export default function AddClassroomModal() {
    const {organizationId} = useParams();
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
            organizationClassroomsId: organizationId,
        }

        const result: any = await API.graphql(graphqlOperation(createClassroom, {input}));
        console.log('Result', result);
    }

    return (
        <FormikProvider value={formik}>
            <AddingDialog title={'Adding new team'} buttonName={'Add Team'} onSubmit={addClassroom}>
                <TextField {...formik.getFieldProps('name')} error={Boolean(formik.touched.name && formik.errors.name)}
                           helperText={formik.touched.name && formik.errors.name}label={'Name of Team'}/>
            </AddingDialog>
        </FormikProvider>

    );
}
