import {paramCase} from 'change-case';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import {styled, alpha} from '@mui/material/styles';
import {
    Box,
    Link,
    Card,
    Avatar,
    Typography,
    CardContent,
    Stack,
    CardMedia,
    CardHeader,
    Button,
    CardActions
} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import {fDate} from '../../../utils/formatTime';
import {fShortenNumber} from '../../../utils/formatNumber';
// @types
import {Post} from '../../../@types/blog';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import TextIconLabel from '../../../components/TextIconLabel';
import SvgIconStyle from '../../../components/SvgIconStyle';
import _mock from "../../../_mock";
import {Organization} from "../../../API";
import OrganizationJoinButton from './OrganizationJoinButton';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({theme}) => ({
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

type Props = {
    organization: Organization;
    discover: boolean;
    index?: number;
};

export default function OrganizationCard({organization, discover, index}: Props) {
    const isDesktop = useResponsive('up', 'md');


    let card = <Card sx={{border: 1, borderColor: 'background.neutral',}}>
        <Box sx={{position: 'relative'}}>

            <Image alt="cover" src={_mock.image.cover(index ?? 0)}/>
            <OrganizationContent
                name={organization?.name ?? ''}
                type={organization.type ?? ''}
                discover={discover}
                id={organization.id}
            />
        </Box>
        {discover &&
            <CardActions>
                <OrganizationJoinButton organization={organization}/>
            </CardActions>
        }
    </Card>;
    if (discover) {
        return (<>
            {card}
        </>);
    }
    return (
        <Link component={RouterLink} to={`/dashboard/organization/${organization.id}`} replace
              underline={'none'}>
            {card}
        </Link>
    );


}

// ----------------------------------------------------------------------

type PostContentProps = {
    name: string;
    type: string;
    discover: boolean;
    id: string;
};

export function OrganizationContent({name, type, discover, id}: PostContentProps) {
    const isDesktop = useResponsive('up', 'md');


    /*    const POST_INFO = [
            {number: comment, icon: 'eva:message-circle-fill'},
            {number: view, icon: 'eva:eye-fill'},
            {number: share, icon: 'eva:share-fill'},
        ];*/

    return (
        <CardContent
            sx={{
                pt: 4.5,
                width: 1,

            }}
        >
            <Typography
                gutterBottom
                variant="subtitle2"
                component="div"
            >
                {type}
            </Typography>
            {discover ?
                <TextMaxLine
                    variant={'h5'}
                    line={2}
                    persistent
                >
                    {name}
                </TextMaxLine>
                :

                <Link color={'inherit'} component={RouterLink} to={`/dashboard/organization/${id}`} replace>
                    <TextMaxLine
                        variant={'h5'}
                        line={2}
                        persistent
                    >
                        {name}
                    </TextMaxLine>
                </Link>

            }

        </CardContent>
    );
}
