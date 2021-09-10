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
import {updateCurriculum, updateLesson} from "../../../graphql/mutations";
import {useParams} from "react-router-dom";
import EditDialog from "../YearPage/EditDialog";
import FilesUploadDropzone from "../../FilesUploading/FilesUploadDropzone";
import Typography from "@material-ui/core/Typography";
import UploadingFilesList from "../../FilesUploading/UploadingFilesList";

const LessonEditForm = () => {
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First name required'),
        description: Yup.string().min(2, 'Too Short!').required('Description is required')

    });
    const {id} = useParams();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''

        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            API.graphql(graphqlOperation(updateLesson, {
                input: {
                    id: id,
                    name: getFieldProps('name').value,
                    description: getFieldProps('description').value
                }
            }));
            formik.setSubmitting(false);
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid} = formik;
    return (
        <FormikProvider value={formik}>
            <EditDialog title={'Editing Lesson'} isValid={isValid} onSubmit={async () => {
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
                <TextField aria-label="minimum height" rows={3}
                           multiline
                           label="Description of the lesson"
                           {...getFieldProps('description')}
                           error={Boolean(touched.description && errors.description)}
                           helperText={touched.description && errors.description}
                />
                {/*<FilesUploadDropzone onDrop={onDrop}*/}
                {/*                     accept={['image/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4']}/>*/}
                <Typography variant={"h5"}>
                    Files
                </Typography>
                {/*<UploadingFilesList files={selectedFiles} setFiles={setSelectedFiles}/>*/}
            </EditDialog>
        </FormikProvider>
    );
};

export default LessonEditForm;
