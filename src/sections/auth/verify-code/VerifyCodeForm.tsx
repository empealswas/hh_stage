import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
// form
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {Alert, OutlinedInput, Stack} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
import {Auth} from "aws-amplify";

// ----------------------------------------------------------------------

type FormValuesProps = {
    code1: string;
    code2: string;
    code3: string;
    code4: string;
    code5: string;
    code6: string;
};

type ValueNames = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

export default function VerifyCodeForm() {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {email} = useParams()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.string().required('Code is required'),
        code2: Yup.string().required('Code is required'),
        code3: Yup.string().required('Code is required'),
        code4: Yup.string().required('Code is required'),
        code5: Yup.string().required('Code is required'),
        code6: Yup.string().required('Code is required'),
    });

    const defaultValues = {
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
    };

    const {
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting, isValid,},

    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    });

    const values = watch();

    useEffect(() => {
        document.addEventListener('paste', handlePasteClipboard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (data: FormValuesProps) => {
        try {
            setError('');
            setLoading(true);
            const code = Object.values(data).join('');
            console.log('code:', code);
            await new Promise((resolve) => setTimeout(resolve, 500));
            await Auth.confirmSignUp(String(email), code);
            enqueueSnackbar('Verify success!');

            navigate(PATH_DASHBOARD.root, {replace: true});
        } catch (error) {
            setError(error.message);
            console.error(error);
        }finally {
            setLoading(false);
        }

    };

    const handlePasteClipboard = (event: ClipboardEvent) => {
        let data: string | string[] = event?.clipboardData?.getData('Text') || '';

        data = data.split('');
        const value: any = {};
        [].forEach.call(document.querySelectorAll('#field-code'), (node: any, index) => {
            node.value = data[index];
            const fieldIndex = `code${index + 1}`;
            setValue(fieldIndex as ValueNames, data[index]);
            value[fieldIndex as ValueNames] = data[index];
        });
        console.log(value);
        onSubmit(value);
    };

    const handleChangeWithNextField = (
        event: React.ChangeEvent<HTMLInputElement>,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    ) => {
        const {maxLength, value, name} = event.target;
        const fieldIndex = name.replace('code', '');

        const fieldIntIndex = Number(fieldIndex);

        if (value.length >= maxLength) {
            if (fieldIntIndex < 6) {
                const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

                if (nextfield !== null) {
                    (nextfield as HTMLElement).focus();
                }
            }
        }

        handleChange(event);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" spacing={2} justifyContent="center">
                {Object.keys(values).map((name, index) => (
                    <Controller
                        key={name}
                        name={`code${index + 1}` as ValueNames}
                        control={control}
                        render={({field}) => (
                            <OutlinedInput
                                {...field}
                                id="field-code"
                                autoFocus={index === 0}
                                placeholder="-"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    handleChangeWithNextField(event, field.onChange)
                                }
                                inputProps={{
                                    maxLength: 1,
                                    sx: {
                                        p: 0,
                                        textAlign: 'center',
                                        width: {xs: 36, sm: 56},
                                        height: {xs: 36, sm: 56},
                                    },
                                }}
                            />
                        )}
                    />
                ))}
            </Stack>
            {error && <Alert sx={{m: 3}} severity={"error"}>{error}</Alert>}
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting || loading}
                disabled={!isValid}
                sx={{mt: 3}}
            >
                Verify
            </LoadingButton>
        </form>
    );
}
