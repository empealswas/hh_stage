import React, {useCallback, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button, Card, DialogActions, DialogContent, Paper, Stack, TextareaAutosize, TextField} from "@material-ui/core";
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import {
    createCurriculum, createFile,
    createLesson,
    createSubject,
    createSubjectTerm,
    createTerm,
    createTermLesson
} from "../../../graphql/mutations";
import ProgressButton from "../../Buttons/ProgressButton";
import {Link as RouterLink, useParams} from "react-router-dom";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import SchoolAddingForm from "../../School/SchoolAddingForm";
import Dialog from "@material-ui/core/Dialog";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import FilesUploadDropzone from "../../FilesUploading/FilesUploadDropzone";
import UploadingFilesList from "../../FilesUploading/UploadingFilesList";
import awsConfig from "../../../aws-exports";
//
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddLessonModal() {
    const [open, setOpen] = React.useState(false);
    const {id} = useParams();
    const handleOpen = () => {
        setTitle('');
        setLoading(false);
        setSuccess(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function addLesson() {
        setLoading(true);
        const input = {
            title: title,
            description: description
        }
        try {
            const result: any = await API.graphql(graphqlOperation(createLesson, {input}));
            let lessonID = result.data.createLesson.id;
            await API.graphql(graphqlOperation(createTermLesson, {
                input: {
                    lessonID: lessonID,
                    termID: id
                }
            }))
            await uploadFiles(lessonID)
            setSuccess(true);
        } catch (e) {
            console.log(e)
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }

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
    const onDrop = useCallback(acceptedFiles => {
        setSelectedFiles(prevState => {
            return [...prevState, ...acceptedFiles];
        })
    }, []);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File []>([]);
    return (
        <>
            <Button variant="contained"
                    startIcon={<Icon icon={plusFill}/>} onClick={handleOpen}>
                Add Lesson
            </Button>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Adding New Subject
                    </Typography>
                </Toolbar>
                <DialogContent dividers>
                    <Card style={{
                        padding: '20px',
                        margin: '30px'
                    }}>
                        <Stack direction={'column'} spacing={3}>
                            <TextField value={title} variant={'outlined'} onChange={(event) => {
                                setTitle(event.target.value)
                            }} label={'Name of Lesson'}/>
                            <TextField aria-label="minimum height" rows={3}
                                                multiline
                                              label="Description of the lesson"
                                              value={description}
                                              onChange={event => setDescription(event.target.value)}/>
                            <FilesUploadDropzone onDrop={onDrop}
                                                 accept={['image/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4']}/>
                            <Typography variant={"h5"}>
                                Files
                            </Typography>
                            <UploadingFilesList files={selectedFiles} setFiles={setSelectedFiles}/>
                        </Stack>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button color={'inherit'} variant={'contained'} onClick={handleClose}>Cancel</Button>
                    <ProgressButton success={success} loading={loading} onClick={addLesson} disabled={false}/>
                </DialogActions>
            </Dialog>
        </>
    );
}
