// @mui
import { Stack, Button, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DOCS } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = useAuth();

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {user?.firstName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Have a great idea?
          <br /> Check our feedback page
        </Typography>
      </div>

      <Button href={'https://healthcare-analytics.hellonext.co'} target="_blank" rel="noopener" variant="contained">
        Feedback
      </Button>
    </Stack>
  );
}
