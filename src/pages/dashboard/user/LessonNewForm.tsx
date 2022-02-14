import * as Yup from 'yup';
import {useCallback, useState} from 'react';
import {useSnackbar} from 'notistack';
import {useNavigate, useParams} from 'react-router-dom';
// form
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
// @mui
import {LoadingButton} from '@mui/lab';
import {styled} from '@mui/material/styles';
import {
    Grid,
    Card,
    Chip,
    Stack,
    Button,
    TextField,
    Typography,
    Autocomplete, Alert, Container,
} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// @types
import {NewPostFormValues} from '../../../@types/blog';
//components
import {
    RHFSwitch,
    RHFEditor,
    FormProvider,
    RHFTextField,
    RHFUploadSingleFile, RHFUploadMultiFile,
} from '../../../components/hook-form';
import BlogNewPostPreview from "../../../sections/@dashboard/blog/BlogNewPostPreview";
import {UploadMultiFile} from "../../../components/upload";
import LessonNewPreview from "./LessonNewPreview";
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import {createFile, createLesson, updateLesson} from "../../../graphql/mutations";
import awsConfig from "../../../aws-exports";
import {Lesson} from "../../../API";
import useSettings from "../../../hooks/useSettings";
import {Can} from "../../../abilities/Ability";
//

// ----------------------------------------------------------------------

const TAGS_OPTION = [
    'Toy Story 3',
    'Logan',
    'Full Metal Jacket',
    'Dangal',
    'The Sting',
    '2001: A Space Odyssey',
    "Singin' in the Rain",
    'Toy Story',
    'Bicycle Thieves',
    'The Kid',
    'Inglourious Basterds',
    'Snatch',
    '3 Idiots',
];

const LabelStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
export type NewLesson = {
    title?: string,
    description?: string,
    images: File [],
}
// ----------------------------------------------------------------------
type Props = {
    currentLesson?: Lesson,
    isEdit?: boolean;
}
export default function LessonNewForm({currentLesson, isEdit = false}: Props) {
    const navigate = useNavigate();
    const settings = useSettings();
    const [open, setOpen] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const [error, setError] = useState('');
    const handleOpenPreview = () => {
        setOpen(true);
    };

    const handleClosePreview = () => {
        setOpen(false);
    };

    const NewBlogSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        images: Yup.array(),
    });


    const defaultValues = {
        title: currentLesson?.title || '',
        description: currentLesson?.description || '',
        images: [],
    };

    const methods = useForm<NewLesson>({
        resolver: yupResolver(NewBlogSchema),
        defaultValues,
    });
    const {sectionId} = useParams();

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting, isValid},
    } = methods;

    const values = watch();

    const onSubmit = async (data: NewLesson) => {
        setError('');
        try {
            if (isEdit) {
                await updateExistingLesson(data);
            } else {
                await addLesson(data);
            }
            reset();
            handleClosePreview();
            enqueueSnackbar('Post success!');
            if (!isEdit) {
                navigate(-1);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    async function updateExistingLesson({title, images, description}: NewLesson) {
        console.log(currentLesson);
        if (currentLesson) {
            const result = await API.graphql(graphqlOperation(updateLesson, {
                input: {
                    id: currentLesson.id,
                    title: title,
                    description: description,
                }
            }));
            console.log(result);
            await uploadFiles(currentLesson.id, images);
        }
    }

    async function addLesson({title, images, description}: NewLesson) {
        const input = {
            title: title,
            description: description,
            sectionID: sectionId
        }
        try {
            const result: any = await API.graphql(graphqlOperation(createLesson, {input}));
            let lessonID = result.data.createLesson.id;
            await uploadFiles(lessonID, images)
        } catch (e) {
            throw e;
        }
    }

    const uploadFiles = async (lessonID: string, files: File[]) => {
        for (const file of files) {
            try {
                const fileName = `${Date.now()}-${file.name.replace(/ /g, '_')}`;
                const uploadedFile: any = await Storage.put(fileName, file, {
                    contentType: file.type
                })
                const input: any = {
                    key: uploadedFile.key,
                    bucket: awsConfig.aws_user_files_s3_bucket,
                    region: awsConfig.aws_user_files_s3_bucket_region,
                    lessonID: lessonID
                };
                const result = await API.graphql(graphqlOperation(createFile, {input}));
                console.log(result);

            } catch (error) {
                console.error(`During the file uploading error occurred:`, error)
            }
        }
    }

    const handleDrop = useCallback(
        (acceptedFiles) => {
            setValue(
                'images',
                acceptedFiles.map((file: Blob | MediaSource) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
        [setValue]
    );

    const handleRemoveAll = () => {
        setValue('images', []);
    };

    const handleRemove = (file: File | string) => {
        const filteredItems = values.images?.filter((_file) => _file !== file);
        setValue('images', filteredItems);
    };
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} direction={'column'}>
                    {error &&
                        <Grid item xs={12}>
                            <Alert severity={'error'}>{error}</Alert>
                        </Grid>
                    }
                    <Grid item xs={12} md={8}>
                        <Card sx={{p: 3}}>
                            <Stack spacing={3}>
                                <RHFTextField name="title" label="Lesson Title"/>
                                <div>
                                    <LabelStyle>Content</LabelStyle>
                                    <RHFEditor name="description"/>
                                </div>
                                <Can I={'upload'} a={'content'}>
                                    <div>
                                        <LabelStyle>Files</LabelStyle>
                                        <RHFUploadMultiFile
                                            name="images"
                                            showPreview
                                            accept={['image/*', 'video/*', 'application/pdf', 'text/plain', 'application/mp4', '.mp4', '.csv', '.doc', '.docx', '.xlsx', 'application/*', '.*']}
                                            onDrop={handleDrop}
                                            onRemove={handleRemove}
                                            onRemoveAll={handleRemoveAll}
                                        />
                                    </div>
                                </Can>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1.5} sx={{mt: 3}}>
                            <Button
                                fullWidth
                                color="inherit"
                                variant="outlined"
                                size="large"
                                onClick={handleOpenPreview}
                            >
                                Preview
                            </Button>
                            <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                loading={isSubmitting}
                            >
                                {isEdit ? 'Edit' : 'Create'}
                            </LoadingButton>
                        </Stack>

                    </Grid>
                </Grid>
            </FormProvider>

            <LessonNewPreview
                values={values}
                isOpen={open}
                isValid={isValid}
                isSubmitting={isSubmitting}
                onClose={handleClosePreview}
                onSubmit={handleSubmit(onSubmit)}
            />
        </Container>
    );
}
