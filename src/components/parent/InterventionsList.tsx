import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Stack, Typography } from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import { parseISO } from "date-fns";
import React, { useContext, useEffect, useState } from 'react';
import { Intervention, Pupil } from "../../API";
import { UserContext } from "../../App";
import { onCreateIntervention } from "../../graphql/subscriptions";
import CardSkeleton from "../skeletons/CardSkeleton";
import { ProductSort } from "../_dashboard/products";
import InterventionMenu from "./interventions/InterventionMenu";


const getFirstInterventions = `query MyQuery($id: ID = "", $sortDirection: ModelSortDirection = ASC) {
  getPupil(id: $id) {
    Interventions(sortDirection: $sortDirection, limit: 5) {
      items {
        id
        message
        createdAt
        InterventionFeedback {
          items {
            comment
            createdAt
            id
            rating
          }
        }
      }
      nextToken
    }
  }
}
`
const getNextInterventions = `query MyQuery($id: ID = "", $sortDirection: ModelSortDirection = ASC, $nextToken: String = "") {
  getPupil(id: $id) {
    Interventions(sortDirection: $sortDirection, limit: 10, nextToken: $nextToken) {
      items {
        message
        createdAt
        InterventionFeedback {
          items {
            comment
            createdAt
            id
            rating
          }
        }
      }
      nextToken
    }
  }
}
`
const InterventionsList = (props: { pupil: Pupil }) => {
    const [interventions, setInterventions] = useState<Intervention[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [sortFilter, setSortFilter] = useState('newest');
    const parent = useContext(UserContext);
    let nextToken = ''

    
    const loadInterventions = async () => {
        setLoading(true)
        const result: any = await API.graphql(graphqlOperation(getNextInterventions, {
            id: props.pupil.id,
            nextToken: nextToken,
            sortDirection: sortFilter === 'newest' ? 'DESC' : 'ASC'
        }));
        nextToken = result.data.getPupil.Interventions.nextToken
        setInterventions(prevState => {
            if (prevState) {
                return [...prevState, ...result.data.getPupil.Interventions.items];
            } else {
                return result.data.getPupil.Interventions.items
            }
        });
        setLoading(false)

    }
    useEffect(() => {
        const getInterventions = async () => {
            setInterventions(null)
            const result: any = await API.graphql(graphqlOperation(getFirstInterventions, {
                id: props.pupil.id,
                sortDirection: sortFilter === 'newest' ? 'DESC' : 'ASC'
            }));
            nextToken = result.data.getPupil.Interventions.nextToken;

            setInterventions(result.data.getPupil.Interventions.items);
            console.log(nextToken);
            // console.log(result.data.getPupil.Interventions.items)
        }
        getInterventions();
        return () => {

        };
    }, [sortFilter, props.pupil]);

    useEffect(() => {

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
                    prev.unshift(intervention);
                    return prev;
                })
            }
        })
        return (() => {
            onInterventionAddedSubscription.unsubscribe();
        })
    }, [props.pupil])
    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
        // console.log('schrollHeight', document.documentElement.scrollHeight);
        // console.log('scrollTop', document.documentElement.scrollTop);
        var isAtBottom = document.documentElement.scrollHeight - 10 - document.documentElement.scrollTop <= document.documentElement.clientHeight;
        console.log(isAtBottom)
        if (isAtBottom && nextToken && !loading) {
            console.log('loading')
            console.log(nextToken)
        
            setLoading(true);
            loadInterventions().then(res => setLoading(false));
        }

    }

    /*    if (!interventions) {
            return (
                <CardSkeleton/>
            )
        }
        if (interventions.length === 0) {
            return (
                <Typography variant={'h6'} textAlign={'center'}>Here will be displayed achievements and highlights of your
                    child school
                    life.</Typography>);
        }*/
    const Interventios = () => {
        if (!interventions) {
            return (
                <>
                    <CardSkeleton />
                    <CardSkeleton />
                </>
            );
        }
        if (interventions.length === 0) {
            return (
                <Typography variant={'h6'} textAlign={'center'}>Here will be displayed achievements and highlights of your
                    child school
                    life.</Typography>);
        }
        return (
            <>
                {interventions?.map(value => {
                    return (
                        <Card>
                            <CardHeader title={'Intervention'}
                                subheader={`${parseISO(value.createdAt).toLocaleDateString()} ${parseISO(value.createdAt).toLocaleTimeString()}`} />
                            <CardContent>
                                <Typography variant={'body1'}>{value.message}</Typography>
                            </CardContent>
                            <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <InterventionMenu intervention={value} />
                            </CardActions>
                        </Card>
                    );
                })}
            </>
        );
    }


    return (
        <div>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Card>
                            <CardContent>
                                <Stack direction={'column'} spacing={2}>
                                    <ProductSort setSortFilter={setSortFilter} sortFilter={sortFilter} />
                                    <Button endIcon={<FilterListIcon />} color={'inherit'}>Filter</Button>
                                </Stack>
                                {/*<ProductFilterSidebar/>*/}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8}>
                        <Stack direction={'column'} spacing={3}>
                            <Interventios />
                            {loading &&
                                <>
                                    <CardSkeleton />
                                    <CardSkeleton />
                                </>
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default InterventionsList;
