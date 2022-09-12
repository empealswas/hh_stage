import React, {useEffect, useState} from 'react';
import {format, subDays} from "date-fns";
import {Box, Grid} from "@mui/material";
import {User} from "../../../../../API";
//import {SleepData, TerraData} from "../../../../../models/terraDataModels/TerraData";
import {PupilActivityRequest} from "../../../../../apiFunctions/DTO/PupilActivityRequest";
import StepsChart from "./StepsChart";
import PupilActivitiesChart from "./PupilActivitiesChart";
import SleepChart from "./SleepChart";
import ConnectToWearableDeviceButton from "../wearable/ConnectToWearableDeviceButton";
import {useTheme} from "@mui/material/styles";
import ActivityWidgets from "./activity/ActivityWidgets";
import {getWearablesData, TerraWearables} from "../../../../../apiFunctions/apiFunctions";

export const StepsDataContext = React.createContext<any | null>(null);
export const SleepDataContext = React.createContext<any | null>(null);
export const ActivityDataContext = React.createContext<any | null>(null);
export const AverageStepsContext = React.createContext<any | null>(null);
export const AverageSleepContext = React.createContext<any | null>(null);
export const AverageActivityContext = React.createContext<any | null>(null);

const ChildActivitiesSummary = (props: {user: User}) => {

    const [stepsData, setStepsData] = useState<any | null>(null);
    const [sleepData, setSleepData] = useState<any | null>(null);
    const [activityData, setActivityData] = useState<any | null>(null);
    const [averageSteps, setAverageSteps] = useState<any | null>(null);
    const [averageSleep, setAverageSleep] = useState<any | null>(null);
    const [averageActivity, setAverageActivity] = useState<any | null>(null);

    const theme = useTheme();

    const getStepsData = async () => {
        setStepsData(null);
        let terraId = props.user.terraId;
        if (terraId == null) {
            return;
        }
        let requestBody: TerraWearables = {
            "idList": [terraId],
            "grouping": "user",
            "category": "daily",
            "subtype": "steps",
            "period": "day",
            "startDate": format(subDays(new Date(), 6), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "total"
        };
        const result = await getWearablesData(requestBody);
        setStepsData(result);
    }

    const getSleepData = async () => {
        setSleepData(null);
        let terraId = props.user.terraId;
        if (terraId == null) {
            return;
        }
        let requestBody: TerraWearables = {
            "idList": [terraId],
            "grouping": "user",
            "category": "sleep",
            "subtype": "durationTotal",
            "period": "day",
            "startDate": format(subDays(new Date(), 6), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "total"
        };
        const result = await getWearablesData(requestBody);
        result?.data?.sort((a: any, b: any) => {
            let aMillis = new Date(a.date).getTime();
            let bMillis = new Date(b.date).getTime();
            return aMillis - bMillis;
        });
        setSleepData(result);
    }

    const getActivityData = async () => {
        setActivityData(null);
        let terraId = props.user.terraId;
        if (terraId == null) {
            return;
        }
        let requestBody: TerraWearables = {
            "idList": [terraId],
            "grouping": "user",
            "category": "activity",
            "subtype": "duration",
            "period": "day",
            "startDate": format(subDays(new Date(), 6), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "total"
        };
        const result = await getWearablesData(requestBody);
        setActivityData(result);
    }

    const getAverageSteps = async () => {
        setAverageSteps(null);
        let terraId = props.user.terraId;
        if (terraId == null) {
            return;
        }
        let requestBody: TerraWearables = {
            "idList": [terraId],
            "grouping": "user",
            "category": "daily",
            "subtype": "steps",
            "period": "millennium",
            "startDate": format(subDays(new Date(), 6), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "average"
        };
        const result = await getWearablesData(requestBody);
        setAverageSteps(result);
    }

    const getAverageSleep = async () => {
        setAverageSleep(null);
        let terraId = props.user.terraId;
        if (terraId == null) {
            return;
        }
        let requestBody: TerraWearables = {
            "idList": [terraId],
            "grouping": "user",
            "category": "sleep",
            "subtype": "durationTotal",
            "period": "millennium",
            "startDate": format(subDays(new Date(), 6), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "average"
        };
        const result = await getWearablesData(requestBody);
        setAverageSleep(result);
    }

    const getAverageActivity = async () => {
        setAverageActivity(null);
        let terraId = props.user.terraId;
        if (terraId == null) {
            return;
        }
        let requestBody: TerraWearables = {
            "idList": [terraId],
            "grouping": "user",
            "category": "activity",
            "subtype": "duration",
            "period": "millennium",
            "startDate": format(subDays(new Date(), 6), "yyyy-MM-dd"),
            "endDate": format(new Date(), "yyyy-MM-dd"),
            "returnType": "average"
        };
        const result = await getWearablesData(requestBody);
        setAverageActivity(result);
    }

    useEffect(() => {
        getStepsData();
        getSleepData()
        getActivityData();
        getAverageSteps();
        getAverageSleep();
        getAverageActivity();
        return () => {};
    }, [props.user]);

    return (
        <StepsDataContext.Provider value={stepsData}>
            <SleepDataContext.Provider value={sleepData}>
                <ActivityDataContext.Provider value={activityData}>
                    <AverageStepsContext.Provider value={averageSteps}>
                        <AverageSleepContext.Provider value={averageSleep}>
                            <AverageActivityContext.Provider value={averageActivity}>
                                <ConnectToWearableDeviceButton user={props.user}/>
                                <Box height={5}/>
                                <Grid container spacing={3}>
                                    <ActivityWidgets/>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <StepsChart user={props.user}/>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <SleepChart/>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <PupilActivitiesChart/>
                                    </Grid>
                                </Grid>
                            </AverageActivityContext.Provider>
                        </AverageSleepContext.Provider>
                    </AverageStepsContext.Provider>
                </ActivityDataContext.Provider>
            </SleepDataContext.Provider>
        </StepsDataContext.Provider>
    );
};

export default ChildActivitiesSummary;
