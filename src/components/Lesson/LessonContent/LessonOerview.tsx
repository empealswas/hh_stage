import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
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

const LessonOverview = () => {
    const {lessonId} = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);

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
        loadLesson()
    }, []);
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);

    return (
        <div>
            {lesson ?
                <>
                    <Box sx={{textAlign: 'center', marginBottom: 5}}>
                        <Container>
                            <Title title={lesson.title ?? ''}
                                   editingForm={<LessonEditForm/>}
                                   deletionModal={<DeletionModal title={'Delete Lesson'} onDelete={async () => {
                                   }
                                   }/>} />
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
                </>
                :
                <LinearProgressBottom/>
            }
        </div>
    );
};

export default LessonOverview;
