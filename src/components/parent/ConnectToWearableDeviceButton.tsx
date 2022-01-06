import React, {useEffect, useState} from 'react';
import {LoadingButton} from "@mui/lab";
import axios from "axios";
import WatchIcon from "@mui/icons-material/Watch";
import {Pupil} from "../../API";

const ConnectToWearableDeviceButton = (props: { pupil: Pupil }) => {
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState<null | boolean>(null);

    function generateRegistrationLink() {
        const data = JSON.stringify({
            "reference_id": props.pupil.id,
            "providers": "SUUNTO,FITBIT,OURA, GOOGLE, GARMIN",
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

    useEffect(() => {
        checkUserAuthentication()
        return () => {

        };
    }, []);



    function checkUserAuthentication() {

        var config: any = {
            method: 'get',
            url: `https://api.tryterra.co/v2/userInfo?user_id=${props.pupil.terraId}`,
            headers: {
                'dev-id': 'healthcare-analytics-aT9uvuscoO',
                'x-api-key': 'EEDzs5LZjl6wgsmrPh7Bn3An0MF2HiZG9OxKIwSc',
                'Content-Type': 'application/json'
            },
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setAuthenticated(response.data.status === 'success')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <LoadingButton loading={loading} variant={'contained'} startIcon={<WatchIcon/>}
                       onClick={generateRegistrationLink}>Connect to Wearable</LoadingButton>
    );
};

export default ConnectToWearableDeviceButton;
