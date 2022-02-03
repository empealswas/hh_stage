import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import {useCallback, useEffect, useMemo} from 'react';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {styled} from '@mui/material/styles';
import {LoadingButton} from '@mui/lab';
import {Card, Grid, Stack, Typography,} from '@mui/material';
// routes
// @types
// components
import {FormProvider, RHFSelect, RHFTextField, RHFUploadSingleFile,} from '../../../components/hook-form';
import {CreateOrganizationInput, Organization} from "../../../API";
import {API, graphqlOperation, Storage} from "aws-amplify";
import {createFile, createOrganization} from "../../../graphql/mutations";
import useAuth from "../../../hooks/useAuth";
import awsConfig from "../../../aws-exports";

// ----------------------------------------------------------------------



const LabelStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

interface FormValuesProps  {
    type: string;
    image: File | null;
    name: string;
}

type Props = {
    isEdit: boolean;
    currentOrganization?: Organization;
};

export default function OrganizationNewForm({isEdit, currentOrganization}: Props) {
    const navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar();
    const {user} = useAuth();

    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        image: Yup.mixed(),
        type: Yup.string().required('Type is required')
    });

    const defaultValues = useMemo(
        () => ({
            name: currentOrganization?.name || '',
            type: currentOrganization?.type || 'Club',
            image: null,

        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentOrganization]
    );

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentOrganization) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentOrganization]);
    const uploadLogo = async (logo: File) => {
        const fileName = `${Date.now()}-${logo.name}`;
        const uploadedFile: any = await Storage.put(fileName, logo, {
            contentType: logo.type
        })
        const input: any = {
            key: uploadedFile.key,
            bucket: awsConfig.aws_user_files_s3_bucket,
            region: awsConfig.aws_user_files_s3_bucket_region,
        };
        let result: any = await API.graphql(graphqlOperation(createFile, {input}));
        return result.data.createFile.id;
    }
    const onSubmit = async (data: FormValuesProps) => {
        let logoId = null;
        if (data.image) {
            console.log('Uploading logo');
            logoId = await uploadLogo(data.image);
        }
        const input: CreateOrganizationInput = {
            name: data.name,
            userOwnedOrganizationsId: user?.email,
            type: data.type,
        }
        if (logoId) {
            input.organizationLogoId = logoId;
        }
        try {
            const result = await API.graphql(graphqlOperation(createOrganization, {
                input
            }))
            console.log(result);
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            // navigate(PATH_DASHBOARD.eCommerce.list);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'image',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} justifyContent={'center'}>
                <Grid item xs={12} md={8}>
                    <Card sx={{p: 3}}>
                        <Stack spacing={3}>
                            <RHFTextField name="name" label="Organization Name"/>

                            {/*              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </div>*/}
                            <RHFSelect name="type" label="Type" placeholder="Type">
                                {['Primary School', 'Secondary School', 'Team', 'Club', 'Gym'].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </RHFSelect>
                            <div>
                                <LabelStyle>Logo (Optional)</LabelStyle>
                                <RHFUploadSingleFile
                                    name="image"
                                    accept="image/*"
                                    maxSize={3145728}
                                    onDrop={handleDrop}
                                />

                            </div>
                            <Grid item xs={12}>
                                <Stack spacing={3}>

                                    <LoadingButton type="submit" variant="contained" size="large"
                                                   loading={isSubmitting}>
                                        {!isEdit ? 'Create Organization' : 'Save Changes'}
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
                {/*        <Markdown children={values.description || ''} />*/}

            </Grid>
        </FormProvider>
    );
}
