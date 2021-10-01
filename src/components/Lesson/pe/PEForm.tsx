import React, {useContext, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikConsumer, FormikProvider, useFormik, useFormikContext} from "formik";
import {Button, IconButton, InputAdornment, Stack, TextField} from "@material-ui/core";
import {Icon} from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {LoadingButton} from "@material-ui/lab";
import {format, compareAsc} from 'date-fns'
import {
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Rating,
    Select,
    TextareaAutosize,
    Typography
} from "@mui/material";
import ProgressButton from "../../Buttons/ProgressButton";
import {API, graphqlOperation} from "aws-amplify";
import {useParams} from "react-router-dom";
import AttendanceSheetTableTest, {AttendanceOfPupil} from "../../attendance/AttendanceSheetTableTest";
import {Can} from "../../../utils/Ability";
import {UserContext} from "../../../App";
import {createPELessonRecord} from "../../../graphql/mutations";
import {useSnackbar} from "notistack";

const activities = ['Walking', 'Running', 'Gym', 'Dance', 'Soccer', 'Rugby', 'Gaelic', 'Other']
const PEForm = () => {
    const RegisterSchema = Yup.object().shape({
        deliveredBy: Yup.mixed()
            .oneOf(['Teacher', 'Sport Coach', 'Other']),
        duration: Yup.mixed()
            .oneOf([5, 10, 15, 30, 45, 60]),
        activity: Yup.mixed()
            .oneOf(activities),
        notes: Yup.string(),
        rating: Yup.number().min(1).max(5),


    });
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [classroomId, setClassroomId] = useState('');
    const snackbar = useSnackbar();
    const sentRecd = async () => {
        return API.graphql(graphqlOperation(createPELessonRecord, {
            input: {
                teacherID: user?.email,
                date: format(value ?? new Date(), 'yyyy-MM-dd'),
                // date: value?.toISOString(),
                deliveredBy: getFieldProps('deliveredBy').value,
                duration: getFieldProps('duration').value,
                activity: getFieldProps('activity').value,
                rating: getFieldProps('rating').value,
                notes: getFieldProps('notes').value,
                classroomID: classroomId
            }
        }));
    }
    const formik = useFormik({
        initialValues: {
            deliveredBy: 'Teacher',
            duration: 30,
            activity: activities[0],
            notes: '',
            rating: 3,
        },
        validationSchema: RegisterSchema,
        onSubmit: async () => {
            // API.graphql(graphqlOperation(updateCurriculum, {
            //     input: {
            //         id: id,
            //         name: getFieldProps('name').value
            //     }
            // }));
            console.log(getFieldProps('deliveredBy').value)
            console.log(getFieldProps('duration').value)
            console.log(getFieldProps('activity').value)
            console.log(getFieldProps('notes').value)
            console.log(getFieldProps('rating').value)
            console.log(value?.toISOString())
            console.log(pupils);
            console.log('teacher', user?.email)
            console.log('clid', classroomId)
            setLoading(true);
            sentRecd().then(value1 => {
                console.log(value1)
                console.log('dne')
                setLoading(false);
                resetForm();
                snackbar.enqueueSnackbar('PE Lesson Record was added', {variant: 'success'})
                formik.setSubmitting(false);
            }).catch(err =>{
                console.error(err)
            })
        }
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid, resetForm} = formik;
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [pupils, setPupils] = React.useState<null | AttendanceOfPupil[]>(null);
    return (
        <FormikProvider value={formik}>
            <Typography textAlign={'center'} variant={'h2'} sx={{mb: 15}}>PE Self Reporting</Typography>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack direction='row' spacing={2}>
                        {/*<Typography component="legend">Date</Typography>*/}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                // @ts-ignore
                                renderInput={(params) => <TextField {...params} />}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </LocalizationProvider>
                        {/*<input type={'date'}  onChange={event => console.log(event)} style={{maxWidth: 200, fontSize: '20px'}}*/}
                        {/*       aria-errormessage={'error'}/>*/}
                    </Stack>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Delivered By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Delivered By"
                                {...getFieldProps('deliveredBy')}
                            >
                                <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                <MenuItem value={"Sport Coach"}>Sport Coach</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="duration-label">Duration</InputLabel>
                            <Select
                                labelId="duration-label"
                                id="duration-form-id"
                                label="Duration"
                                {...getFieldProps('duration')}
                            >
                                <MenuItem value={5}>5 min</MenuItem>
                                <MenuItem value={10}>10 min</MenuItem>
                                <MenuItem value={15}>15 min</MenuItem>
                                <MenuItem value={30}>30 min</MenuItem>
                                <MenuItem value={45}>45 min</MenuItem>
                                <MenuItem value={60}>60 min</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="activity-label">Activity</InputLabel>
                            <Select
                                labelId="activity-label"
                                id="activity-form-id"
                                label="Activity"
                                {...getFieldProps('activity')}
                            >
                                {activities.map((activity, index) =>
                                    <MenuItem value={activity}
                                              key={`activity-${index}`}>{activity}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <div>
                            <Typography component="legend">Rating</Typography>
                            <Rating size={'large'}
                                    {...getFieldProps('rating')}
                            />
                        </div>
                    </Stack>
                    <TextField
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        minRows={3}
                        {...getFieldProps('notes')}
                    />

                    <Can I={'read'} an={'attendance'}>
                        <AttendanceSheetTableTest setPupilsAttendance={setPupils} setClassroomId={setClassroomId}/>
                    </Can>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={10} justifyContent={'space-between'}>
                        <Button variant={'outlined'} color={'secondary'} onClick={() => {
                            resetForm();
                        }}>Reset
                        </Button>
                        <Can I={'read'} an={'attendance'}>
                            <LoadingButton
                                size="large"
                                type="submit"
                                variant="contained"
                                loading={loading}
                            >
                                Make Record
                            </LoadingButton>
                        </Can>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default PEForm;
