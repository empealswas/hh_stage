import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {useNavigate, useParams} from "react-router-dom";
import {Card, CardActionArea, CardContent, Container, Grid, Typography} from "@mui/material";
import {onCreateClassroom} from "../../../../graphql/subscriptions";
import {Classroom} from "../../../../API";
import {Skeleton} from "@mui/lab";
import EmptyContent from "../../../../components/EmptyContent";

const Link = require("react-router-dom").Link;

const query = `
query MyQuery($id: ID = "") {
  getSchool(id: $id) {
    classrooms {
      items {
        id
        name
      }
    }
  }
}
`
const orgQuery = `query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    Classrooms {
      items {
        name
        id
      }
    }
  }
}`
const ClassroomsGrid = () => {
    const {organizationId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const getClassrooms = async () => {

            const result: any = await API.graphql(graphqlOperation(orgQuery, {id: organizationId}));
            setClassrooms(result.data.getOrganization.Classrooms.items);
        }

        getClassrooms()
        const createSubscription: any = API.graphql(graphqlOperation(onCreateClassroom));
        const updateSubscription = createSubscription.subscribe({
            next: (postData: any) => {
                console.log('Sub', postData);
                let classroom = postData.value.data.onCreateClassroom;
                if (organizationId && classroom.organizationClassroomsId !== organizationId) {
                    return;
                }
                getClassrooms();
            }
        })
        return () => {
            updateSubscription.unsubscribe();
        };
    }, []);

    const [classrooms, setClassrooms] = useState<Classroom [] | null>(null);
    const ClassroomsGird = () => {
        if (!classrooms) {
            return (<>
                    {[0, 1, 2].map((value, index) => (
                        <Grid key={index} item xs={12} sm={6} md={3}>
                            <Card>

                                <CardContent style={{width: '100%', height: '100%'}}>
                                    <Typography variant={'h3'}>
                                        <Skeleton animation={'pulse'} variant={'text'}/>
                                    </Typography>
                                    <Typography variant={'h4'}>
                                        <Skeleton animation={'pulse'} variant={'text'}/>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>))}
                </>
            );
        }
        if (classrooms.length === 0) {
            return <Container>
                <EmptyContent title={'No Teams'}/>
            </Container>
        }
        return (<>
            {classrooms.map((value: Classroom, index: number) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Card sx={{
                        bgcolor: 'background.neutral',
                    }}>
                        <CardActionArea
                            component={Link}
                            to={`team/${value.id}`}
                            style={{height: 'auto', textAlign: 'center'}}>
                            <CardContent style={{width: '100%', height: '100%'}}>
                                <Typography style={{width: '100%', height: '100%'}} gutterBottom
                                            variant="h5" component="h2">
                                    {value.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </>);
    }
    return (
        <Grid container spacing={2}>
            <ClassroomsGird/>
        </Grid>
    )

};

export default ClassroomsGrid;
