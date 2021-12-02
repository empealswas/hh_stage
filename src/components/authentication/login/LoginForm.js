import * as Yup from 'yup';
import {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Form, FormikProvider, useFormik} from 'formik';
import {Icon} from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField} from '@material-ui/core';
import {LoadingButton} from '@material-ui/lab';
import {Alert, Container} from "@mui/material";
import {Auth} from "aws-amplify";

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const username = getFieldProps('email').value;
            const password = getFieldProps('password').value;
            setLoading(true)
            Auth.signIn(username, password).then(r => {
                console.log(r);
                setLoading(false);
                navigate('/dashboard', {replace: true});
            }).catch(reason => {
                if (reason.name === 'UserNotConfirmedException') {
                    console.log('User is not confirmed')
                    navigate('/confirmation');
                }
                setError(reason.message);
            }).finally(() => {
                setLoading(false)
            });
        }
    });

    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    return (

        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                <Stack spacing={3}>
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
                                    <IconButton onClick={handleShowPassword} edge="end">
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

                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                    <FormControlLabel
                        control={<Checkbox {...getFieldProps('remember')} checked={values.remember}/>}
                        label="Remember me"
                    />

                    <Link component={RouterLink} variant="subtitle2" to="#">
                        Forgot password?
                    </Link>
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={loading}
                >
                    Login
                </LoadingButton>

            </Form>

        </FormikProvider>

    );
}
