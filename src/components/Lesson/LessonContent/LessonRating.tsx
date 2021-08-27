import React, {useContext, useEffect, useState} from 'react';
import {Rating, Typography} from "@material-ui/core";
import {Connect} from "aws-amplify-react";
import {API, graphqlOperation} from "aws-amplify";
import {UserContext} from "../../../App";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import {createLessonTeacher, updateLessonTeacher} from "../../../graphql/mutations";


const query = `query MyQuery($eq: ID = "", $eq1: ID = "") {
  listLessonTeachers(filter: {lessonID: {eq: $eq1}, teacherID: {eq: $eq}}) {
    items {
      id
      score
    }
  }
}
`
const update = /* GraphQL */ `mutation UpdateLessonTeacher(
    $input: UpdateLessonTeacherInput!
    $condition: ModelLessonTeacherConditionInput
) {
    updateLessonTeacher(input: $input, condition: $condition) {
        id
        teacherID
        lessonID
        score

    }
}
`
const create = /* GraphQL */ `
    mutation CreateLessonTeacher(
        $input: CreateLessonTeacherInput!
        $condition: ModelLessonTeacherConditionInput
    ) {
        createLessonTeacher(input: $input, condition: $condition) {
            id
            teacherID
            lessonID
            score
        }
    }
`;


const LessonRating = (props: { lessonId: string }) => {
    const user = useContext(UserContext);
    const [lessonRating, setLessonRating] = useState<number | null>(null);
    let ratingsRecords: [] | null = null;
    const [updating, setUpdating] = useState(true);

    async function createNewRatingForLesson(newRating: number | null) {
        return API.graphql(graphqlOperation(create, {
            input: {
                lessonID: props.lessonId,
                teacherID: user?.email,
                score: newRating
            }
        }));
    }

    async function getRatingForLesson() {
        return API.graphql(graphqlOperation(query, {eq: user?.email, eq1: props.lessonId}));
    }

    function displayRatingForLesson() {
        getRatingForLesson().then((result: any) => {
                const ratings: [] = result.data.listLessonTeachers.items;
                console.log(ratings)
                if (ratings.length === 0) {
                    setLessonRating(0);
                } else {
                    // @ts-ignore
                    setLessonRating(ratings[0].score);
                }
            setUpdating(false);
            }
        ).catch(error => {
            console.error(error);
        })
    }

    async function updateRatingForLesson(lessonTeacherID: string, newRating: number | null) {
        console.log(newRating);
        const input = {
            id: lessonTeacherID,
            score: newRating
        }
        return API.graphql(graphqlOperation(update, {input}));
    }

    function updateLessonRating(newRating: number | null) {
        setUpdating(true);
        getRatingForLesson().then((result: any) => {
            const ratings: [] = result.data.listLessonTeachers.items;
            if (ratings.length === 0) {
                createNewRatingForLesson(newRating).then(value => {
                    console.log(value);
                    setLessonRating(newRating);
                }).catch(error => {
                    console.error(error);
                });
            } else {
                // @ts-ignore
                updateRatingForLesson(ratings[0].id, newRating).then(value => {
                    setLessonRating(newRating);
                }).catch(error => {
                    console.error(error);
                })
            }
            setUpdating(false);
        })

    }

    useEffect(() => {
        displayRatingForLesson();
        return () => {
        };
    }, []);

    return (
        <>
            <Typography variant={'subtitle1'}>Please rate this lesson</Typography>

            <Rating
                name="simple-controlled"
                value={lessonRating}
                size={'large'}
                onChange={(event, newValue) => {
                    updateLessonRating(newValue)
                }}
                disabled={updating}
            />

        </>
    );
};

export default LessonRating;
