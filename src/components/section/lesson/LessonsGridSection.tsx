import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import {Box, Container, Grid, Typography} from "@mui/material";
import CardSkeleton from "../../skeleton/CardSkeleton";
import {onCreateLesson} from "../../../graphql/subscriptions";
import {Lesson, OnCreateLessonSubscription} from "../../../API";
import LessonItemsGrid from "./LessonItemsGrid";

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
    const [lessons, setLessons] = useState<Lesson[] | null>(null);
    const updateItems = (data: any) => {
        console.log(data);
        const createdLesson = data.value.data.onCreateLesson;
        if (createdLesson.sectionID === sectionId) {
            getLessonsAsync();
        }

    }
    const getLessonsAsync = async () => {
        const result: any = await API.graphql(graphqlOperation(query, {id: sectionId}));
        setLessons(result.data.getSection?.Lessons.items)
    }
    useEffect(() => {

        const data: any = API.graphql(graphqlOperation(onCreateLesson));
        const subscription: any = data.subscribe({
            next: updateItems,
        });

        getLessonsAsync();
        return () => {
            subscription.unsubscribe();
        };
    }, [sectionId]);
    if (!sectionId) {
        return <></>
    }

    return (
        <Container>
            {(lessons?.length ?? 0) > 0 &&
                <>
                    <Typography variant={'h3'} textAlign={'center'}>Lessons</Typography>
                    <Box height={50}/>
                </>
            }
            <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start" spacing={2}
            >
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}
                          style={{flexGrow: 1, display: 'flex', flexWrap: 'wrap'}}>
                        {
                            lessons ?
                                <LessonItemsGrid lessons={lessons}/>
                                :
                                [0, 1, 2, 3, 4, 5].map((value) => (
                                    <Grid key={value} item xs={12} sm={6} md={3}>
                                        <CardSkeleton key={value}/>
                                    </Grid>))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LessonsGrid;
