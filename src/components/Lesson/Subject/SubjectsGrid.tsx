import React from 'react';
import {graphqlOperation} from "aws-amplify";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Connect} from 'aws-amplify-react'
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import {listCurricula, listSubjects} from "../../../graphql/queries";
import {Curriculum, Subject} from "../../../API";
import {Link as RouterLink, useParams} from "react-router-dom";
import {onCreateCurriculum, onCreateSubject} from "../../../graphql/subscriptions";
import CardSkeleton from "../../skeletons/CardSkeleton";

const query = `query MyQuery($id: ID = "") {
  getCurriculum(id: $id) {
    subjects {
      items {
        subject {
          name
          id
        }
      }
    }
  }
}
`
const subscription = `subscription MySubscription {
  onCreateCurriculumSubject {
    curriculumID
    subject {
      name
      id
    }
  }
}

`
const SubjectsGrid = () => {
    const {id} = useParams();
    const updateItems = (prevData: any, data: any): any => {
        const createdSubject = data.onCreateCurriculumSubject;
        if (createdSubject.curriculumID !== id) {
            return prevData;
        }
        let newData = {...prevData};
        const subjects: Subject [] = prevData.getCurriculum.subjects.items
            .map((item: any) => item.subject)
            .filter((subject: Subject) => subject.id !== createdSubject.subject.id);

        subjects.push(createdSubject.subject);
        newData.getCurriculum.subjects.items = subjects.map(item => ({subject: {...item}}))
        return newData;
    }
    return (
        <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start" spacing={2}
        >
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}
                      style={{flexGrow: 1, display: 'flex', flexWrap: 'wrap'}}>
                    <Connect
                        query={graphqlOperation(query, {id: id})}
                        subscription={graphqlOperation(subscription)}
                        onSubscriptionMsg={updateItems}
                    >
                        {({data, loading, errors}: IConnectState) => {
                            if (errors.lenght > 0) {
                                console.error(errors)
                            }
                            if (loading) {
                                return [0, 1, 2, 3, 4, 5].map((value) => (
                                    <CardSkeleton key={value}/>
                                ))
                            }
                            console.log(data.getCurriculum.subjects.items)
                            return data.getCurriculum.subjects.items.map((item: any) => item.subject).map((subject: Subject, index: number) => (
                                <Grid key={index} item maxWidth={300} minWidth={200} xs={12} sm={6} md={3}>
                                    <Link component={RouterLink} to={`../subjects/${subject.id}`} underline={'none'}>
                                        <Card style={{height: '100%'}}>
                                            <CardActionArea style={{height: '100%'}}>
                                                <CardContent style={{textAlign: 'center'}}>
                                                    <Typography variant="h5" component="h2">
                                                        {subject.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            ));
                        }}
                    </Connect>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SubjectsGrid;
