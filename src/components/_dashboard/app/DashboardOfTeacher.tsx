import React, {useContext, useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {UserContext} from "../../../App";
import {Classroom, Lesson, Term} from '../../../API';
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
import {Container, Stack} from "@material-ui/core";
import ChooseLessonPlanSearchField, {LessonPlansSearchField} from "../../reports/ChooseSubjectSearchField";
import TermReport from "../../reports/TermReport";
import SchoolHousesPage from "../../../pages/SchoolHousesPage";

const query =/*GraphQL*/`query MyQuery($id: ID = "") {
    getTeacher(id: $id) {
        classrooms {
            items {
                classroom {
                    id
                    name
                    yearGroup {
                        subjects {
                            items {
                                subject {
                                    SubjectTerms {
                                        items {
                                            term {
                                                nam
                                                id
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
    const [classrooms, setClassrooms] = useState<null | Classroom[]>(null);
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const [terms, setTerms] = useState<Term[] | null>(null);

    useEffect(() => {
        console.log(user);
        const fetchLessons = async (): Promise<any> => {
            const lessonsData: any = await API.graphql(graphqlOperation(query, {id: user?.email}));
            const terms: Term[] = lessonsData.data.getTeacher.classrooms.items
                .filter((item: any) => !!item?.classroom?.yearGroup)
                .flatMap((item: any) => item?.classroom?.yearGroup?.subjects?.items)
                .flatMap((item: any) => item?.subject.SubjectTerms.items)
                .flatMap((item: any) => item?.term)
            const lessons: Lesson[] = terms
                .flatMap(term => term?.TermLessons?.items)
                .flatMap((item: any) => item?.lesson)
            setTerms(terms);
            setClassrooms(lessonsData.data.getTeacher.classrooms.items.map((item: any) => item.classroom));
            setLessons(lessons);
        };
        fetchLessons()
        return () => {

        };
    }, []);

    return (
        <>

            {/*<Grid item xs={12} md={12} lg={6}>*/}
            {/*    <>*/}
            {/*        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>*/}
            {/*            <Typography variant="h4" gutterBottom>*/}
            {/*                Reports*/}
            {/*            </Typography>*/}
            {/*            <LessonPlansSearchField terms={terms} setSelectedTerm={setSelectedTerm}/>*/}
            {/*        </Stack>*/}
            {/*        {selectedTerm && <TermReport term={selectedTerm}/>}*/}
            {/*    </>*/}
            {/*</Grid>*/}
        </>);
    // <Typography variant={'h5'}>
    //     Your Classrooms:
    //     {classrooms?.map(classroom => `${classroom.name} | `)}
    // </Typography>
    // {/*<iframe width="100%" height="480px"*/}
    // {/*        src="https://forms.office.com/Pages/ResponsePage.aspx?id=in39BuFKQUe0esKCthc7aECUiEqJcetGu0bHPjzEkcFUNjFRWVhQTERaOUQ4WFZEMFcwSldLUlZTSC4u&embed=true"*/}
    // {/*        frameBorder="0"*/}
    // {/*        style={{maxWidth: '100%', maxHeight: "100vh"}}*/}
    // {/*        allowFullScreen*/}
    // {/*>*/}
    // {/*</iframe>*/}

    {/*<Grid container*/
    }
    {/*      direction="row"*/
    }
    {/*      justifyContent="flex-start"*/
    }
    {/*      alignItems="flex-start" spacing={2}*/
    }
    {/*>*/
    }
    {/*    <Grid item xs={12} minHeight={200}>*/
    }
    {/*        <Grid container justifyContent="center" spacing={2}*/
    }
    {/*              style={{flexGrow: 1, display: 'flex', flexWrap: 'wrap'}}>*/
    }
    {/*            {lessons ?*/
    }
    {/*                lessons.map((lesson: Lesson, index) => (*/
    }
    {/*                    <Grid key={index} item xs={12} sm={6} md={3} maxWidth={300} minWidth={200}>*/
    }
    {/*                        <Link component={RouterLink} to={`../curricula/subjects/terms/lessons/${lesson.id}`}*/
    }
    {/*                              underline={'none'}>*/
    }
    {/*                            <Card style={{height: '100%'}}>*/
    }
    {/*                                <CardActionArea style={{height: '100%'}}>*/
    }
    {/*                                    <CardContent style={{textAlign: 'center'}}>*/
    }
    {/*                                        <Typography variant="h5" component="h2">*/
    }
    {/*                                            {lesson.title}*/
    }
    {/*                                        </Typography>*/
    }
    {/*                                    </CardContent>*/
    }
    {/*                                </CardActionArea>*/
    }
    {/*                            </Card>*/
    }
    {/*                        </Link>*/
    }
    {/*                    </Grid>*/
    }
    {/*                ))*/
    }
    {/*                :*/
    }
    {/*                [0, 1, 2, 3, 4, 5].map((value) => (*/
    }
    {/*                    <CardSkeleton key={value}/>*/
    }
    {/*                ))*/
    }
    {/*            }*/
    }
    {/*        </Grid>*/
    }
    {/*    </Grid>*/
    }
    {/*</Grid>*/
    }
// </Container>
// )
};

export default DashboardOfTeacher;
