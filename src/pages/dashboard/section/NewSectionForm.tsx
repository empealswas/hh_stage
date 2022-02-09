import * as Yup from 'yup';
import React, { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  Chip,
  Stack,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { NewPostFormValues } from '../../../@types/blog';
//components
import {
  RHFSwitch,
  RHFEditor,
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../components/hook-form';
import {Section} from "../../../API";
import LessonOptionComponent from "../../../components/section/lesson/LessonOptionComponent";
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

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
type Props = {
  isEdit?: boolean,
  currentSection?: Section,
}
interface FormValuesProps {
  image: File | null;
  name: string;
  activities: (string|null)[];
  periods: (number | null)[];
  deliveredBy: (string | null)[];

}
export default function NewSectionForm({isEdit , currentSection}: Props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Section name is required'),
    activities: Yup.array().min(1, 'Choose at least one'),
    periods: Yup.array().min(1, 'Choose at least one'),
    deliveredBy: Yup.array().min(1, 'Choose at least one'),
    image: Yup.mixed(),
  });

  const defaultValues = {
    name: currentSection?.name ?? '',
    image: null,
    activities: currentSection?.SectionOptions?.Activities ?? [],
    periods: currentSection?.SectionOptions?.Durations ?? [],
    deliveredBy: currentSection?.SectionOptions?.DeliveredBy ?? []
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      navigate(PATH_DASHBOARD.blog.posts);
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
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="name" label="Section name" />

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile
                    name="cover"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
{/*                <LessonOptionComponent name={'Activity Type'} actionName={'Add Activity'} entityName={'activities'}
                                       info={'Define the types of activities for this section. Then choose the default option. If you specify only one type of activity,it will automatically create all lessons within this section to be that type.'}/>
                <LessonOptionComponent name={'Period'} actionName={'Add period (in minutes)'} entityName={'periods'}
                                       type={'number'}
                                       info={'Provide time periods possible for these types of lessons, leave only one for it to be predetermined'}/>
                <LessonOptionComponent name={'Delivered By'} actionName={'Add Delivered By Type'}
                                       entityName={'deliveredBy'}
                                       info={'Provide roles that can deliver lessons in this section'}/>*/}
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOpenPreview}
              >
                Cancel
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>


    </>
  );
}
