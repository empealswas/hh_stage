import React from 'react';
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
import {updateCurriculum} from "../../../graphql/mutations";
import {useParams} from "react-router-dom";
import AttendanceSheetTableTest from "../../attendance/AttendanceSheetTableTest";
import {Can} from "../../../utils/Ability";

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
    const {id} = useParams();

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
            // formik.setSubmitting(false);
        }
    });
    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid, resetForm} = formik;
    const [value, setValue] = React.useState<Date | null>(new Date());
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
                        <AttendanceSheetTableTest/>
                    </Can>
                    <Stack direction={{xs:'column',sm:'row'}} spacing={10} justifyContent={'space-between'}>
                        <Button variant={'outlined'} color={'secondary'}  onClick={()=>{
                            resetForm();
                        }}>Reset</Button>
                        <LoadingButton
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={false}
                        >
                            Make Record
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default PEForm;
