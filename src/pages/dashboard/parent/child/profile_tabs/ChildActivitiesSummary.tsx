import React, {useEffect, useState} from 'react';
import {format, subDays} from "date-fns";
import {Box, Grid} from "@mui/material";
import {User} from "../../../../../API";
//import {SleepData, TerraData} from "../../../../../models/terraDataModels/TerraData";
import {PupilActivityRequest} from "../../../../../apiFunctions/DTO/PupilActivityRequest";
import {getDailySteps, getSleepDataAsync} from "../../../../../apiFunctions/apiFunctions";
import StepsChart from "./StepsChart";
import PupilActivitiesChart from "./PupilActivitiesChart";
import SleepChart from "./SleepChart";
import ConnectToWearableDeviceButton from "../wearable/ConnectToWearableDeviceButton";
import {useTheme} from "@mui/material/styles";
import ActivityWidgets from "./activity/ActivityWidgets";

export const StepsDataContext = React.createContext<any | null>(null);
export const SleepDataContext = React.createContext<any | null>(null);

const ChildActivitiesSummary = (props: {user: User}) => {

    const [stepsData, setStepsData] = useState<any | null>(null);
    const [sleepData, setSleepData] = useState<any | null>(null);
    const theme = useTheme();

    const getStepsData = async () => {
        setStepsData(null);
        let startDate = subDays(new Date(), 6);
        let endDate = new Date();
        const result = await getDailySteps(props.user.terraId, startDate, endDate);
        setStepsData(result);
    }

    const getSleepData = async () => {
        setSleepData(null);
        const input: PupilActivityRequest = {
            terraId: String(props.user.terraId),
            start_date: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            end_date: format(new Date(), 'yyyy-MM-dd')
        }
        const result = await getSleepDataAsync(input);
        result?.data?.data?.sort((a: any, b: any) => {
            let aMillis = new Date(a.metadata.start_time).getTime();
            let bMillis = new Date(b.metadata.start_time).getTime();
            return aMillis - bMillis;
        });
        setSleepData(result?.data);
    }

    useEffect(() => {
        getStepsData();
        getSleepData()
        return () => {};
    }, [props.user]);

    return (
        <StepsDataContext.Provider value={stepsData}>
            <SleepDataContext.Provider value={sleepData}>
                <ConnectToWearableDeviceButton user={props.user}/>
                <Box height={5}/>
                <Grid container spacing={3}>
                    <ActivityWidgets/>
                    <Grid item xs={12} md={12} lg={12}>
                        <StepsChart userId={props.user.id}/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <SleepChart/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <PupilActivitiesChart/>
                    </Grid>
                </Grid>
            </SleepDataContext.Provider>
        </StepsDataContext.Provider>
    );
};

export default ChildActivitiesSummary;
