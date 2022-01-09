import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Pupil} from "../../API";
import axios from "axios";
import {getPupilActivity, getPupilWearableDeviceStatus} from "../../apiFunctions/apiFunctions";
import {PupilActivityRequest} from "../../apiFunctions/DTO/PupilActivityRequest";

const ChildActivitiesSummary = (props: {pupil: Pupil}) => {
    const {pupil} = {...props};
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        const getActivity = async () => {
            const input: PupilActivityRequest = {
                terraId: String(pupil.terraId),
                start_date: '2022-01-02',
            }
            const result = await getPupilActivity(input);
            setData(result.data);

        }

        getActivity();
        return () => {

        };
    }, []);

    return (
        <Typography>

        </Typography>
    );
};

export default ChildActivitiesSummary;
