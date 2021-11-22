import React from 'react';
import {useParams} from "react-router-dom";
import {Connect} from "aws-amplify-react";
import {graphqlOperation} from "aws-amplify";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import LinearProgressBottom from "../../utils/LinearProgressBottom";
import {Box, Container, Grid, Stack, Typography} from "@material-ui/core";
import {AppWebsiteVisits} from "../_dashboard/app";
import StepsChart from "./StepsChart";
import PupilActivitiesChart from "./PupilActivitiesChart";


const query = `query MyQuery($id: ID = "") {
  getPupil(id: $id) {
    lastName
    id
    firstName
    Attendances(filter: {present: {eq: true}}) {
      items {
        id
      }
    }
  }
}
`
const PupilOverview = () => {
    const {pupilId} = useParams();
    return (
        <Connect query={graphqlOperation(query, {id: pupilId})}>
            {(studentData: IConnectState) => {
                if (studentData.loading) {
                    return <LinearProgressBottom/>;
                }
                const pupil = studentData.data.getPupil;
                console.log(pupil)
                return (
                    <Container maxWidth="xl">
                        <Box sx={{pb: 5}}>
                            <Typography variant="h4">{pupil.firstName} {pupil.lastName}</Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={8}>
                                {pupilId &&
                                <StepsChart pupilId={pupilId}/>
                                }
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <PupilActivitiesChart/>
                            </Grid>
                        </Grid>
                        <Box mt={10}>
                            <Typography variant={'h4'}>
                                Amount of attended lessons: {pupil.Attendances.items.length}
                            </Typography>
                        </Box>
                    </Container>
                );
            }}
        </Connect>
    );
};

export default PupilOverview;
