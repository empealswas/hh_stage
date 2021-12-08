import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Rating, Select, Typography} from "@mui/material";
import {Form, FormikContextType, FormikProvider, useFormik} from "formik";
import {Button, Stack, TextField} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {Can} from "../../utils/Ability";
import {LoadingButton} from "@material-ui/lab";
import {PELessonRecord, SectionOptions} from "../../API";
import * as Yup from "yup";
import {format, parse, parseISO,} from "date-fns";
import {API, graphqlOperation} from "aws-amplify";
import {createAttendance, createPELessonRecord, updatePELessonRecord} from "../../graphql/mutations";
import {useSnackbar} from "notistack";


const activities = ['Walking', 'Running', 'Swimming', 'Gym', 'Dance', 'Soccer', 'Rugby', 'Gaelic', 'Other']

const LessonDetailsForm = (props: { lessonRecord: PELessonRecord, sectionOption: SectionOptions | null }) => {
    const {lessonRecord, sectionOption} = {...props};
    const [date, setDate] = React.useState<Date | null>(null);
    const RegisterSchema = Yup.object().shape({
        deliveredBy: Yup.mixed()
            .oneOf(sectionOption ? sectionOption.DeliveredBy as string [] : ['Teacher', 'Sport Coach', 'Other'])
            .nullable(),
        duration: Yup.mixed()
            .oneOf(sectionOption ? sectionOption.Durations as number [] : [5, 10, 15, 30, 45, 60])
            .nullable(),
        activity: Yup.mixed()
            .oneOf(sectionOption ? sectionOption.Activities as string [] : activities)
            .nullable(),
        notes: Yup.string()
            .nullable(),
        rating: Yup.number().min(1).max(5)
            .nullable(),
    });

    useEffect(() => {
        if (lessonRecord.date) {
            setDate(parseISO(lessonRecord.date));
        } else {
            setDate(new Date());
        }
    }, [])
    useEffect(() => {
        console.log('---------------', lessonRecord)
        formik.setValues({
            'deliveredBy': lessonRecord.deliveredBy,
            'notes': lessonRecord.notes,
            'rating': lessonRecord.rating,
            'duration': lessonRecord.duration,
            'activity': lessonRecord.activity,
        })
        if (lessonRecord.date) {
            setDate(parseISO(lessonRecord.date));
        }
    }, [props.lessonRecord])
    const formik = useFormik({
        initialValues: {
            deliveredBy: lessonRecord.deliveredBy,
            notes: lessonRecord.notes,
            rating: lessonRecord.rating,
            duration: lessonRecord.duration,
            activity: lessonRecord.activity
        },

        validationSchema: RegisterSchema,
        onSubmit: async () => {
            setLoading(true);
            await updateRecord(sectionOption);
            snackbar.enqueueSnackbar('Lesson record updated', {variant: 'success'})
            setLoading(false);
        }
    });

    const updateRecord = async (sectionOption: SectionOptions | null) => {
        const result: any = await API.graphql(graphqlOperation(updatePELessonRecord, {
            input: {
                id: lessonRecord.id,
                date: format(date ?? new Date(), 'yyyy-MM-dd'),
                deliveredBy: getFieldProps('deliveredBy').value,
                duration: sectionOption ? getFieldProps('duration').value : 15,
                activity: sectionOption ? getFieldProps('activity').value :'Daily Mile',
                rating: getFieldProps('rating').value,
                notes: getFieldProps('notes').value,
            }
        }));
        console.log('Update Lesson Record', result)
    }
    const snackbar = useSnackbar();
    const [loading, setLoading] = useState(false);
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid, resetForm} = formik;

    const Settings = () => {
        if (sectionOption) {
            console.log(sectionOption.DeliveredBy)
            return (<>
                <Stack direction={{xs: 'column', sm: 'column'}} spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            // @ts-ignore
                            renderInput={(params) => <TextField {...params} />}
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                <FormControl>
                    <InputLabel id="demo-simple-delivered-by-label">Delivered By</InputLabel>
                    <Select
                        labelId="demo-simple-delivered-by-label"
                        id="demo-simple-select"
                        label="Delivered By"
                        {...getFieldProps('deliveredBy')}
                        disabled={sectionOption.DeliveredBy?.length === 1}
                        error={Boolean(errors.deliveredBy)}
                    >
                        {sectionOption.DeliveredBy?.filter(value => !!value).map((value: any) => <MenuItem
                            value={value}>{value}</MenuItem>)}
                    </Select>
                </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-activity-label">Activity</InputLabel>
                        <Select
                            labelId="demo-simple-activity-label"
                            id="demo-simple-select"
                            label="Activity"
                            disabled={sectionOption.Activities?.length === 1}
                            {...getFieldProps('activity')}
                            error={Boolean(errors.activity)}
                        >
                            {sectionOption.Activities?.filter(value => !!value).map((value: any) => <MenuItem
                                value={value}>{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-duration-label">Duration</InputLabel>
                        <Select
                            labelId="demo-simple-duration-label"
                            id="demo-simple-select"
                            label="Duration"
                            {...getFieldProps('duration')}
                            disabled={sectionOption.Durations?.length === 1}

                            error={Boolean(errors.duration)}
                        >
                            {sectionOption.Durations?.filter(value => !!value).map((value: any) => <MenuItem
                                value={value}>{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <div>
                        <Typography component="legend">Rating</Typography>
                        <Rating size={'large'}
                                {...getFieldProps('rating')}
                        />
                    </div>
                </Stack>
            </>)
        }
        return (<>
                <Stack direction='row' spacing={2}>
                    {/*<Typography component="legend">Date</Typography>*/}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            // @ts-ignore
                            renderInput={(params) => <TextField {...params} />}
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    {/*<input type={'date'}  onChange={event => console.log(event)} style={{maxWidth: 200, fontSize: '20px'}}*/}
                    {/*       aria-errormessage={'error'}/>*/}
                </Stack>
                <Stack direction={{xs: 'column', sm: 'column'}} spacing={2}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Delivered By</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Delivered By"
                            {...getFieldProps('deliveredBy')}
                            error={Boolean(errors.deliveredBy)}
                        >
                            <MenuItem value={"Teacher"}>Teacher</MenuItem>
                            <MenuItem value={"Sport Coach"}>Sport Coach</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <Typography component="legend">Rating</Typography>
                        <Rating size={'large'}
                                {...getFieldProps('rating')}
                        />
                    </div>
                </Stack>
            </>
        )
    }
    return (
        <FormikProvider value={formik}>
            <Typography textAlign={'center'} variant={'h2'} sx={{mb: 15}}>Attendance Sheet</Typography>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Settings/>
                    <Can I={'read'} an={'attendance'}>
                        <LoadingButton
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={loading}
                        >
                            Update Record
                        </LoadingButton>
                    </Can>
            </Form>
        </FormikProvider>
    );
};

export default LessonDetailsForm;