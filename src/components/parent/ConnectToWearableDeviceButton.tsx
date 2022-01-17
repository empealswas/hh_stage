import React, {useEffect, useState} from 'react';
import {LoadingButton} from "@mui/lab";
import axios from "axios";
import WatchIcon from "@mui/icons-material/Watch";
import {Pupil} from "../../API";
import {getPupilWearableDeviceStatus} from "../../apiFunctions/apiFunctions";

const ConnectToWearableDeviceButton = (props: { pupil: Pupil }) => {
    const [loading, setLoading] = useState(true);
    const [authenticationState, setAuthenticationState] = useState<'CHECKING_AUTHENTICATION'| 'NOT_AUTHENTICATED' | 'AUTHENTICATED'>('CHECKING_AUTHENTICATION');
    const {pupil} = {...props};
    const [color, setColor] = useState('primary');
    const [authenticated, setAuthenticated] = useState<null | boolean>(null);


    function followRegistrationLink () {
        const data = JSON.stringify({
            "reference_id": props.pupil.id,
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
    }, [pupil]);

    async function checkUserAuthentication() {
        setLoading(true);
        if (pupil.terraId) {
            const result = await getPupilWearableDeviceStatus(pupil.terraId);
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
        <LoadingButton  loading={loading} variant={ authenticationState === 'AUTHENTICATED' ? 'outlined' : 'contained'} startIcon={<WatchIcon/>}
                       onClick={generateRegistrationLink}>{authenticationState === 'AUTHENTICATED' ? 'Connected' : 'Connect to Wearable'}</LoadingButton>
    );
};

export default ConnectToWearableDeviceButton;
