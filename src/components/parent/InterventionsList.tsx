import React, {useContext, useEffect, useState} from 'react';
import {Intervention, Pupil} from "../../API";
import {API, graphqlOperation} from "aws-amplify";
import {onCreateIntervention} from "../../graphql/subscriptions";
import {Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Stack, Typography} from "@mui/material";
import CardSkeleton from "../skeletons/CardSkeleton";
import {ProductFilterSidebar, ProductSort} from "../_dashboard/products";
import FilterListIcon from '@mui/icons-material/FilterList';
import {Rating} from "@mui/lab";
import InterventionMenu from "./interventions/InterventionMenu";
import {compareAsc, compareDesc, parseISO} from "date-fns";
import {UserContext} from "../../App";

const query = `query MyQuery($parentId: ID = "", $id: ID = "a0c357a3-b4e2-475b-9796-dff2b7e97dd2") {
  getPupil(id: $id) {
    Interventions(sortDirection: ASC, limit: 10) {
      items {
        id
        message
        createdAt
        InterventionFeedback(parentID: {eq: $parentId}) {
          items {
            id
            comment
            rating
          }
        }
      }
      nextToken
    }
  }
}`


const getFirstInterventions = `query MyQuery($pupilId: ID = "", $parentId: ID = "", $direction: SearchableSortDirection = desc) {
  searchInterventions(filter: {pupilID: {eq: $pupilId}}, limit: 5, sort: {direction: $direction, field: createdAt}) {
    nextToken
    total
    items {
      id
      message
      createdAt
      InterventionFeedback(parentID: {eq: $parentId}) {
        items {
          id
          comment
          rating
        }
      }
    }
  }
}`
const getNextInterventions = `query MyQuery($pupilId: ID = "", $parentId: ID = "", $nextToken: String = "", $direction: SearchableSortDirection = desc) {
  searchInterventions(filter: {pupilID: {eq: $pupilId}}, limit: 10, sort: {direction: $direction, field: createdAt}, nextToken: $nextToken) {
    nextToken
    total
    items {
      id
      message
      createdAt
      InterventionFeedback(parentID: {eq: $parentId}) {
        items {
          id
          comment
          rating
        }
      }
    }
  }
}`
const InterventionsList = (props: { pupil: Pupil }) => {
    const [interventions, setInterventions] = useState<Intervention[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [sortFilter, setSortFilter] = useState('newest');
    const parent = useContext(UserContext);
    let nextToken: string = '';

    const loadInterventions = async () => {
        const result: any = await API.graphql(graphqlOperation(getNextInterventions, {
            pupilId: props.pupil.id,
            parentId: parent?.email,
            nextToken: nextToken,
            direction: sortFilter === 'newest' ? 'desc' : 'asc'
        }));
        nextToken = result.data.searchInterventions.nextToken;
        console.log(nextToken)
        setInterventions(prevState => {
            if (prevState) {
                return [...prevState, ...result.data.searchInterventions.items];
            } else {
                return result.data.searchInterventions.items
            }
        });
    }
    useEffect(() => {
        const getInterventions = async () => {
            setInterventions(null)
            const result: any = await API.graphql(graphqlOperation(getFirstInterventions, {
                pupilId: props.pupil.id,
                parentId: parent?.email,
                direction: sortFilter === 'newest' ? 'desc' : 'asc'
            }));
            nextToken = result.data.searchInterventions.nextToken;
            setInterventions(result.data.searchInterventions.items);
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
        var isAtBottom = document.documentElement.scrollHeight  - document.documentElement.scrollTop <= document.documentElement.clientHeight;

        if (isAtBottom && nextToken && !loading) {
            console.log('loading')
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
                    <CardSkeleton/>
                    <CardSkeleton/>
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
                                        subheader={`${parseISO(value.createdAt).toLocaleDateString()} ${parseISO(value.createdAt).toLocaleTimeString()}`}/>
                            <CardContent>
                                <Typography variant={'body1'}>{value.message}</Typography>
                            </CardContent>
                            <CardActions style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <InterventionMenu intervention={value}/>
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
                                    <ProductSort setSortFilter={setSortFilter} sortFilter={sortFilter}/>
                                    <Button endIcon={<FilterListIcon/>} color={'inherit'}>Filter</Button>
                                </Stack>
                                {/*<ProductFilterSidebar/>*/}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={8}>
                        <Stack direction={'column'} spacing={3}>
                            {/*.sort((a, b) => {
                                if (sortFilter === 'newest') {
                                    return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
                                } else {
                                    return compareAsc(parseISO(a.createdAt), parseISO(b.createdAt));
                                }
                            })*/}
                            <Interventios/>
                            {loading &&
                            <>
                                <CardSkeleton/>
                                <CardSkeleton/>
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
