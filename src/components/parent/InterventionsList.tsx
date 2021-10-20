import React, {useEffect, useState} from 'react';
import {Intervention, Pupil} from "../../API";
import {API, graphqlOperation} from "aws-amplify";
import {onCreateIntervention} from "../../graphql/subscriptions";
import {Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Stack, Typography} from "@mui/material";
import CardSkeleton from "../skeletons/CardSkeleton";
import {ProductFilterSidebar, ProductSort} from "../_dashboard/products";
import FilterListIcon from '@mui/icons-material/FilterList';
import {Rating} from "@mui/lab";
import InterventionMenu from "./interventions/InterventionMenu";

const query = `query MyQuery($id: ID = "") {
  getPupil(id: $id) {
    Interventions {
      items {
        id
        message
      }
    }
  }
}`
const InterventionsList = (props: { pupil: Pupil }) => {
    const [interventions, setInterventions] = useState<Intervention[] | null>(null);
    useEffect(() => {
        const getInterventions = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {id: props.pupil.id}));
            setInterventions(result.data.getPupil.Interventions.items);
            console.log(result.data.getPupil.Interventions.items)
        }
        getInterventions();
        const subscription: any = API.graphql(graphqlOperation(onCreateIntervention));
        const onInterventionAddedSubscription: any = subscription.subscribe({
            next: (result: any) => {
                console.log(result);
                console.log(result.value.data)
                const intervention: Intervention = result.value.data.onCreateIntervention;
                if (!intervention) {
                    return;
                }
                if (intervention.pupilID !== props.pupil.id) {
                    return;
                }
                setInterventions(prevState => {
                    if (!prevState) {
                        return [intervention];
                    }
                    const prev = prevState.filter(value => value.id !== intervention.id);
                    prev.push(intervention);
                    return prev;
                })
            }
        })
        return (() => {
            onInterventionAddedSubscription.unsubscribe();
        })
    }, [])
    if (!interventions) {
        return (
            <CardSkeleton/>
        )
    }
    if (interventions.length === 0) {
        return (<Typography variant={'h6'}>Here will be displayed achievements and highlights of your child school
            life.</Typography>);
    }
    return (
        <div>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Card>
                            <CardContent>
                                <Stack direction={'column'} spacing={2}>
                                    <ProductSort/>
                                    <Button endIcon={<FilterListIcon/>} color={'inherit'}>Filter</Button>
                                </Stack>
                                {/*<ProductFilterSidebar/>*/}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8}>
                        <Stack direction={'column'} spacing={3}>
                            {interventions?.reverse().map(value => {
                                return (
                                    <Card>
                                        <CardHeader title={'Intervention'}/>
                                        <CardContent>
                                            <Typography variant={'body1'}>{value.message}</Typography>
                                        </CardContent>
                                        <CardActions style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <InterventionMenu />
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default InterventionsList;
