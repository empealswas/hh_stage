import React, {useContext, useEffect, useState} from 'react';
import {Grid, Card, CardContent, Typography} from "@mui/material";
import {StepsDataContext, SleepDataContext, ActivityDataContext, LowIntensityDataContext, ModerateIntensityDataContext, VigorousIntensityDataContext, AverageStepsContext, AverageSleepContext, AverageActivityContext} from "../ChildActivitiesSummary";
import ActivityWidgetSummary from "./ActivityWidgetSummary";
import CardSkeleton from "../../../../../../components/skeleton/CardSkeleton";
import {useTheme} from "@mui/material/styles";
import {API, graphqlOperation} from "aws-amplify";
import {Classroom, Pupil, User} from "../../../../../../API";
import {format, subDays} from "date-fns";
import axios from "axios";
import {useParams} from "react-router-dom";
import useAuth from "../../../../../../hooks/useAuth";
import sl from 'date-fns/locale/sl';

const ActivityWidgets = () => {

    const stepsData = useContext(StepsDataContext);
    const sleepData = useContext(SleepDataContext);
    const activityData = useContext(ActivityDataContext);
    const lowIntensityData = useContext(LowIntensityDataContext);
    const moderateIntensityData = useContext(ModerateIntensityDataContext);
    const vigorousIntensityData = useContext(VigorousIntensityDataContext);
    const averageSteps = useContext(AverageStepsContext);
    const averageSleep = useContext(AverageSleepContext);
    const averageActivity = useContext(AverageActivityContext);

    const {user} = useAuth();
    const theme = useTheme();

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <>
            <Grid item xs={12} md={4}>
                {stepsData ?
                    <ActivityWidgetSummary title={'Todays\' Steps'}
                                           total={(stepsData?.data[stepsData?.data?.length - 1]?.value ?? 0).toLocaleString()}
                                           percent={(((stepsData?.data[stepsData?.data?.length - 1]?.value ?? 0) - (stepsData?.data[stepsData?.data?.length - 2]?.value ?? 0))) / (stepsData?.data[stepsData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={stepsData.data.map((item: any) => item.value)}/>
                    :
                    <CardSkeleton height={'160px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {sleepData ?
                    <ActivityWidgetSummary title={'Last Sleep'}
                                           total={((sleepData?.data[sleepData?.data?.length - 1]?.value ?? 0) / 60 / 60).toFixed(1) + " hrs"}
                                           percent={(((sleepData?.data[sleepData?.data?.length - 1]?.value ?? 0) - (sleepData?.data[sleepData?.data?.length - 2]?.value ?? 0))) / (sleepData?.data[sleepData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.blue[0]}
                                           chartData={sleepData.data.map((item: any) => item.value / 60 / 60)}/>
                    :
                    <CardSkeleton height={'160px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {activityData ?
                    <ActivityWidgetSummary title={'Yesterdays\' Activity'}
                                           total={Math.floor((activityData?.data[activityData?.data?.length - 1]?.value ?? 0) / 60) + " mins"}
                                           percent={(((activityData?.data[activityData?.data?.length - 1]?.value ?? 0) - (activityData?.data[activityData?.data?.length - 2]?.value ?? 0))) / (activityData?.data[activityData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={activityData.data.map((item: any) => item.value / 60)}/>
                    :
                    <CardSkeleton height={'160px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {lowIntensityData ?
                    <ActivityWidgetSummary title={'Yesterdays\' Low Intensity'}
                                           total={Math.floor((lowIntensityData?.data[lowIntensityData?.data?.length - 1]?.value ?? 0) / 60) + " mins"}
                                           percent={(((lowIntensityData?.data[lowIntensityData?.data?.length - 1]?.value ?? 0) - (lowIntensityData?.data[lowIntensityData?.data?.length - 2]?.value ?? 0))) / (lowIntensityData?.data[lowIntensityData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={lowIntensityData.data.map((item: any) => item.value / 60)}/>
                    :
                    <CardSkeleton height={'160px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {moderateIntensityData ?
                    <ActivityWidgetSummary title={'Yesterdays\' Moderate Intensity'}
                                           total={Math.floor((moderateIntensityData?.data[moderateIntensityData?.data?.length - 1]?.value ?? 0) / 60) + " mins"}
                                           percent={(((moderateIntensityData?.data[moderateIntensityData?.data?.length - 1]?.value ?? 0) - (moderateIntensityData?.data[moderateIntensityData?.data?.length - 2]?.value ?? 0))) / (moderateIntensityData?.data[moderateIntensityData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={moderateIntensityData.data.map((item: any) => item.value / 60)}/>
                    :
                    <CardSkeleton height={'160px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {vigorousIntensityData ?
                    <ActivityWidgetSummary title={'Yesterdays\' Vigorous Intensity'}
                                           total={Math.floor((vigorousIntensityData?.data[vigorousIntensityData?.data?.length - 1]?.value ?? 0) / 60) + " mins"}
                                           percent={(((vigorousIntensityData?.data[vigorousIntensityData?.data?.length - 1]?.value ?? 0) - (vigorousIntensityData?.data[vigorousIntensityData?.data?.length - 2]?.value ?? 0))) / (vigorousIntensityData?.data[vigorousIntensityData?.data?.length - 2]?.value ?? 1) * 100}
                                           chartColor={theme.palette.chart.green[0]}
                                           chartData={vigorousIntensityData.data.map((item: any) => item.value / 60)}/>
                    :
                    <CardSkeleton height={'160px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {averageSteps ?
                    <Card style={{backgroundColor:'#bb77ff', border:'4px solid black'}}>
                        <CardContent>
                            <Typography variant={'h5'} textAlign={'center'}>Average Steps</Typography>
                            <Typography variant={'h3'} textAlign={'center'}>{Math.floor(averageSteps.data[0]?.value ?? 0).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                    :
                    <CardSkeleton height={'135px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {averageSleep ?
                    <Card style={{backgroundColor:'#77dd77', border:'4px solid black'}}>
                        <CardContent>
                            <Typography variant={'h5'} textAlign={'center'}>Average Sleep</Typography>
                            <Typography variant={'h3'} textAlign={'center'}>{((averageSleep.data[0]?.value ?? 0) / 60 / 60).toFixed(1) + " Hours"}</Typography>
                        </CardContent>
                    </Card>
                    :
                    <CardSkeleton height={'135px'}/>
                }
            </Grid>
            <Grid item xs={12} md={4}>
                {averageActivity ?
                    <Card style={{backgroundColor:'#ffaaff', border:'4px solid black'}}>
                        <CardContent>
                            <Typography variant={'h5'} textAlign={'center'}>Average Active Time</Typography>
                            <Typography variant={'h3'} textAlign={'center'}>{Math.floor((averageActivity.data[0]?.value ?? 0) / 60) + " mins"}</Typography>
                        </CardContent>
                    </Card>
                    :
                    <CardSkeleton height={'135px'}/>
                }
            </Grid>
        </>
    );
};

export default ActivityWidgets;
