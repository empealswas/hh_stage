import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import Typography from "@material-ui/core/Typography";
import {Lesson} from "../../../API";
import FilesViewer from "../../../utils/FilesViewer";
import LinearProgressBottom from "../../../utils/LinearProgressBottom";
import AttendanceSheetModal from "../../attendance/AttendanceSheetModal";
import {Can} from "../../../utils/Ability";
import LessonRating from "./LessonRating";
import {Container} from "@material-ui/core";
import {Box} from "@mui/material";
import FilesUploadDropzone from "../../FilesUploading/FilesUploadDropzone";
import FilesUploadDropzoneWithChildren from "../../FilesUploading/FilesUploadDropzoneWithChildren";
import Title from "../YearPage/Title";
import LessonEditForm from "./LessonEditForm";
import DeletionModal from "../YearPage/DeletionModal";
import {onCreateFile, onDeleteFile, onUpdateCurriculum} from "../../../graphql/subscriptions";
import {createFile, createLesson, createTermLesson} from "../../../graphql/mutations";
import awsConfig from "../../../aws-exports";
import {useSnackbar} from "notistack";

const LessonOverview = () => {
    const {lessonId} = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [droppedFiles, setDroppedFiles] = useState<File []>([]);
    const snackbar = useSnackbar();

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
    }, []);
    const onDrop = useCallback(acceptedFiles => {
        uploadFiles(acceptedFiles)
        setDroppedFiles(acceptedFiles);
    }, []);

    const uploadFiles = async (files: File[]) => {
        for (const file of files) {
            try {
                const fileName = `${Date.now()}-${file.name.replace(/ /g, '_')}`;
                const uploadedFile: any = await Storage.put(fileName, file, {
                    contentType: file.type
                })
                const input: any = {
                    key: uploadedFile.key,
                    bucket: awsConfig.aws_user_files_s3_bucket,
                    region: awsConfig.aws_user_files_s3_bucket_region,
                    lessonID: lessonId
                };
                const result: any = await API.graphql(graphqlOperation(createFile, {input}));
                snackbar.enqueueSnackbar('File added: ' + result.data.createFile.key, {variant: 'success'});
                console.log(result);

            } catch (error) {
                console.error(`During the file uploading error occurred:`, error)
            }
        }
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
                                                                                                }
                                                                                                }/></Can>}/>
                            <Typography variant={"h4"} style={{marginTop: '30px'}}>
                                {lesson.description}
                            </Typography>
                            <Can I={'read'} an={'attendance'}>
                                <LessonRating lessonId={lessonId}/>
                                <AttendanceSheetModal lessonId={lessonId}/>
                            </Can>
                        </Container>
                    </Box>
                    {/*<Container>*/}
                    {/*    {lesson.Files?.items &&*/}
                    {/*    <FilesViewer files={lesson.Files?.items}/>*/}
                    {/*    }*/}
                    {/*</Container>*/}

                    <Can I={'create'} a={'file'} passThrough>
                        {(allowed: boolean) =>
                            allowed ?
                                <FilesUploadDropzoneWithChildren dropzone={{
                                    onDrop: onDrop,
                                    accept: ['image/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4']
                                }}>
                                    <Container>
                                        {lesson.Files?.items &&
                                        <FilesViewer files={lesson.Files?.items}/>
                                        }
                                    </Container>
                                </FilesUploadDropzoneWithChildren>
                                :
                                <Container>
                                    {lesson.Files?.items &&
                                    <FilesViewer files={lesson.Files?.items}/>
                                    }
                                </Container>
                        }
                    </Can>
                </>
                :
                <LinearProgressBottom/>
            }
        </div>
    );
}

export default LessonOverview;
