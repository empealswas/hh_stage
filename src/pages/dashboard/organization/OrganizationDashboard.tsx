import React, {useEffect, useMemo, useState} from 'react';
import Page from "../../../components/Page";
import {Container, Grid, Typography} from "@mui/material";
import ActivityWidgetSummary from "../parent/child/profile_tabs/activity/ActivityWidgetSummary";
import {Teacher} from "../../../models/Teacher";
import CardSkeleton from "../../../components/skeleton/CardSkeleton";
import AnalyticsStepsChart from "../analytics/AnalyticsStepsChart";
import AnalyticsSleepChart from "../analytics/AnalyticsSleepChart";
import useSettings from 'src/hooks/useSettings';
import useAuth from "../../../hooks/useAuth";
import AnalyticsWidgetSummary from 'src/sections/@dashboard/general/analytics/AnalyticsWidgetSummary';
import {
    AnalyticsConversionRates,
    AnalyticsCurrentSubject, AnalyticsCurrentVisits, AnalyticsNewsUpdate, AnalyticsOrderTimeline,
    AnalyticsTasks, AnalyticsTrafficBySite, AnalyticsWebsiteVisits
} from "../../../sections/@dashboard/general/analytics";
import {Organization, PELessonRecord} from "../../../API";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import ActivityOrganizationBarchart from "./dashboard/ActivityOrganizationBarchart";
import ActivtityChartSkeleton from "../../../components/skeleton/ActivtityChartSkeleton";
import {collect} from "collect.js";
import ActivityOrganizationLineChart from "./dashboard/ActivityOrganizationLineChart";

const query = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    Classrooms {
      items {
        name
        LessonRecords(limit: 10000) {
          items {
            date
            id
            duration
            activity
            rating
          }
        }
      }
    }
    members(limit: 10000) {
      items {
        id
      }
    }
  }
}
`
const OrganizationDashboard = () => {
    const {user} = useAuth();
    const {themeStretch} = useSettings();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const {organizationId} = useParams();
    useEffect(() => {
        const getOrganizationAsync = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {id: organizationId}))
            console.log(result)
            setOrganization(result.data.getOrganization);
        }
        getOrganizationAsync();
        return () => {

        };
    }, [organizationId]);
    /*    const trainingSessionsAmount = useMemo(() => {
            if (!organization) {
                return null;
            }
            return organization.Classrooms?.items
                .flatMap(value => value?.LessonRecords?.items as PELessonRecord[]).length;
        }, [organization]);*/
    const sum = organization?.Classrooms?.items
        .flatMap(value => value?.LessonRecords?.items)
        .map(value => value?.rating ?? 0)
        .reduce((accumulator, curr) => accumulator + curr, 0) ?? 0;
    const all = organization?.Classrooms?.items
        .flatMap(value => value?.LessonRecords?.items).length ?? 1;
    const averageRating = useMemo(() => {
        if (!organization) {
            return 0;
        }
        const sum = collect(organization?.Classrooms?.items
            .flatMap(value => value?.LessonRecords?.items)).avg((value: PELessonRecord) => value?.rating ?? 0);
        return sum * 20;
    }, [organization]);

    return (
        <Page title="General: Analytics">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h4" sx={{mb: 5}}>
                    Hi, {user?.firstName}, welcome back!
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Training Sessions"
                                total={organization.Classrooms?.items
                                    .flatMap(value => value?.LessonRecords?.items).length ?? 0}
                                color="warning"
                                icon={'akar-icons:trophy'}
                            /> :
                            <CardSkeleton height={'300px'}/>
                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Total Participants"
                                total={organization?.members?.items.length ?? 0}
                                color="info"
                                icon={'ant-design:user-add-outlined'}
                            />
                            :
                            <CardSkeleton height={'300px'}/>

                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Total Hours"
                                total={(organization.Classrooms?.items
                                    .flatMap(value => value?.LessonRecords?.items)
                                    .map(value => value?.duration ?? 0)
                                    .reduce((accumulator, curr) => accumulator + curr, 0) ?? 0) / 60.0
                                }
                                icon={'bx:bx-time-five'}
                            />
                            :
                            <CardSkeleton height={'300px'}/>

                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        {organization ?
                            <AnalyticsWidgetSummary
                                title="Training Quality(%)"
                                total={averageRating}
                                color="secondary"
                                icon={'akar-icons:star'}
                            /> :
                            <CardSkeleton height={'300px'}/>

                        }
                    </Grid>
                    <Grid item xs={12}>
                        {organization ?
                            <ActivityOrganizationBarchart organization={organization}/>
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {organization ?
                            <ActivityOrganizationLineChart />
                            :
                            <ActivtityChartSkeleton/>
                        }
                    </Grid>

                    {/*          <Grid item xs={12} md={6} lg={8}>
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
};

export default OrganizationDashboard;
