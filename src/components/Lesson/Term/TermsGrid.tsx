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
import {Subject, Term} from "../../../API";
import {Link as RouterLink, useParams} from "react-router-dom";
import {onCreateSubject} from "../../../graphql/subscriptions";
import CardSkeleton from "../../skeletons/CardSkeleton";

const query = `query MyQuery($id: ID = "") {
  getSubject(id: $id) {
    SubjectTerms {
      items {
        term {
          nam
          id
          startDate
          finishDate
        }
      }
    }
  }
}
`
const subscription = `subscription MySubscription {
  onCreateSubjectTerm {
    subjectID
    term {
      nam
      id
      startDate
      finishDate
    }
  }
}
`
const SubjectsGrid = () => {
    const {id} = useParams();
    const updateItems = (prevData: any, data: any) => {
        const createdTerm = data.onCreateSubjectTerm;
        if (createdTerm.subjectID !== id) {
            return prevData;
        }
        let newData = {...prevData};
        const terms: Term [] = prevData.getSubject.SubjectTerms.items
            .map((item: any) => item.term)
            .filter((term: Term) => term.id !== createdTerm.term.id);
        terms.push(createdTerm.term);
        newData.getSubject.SubjectTerms.items = terms.map(item => ({term: {...item}}))
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
                            return data.getSubject.SubjectTerms.items.map((item: any)=> item.term).map((value: Term, index: number) => (
                                <Grid key={index} item xs maxWidth={300} minWidth={200}>
                                    <Link component={RouterLink} to={`../terms/${value.id}`} underline={'none'}>
                                        <Card>
                                            <CardActionArea>
                                                <CardContent style={{textAlign: 'center'}}>
                                                    <Typography variant="h5" component="h2">
                                                        {value.nam}
                                                    </Typography>
                                                    <Typography style={{width: '100%', textAlign: 'center', fontSize: "14px", marginTop: 20}} gutterBottom
                                                                variant="h6" component="h6">
                                                        {value.startDate} — {value.finishDate}
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
