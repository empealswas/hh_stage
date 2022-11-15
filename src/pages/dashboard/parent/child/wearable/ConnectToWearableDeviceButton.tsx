import React, {useEffect, useState} from 'react';
import {LoadingButton} from "@mui/lab";
import axios from "axios";
import {getPupilWearableDeviceStatus, getWidgetLink} from "../../../../../apiFunctions/apiFunctions";
import {IconButton} from "@mui/material";
import Iconify from "../../../../../components/Iconify";
import {Pupil, User} from "../../../../../API";
import {Link} from "react-router-dom";

const ConnectToWearableDeviceButton = (props: { user: User }) => {
    const [loading, setLoading] = useState(false);
    const [authenticationState, setAuthenticationState] = useState<'CHECKING_AUTHENTICATION' | 'NOT_AUTHENTICATED' | 'AUTHENTICATED'>('CHECKING_AUTHENTICATION');
    const {user} = {...props};
    const [color, setColor] = useState('primary');
    const [authenticated, setAuthenticated] = useState<null | boolean>(null);
    const [linkToTerraWidget, setLinkToTerraWidget] = useState('');


    async function  followRegistrationLink() {
        let connectedTerraIds = [];
        if (user.terraId) connectedTerraIds.push(user.terraId);
        const data = {
            reference_id: props.user.id,
            providers: "FITBIT, GOOGLE, GARMIN, OURA, SUUNTO, WHOOP",
            auth_success_redirect_url: window.location.href,
            auth_failure_redirect_url: window.location.href,
            language: "EN",
            applicationCode: "52e7cf966b724749a7c4efadc3727ed7",
            connected_uids: connectedTerraIds
        };
        getWidgetLink(data).then(value => {
            setLinkToTerraWidget(value.url);
            console.log('LINK', value.url);
        })
    }

    function generateRegistrationLink() {
        followRegistrationLink()

    }

    useEffect(() => {
        checkUserAuthentication()
        generateRegistrationLink()
        // generateRegistrationLink()

        return () => {

        };
    }, [user]);

    async function checkUserAuthentication() {
        if (user.terraId) {
            const result = await getPupilWearableDeviceStatus(user.terraId);
            console.log(result);
            if (result.status === 'success' && result.data.is_authenticated) {
                setAuthenticationState('AUTHENTICATED');
            } else {
                setAuthenticationState('NOT_AUTHENTICATED');


            }
        } else {
            setAuthenticationState('NOT_AUTHENTICATED');

        }
    }

    return (
        <LoadingButton  href={linkToTerraWidget}
                       loading={authenticationState === 'CHECKING_AUTHENTICATION' || !linkToTerraWidget}
                       variant={authenticationState === 'AUTHENTICATED' ? 'outlined' : 'contained'}
                       startIcon={<Iconify icon={'mdi:watch'}></Iconify>}
        >{authenticationState === 'AUTHENTICATED' ? 'Connected' : 'Connect to Wearable'}</LoadingButton>
    );
/*    return (
        <LoadingButton  href={linkToTerraWidget}
                       loading={authenticationState === 'CHECKING_AUTHENTICATION' || !linkToTerraWidget}
                       variant={authenticationState === 'AUTHENTICATED' ? 'outlined' : 'contained'}
                       startIcon={<Iconify icon={'mdi:watch'}></Iconify>}
        >{authenticationState === 'AUTHENTICATED' ? 'Connected' : 'Connect to Wearable'}</LoadingButton>
    );*/
};

export default ConnectToWearableDeviceButton;
