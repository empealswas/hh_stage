import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Rating, Select, Typography} from "@mui/material";
import {Form, FormikContextType, FormikProvider, useFormik} from "formik";
import {Button, Stack, TextField} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import {Can} from "../../utils/Ability";
import {LoadingButton} from "@material-ui/lab";
import {PELessonRecord} from "../../API";
import * as Yup from "yup";
import {format, parse, parseISO,} from "date-fns";
import {API, graphqlOperation} from "aws-amplify";
import {createAttendance, createPELessonRecord, updatePELessonRecord} from "../../graphql/mutations";
import {useSnackbar} from "notistack";


const activities = ['Walking', 'Running', 'Swimming', 'Gym', 'Dance', 'Soccer', 'Rugby', 'Gaelic', 'Other']
const RegisterSchema = Yup.object().shape({
    deliveredBy: Yup.mixed()
        .oneOf(['Teacher', 'Sport Coach', 'Other']).nullable(),
    duration: Yup.mixed()
        .oneOf([5, 10, 15, 30, 45, 60]).nullable(),
    activity: Yup.mixed()
        .oneOf(activities),
    notes: Yup.string().nullable(),
    rating: Yup.number().min(1).max(5).nullable(),
});
const LessonDetailsForm = (props: { lessonRecord: PELessonRecord }) => {
    const {lessonRecord} = {...props};
    const [date, setDate] = React.useState<Date | null>(null);


    useEffect(() => {
        if (lessonRecord.date) {
            setDate(parseISO(lessonRecord.date));
        }else{
            setDate(new Date());
        }
    }, [])
    useEffect(() => {
        formik.setValues({
            'deliveredBy': lessonRecord.deliveredBy,
            'notes': lessonRecord.notes,
            'rating': lessonRecord.rating,
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
        },

        validationSchema: RegisterSchema,
        onSubmit: async () => {
            setLoading(true);
            await updateRecord();
            snackbar.enqueueSnackbar('Lesson record updated', {variant: 'success'})
            setLoading(false);
        }
    });

    const updateRecord = async () => {
        const result: any = await API.graphql(graphqlOperation(updatePELessonRecord, {
            input: {
                id: lessonRecord.id,
                date: format(date ?? new Date(), 'yyyy-MM-dd'),
                deliveredBy: getFieldProps('deliveredBy').value ?? null,
                duration: 15,
                activity: 'Daily Mile',
                rating: getFieldProps('rating').value ?? null,
                notes: getFieldProps('notes').value ?? null,
            }
        }));
        console.log('result', result)
    }
    const snackbar = useSnackbar();
    const [loading, setLoading] = useState(false);
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid, resetForm} = formik;
    return (
        <FormikProvider value={formik}>
            <Typography textAlign={'center'} variant={'h2'} sx={{mb: 15}}>Attendance Sheet</Typography>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
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
                    <TextField
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        minRows={3}
                        {...getFieldProps('notes')}
                        error={Boolean(errors.notes)}
                        helperText={errors.notes}

                    />

                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={10} justifyContent={'space-between'}>
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

export default LessonDetailsForm;