// @mui
import {Grid, Container, Typography} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
    AnalyticsTasks,
    AnalyticsNewsUpdate,
    AnalyticsOrderTimeline,
    AnalyticsCurrentVisits,
    AnalyticsWebsiteVisits,
    AnalyticsTrafficBySite,
    AnalyticsWidgetSummary,
    AnalyticsCurrentSubject,
    AnalyticsConversionRates,
} from '../../sections/@dashboard/general/analytics';
import useAuth from "../../hooks/useAuth";
import AnalyticsStepsChart from "./analytics/AnalyticsStepsChart";
import AnalyticsSleepChart from "./analytics/AnalyticsSleepChart";
import {useEffect, useState} from "react";
import ActivityWidgetSummary from "./parent/child/profile_tabs/activity/ActivityWidgetSummary";
import {Pupil} from "../../API";
import {format, subDays} from "date-fns";
import axios from "axios";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import {Teacher} from "../../models/Teacher";
import {useTheme} from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
    const {themeStretch} = useSettings();
    const {user} = useAuth();
    const [averageStepsForLast7Days, setAverageStepsForLast7Days] = useState<{ past: number, current: number } | null>(null);
    const [averageSleepsHoursForLast7Days, setAverageSleepsHoursForLast7Days] = useState<{ past: number, current: number } | null>(null);
    const theme = useTheme();
    useEffect(() => {
        let pupilsIds = [];
        const getData = async () => {

            const idsToUse = (await user?.getPupilsIds()).filter((item: any) => !!item.id).map((item: any) => item.id);
            console.log(idsToUse)
            getAverageStepsForThePast7Days(idsToUse);
            getAverageSleepForThePast7Days(idsToUse);

        };
        getData()


        return () => {

        };
    }, []);

    const getAverageStepsForThePast7Days = async (ids: string[]) => {
        var data = JSON.stringify({
            "idList": ids,
            "grouping": "group",
            "category": "daily",
            "subtype": "steps",
            "period": "week",
            "startDate": format(subDays(new Date(), 14), 'yyyy-MM-dd'),
            "endDate": format(new Date(), 'yyyy-MM-dd'),
            "returnType": "average"
        });
        var config: any = {
            method: 'post',
            url: 'https://terra.healthyhabits.link/api/data/get-data',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const result: any = await axios(config);
        setAverageStepsForLast7Days({
            past: result.data[0]?.value ?? 0,
            current: result.data[1]?.value ?? 0
        });

    }
    const getAverageSleepForThePast7Days = async (ids: string []) => {
        var data = JSON.stringify({
            "idList": ids,
            "grouping": "group",
            "category": "sleep",
            "subtype": "durationTotal",
            "period": "week",
            "startDate": format(subDays(new Date(), 14), 'yyyy-MM-dd'),
            "endDate": format(new Date(), 'yyyy-MM-dd'),
            "returnType": "average"
        });
        var config: any = {
            method: 'post',
            url: 'https://terra.healthyhabits.link/api/data/get-data',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log(config);
        const result: any = await axios(config);
        console.log(result.data)
        setAverageSleepsHoursForLast7Days({
            past: result.data[0]?.value/60.0/60 ?? 0,
            current: result.data[1]?.value/60.0/60 ?? 0
        });
    }

    return (
        <Page title="General: Analytics">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h4" sx={{mb: 5}}>
                    Hi, {user?.firstName}, welcome back!
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        {averageStepsForLast7Days ?

                            <ActivityWidgetSummary
                                title={user instanceof Teacher ? 'Average steps for children in all your classroom for the last 7 days' : 'Average steps for children in you school for the last 7 days'}
                                chartColor={theme.palette.chart.green[0]}
                                total={averageStepsForLast7Days.current}
                                percent={((averageStepsForLast7Days.past - averageStepsForLast7Days.current) / averageStepsForLast7Days.current) * 100}
                                chartData={[averageStepsForLast7Days.past, averageStepsForLast7Days.current]}
                            />
                            :
                            <CardSkeleton/>
                        }
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {averageSleepsHoursForLast7Days ?

                            <ActivityWidgetSummary
                                title={user instanceof Teacher ? 'Average sleep hours for children in all your classroom for the last 7 days' : 'Average sleep hours for children in you school for the last 7 days'}
                                chartColor={theme.palette.chart.blue[0]}
                                total={averageSleepsHoursForLast7Days.current}
                                percent={((averageSleepsHoursForLast7Days.past - averageSleepsHoursForLast7Days.current) / averageSleepsHoursForLast7Days.current) * 100}
                                chartData={[averageSleepsHoursForLast7Days.past, averageSleepsHoursForLast7Days.current]}
                            />
                            :
                            <CardSkeleton/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <AnalyticsStepsChart/>
                    </Grid>
                    <Grid item xs={12}>
                        <AnalyticsSleepChart/>
                    </Grid>

                    {/* <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Weekly Sales"
              total={714000}
              icon={'ant-design:android-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={'ant-design:apple-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Item Orders"
              total={1723315}
              color="warning"
              icon={'ant-design:windows-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Bug Reports"
              total={234}
              color="error"
              icon={'ant-design:bug-filled'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks />
          </Grid>*/}
                </Grid>
            </Container>
        </Page>
    );
}
