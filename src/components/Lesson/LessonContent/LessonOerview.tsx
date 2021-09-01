import React, {useEffect, useState} from 'react';
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

    return (
        <div>
            {lesson ?
                <div style={{textAlign: 'center'}}>
                    <Container>
                        <Typography variant={'h2'}>
                            {lesson.title}
                        </Typography>
                        <Typography variant={"h4"} style={{marginTop: '30px'}}>
                            {lesson.description}
                        </Typography>
                        <Can I={'read'} an={'attendance'}>
                            <LessonRating lessonId={lessonId}/>
                            <AttendanceSheetModal lessonId={lessonId}/>
                        </Can>
                        {lesson.Files?.items &&
                        <FilesViewer files={lesson.Files?.items}/>
                        }
                    </Container>
                </div>
                :
                <LinearProgressBottom/>
            }
        </div>
    );
};

export default LessonOverview;
