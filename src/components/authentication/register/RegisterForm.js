import * as Yup from 'yup';
import * as React from 'react';
import {useState} from 'react';
import {Icon} from '@iconify/react';
import {Form, FormikProvider, useFormik} from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {useNavigate} from 'react-router-dom';
// material
import {IconButton, InputAdornment, Stack, TextField} from '@material-ui/core';
import {LoadingButton} from '@material-ui/lab';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {Alert} from "@mui/material";
import {Amplify, Auth} from "aws-amplify";

// ----------------------------------------------------------------------
Amplify.register(Auth);

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const RegisterSchema = Yup.object().shape({

        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        type: Yup.mixed().oneOf(['school', 'organization']),
        name: Yup.string().required('Name is required')

    });

    const formik = useFormik({
        initialValues: {
            type: 'school',
            email: '',
            password: '',
            name: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: () => {
            setLoading(true);
            Auth.signUp({
                username: getFieldProps('email').value,
                password: getFieldProps('password').value,
                attributes: {
                    email: getFieldProps('email').value,          // optional
                    'custom:organizationType': type,
                    'custom:name': getFieldProps('name').value
                }
            }).then(r => {
                console.log(r)
                navigate('../login')
            }).catch(error => {
                setError(error.message);
            }).finally(() => {
                setLoading(false);
                // navigate('../dashboard', {replace: true});
            })

        }
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps, initialValues} = formik;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [type, setType] = useState(initialValues.type);
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <ToggleButtonGroup
                        value={type}
                        onChange={(event, newAlignment) => {
                            if (newAlignment) {
                                setType(newAlignment);
                            }
                        }}
                        exclusive
                        aria-label="text alignment"
                    >
                        <ToggleButton value="school" aria-label="centered">
                            School
                        </ToggleButton>
                        <ToggleButton value="organization" aria-label="right aligned">
                            Organization
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                        />
                    </Stack>

                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                        <Icon icon={showPassword ? eyeFill : eyeOffFill}/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    {error &&
                    <Alert onClose={() => setError('')} severity="error">{error}</Alert>
                    }

                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={loading}
                    >
                        Register
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
