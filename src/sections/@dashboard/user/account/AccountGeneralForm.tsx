import React, {useCallback} from 'react';
import {useSnackbar} from "notistack";
import useAuth from "../../../../hooks/useAuth";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {API, graphqlOperation} from "aws-amplify";
import {updateUser} from "../../../../graphql/mutations";
import {FormProvider, RHFSelect, RHFTextField} from "../../../../components/hook-form";
import {Box, Card, Grid, Stack} from "@mui/material";
import {countries} from "../../../../_mock";
import {LoadingButton} from "@mui/lab";
import {User} from "../../../../API";

type Props = {
    user: User
}
type FormValuesProps = {
    firstName: string;
    lastName: string;
    zipCode: string | null;
    dob: string | null;
    recoveryEmailAddress: string;
};
const AccountGeneralForm = ({user}: Props) => {
    const {enqueueSnackbar} = useSnackbar();


    const UpdateUserSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        recoveryEmailAddress: Yup.string().required('Recovery email address is required')
    });

    const defaultValues = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        zipCode: user?.zipCode || '',
        dob: user?.dob || '',
        recoveryEmailAddress: user?.recoveryEmailAddress || ''
    };

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmit = async (data: FormValuesProps) => {
        try {
            let userData = {...data};
            if (userData.dob == '') userData.dob = null;
            const result: any = await API.graphql(graphqlOperation(updateUser, {
                input: {
                    id: user?.email,
                    ...userData
                }
            }));
            console.log(result);
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
        }
    };

/*    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'photoURL',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );*/

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                {/*<Grid item xs={12} md={4}>*/}
                {/*          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch
              name="isPublic"
              labelPlacement="start"
              label="Public Profile"
              sx={{ mt: 5 }}
            />
          </Card>*/}
                {/*</Grid>*/}

                <Grid item xs={12} md={8}>
                    <Card sx={{p: 3}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 3,
                                columnGap: 2,
                                gridTemplateColumns: {xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)'},
                            }}
                        >
                            <RHFTextField name="firstName" label="First name"/>
                            <RHFTextField name="lastName" label="Last name"/>
                            <RHFTextField name="zipCode" label="Postcode"/>
                            <RHFTextField name="dob" label="Date of birth"/>
                            <RHFTextField name="recoveryEmailAddress" label="Recovery email address"/>

                            {/*
                            <RHFSelect name="country" label="Country" placeholder="Country">
                                <option value=""/>
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="city" label="City"/>
                            <RHFTextField name="zipCode" label="Zip/Code"/>
                            */}

                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{mt: 3}}>
                            {/*<RHFTextField name="about" multiline rows={4} label="About" />*/}

                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Save Changes
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default AccountGeneralForm;
