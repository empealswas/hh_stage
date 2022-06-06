import {Link as RouterLink, useParams} from 'react-router-dom';
// @mui
import {styled} from '@mui/material/styles';
import {Box, Button, Link, Container, Typography} from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import {PATH_AUTH} from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {VerifyCodeForm} from '../../sections/auth/verify-code';
import {Auth} from "aws-amplify";
import {Alert, LoadingButton} from "@mui/lab";
import {useState} from "react";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
    const {email} = useParams();
    const [resendingCode, setResendingCode] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const resendCode = async () => {
        setResendingCode(true);
        try {
            const result = await Auth.resendSignUp(String(email));
            setMessage('Verification code is resent!')
        } catch (e) {
            console.error(e);
            setError(e.message);
        }
        setResendingCode(false);

    }
    return (
        <Page title="Verify" sx={{height: 1}}>
            <RootStyle>
                <LogoOnlyLayout/>

                <Container>
                    <Box sx={{maxWidth: 480, mx: 'auto'}}>
                        <Button
                            size="small"
                            component={RouterLink}
                            to={PATH_AUTH.login}
                            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20}/>}
                            sx={{mb: 3}}
                        >
                            Back
                        </Button>

                        <Typography variant="h3" paragraph>
                            Please check your email!
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>
                            We have emailed a 6-digit confirmation code to {email}, please enter the code in
                            below box to verify your email.
                        </Typography>

                        <Box sx={{mt: 5, mb: 3}}>
                            <VerifyCodeForm/>
                        </Box>
                        {!!message && <Alert severity={'success'}>{message}</Alert>}
                        {!!error && <Alert severity={'error'}>{error}</Alert>}
                        <Typography variant="body2" align="center">
                            Don’t have a code? &nbsp;
                            <LoadingButton loading={resendingCode} variant={'text'} onClick={resendCode}>
                                Resend code
                            </LoadingButton>
                        </Typography>
                    </Box>
                </Container>
            </RootStyle>
        </Page>
    );
}
