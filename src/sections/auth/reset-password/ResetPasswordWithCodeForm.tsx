import * as Yup from 'yup';
// form
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
// @mui
import {Alert, IconButton, InputAdornment, Stack} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import {FormProvider, RHFTextField} from '../../../components/hook-form';
import {Auth} from "aws-amplify";
import Iconify from "../../../components/Iconify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";

// ----------------------------------------------------------------------

type FormValuesProps = {
    code: string;
    password: string;
    confirmPassword: string,
};

type Props = {
    email: string,
};

export default function ResetPasswordWithCodeForm({email}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();
    const snackbar = useSnackbar();
    const isMountedRef = useIsMountedRef();

    const ResetPasswordSchema = Yup.object().shape({
        code: Yup.string().required('Reset code is required'),
        password: Yup.string().required("New password is required"),
        confirmPassword: Yup.string().required("Confirm password is required"),

    });

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: {code: ''},
    });

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        setErrorText("");
        if(data.password !== data.confirmPassword){
            setErrorText('Password are not the same!');
            return;
        }
        try {
            const result: any = await Auth.forgotPasswordSubmit(email, data.code, data.password);
            console.log(result);
            snackbar.enqueueSnackbar('Password was successfully changed');
            navigate('/auth/login');
            if (isMountedRef.current) {

            }
        } catch (e) {
            console.error(e);
            setErrorText(e.message);
        }


    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={3}>
            {!!errorText && <Alert severity="error">{errorText}</Alert>}
                <RHFTextField name="code" label="Reset Code"/>
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
                <RHFTextField
                    name="confirmPassword"
                    label="Confirm password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={() => setConfirmShowPassword(!showConfirmPassword)}>
                                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
                    Reset Password
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
