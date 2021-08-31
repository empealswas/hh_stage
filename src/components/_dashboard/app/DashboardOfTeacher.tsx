import React, {useContext, useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {UserContext} from "../../../App";
import {Lesson} from '../../../API';
import Grid from "@material-ui/core/Grid";
import {Connect} from "aws-amplify-react";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import CardSkeleton from "../../skeletons/CardSkeleton";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";

const query =/*GraphQL*/`query MyQuery($id: ID = "") {
    getTeacher(id: $id) {
        classrooms {
            items {
                classroom {
                    yearGroup {
                        subjects {
                            items {
                                subject {
                                    SubjectTerms {
                                        items {
                                            term {
                                                TermLessons {
                                                    items {
                                                        lesson {
                                                            id
                                                            description
                                                            title
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}`
const DashboardOfTeacher = () => {
    const user = useContext(UserContext);
    const [lessons, setLessons] = useState<null | Lesson[]>(null);
    useEffect(() => {
        console.log(user);
        const fetchLessons = async (): Promise<any> => {
            const lessonsData: any = await API.graphql(graphqlOperation(query, {id: user?.email}));
            const lessons: Lesson[] = lessonsData.data.getTeacher.classrooms.items
                .flatMap((item: any) => item.classroom.yearGroup.subjects.items)
                .flatMap((item: any) => item.subject.SubjectTerms.items)
                .flatMap((item: any) => item.term.TermLessons.items)
                .flatMap((item: any) => item.lesson)

            setLessons(lessons);
        };
        fetchLessons()
        return () => {

        };
    }, []);

    return (
        <Container>
            {/*<Typography variant={'h5'}>*/}
            {/*    Your Lessons:*/}
            {/*</Typography>*/}
            <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start" spacing={2}
            >
                <Grid item xs={12} minHeight={200}>
                    <Grid container justifyContent="center" spacing={2}
                          style={{flexGrow: 1, display: 'flex', flexWrap: 'wrap'}}>
                        {lessons ?
                            lessons.map((lesson: Lesson, index) => (
                                <Grid key={index} item xs maxWidth={300} minWidth={200}>
                                    <Link component={RouterLink} to={`../curricula/subjects/terms/lessons/${lesson.id}`}
                                          underline={'none'}>
                                        <Card style={{minHeight: 120}}>
                                            <CardActionArea>
                                                <CardContent style={{textAlign: 'center'}}>
                                                    <Typography variant="h5" component="h2">
                                                        {lesson.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))
                            :
                            [0, 1, 2, 3, 4, 5].map((value) => (
                                <CardSkeleton key={value}/>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DashboardOfTeacher;
