import React, {useEffect, useState} from 'react';
import {Lesson, LessonTeacher, Section, Term} from "../../API";
import {API, graphqlOperation} from "aws-amplify";
import {Box, Grid, Rating, Stack, Typography} from "@material-ui/core";
import AttendanceBarchart from "./charts/AttendanceBarchart";
import AttendancePieChart from "./charts/AttendancePieChart";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Card} from "@mui/material";
import {fShortenNumber} from "../../utils/formatNumber";
import LinearProgressBottom from "../../utils/LinearProgressBottom";

const query =/* GraphQL */ `query MyQuery($id: ID = "") {
    getSection(id: $id) {
        Lessons {
            items {
                title
                LessonTeacher {
                    items {
                        score
                        id
                    }
                }
                Attendances {
                    items {
                        present
                    }
                }
            }
        }
    }
}`
const SectionReport = (params: { section: Section }) => {
    const {section} = {...params};

    async function fetchTermData() {
        const input = {
            id: section.id
        }
        console.log(input)
        return API.graphql(graphqlOperation(query, {id: section.id}));
    }

    const [sectionData, setSectionData] = useState<Section | null>(null);

    function getTermData() {
        fetchTermData().then((result: any) => {
            console.log('result', result);
            setSectionData(result.data.getSection);
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
        return Number(fShortenNumber(sum / length));
    }

    if (!sectionData) {
        return <LinearProgressBottom/>;
    }
    if (sectionData.Lessons?.items?.length === 0) {
        return <Typography variant={'h3'} textAlign={'center'}>No lessons for this section</Typography>;
    }
    return (
                <Grid container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                >
                    {sectionData.Lessons?.items?.map((lesson: Lesson) => {
                        console.log(lesson)
                        const allAttendancesAmount: number = lesson.Attendances?.items?.length as number;
                        const presentAttendances: number = lesson.Attendances?.items?.filter(item => item?.present).length as number;
                        return (
                            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                {/*<Carousel autoPlay={false} showArrows={true} infiniteLoop={true}>*/}
                                <AttendancePieChart amountOfPresent={presentAttendances}
                                                    amountOfAbsent={allAttendancesAmount - presentAttendances}/>
                                {/*    <AttendanceBarchart amountOfPresent={presentAttendances}*/}
                                {/*                        amountOfAbsent={allAttendancesAmount - presentAttendances}/>*/}
                                {/*</Carousel>*/}
                            </Grid>
                        );
                    })}
                </Grid>
    );
};

export default SectionReport;
