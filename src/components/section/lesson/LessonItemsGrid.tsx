
import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {Lesson} from "../../../API";
import {Teacher} from "../../../models/Teacher";
import {API, graphqlOperation} from "aws-amplify";
import useAuth from "../../../hooks/useAuth";
import {Card, CardActionArea, CardContent, Grid, Link, Typography} from "@mui/material";
import useUserInOrganization from "../../../hooks/useUserInOrganization";


type LessonItemsGridProps = {
    lessons: Lesson[]
    path?: string
}

const classroomCompleteQuery = `query MyQuery($classroom: ID = "", $lesson: ID = "") {
  listClassroomLessons(filter: {classroomID: {eq: $classroom}, lessonID: {eq: $lesson}}) {
    items {
      id
      completed
    }
  }
}
`

const getClassroomQuery = `query MyQuery($id: ID = "") {
  getUserInOrganization(id: $id) {
    classrooms {
      items {
        classroom {
          id
        }
      }
    }
  }
}
`

const complete = `query MyQuery($classroomId: ID = "", $lessonId: ID = "") {
  listPELessonRecords(limit: 1000000000, filter: {classroomID: {eq: $classroomId}, lessonID: {eq: $lessonId}}) {
    items {
      id
      isCompleted
    }
  }
}
`

type LessonComplete = {
    lesson: Lesson,
    completed: boolean
}

const LessonItemsGrid = (props: LessonItemsGridProps) => {
        const {lessons, path} = {...props}
        const {user} = useAuth();
        const [lessonsComplete, setLessonsComplete] = useState<LessonComplete[] | null>(null);
        const userInOrganization = useUserInOrganization();
    console.log(userInOrganization);
        useEffect(() => {
            setLessonsComplete(null);
            if (userInOrganization?.organizations?.items[0]?.id) {
                const getCompletenes = async () => {
                    const result: any = (await API.graphql(graphqlOperation(getClassroomQuery, {
                        id: userInOrganization?.organizations?.items[0]?.id,
                    })));
                    const classrooms = result.data?.getUserInOrganization?.classrooms?.items?.map((item: any) => item.classroom);
                    console.log('Classrooms', classrooms);
                    if (classrooms.length == 0) {
                        return;
                    }
                    const lessonsComplete: LessonComplete[] = [];
                    await Promise.all(lessons.sort((a, b) => a.title?.localeCompare(b.title ?? '') as number).map(async (lesson: Lesson, index: number) => {
                        const completedArray: boolean[] = [];
                        for (const classroom of classrooms) {
                            const result: any = await API.graphql(graphqlOperation(complete, {
                                classroomId: classroom.id,
                                lessonId: lesson.id
                            }));
                            console.log('Result', result.data.listPELessonRecords.items);
                            if (result.data.listPELessonRecords.items.length == 0) {
                                completedArray.push(false);
                            }else{
                            completedArray.push(result.data.listPELessonRecords.items[0].isCompleted ?? false);
                            }
                        }
                            lessonsComplete.push({lesson: lesson, completed: completedArray.some(value => value)});
                        }
                    ))
                    setLessonsComplete(lessonsComplete);
                }
                getCompletenes();
            }
            return () => {

            };
        }, [lessons]);

        if (lessons.length === 0) {
            return (
                <></>
            )
        }
        if (!lessonsComplete) {
            return <>
                {lessons.sort((a, b) => a.title?.localeCompare(b.title ?? '') as number).map((value: Lesson, index: number) => (

                    <Grid key={index} item xs={12} sm={6} md={3}>
                        <Link component={RouterLink} to={`lesson/${value.id}`} underline={'none'}>
                            <Card style={{height: '100%'}}>
                                <CardActionArea style={{height: '100%'}}>
                                    <CardContent style={{textAlign: 'center'}}>
                                        <Typography variant="h5" component="h2">
                                            {value.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </>
        }
        if (lessonsComplete) {
            return (
                <>
                    {lessonsComplete
                        .sort((a, b) => a.lesson.title?.localeCompare(b.lesson.title ?? '') as number)
                        .map((value, index) => {
                            // console.log(value);
                            return (
                                <Grid key={index} item xs={12} sm={6} md={3}>
                                    <Link component={RouterLink} to={`lesson/${value.lesson.id}`}
                                          underline={'none'}>
                                        <Card sx={{height: '100%', backgroundColor: value.completed ? 'primary.main' : 'auto'}}>
                                            <CardActionArea style={{height: '100%'}}>
                                                <CardContent style={{textAlign: 'center'}}>
                                                    <Typography variant="h5" component="h2">
                                                        {value.lesson.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        })
                    }
                </>);
        }


        return (
            <>
                {lessons.sort((a, b) => a.title?.localeCompare(b.title ?? '') as number).map((value: Lesson, index: number) => (

                    <Grid key={index} item xs={12} sm={6} md={3}>
                        <Link component={RouterLink} to={`lesson/${value.id}`} underline={'none'}>
                            <Card style={{height: '100%'}}>
                                <CardActionArea style={{height: '100%'}}>
                                    <CardContent style={{textAlign: 'center'}}>
                                        <Typography variant="h5" component="h2">
                                            {value.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </>
        );
    }
;

export default LessonItemsGrid;
