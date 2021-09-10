import React, {useCallback, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikConsumer, FormikProvider, useFormik, useFormikContext} from "formik";
import {Button, IconButton, InputAdornment, Stack, TextField} from "@material-ui/core";
import {Icon} from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {LoadingButton} from "@material-ui/lab";
import {DialogActions} from "@mui/material";
import ProgressButton from "../../Buttons/ProgressButton";
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import {createFile, updateCurriculum, updateLesson} from "../../../graphql/mutations";
import {useParams} from "react-router-dom";
import EditDialog from "../YearPage/EditDialog";
import FilesUploadDropzone from "../../FilesUploading/FilesUploadDropzone";
import Typography from "@material-ui/core/Typography";
import UploadingFilesList from "../../FilesUploading/UploadingFilesList";
import awsConfig from "../../../aws-exports";

type LessonEditFormProps = {
    filesToAdd: File[]
}
const LessonEditForm = (props: LessonEditFormProps) => {
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First name required'),
        description: Yup.string().min(2, 'Too Short!').required('Description is required')

    });
    const {lessonId} = useParams();
    console.log(props.filesToAdd)

    const uploadFiles = async (lessonID: string) => {
        const visibility = "public";
        const {identityId} = await Auth.currentCredentials();
        for (const file of selectedFiles) {
            try {
                const fileName = `/${visibility}/${identityId}/${Date.now()}-${file.name}`;
                const uploadedFile: any = await Storage.put(fileName, file, {
                    contentType: file.type
                })
                const input: any = {
                    key: uploadedFile.key,
                    bucket: awsConfig.aws_user_files_s3_bucket,
                    region: awsConfig.aws_user_files_s3_bucket_region,
                    lessonID: lessonID
                };
                const result = await API.graphql(graphqlOperation(createFile, {input}));
                console.log(result);

            } catch (error) {
                console.error(`During the file uploading error occurred:`, error)
            }
        }
    }
    const [selectedFiles, setSelectedFiles] = useState<File []>(props.filesToAdd);
    const onDrop = useCallback(acceptedFiles => {
        console.log('here')
        setSelectedFiles(prevState => {
            return [...prevState, ...acceptedFiles];
        })
    }, []);
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''

        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            API.graphql(graphqlOperation(updateLesson, {
                input: {
                    id: lessonId,
                    title: getFieldProps('name').value,
                    description: getFieldProps('description').value
                }
            }));
            await uploadFiles(lessonId);
            formik.setSubmitting(false);
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid} = formik;
    console.log(selectedFiles)
    return (
        <FormikProvider value={formik}>
            <EditDialog title={'Editing Lesson'}
                        isValid={isValid}
                        open={selectedFiles.length > 0}
                        onSubmit={async () => {
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
                <FilesUploadDropzone onDrop={onDrop}
                                     accept={['image/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4']}/>
                <Typography variant={"h5"}>
                    Files
                </Typography>
                <UploadingFilesList files={selectedFiles} setFiles={setSelectedFiles}/>
            </EditDialog>
        </FormikProvider>
    );
};

export default LessonEditForm;
