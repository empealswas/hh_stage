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
import {Lesson, Term} from "../../../API";
import {Link as RouterLink, useParams} from "react-router-dom";
import {onCreateSubject} from "../../../graphql/subscriptions";
import CardSkeleton from "../../skeletons/CardSkeleton";

const query = `query MyQuery($id: ID = "") {
  getTerm(id: $id) {
    TermLessons {
      items {
        lesson {
          id
          description
          title
        }
      }
    }
  }
}
`
const LessonsGrid = () => {
    const {id} = useParams();
    const updateItems = (prevData: any, data: any) => {
        let newData = {...prevData};
        //todo update
        newData.getCurriculum.items = [
            data.onCreateSubject,
            ...prevData.listSubjects.items
        ];
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
                        subscription={graphqlOperation(onCreateSubject)}
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
                            return data.getTerm.TermLessons.items.map((item: any)=> item.lesson).map((value: Lesson, index: number) => (
                                <Grid key={index} item xs maxWidth={300} minWidth={200}>
                                    <Link component={RouterLink} to={`../lessons/${value.id}`} underline={'none'}>
                                        <Card>
                                            <CardActionArea>
                                                <CardContent style={{textAlign: 'center'}}>
                                                    <Typography variant="h5" component="h2">
                                                        {value.title}
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

export default LessonsGrid;
