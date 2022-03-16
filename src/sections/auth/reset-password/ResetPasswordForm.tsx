import * as Yup from 'yup';
// form
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
// @mui
import {Alert, Stack} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import {FormProvider, RHFTextField} from '../../../components/hook-form';
import {Auth} from "aws-amplify";
import {useState} from "react";

// ----------------------------------------------------------------------

type FormValuesProps = {
    email: string;
};

type Props = {
    onSent: VoidFunction;
    onGetEmail: (value: string) => void;
};

export default function ResetPasswordForm({onSent, onGetEmail}: Props) {
    const isMountedRef = useIsMountedRef();

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    });

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: {email: 'demo@gmail.com'},
    });
    const [errorText, setErrorText] = useState('');


    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        setErrorText('');
        try {
            const result: any = await Auth.forgotPassword(data.email);
            console.log(result);
            if (isMountedRef.current) {
                onSent();
                onGetEmail(data.email);
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

                <RHFTextField name="email" label="Email address"/>

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
