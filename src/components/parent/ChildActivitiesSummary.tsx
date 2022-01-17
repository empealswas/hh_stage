import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Pupil, School} from "../../API";
import axios from "axios";
import {getPupilActivity, getPupilWearableDeviceStatus, getSleepDataAsync} from "../../apiFunctions/apiFunctions";
import {PupilActivityRequest} from "../../apiFunctions/DTO/PupilActivityRequest";
import {format, subDays} from "date-fns";
import {Button, Container, Grid} from "@mui/material";
import StepsChart from "../pupil/StepsChart";
import PupilActivitiesChart from "../pupil/PupilActivitiesChart";
import {SleepData, TerraData} from "../../models/terraDataModels/TerraData";
import SleepChart from "../pupil/SleepChart";

export const TerraDataContext = React.createContext<TerraData | null>(null);
export const SleepDataContext = React.createContext<SleepData | null>(null);

const ChildActivitiesSummary = (props: { pupil: Pupil }) => {
    const {pupil} = {...props};
    const [data, setData] = useState<TerraData | null>(null);
    const [sleepData, setSleepData] = useState<SleepData | null>(null);
    const getActivity = async () => {
        setData(null);
        const input: PupilActivityRequest = {
            terraId: String(pupil.terraId),
            start_date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
            end_date: format(new Date(), 'yyyy-MM-dd')
        }
        const result = await getPupilActivity(input);
        setData(result?.data);

    }
    const getSleepData = async () => {
        setSleepData(null);
        const input: PupilActivityRequest = {
            terraId: String(pupil.terraId),
            start_date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
            end_date: format(subDays(new Date(), 1), 'yyyy-MM-dd')
        }
        const result = await getSleepDataAsync(input);
        setSleepData(result?.data);
    }

    useEffect(() => {


        getActivity();
        getSleepData()
        return () => {

        };
    }, [pupil]);

    return (
        <TerraDataContext.Provider value={data}>
            <SleepDataContext.Provider value={sleepData}>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={8}>
                            <StepsChart pupilId={pupil.id}/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={4}>
                            <PupilActivitiesChart/>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <SleepChart/>
                        </Grid>
                    </Grid>
            </SleepDataContext.Provider>
        </TerraDataContext.Provider>
    );
};

export default ChildActivitiesSummary;
