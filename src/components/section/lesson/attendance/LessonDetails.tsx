import React, {useContext, useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {FormControl, InputLabel, MenuItem, Rating, Select, Typography} from "@mui/material";
import * as Yup from "yup";
import LessonDetailsForm from "./LessonDetailsForm";
import {format} from "date-fns";
import {useSnackbar} from "notistack";
import {Classroom, CreatePELessonRecordInput, PELessonRecord, SectionOptions} from "../../../../API";
import {createPELessonRecord} from "../../../../graphql/mutations";
import useAuth from "../../../../hooks/useAuth";


const query = `query MyQuery($id: ID = "", $classroomId: ID = "", $teacherId: ID = "") {
    getLesson(id: $id) {
        LessonsRecords(filter: {classroomID: {eq: $classroomId}, and: {teacherID: {eq: $teacherId}}}) {
            items {
                id
                duration
                deliveredBy
                date
                classroomID
                activity
                rating
                notes
            }
        }
        Section {
            SectionOptions {
                Activities
                DeliveredBy
                Durations
            }
        }
    }
}
`

const LessonDetails = (props: { lessonId: string, selectedClassroom: Classroom }) => {
    const {user} = useAuth();
    const {lessonId, selectedClassroom} = {...props};
    const snackbar = useSnackbar();

    const [lessonRecord, setLessonRecord] = useState<PELessonRecord | null>(null);
    const [sectionOption, setSectionOption] = useState<SectionOptions | null>(null);
    useEffect(() => {
        const getData = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {
                id: lessonId,
                classroomId: selectedClassroom.id,
                teacherId: user?.email
            }));
            let records = result.data.getLesson?.LessonsRecords.items;
            const section: SectionOptions | null = result.data.getLesson?.Section?.SectionOptions;
            if (section) {
                if (records?.length === 0) {
                    const input: CreatePELessonRecordInput = {
                        classroomID: selectedClassroom.id,
                        teacherID: user?.email,
                        lessonID: lessonId,
                        date: format(new Date(), 'yyyy-MM-dd')
                    }
                    if (section.Durations) {
                        input.duration = section?.Durations[0];
                    }
                    if (section.Activities) {
                        input.activity = section?.Activities[0];
                    }
                    if (section.DeliveredBy) {
                        input.deliveredBy = section.DeliveredBy[0];
                    }

                    const result: any = await API.graphql(graphqlOperation(createPELessonRecord, {
                        input
                    }));
                    snackbar.enqueueSnackbar(`${input.activity} Record Created`, {variant: 'success'});
                    console.log('Created Lesson Result', result);
                    setLessonRecord(result.data.createPELessonRecord);
                } else {
                    setLessonRecord(records[0]);
                }
            } else {
                // before section options added, needs to be kept for daily mile to be working.
                if (records?.length === 0) {
                    const result: any = await API.graphql(graphqlOperation(createPELessonRecord, {
                        input: {
                            classroomID: selectedClassroom.id,
                            teacherID: user?.email,
                            lessonID: lessonId,
                            activity: 'Daily Mile',
                            date: format(new Date(), 'yyyy-MM-dd'),
                        }
                    }));
                    snackbar.enqueueSnackbar("Daily Mile Record Created", {variant: 'success'});
                    console.log('Created Lesson Result', result);
                    setLessonRecord(result.data.createPELessonRecord);
                } else {
                    setLessonRecord(records[0]);
                }
            }
            setSectionOption(section);
        }
        getData();

    }, [props.selectedClassroom])


    return (
        <>
            {lessonRecord  ?
                <LessonDetailsForm lessonRecord={lessonRecord} sectionOption={sectionOption}/>
                : <Typography>Loading</Typography>}
        </>
    );
};

export default LessonDetails;