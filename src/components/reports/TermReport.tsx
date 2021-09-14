import React, {useEffect, useState} from 'react';
import {Lesson, LessonTeacher, Term} from "../../API";
import {API, graphqlOperation} from "aws-amplify";
import {Box, Grid, Rating, Stack, Typography} from "@material-ui/core";
import AttendanceBarchart from "./charts/AttendanceBarchart";
import AttendancePieChart from "./charts/AttendancePieChart";

const query =/* GraphQL */ `query MyQuery($id: ID!) {
    getTerm(id: $id) {
        TermLessons {
            items {
                lesson {
                    id
                    title
                    Attendances {
                        items {
                            present
                            id
                        }
                    }
                    LessonTeacher {
                        items {
                            score
                            id
                        }
                    }
                }
            }
        }
    }
}`
const TermReport = (params: { term: Term }) => {
    const {term} = {...params};


    async function fetchTermData() {
        const input = {
            id: term.id
        }
        console.log(input)
        return API.graphql(graphqlOperation(query, {id: term.id}));
    }

    const [termData, setTermData] = useState<Term | null>(null);

    function getTermData() {
        fetchTermData().then((result: any) => {
            console.log('result')
            console.log(result)
            setTermData(result.data.getTerm);
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        getTermData();
        return () => {
        };
    }, []);


    function getAverageScoreForLesson(lesson: Lesson) {
        if (lesson?.LessonTeacher?.items?.length === 0) {
            return 0;
        }
        let sum = 0;
        lesson.LessonTeacher?.items?.forEach(lesson => {
            sum += lesson?.score ?? 0;
        })
        const length = lesson?.LessonTeacher?.items?.length ?? 1;
        return sum / length;
    }

    return (
        termData ? <>
                {termData.TermLessons?.items?.map((item: any) => item.lesson).map((lesson: Lesson) => {
                    const allAttendancesAmount: number = lesson.Attendances?.items?.length as number;
                    const presentAttendances: number = lesson.Attendances?.items?.filter(item => item?.present).length as number;
                    return (
                        <Box key={lesson.id} m={3}>
                            <Typography variant={'h5'}>
                                Name of Lesson: {lesson.title}
                            </Typography>
                            <Stack direction={'row'} spacing={2} style={{marginBottom: 10}}>
                                <Typography variant={'h6'}>
                                    Average rating: {getAverageScoreForLesson(lesson)}/5
                                </Typography>
                                <Rating size={"large"} precision={0.1} disabled={true}
                                        value={getAverageScoreForLesson(lesson)}/>
                            </Stack>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={6} lg={5}>
                                    <AttendanceBarchart amountOfPresent={presentAttendances}
                                                        amountOfAbsent={allAttendancesAmount - presentAttendances}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={5}>
                                    <AttendancePieChart amountOfPresent={presentAttendances}
                                                        amountOfAbsent={allAttendancesAmount - presentAttendances}/>
                                </Grid>
                            </Grid>
                        </Box>
                    );
                })}
            </>
            :
            <></>
    );
};

export default TermReport;
