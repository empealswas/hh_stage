// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// @types
// components
import {Pupil} from "../../../../../../API";
import Iconify from "../../../../../../components/Iconify";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

type Props = {
  pupil: Pupil;
};

export default function ProfileAbout({ pupil }: Props) {

  return (
      <Card>
        <CardHeader title="About"/>

        <Stack spacing={2} sx={{p: 3}}>
          <Typography variant="body2">Hello! My name is {pupil.firstName} {pupil.lastName}</Typography>


          {pupil.school &&
          <Stack direction="row">
            <IconStyle icon={'ic:baseline-school'}/>
            <Typography variant="body2">
              Study at &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {pupil?.school?.name}
              </Link>
            </Typography>
          </Stack>
          }
          {pupil.schoolHouse &&
              <Stack direction="row">
                <IconStyle icon={'ic:round-other-houses'}/>
                <Typography variant="body2">
                  Part of &nbsp;
                  <Link component="span" variant="subtitle2" color="text.primary">
                    {pupil?.schoolHouse?.name} House
                  </Link>
                </Typography>
              </Stack>
          }

        </Stack>
      </Card>
  );
}
