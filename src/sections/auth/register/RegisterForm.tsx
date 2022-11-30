import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// paths
import {PATH_DASHBOARD} from '../../../routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  postcode: string;
  afterSubmit?: string;
};

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    dob: Yup.string(),
    postcode: Yup.string()
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    postcode: ''
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      setErrorText('');
      await register(data.email, data.password, data.firstName, data.lastName, data.dob, data.postcode);
      // cognito trigger has auto-verified for us, so go straight to the sign-in page
      window.location.href = `${PATH_DASHBOARD.root}`;
    } catch (error) {
      console.error(error);
      //reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
        let message = error.message;
        message = message.replace(/email address/g, "username");
        message = message.replace(/email/g, "username");
        setErrorText(message);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errorText && <Alert severity="error">{errorText}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="postcode" label="Postcode" />
          <RHFTextField name="dob" label="Date of birth" placeholder="YYYY-MM-DD" />
        </Stack>

        <RHFTextField name="email" label="Username" placeholder="firstname.lastname@healthy.habits" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
