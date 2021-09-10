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
import {listCurricula} from "../../../graphql/queries";
import {Curriculum} from "../../../API";
import {Link as RouterLink} from "react-router-dom";
import {onCreateCurriculum} from "../../../graphql/subscriptions";
import CardSkeleton from "../../skeletons/CardSkeleton";


const CurriculaGrid = () => {
    const updateItems = (prevData: any, data: any) => {
        let newData = {...prevData};
        newData.listCurricula.items = [
            data.onCreateCurriculum,
            ...prevData.listCurricula.items
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
                        query={graphqlOperation(listCurricula)}
                        subscription={graphqlOperation(onCreateCurriculum)}
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
                            return data.listCurricula.items.map((value: Curriculum, index: number) => (
                                <Grid key={index} item  xs={12} sm={6} md={3}>
                                    <Link component={RouterLink} to={`${value.id}`} underline={'none'}>
                                        <Card style={{height: '100%'}}>
                                            <CardActionArea style={{height: '100%'}}>
                                                <CardContent style={{textAlign: 'center'}}>
                                                    <Typography variant="h4" color={'text.primary'}>
                                                        {value.name}
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

export default CurriculaGrid;
