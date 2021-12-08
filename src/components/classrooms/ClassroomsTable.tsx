import React from 'react';
import {graphqlOperation} from "aws-amplify";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import {useNavigate, useParams} from "react-router-dom";
import {Connect} from 'aws-amplify-react'
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import {Classroom} from "../../API";
import {onCreateClassroom} from "../../graphql/subscriptions";

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
const orgQuery =`query MyQuery($id: ID = "") {
  getOrganization(id: $id) {
    classrooms {
      items {
        id
        name
      }
    }
  }
}`
const CurriculaGrid = () => {
    const {id, organizationId} = useParams();
    const navigate = useNavigate();
    let classroomQuery: string = '';
    if (id) {
        classroomQuery = query;
    } else if (organizationId) {
        classroomQuery = orgQuery;
    }
    return (
        <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start" spacing={2}
        >
            <Grid item xs={12}>
                <Grid container justifyContent="flex-start" spacing={2}>
                    <Connect
                        query={graphqlOperation(classroomQuery, {id: id})}
                        subscription={graphqlOperation(onCreateClassroom)}
                        onSubscriptionMsg={(prevData, data) => {
                            console.log(prevData)
                            let prevCurricula = {...prevData};
                            prevCurricula.getSchool.classrooms.items = [
                                data.onCreateClassroom,
                                ...prevData.getSchool.classrooms.items
                            ];
                            return prevCurricula;
                        }}
                    >
                        {({data, loading, errors}: IConnectState) => {
                            if (errors.lenght > 0) {
                                console.error(errors)
                            }
                            if (loading) {
                                return [0, 1, 2].map((value, index) => (
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
                                    </Grid>
                                ))
                            }
                            console.log(data)
                            return data.getSchool.classrooms.items.map((value: Classroom, index: number) => (
                                <Grid key={index} item  xs={12} sm={6} md={3}>
                                    <Card>
                                        <CardActionArea onClick={() => {
                                            navigate(`${value.id}`);
                                        }
                                        }
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
                            ));

                        }}
                    </Connect>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CurriculaGrid;
