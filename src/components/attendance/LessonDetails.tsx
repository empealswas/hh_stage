import React, {useContext, useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {UserContext} from "../../App";
import {createPELessonRecord} from "../../graphql/mutations";
import {Classroom, PELessonRecord} from "../../API";
import {FormControl, InputLabel, MenuItem, Rating, Select, Typography} from "@mui/material";
import {Button, Stack, TextField} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {Can} from "../../utils/Ability";
import AttendanceSheetTableTest from "./AttendanceSheetTableTest";
import {LoadingButton} from "@material-ui/lab";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import LessonDetailsForm from "./LessonDetailsForm";
import {format} from "date-fns";


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
  }
}
`

const LessonDetails = (props: { lessonId: string, selectedClassroom: Classroom }) => {
    const user = useContext(UserContext);
        const {lessonId, selectedClassroom} = {...props};

    const [lessonRecord, setLessonRecord] = useState<PELessonRecord | null>(null);
    useEffect(() => {
        const getData = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {
                id: lessonId,
                classroomId: selectedClassroom.id,
                teacherId: user?.email
            }));
            let records = result.data.getLesson?.LessonsRecords.items;
            if (records?.length === 0) {
                const result: any = await API.graphql(graphqlOperation(createPELessonRecord, {
                    input: {
                        classroomID: selectedClassroom.id,
                        teacherID: user?.email,
                        lessonID: lessonId,
                        date: format(new Date(), 'yyyy-MM-dd'),
                    }
                }));
                setLessonRecord(result);
            } else {
                setLessonRecord(records[0]);
            }
        }
        getData();

    }, [props.selectedClassroom])


    return (
        <>
            {lessonRecord ?
                <LessonDetailsForm lessonRecord={lessonRecord}/>
                : <Typography>Loading</Typography>}
        </>
    );
};

export default LessonDetails;