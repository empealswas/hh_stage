import React from 'react';
import {graphqlOperation} from "aws-amplify";
import Grid from '@material-ui/core/Grid';
import {Connect} from 'aws-amplify-react'
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import {useParams} from "react-router-dom";
import {onCreateLesson} from "../../graphql/subscriptions";
import CardSkeleton from "../skeletons/CardSkeleton";
import LessonItemsGrid from "../Lesson/LessonContent/LessonItemsGrid";
import {Lesson} from "../../API";
import {Container} from "@mui/material";

const query = `query MyQuery($id: ID = "") {
  getSection(id: $id) {
    id
    Lessons {
      items {
        id
        title
      }
    }
  }
}
`
const LessonsGrid = () => {
    const {sectionId} = useParams();
    const updateItems = (prevData: any, data: any) => {
        const createdLesson = data.onCreateLesson;
        if (createdLesson.sectionID !== sectionId) {
            return prevData;
        }
        let newData = {...prevData};
        const lessons: Lesson[] = prevData.getSection.Lessons.items
            .filter((lesson: Lesson) => lesson.id !== createdLesson.id);
        lessons.push(createdLesson);
        newData.getSection.Lessons.items = lessons
        return newData;
    }
    if (!sectionId) {
        return <></>
    }
    return (
        <Container>
            <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start" spacing={2}
            >
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}
                          style={{flexGrow: 1, display: 'flex', flexWrap: 'wrap'}}>
                        <Connect
                            query={graphqlOperation(query, {id: sectionId})}
                            subscription={graphqlOperation(onCreateLesson)}
                            onSubscriptionMsg={updateItems}
                        >
                            {({data, loading, errors}: IConnectState) => {
                                if (errors.lenght > 0) {
                                    console.error(errors)
                                }
                                if (loading) {
                                    return [0, 1, 2, 3, 4, 5].map((value) => (
                                        <CardSkeleton key={value}/>
                                    ))
                                }
                                const lessons = data.getSection.Lessons.items;
                                return <LessonItemsGrid lessons={lessons}/>
                            }}
                        </Connect>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LessonsGrid;
