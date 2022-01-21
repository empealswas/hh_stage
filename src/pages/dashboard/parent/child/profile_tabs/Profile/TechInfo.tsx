// @mui
import {styled} from '@mui/material/styles';
import {Link, Card, Typography, CardHeader, Stack} from '@mui/material';
// @types
// components
import {Parent, Pupil} from "../../../../../../API";
import Iconify from "../../../../../../components/Iconify";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyClipboard from "../../../../../../components/CopyClipboard";

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

export default function TechInfo({pupil}: Props) {

    return (
        <Card>
            <CardHeader title="Tech Stuff"/>
            <Stack spacing={2} sx={{p: 3}}>
                <Stack direction={'column'}>
                    <Typography variant="body2">
                        <Link component="span" variant="subtitle2" color="text.primary">
                        ID
                        </Link>
                    </Typography>
                    <CopyClipboard  value={String(pupil.id)}/>
                </Stack>
                <Stack direction={'column'}>
                    <Typography variant="body2">
                        <Link component="span" variant="subtitle2" color="text.primary">
                        Wearable Id
                        </Link>
                    </Typography>
                    <CopyClipboard  value={String(pupil.terraId)}/>
                </Stack>
                <Stack direction={'column'}>
                    <Typography variant="body2">
                        <Link component="span" variant="subtitle2" color="text.primary">
                        Provider
                        </Link>
                    </Typography>
                    <CopyClipboard  value={String(pupil.provider)}/>
                </Stack>
            </Stack>

        </Card>
    );
}
