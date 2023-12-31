import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify"; //Auth, Storage
import {Lesson} from "../../../API";

import {
    AccordionActions,
    Box,
    CardActionArea,
    Container,
    IconButton,
    List,
    Snackbar, Stack,
    Tooltip,
    Typography
} from "@mui/material";
// import FilesUploadDropzone from "../../FilesUploading/FilesUploadDropzone";


import {onCreateFile, onDeleteFile} from "../../../graphql/subscriptions"; //, onUpdateCurriculum
import {deleteLesson} from "../../../graphql/mutations"; //createFile, createLesson, createTermLesson, 
// import awsConfig from "../../../aws-exports";
// import {useSnackbar} from "notistack";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SectionHeader from "../SectionHeader";
import {CloseIcon} from "../../../theme/overrides/CustomIcons";
import DeletionModal from "../DeletionModal";
import {Can} from "../../../abilities/Ability";
import Iconify from "../../Iconify";
import LessonEditForm from "./LessonEditForm";
import LessonRating from "./LessonRating";
import AttendanceSheetModal from "./attendance/AttendanceSheetModal";
import FilesViewer from "../../files-utilities/FilesViewer";
import Markdown from "../../Markdown";
import {UploadMultiFile} from "../../upload";
import {BoxMask} from "../../settings";
import {styled} from "@mui/material/styles";


const LessonOverview = () => {
    const {lessonId} = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [droppedFiles, setDroppedFiles] = useState<File []>([]);
    const [snackBarOpen, setSnackBarOpen] = useState(true);
    const [filesToUpload, setFilesToUpload] = useState<File []>([]);
    const {organizationId} = useParams();

    // const snackbar = useSnackbar();

    async function fetchLesson() {
        return API.graphql(graphqlOperation(`query MyQuery($id: ID = "") {
  getLesson(id: $id) {
    Files {
      items {
        createdAt
        key
        id
        region
        bucket
      }
    }
    id
    title
    description
    Section {
      organizationID
    }
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
    }, []);
    const onDrop = useCallback(acceptedFiles => {
        setSnackBarOpen(true);
        setFilesToUpload(prevState => [...acceptedFiles, ...prevState])
        setDroppedFiles(acceptedFiles);
    }, []);

    const navigate = useNavigate();

    return (
        <div>

            {lesson ?
                <>
                    <Box sx={{textAlign: 'center', marginBottom: 5}}>
                        <Container>
                            <SectionHeader title={lesson.title ?? ''}
                                           editingForm={
                                               lesson.Section?.organizationID === organizationId ?
                                                   <Can I={'update'} a={'lesson'}>
                                                       <LessonEditForm lesson={lesson}/>
                                                   </Can>
                                                   :
                                                   <></>
                                           }
                                           deletionModal={
                                               lesson.Section?.organizationID === organizationId ?
                                                   <Can I={'delete'} a={'lesson'}>
                                                       <DeletionModal
                                                           title={'Delete Lesson'}
                                                           onDelete={async () => {
                                                               await API.graphql(graphqlOperation(deleteLesson, {input: {id: lessonId}}));
                                                               navigate(-1);
                                                           }
                                                           }/>
                                                   </Can>
                                                   :
                                                   <></>
                                           }/>
                            {lessonId && <>
                                {/*<LessonRating lessonId={lessonId}/>*/}
                                <Can I={'read'} an={'attendance'}>
                                    <AttendanceSheetModal lessonId={lessonId}/>

                                </Can>
                            </>}


                            <Typography variant={"h4"} style={{marginTop: '30px'}}>
                                {/*{lesson.description}*/}
                                <Markdown children={lesson.description || ''}/>
                            </Typography>

                        </Container>
                    </Box>
                    {/*<UploadMultiFile onDrop={acceptedFiles => setFilesToUpload(acceptedFiles)} files={filesToUpload} showPreview={true} onRemove={file => {}} onRemoveAll={() => {}}/>*/}
                    {/*                        <FilesUploadDropzoneWithChildren dropzone={{
                            onDrop: onDrop,
                            accept: ['image/*','video/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4','.csv', '.doc', '.docx', '.xlsx', 'application/*', '.*']
                        }}/>*/}
                    <Container>
                        <Can I={'read'} this={'content'}>
                            {lesson.Files?.items &&
                                <FilesViewer files={lesson.Files?.items}/>
                            }
                        </Can>
                    </Container>
                    <Snackbar
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}

                        open={snackBarOpen}
                    >
                        <Accordion hidden={filesToUpload.length === 0} defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<Iconify icon={'mdi:chevron-up'} sx={{fontSize: 25}}/>}
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
                                    {/*                                    {filesToUpload.map(file =>
                                        // @ts-ignore
                                        <LoadingListItem file={file} lessonId={lessonId}/>)}*/}
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
                <></>
            }
        </div>
    );
};

export default LessonOverview;
