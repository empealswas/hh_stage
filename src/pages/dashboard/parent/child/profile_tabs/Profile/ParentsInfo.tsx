// @mui
import {styled} from '@mui/material/styles';
import {Link, Card, CardHeader, Stack, Typography} from '@mui/material';
import {Parent, Pupil} from "../../../../../../API";
import Iconify from "../../../../../../components/Iconify"; // @types
// @types
// components

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({theme}) => ({
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

export default function ParentsInfo({pupil}: Props) {
    // const { facebookLink, instagramLink, linkedinLink, twitterLink } = profile;

    /*  const SOCIALS = [
        {
          name: 'Linkedin',
          icon: <IconStyle icon={'eva:linkedin-fill'} color="#006097" />,
          href: linkedinLink,
        },
        {
          name: 'Twitter',
          icon: <IconStyle icon={'eva:twitter-fill'} color="#1C9CEA" />,
          href: twitterLink,
        },
        {
          name: 'Instagram',
          icon: <IconStyle icon={'ant-design:instagram-filled'} color="#D7336D" />,
          href: instagramLink,
        },
        {
          name: 'Facebook',
          icon: <IconStyle icon={'eva:facebook-fill'} color="#1877F2" />,
          href: facebookLink,
        },
      ];*/

    return (
        <Card>
            <CardHeader title="Parents"/>
            <Stack spacing={2} sx={{p: 3}}>
                {pupil.parents?.items?.map((item: any) => item.Parent).map((parent: Parent) => (
                    <Stack key={parent.id} direction="row">
                        <IconStyle icon={'eva:person-outline'}/>
                        <Stack direction={'column'}>
                            <Typography variant="body2">
                                {parent.firstName} {parent.lastName} &nbsp;
                            </Typography>
                            <Typography variant="body2">
                                <Link component="span" variant="subtitle2" color="text.primary">
                                    {parent.id}
                                </Link>
                            </Typography>

                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Card>
    );
}
