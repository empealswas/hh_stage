import React, {useEffect, useState} from 'react';
import {LoadingButton} from "@mui/lab";
import axios from "axios";
import {getPupilWearableDeviceStatus} from "../../../../../apiFunctions/apiFunctions";
import {IconButton} from "@mui/material";
import Iconify from "../../../../../components/Iconify";
import {Pupil, User} from "../../../../../API";

const ConnectToWearableDeviceButton = (props: { user: User }) => {
    const [loading, setLoading] = useState(true);
    const [authenticationState, setAuthenticationState] = useState<'CHECKING_AUTHENTICATION'| 'NOT_AUTHENTICATED' | 'AUTHENTICATED'>('CHECKING_AUTHENTICATION');
    const {user} = {...props};
    const [color, setColor] = useState('primary');
    const [authenticated, setAuthenticated] = useState<null | boolean>(null);


    function followRegistrationLink () {
        const data = JSON.stringify({
            "reference_id": props.user.id,
            "providers": "FITBIT, GOOGLE, GARMIN, APPLE, OURA, SUUNTO",
            "auth_success_redirect_url": window.location.href,
            "auth_failure_redirect_url": window.location.href,
            "language": "EN",
            "applicationCode": "52e7cf966b724749a7c4efadc3727ed7"
        });

        const config: any = {
            method: 'post',
            url: 'https://api.tryterra.co/v2/auth/generateWidgetSession',
            headers: {
                'dev-id': 'healthcare-analytics-aT9uvuscoO',
                'x-api-key': 'EEDzs5LZjl6wgsmrPh7Bn3An0MF2HiZG9OxKIwSc',
                'Content-Type': 'application/json'
            },
            data: data
        };
        setLoading(true)
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.open(response.data.url, '_blank')
            })
            .catch(function (error) {
                console.log(error);

            }).finally(() => {
            setLoading(false);
        });
    }

    function generateRegistrationLink() {

       followRegistrationLink()


    }

    useEffect(() => {
        checkUserAuthentication()

        return () => {

        };
    }, [user]);

    async function checkUserAuthentication() {
        setLoading(true);
        if (user.terraId) {
            const result = await getPupilWearableDeviceStatus(user.terraId);
            console.log(result)
            if (result.status === 'success' && result.data.is_authenticated) {
                setAuthenticationState('AUTHENTICATED');
            }else{
                setAuthenticationState('NOT_AUTHENTICATED');
            }
        } else {
            setAuthenticationState('NOT_AUTHENTICATED');
        }
        setLoading(false);
    }

    return (
        <LoadingButton  loading={loading} variant={ authenticationState === 'AUTHENTICATED' ? 'outlined' : 'contained'} startIcon={<Iconify icon={'mdi:watch'}></Iconify>}
                       onClick={generateRegistrationLink}>{authenticationState === 'AUTHENTICATED' ? 'Connected' : 'Connect to Wearable'}</LoadingButton>
    );
};

export default ConnectToWearableDeviceButton;
