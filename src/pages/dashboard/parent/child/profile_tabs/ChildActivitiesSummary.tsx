import React, {useEffect, useState} from 'react';
import {format, subDays} from "date-fns";
import {Box, Grid} from "@mui/material";
import {User} from "../../../../../API";
import {SleepData, TerraData} from "../../../../../models/terraDataModels/TerraData";
import {PupilActivityRequest} from "../../../../../apiFunctions/DTO/PupilActivityRequest";
import {getPupilActivity, getSleepDataAsync} from "../../../../../apiFunctions/apiFunctions";
import StepsChart from "./StepsChart";
import PupilActivitiesChart from "./PupilActivitiesChart";
import SleepChart from "./SleepChart";
import ConnectToWearableDeviceButton from "../wearable/ConnectToWearableDeviceButton";
import {useTheme} from "@mui/material/styles";
import ActivityWidgets from "./activity/ActivityWidgets";

export const TerraDataContext = React.createContext<TerraData | null>(null);
export const SleepDataContext = React.createContext<SleepData | null>(null);

const ChildActivitiesSummary = (props: {user: User}) => {
    const [data, setData] = useState<TerraData | null>(null);
    const [sleepData, setSleepData] = useState<SleepData | null>(null);
    const theme = useTheme();
    const getActivity = async () => {
        setData(null);
        const input: PupilActivityRequest = {
            terraId: String(props.user.terraId),
            start_date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
            end_date: format(new Date(), 'yyyy-MM-dd')
        }
        const result = await getPupilActivity(input);
        setData(result?.data);

    }
    const getSleepData = async () => {
        setSleepData(null);
        const input: PupilActivityRequest = {
            terraId: String(props.user.terraId),
            start_date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
            end_date: format(new Date(), 'yyyy-MM-dd')
        }
        const result = await getSleepDataAsync(input);
        setSleepData(result?.data);
    }

    useEffect(() => {


        getActivity();
        getSleepData()
        return () => {

        };
    }, [props.user]);

    return (
        <TerraDataContext.Provider value={data}>
            <SleepDataContext.Provider value={sleepData}>
                <ConnectToWearableDeviceButton user={props.user}/>
                <Box height={5}/>
                <Grid container spacing={3}>
                    <ActivityWidgets/>
                    <Grid item xs={12} md={12} lg={12}>
                        <StepsChart userId={props.user.id}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
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
