import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getWearablesData, TerraWearables} from "../../../../apiFunctions/apiFunctions";
import {format, parseISO, subDays} from "date-fns";
import {Grid} from "@mui/material";
import StepsActivityChart from "../activity/StepsActivityChart";
import ActivtityChartSkeleton from "../../../../components/skeleton/ActivtityChartSkeleton";
import SleepActivityChart from "../activity/SleepActivityChart";

const MemberActivityOverview = () => {
    const {userId} = useParams();
    console.log(userId);
    const [stepsData, setStepsData] = useState<any>(null);
    const [sleepData, setSleepData] = useState<any>(null);
    useEffect(() => {
        async function getAverageSteps() {
            const data: TerraWearables = {
                idList: [userId as string],
                grouping: "user",
                category: "daily",
                subtype: "steps",
                period: "day",
                startDate:  format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                endDate: format(new Date(), 'yyyy-MM-dd'),
                returnType: "total"
            };
            const wearablesResult: any = await getWearablesData(data);
            setStepsData(wearablesResult?.data ?? []);
        }

        async function getAverageSleep() {
            const data: TerraWearables = {
                idList: [userId as string],
                grouping: "user",
                category: "sleep",
                subtype: "durationTotal",
                period: "day",
                startDate:  format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                endDate: format(new Date(), 'yyyy-MM-dd'),
                returnType: "total"
            };
            const wearablesResult: any = await getWearablesData(data);
            setSleepData(wearablesResult?.data ?? []);
        }

        getAverageSteps();
        getAverageSleep();

        return () => {

        };
    }, [userId]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {stepsData ?
                    <StepsActivityChart
                        labels={stepsData.map((item: any) => format(parseISO(item.date), 'yyyy-MM-dd'))}
                        values={stepsData.map((item: any) => item.value)}
                    />
                    :
                    <ActivtityChartSkeleton/>
                }
            </Grid>
            <Grid item xs={12}>
                {sleepData ?
                    <SleepActivityChart
                        labels={sleepData.map((item: any) => format(parseISO(item.date), 'yyyy-MM-dd'))}
                        values={sleepData.map((item: any) => item.value / 60.0 / 60.0)}
                    />
                    :
                    <ActivtityChartSkeleton/>
                }
            </Grid>
        </Grid>
    );
};

export default MemberActivityOverview;
