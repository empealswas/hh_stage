// @mui
import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
// @types
import {Profile} from '../../../../@types/user';
// utils
import cssStyles from '../../../../utils/cssStyles';
// hooks
import useAuth from '../../../../hooks/useAuth';
// components
import MyAvatar from '../../../../components/MyAvatar';
import Image from '../../../../components/Image';
import {Pupil, PupilClassroom} from "../../../../API";
import _mock from "../../../../_mock";
import ChildAvatar from "./ChildAvatar";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    '&:before': {
        ...cssStyles().bgBlur({blur: 2, color: theme.palette.primary.darker}),
        top: 0,
        zIndex: 9,
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
}));

const InfoStyle = styled('div')(({theme}) => ({
    left: 0,
    right: 0,
    zIndex: 99,
    position: 'absolute',
    marginTop: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
        right: 'auto',
        display: 'flex',
        alignItems: 'center',
        left: theme.spacing(3),
        bottom: theme.spacing(3),
    },
}));

// ----------------------------------------------------------------------

type Props = {
    pupil: Pupil;
};

export default function ChildProfileCover() {

    const {user} = useAuth();
    return (
        <RootStyle>
            <InfoStyle>
                <ChildAvatar
                    sx={{
                        mx: 'auto',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'common.white',
                        width: {xs: 80, md: 128},
                        height: {xs: 80, md: 128},
                    }}
                />
                <Box
                    sx={{
                        ml: {md: 3},
                        mt: {xs: 1, md: 0},
                        color: 'common.white',
                        textAlign: {xs: 'center', md: 'left'},
                    }}
                >
                    <Typography variant="h4">{`${user?.firstName} ${user?.lastName}`}</Typography>
{/*                    <Typography
                        sx={{opacity: 0.72}}>{classesText}{pupil.classrooms?.items?.
                    map((item) => item?.classroom).map(value => value?.name).join(", ")}</Typography>*/}
                </Box>
            </InfoStyle>
            <Image
                alt="profile cover"
                src={_mock.image.cover(2)}
                sx={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            />
        </RootStyle>
    );
}
