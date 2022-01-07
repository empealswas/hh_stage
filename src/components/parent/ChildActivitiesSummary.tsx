import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import {Pupil} from "../../API";
import axios from "axios";

const ChildActivitiesSummary = (props: {pupil: Pupil}) => {
    const {pupil} = {...props};

    useEffect(() => {
/*        var myHeaders = new Headers();
        myHeaders.append("dev-id", "healthcare-analytics-aT9uvuscoO");
        myHeaders.append("x-api-key", "EEDzs5LZjl6wgsmrPh7Bn3An0MF2HiZG9OxKIwSc");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*")


        var requestOptions: any = {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch("https://api.tryterra.co/v2/activity?user_id=2fa09d7c-634e-4e97-943a-c0c0f01f9db5&start_date=2022-01-02", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));*/

        var config: any = {
            method: 'get',
            url: 'https://api.tryterra.co/v2/activity/?user_id=d559b851-d1f3-495b-bc70-e23975f0eccc&start_date=2022-01-02&to_webhook=false',
            headers: {
                'dev-id': 'healthcare-analytics-aT9uvuscoO',
                'x-api-key': 'EEDzs5LZjl6wgsmrPh7Bn3An0MF2HiZG9OxKIwSc'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });


        return () => {

        };
    }, []);

    return (
        <Typography>

        </Typography>
    );
};

export default ChildActivitiesSummary;
