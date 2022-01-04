import {Link as RouterLink} from 'react-router-dom';
// material
import {styled} from '@material-ui/core/styles';
import {Card, Stack, Link, Container, Typography} from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import {MHidden} from '../components/@material-extend';
import {LoginForm} from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';
import {useEffect, useState} from "react";
import {Hub} from "aws-amplify";
import {Authenticator, Button, View} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '../global.css'

import {
    createTheme,
    defaultTheme,
    AmplifyProvider,
    ColorMode,
    Text,
    ToggleButton,
    ToggleButtonGroup,
} from '@aws-amplify/ui-react'
import {useSelector} from "react-redux";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    },

}));

const SectionStyle = styled(Card)(({theme}) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
    const theme = createTheme({
        name: 'dark-mode-theme',
        overrides: [
            {
                colorMode: 'dark',
                tokens: {
                    colors: {
                        neutral: {
                            // flipping the neutral palette
                            10: defaultTheme.tokens.colors.neutral[100],
                            20: defaultTheme.tokens.colors.neutral[90],
                            40: defaultTheme.tokens.colors.neutral[80],
                            80: defaultTheme.tokens.colors.neutral[40],
                            90: defaultTheme.tokens.colors.neutral[20],
                            100: defaultTheme.tokens.colors.neutral[10],
                        },
                        black: {value: '#fff'},
                        white: {value: '#000'},
                    },
                },
            },
        ],
    });
    const mode = useSelector((state) => state.customization.theme);

    return (
        <RootStyle title="Login | Minimal-UI">
            <AuthLayout>
                Don’t have an account? &nbsp;
                <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
                    Get started
                </Link>
            </AuthLayout>

            <MHidden width="mdDown">
                <SectionStyle>
                    <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                        Hi, Welcome Back
                    </Typography>
                    <img src="/static/illustrations/illustration_login.png" alt="login"/>
                </SectionStyle>
            </MHidden>

            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{mb: 5}}>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Healthy Habits
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>Enter your details below.</Typography>
                    </Stack>
                    <AmplifyProvider theme={theme} colorMode={mode}>
                        <Authenticator>
                        </Authenticator>
                    </AmplifyProvider>

                    <MHidden width="xsDown">
                        <Typography variant="body2" align="center" sx={{mt: 3}}>
                            Don’t have an account?&nbsp;
                            <Link variant="subtitle2" component={RouterLink} to="../register">
                                Get started
                            </Link>
                        </Typography>
                    </MHidden>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}
