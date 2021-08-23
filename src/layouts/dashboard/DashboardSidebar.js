import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
// material
import {styled} from '@material-ui/core/styles';
import {Box, Link, Button, Drawer, Typography, Avatar, Stack, Container} from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import {MHidden} from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import {UserContext} from "../../App";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

const AccountStyle = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({isOpenSidebar, onCloseSidebar}) {
    const {pathname} = useLocation();

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    const user = useContext(UserContext);

    const renderContent = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': {height: '100%', display: 'flex', flexDirection: 'column'}
            }}
        >
            <Box sx={{px: 2.5, py: 3}}>
                <Container>
                    <Link to={'/'} underline={'none'} component={RouterLink}>
                        <Typography variant={'h4'}>
                            Healthy Habits
                        </Typography>
                    </Link>
                </Container>
                {/*<Box component={RouterLink} to={'/'} underline='none' sx={{display: 'inline-flex',}}>*/}
                {/*    <Container>*/}
                {/*        <Stack direction={'row'} spacing={1} alignItems={'center'}>*/}

                {/*            <Typography variant={'h4'}>*/}
                {/*                Healthy Habits*/}
                {/*            </Typography>*/}
                {/*            /!*<Logo style={{marginRight: 20}}/>*!/*/}
                {/*        </Stack>*/}
                {/*    </Container>*/}
                {/*        /!*<Typography variant={'h4'}>*!/*/}
                {/*        /!*    Healthy*!/*/}
                {/*        /!*</Typography>*!/*/}
                {/*        /!*<Typography variant={'h5'}>*!/*/}
                {/*        /!*    Habits*!/*/}
                {/*        /!*</Typography>*!/*/}
                {/*</Box>*/}
            </Box>

            <Box sx={{mb: 5, mx: 2.5}}>
                <Link underline="none" component={RouterLink} to="#">
                    <AccountStyle>
                        <Avatar src={account.photoURL} alt="photoURL"/>
                        <Box sx={{ml: 2, width: '100%'}}>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                You are in group of ({user.getRoles()})
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Link>
            </Box>

            <NavSection navConfig={sidebarConfig}/>

            <Box sx={{flexGrow: 1}}/>

            {/*<Box sx={{px: 2.5, pb: 3, mt: 10}}>*/}
            {/*    <img alt={'logo'} src={'/static/HHT logo RGB_full.png'} />*/}
            {/*</Box>*/}
        </Scrollbar>
    );

    return (
        <RootStyle>
            <MHidden width="lgUp">
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: {width: DRAWER_WIDTH}
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>

            <MHidden width="lgDown">
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default'
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
        </RootStyle>
    );
}
