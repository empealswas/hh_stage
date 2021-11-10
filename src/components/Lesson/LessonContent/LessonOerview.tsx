import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify"; //Auth, Storage
import Typography from "@material-ui/core/Typography";
import {Lesson} from "../../../API";
import FilesViewer from "../../../utils/FilesViewer";
import LinearProgressBottom from "../../../utils/LinearProgressBottom";
import AttendanceSheetModal from "../../attendance/AttendanceSheetModal";
import {Can} from "../../../utils/Ability";
import LessonRating from "./LessonRating";
import {Container} from "@material-ui/core";
import {AccordionActions, Box, IconButton, List, Snackbar} from "@mui/material";
// import FilesUploadDropzone from "../../FilesUploading/FilesUploadDropzone";
import FilesUploadDropzoneWithChildren from "../../FilesUploading/FilesUploadDropzoneWithChildren";
import Title from "../YearPage/Title";
import LessonEditForm from "./LessonEditForm";
import DeletionModal from "../YearPage/DeletionModal";
import {onCreateFile, onDeleteFile} from "../../../graphql/subscriptions"; //, onUpdateCurriculum
import {deleteLesson} from "../../../graphql/mutations"; //createFile, createLesson, createTermLesson, 
// import awsConfig from "../../../aws-exports";
// import {useSnackbar} from "notistack";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import LoadingListItem from "../../../utils/LoadingListItem";

const LessonOverview = () => {
    const {lessonId} = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [droppedFiles, setDroppedFiles] = useState<File []>([]);
    const [snackBarOpen, setSnackBarOpen] = useState(true);
    const [filesToUpload, setFilesToUpload] = useState<File []>([]);
    // const snackbar = useSnackbar();

    async function fetchLesson() {
        return API.graphql(graphqlOperation(`query MyQuery($id: ID = "") {
  getLesson(id: $id) {
    Files {
      items {
        key
        id
        region
        bucket
      }
    }
    title
    description
  }
}
`, {id: lessonId}));
    }

    function loadLesson() {
        fetchLesson().then((result: any) => {
            setLesson(result.data.getLesson);
        })
    }

    useEffect(() => {
        const subscription: any = API.graphql(graphqlOperation(onDeleteFile));
        const deleteSubscription = subscription.subscribe({
            next: (result: any) => {
                const deletedFileLessonId = result.value.data.onDeleteFile.lessonID;
                if (deletedFileLessonId !== lessonId) {
                    return;
                }
                loadLesson();
            }
        })
        const createFile: any = API.graphql(graphqlOperation(onCreateFile));
        const createSubscription = createFile.subscribe({
            next: (result: any) => {
                const createdFileLessonId = result.value.data.onCreateFile.lessonID;
                if (createdFileLessonId !== lessonId) {
                    return;
                }
                loadLesson();
            }
        })

        loadLesson()
        return () => {
            deleteSubscription.unsubscribe();
            createSubscription.unsubscribe();
        }
//    }, []);
    });
    const onDrop = useCallback(acceptedFiles => {
        uploadFiles(acceptedFiles)
        setSnackBarOpen(true);
        setFilesToUpload(prevState => [...acceptedFiles, ...prevState])
        setDroppedFiles(acceptedFiles);
    }, []);

    const navigate = useNavigate();

    const uploadFiles = async (files: File[]) => {
        // for (const file of files) {
        //     try {
        //         const fileName = `${Date.now()}-${file.name.replace(/ /g, '_')}`;
        //         const uploadedFile: any = await Storage.put(fileName, file, {
        //             contentType: file.type,
        //         })
        //         const input: any = {
        //             key: uploadedFile.key,
        //             bucket: awsConfig.aws_user_files_s3_bucket,
        //             region: awsConfig.aws_user_files_s3_bucket_region,
        //             lessonID: lessonId
        //         };
        //         const result: any = await API.graphql(graphqlOperation(createFile, {input}));
        //         snackbar.enqueueSnackbar('File added: ' + result.data.createFile.key, {variant: 'success'});
        //         console.log(result);
        //
        //     } catch (error) {
        //         console.error(`During the file uploading error occurred:`, error)
        //     }
        // }
    }

    return (
        <div>
            {lesson ?
                <>
                    <Box sx={{textAlign: 'center', marginBottom: 5}}>
                        <Container>
                            <Title title={lesson.title ?? ''}
                                   editingForm={<Can I={'update'} a={'lesson'}>
                                       <LessonEditForm filesToAdd={droppedFiles}/>
                                   </Can>}
                                   deletionModal={<Can I={'delete'} a={'lesson'}><DeletionModal title={'Delete Lesson'}
                                                                                                onDelete={async () => {
                                                                                                    await API.graphql(graphqlOperation(deleteLesson, {input: {id: lessonId}}));
                                                                                                    navigate(-1);
                                                                                                }
                                                                                                }/></Can>}/>
                            <Typography variant={"h4"} style={{marginTop: '30px'}}>
                                {lesson.description}
                            </Typography>
                            <Can I={'read'} an={'attendance'}>
                                {lessonId && <>
                                    <LessonRating lessonId={lessonId}/>
                                    <AttendanceSheetModal lessonId={lessonId}/>
                                </>}
                            </Can>
                        </Container>
                    </Box>

                    <Can I={'create'} a={'file'}>
                        <FilesUploadDropzoneWithChildren dropzone={{
                            onDrop: onDrop,
                            accept: ['image/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4']
                        }}/>
                    </Can>
                    <Container>
                        {lesson.Files?.items &&
                        <FilesViewer files={lesson.Files?.items}/>
                        }
                    </Container>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        open={snackBarOpen}
                    >
                        <Accordion hidden={filesToUpload.length === 0} defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon fontSize={'large'}/>}
                                aria-controls="panel1a-content"
                                style={{
                                    backgroundColor: '#323232'
                                }}
                                id="panel1a-header"
                            >
                                <Typography sx={{color: 'primary.contrastText'}}>Files uploading</Typography>
                            </AccordionSummary>

                            <AccordionDetails style={{padding: 0}}>
                                <List disablePadding>
                                    {filesToUpload.map(file =>
                                        // @ts-ignore
                                        <LoadingListItem file={file} lessonId={lessonId}/>)}
                                </List>
                            </AccordionDetails>
                            <AccordionActions>
                                <IconButton onClick={() => {
                                    setFilesToUpload([]);
                                    setSnackBarOpen(false)
                                }
                                }>
                                    <CloseIcon/>
                                </IconButton>
                            </AccordionActions>
                        </Accordion>
                    </Snackbar>
                </>
                :
                <LinearProgressBottom/>
            }
        </div>
    );
};

export default LessonOverview;
