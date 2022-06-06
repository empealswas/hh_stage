import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router-dom';
import {useCallback, useEffect, useMemo, useState} from 'react';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {styled} from '@mui/material/styles';
import {LoadingButton} from '@mui/lab';
import {Button, Card, Grid, Stack, Typography,} from '@mui/material';
// routes
// @types
// components
import {FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadSingleFile,} from '../../../components/hook-form';
import {CreateOrganizationInput, Organization, UpdateOrganizationMutation} from "../../../API";
import {API, graphqlOperation, Storage} from "aws-amplify";
import {createFile, createOrganization, updateOrganization} from "../../../graphql/mutations";
import useAuth from "../../../hooks/useAuth";
import awsConfig from "../../../aws-exports";
import axios from "axios";

// ----------------------------------------------------------------------


const LabelStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

interface FormValuesProps {
    type: string;
    image: File | null;
    isPublic: boolean;
    name: string;
}

type Props = {
    isEdit: boolean;
    currentOrganization?: Organization;
    setOrganization?: React.Dispatch<React.SetStateAction<Organization | null>>
};
const query = `query MyQuery {
  listOrganizations {
    items {
      id
    }
  }
}
`
const mute = `mutation MyMutation($id: ID = "") {
  updateOrganization(input: {id: $id, isPublic: true}) {
    id
  }
}`
export default function OrganizationNewForm({isEdit, currentOrganization, setOrganization}: Props) {
    const navigate = useNavigate();
    const [linkToLogo, setLinkToLogo] = useState('');

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
            isPublic: currentOrganization?.isPublic || false,
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
        const getLogo = async () => {
            if (!currentOrganization) return;
            let keyOfObject = currentOrganization.logo?.key;
            if (keyOfObject) {
                const promise = Storage.get(keyOfObject, {expires: 10000}).then(result => {
                    axios({
                        url: result,
                        method: 'GET',
                        responseType: 'blob'
                    })
                        .then((response) => {
                            const blob = new Blob([response.data]);
                            const file = new File([blob], 'logo_preview');
                            console.log(file);
                            setValue(
                                'image',
                                Object.assign(file, {
                                    preview: URL.createObjectURL(file),
                                })
                            );

                        })
                });
                return (() => {
                    promise.then(value => {
                        return;
                    })
                });
            }
        }
        if (isEdit && currentOrganization) {
            reset(defaultValues);
            getLogo();
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
        if (isEdit && currentOrganization) {
            let logoId = null;
            if (data.image) {
                console.log('Uploading logo');
                logoId = await uploadLogo(data.image);
            }
            const input: CreateOrganizationInput = {
                id: currentOrganization.id,
                isPublic: data.isPublic,
                name: data.name,
                type: data.type,
            }
            if (logoId) {
                input.organizationLogoId = logoId;
            }
            try {
                const result: any = await API.graphql(graphqlOperation(updateOrganization, {
                    input
                }))
                console.log(result);
                if (setOrganization) {
                    setOrganization(result.data.updateOrganization)
                }

                // navigate(PATH_DASHBOARD.eCommerce.list);
            } catch (error) {
                console.error(error);
            }
        } else {
            let logoId = null;
            if (data.image) {
                console.log('Uploading logo');
                logoId = await uploadLogo(data.image);
            }
            const input: CreateOrganizationInput = {
                name: data.name,
                userOwnedOrganizationsId: user?.email,
                isPublic: data.isPublic,
                type: data.type,
            }
            if (logoId) {
                input.organizationLogoId = logoId;
            }
            try {
                const result = await API.graphql(graphqlOperation(createOrganization, {
                    input
                }))
                // navigate(PATH_DASHBOARD.eCommerce.list);
            } catch (error) {
                console.error(error);
            }
        }
        reset();
        enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
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
                            <RHFSwitch
                                name="isPublic"
                                labelPlacement="start"
                                label={
                                    <>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                            {values.isPublic ? 'Public' : 'Private'}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {values.isPublic ? 'Your Organization will be discoverable by other users' : 'Your Organization will NOT be discoverable by other users'}
                                        </Typography>
                                    </>
                                }
                                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                            />
                            <RHFTextField name="name" label="Organization Name"/>

                            {/*              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </div>*/}
                            <RHFSelect name="type" label="Type" placeholder="Type">
                                {['Primary School', 'Secondary School', 'Team', 'Club', 'Gym', 'Family', 'Friends', 'Content Creator', 'Company'].map((option) => (
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
