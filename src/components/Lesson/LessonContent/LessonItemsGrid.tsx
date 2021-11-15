import React, {useContext, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Lesson} from "../../../API";
import {UserContext} from "../../../App";
import {Teacher} from "../../../models/Teacher";
import {API, graphqlOperation} from "aws-amplify";


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
type LessonComplete = {
    lesson: Lesson,
    completed: boolean
}
const LessonItemsGrid = (props: LessonItemsGridProps) => {
        const {lessons, path} = {...props}
        const user = useContext(UserContext);
        const [lessonsComplete, setLessonsComplete] = useState<LessonComplete[] | null>(null);
        useEffect(() => {
            if (user instanceof Teacher) {
                const getCompletenes = async () => {
                    const classrooms = await user.getClassrooms();
                    const lessonsComplete: LessonComplete[] = [];
                    await Promise.all(lessons.sort((a, b) => a.title?.localeCompare(b.title ?? '') as number).map(async (lesson: Lesson, index: number) => {
                        const completedArray: boolean[] = [];
                        for (const classroom of classrooms) {
                            const result: any = await API.graphql(graphqlOperation(classroomCompleteQuery, {
                                classroom: classroom.id,
                                lesson: lesson.id
                            }));
                            // console.log(result.data.listClassroomLessons.items)
                            if (result.data.listClassroomLessons.items.length == 0) {
                                completedArray.push(false);
                            }else{

                            completedArray.push(result.data.listClassroomLessons.items[0].completed);
                            }
                        }
                            lessonsComplete.push({lesson: lesson, completed: completedArray.every(value => value)});
                        }
                    ))
                    setLessonsComplete(lessonsComplete);
                }
                getCompletenes();
            }
            return () => {

            };
        }, []);

        if (lessons.length === 0) {
            return (
                <Typography>No Lessons</Typography>
            )
        }
        if (user instanceof Teacher && !lessonsComplete) {
            return <>
                {lessons.sort((a, b) => a.title?.localeCompare(b.title ?? '') as number).map((value: Lesson, index: number) => (

                    <Grid key={index} item xs={12} sm={6} md={3}>
                        <Link component={RouterLink} to={`../lessons/${value.id}`} underline={'none'}>
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
        if (user instanceof Teacher && lessonsComplete) {
            return (
                <>
                    {lessonsComplete
                        .sort((a, b) => a.lesson.title?.localeCompare(b.lesson.title ?? '') as number)
                        .map((value, index) => {
                            // console.log(value);
                            return (
                                <Grid key={index} item xs={12} sm={6} md={3}>
                                    <Link component={RouterLink} to={`../lessons/${value.lesson.id}`}
                                          underline={'none'}>
                                        <Card style={{height: '100%', backgroundColor: value.completed ? 'green' : 'inherit'}}>
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
                        <Link component={RouterLink} to={`../lessons/${value.id}`} underline={'none'}>
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
