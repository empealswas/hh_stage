import isString from 'lodash/isString';
// @mui
import { LoadingButton } from '@mui/lab';
import { alpha } from '@mui/material/styles';
import { Box, Button, Container, Typography, DialogActions } from '@mui/material';
// @types
import { NewPostFormValues } from '../../../@types/blog';
// components
import Image from '../../../components/Image';
import Markdown from '../../../components/Markdown';
import Scrollbar from '../../../components/Scrollbar';
import EmptyContent from '../../../components/EmptyContent';
import { DialogAnimate } from '../../../components/animate';
import {NewLesson} from "./LessonNewForm";

// ----------------------------------------------------------------------

type Props = {
  values: NewLesson;
  isOpen: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  onClose: VoidFunction;
  onSubmit: VoidFunction;
};

export default function LessonNewPreview({
  values,
  isValid,
  isSubmitting,
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const { title, images, description } = values;


    const hasContent = title || description;

    const hasHero = !!title;

  return (
    <DialogAnimate fullScreen open={isOpen} onClose={onClose}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Preview Post
        </Typography>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Post
        </LoadingButton>
      </DialogActions>

      {hasContent ? (
        <Scrollbar>
          <Container>
            <Box sx={{ mt: 5, mb: 10 }}>
              <Markdown children={description || ''} />
            </Box>
          </Container>
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

type PreviewHeroProps = {
  title: string;
  cover?: string;
};

function PreviewHero({ title, cover }: PreviewHeroProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Container
        sx={{
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          pt: { xs: 3, lg: 10 },
        }}
      >
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Container>

      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 8,
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
        }}
      />
      <Image alt="cover" src={cover} ratio="16/9" />
    </Box>
  );
}
