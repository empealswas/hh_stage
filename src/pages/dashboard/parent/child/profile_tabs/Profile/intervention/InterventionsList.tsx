// import FilterListIcon from '@mui/icons-material/FilterList';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import { parseISO } from "date-fns";
import React, { useContext, useEffect, useState } from 'react';
import {useTheme} from "@mui/material/styles";
import {Intervention, Pupil} from "../../../../../../../API";
import useAuth from "../../../../../../../hooks/useAuth";
import {onCreateIntervention} from "../../../../../../../graphql/subscriptions";
import InterventionMenu from "./InterventionMenu";
import {ShopProductSort} from "../../../../../../../sections/@dashboard/e-commerce/shop";
import ProductSort from "./ProductSort";


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
    let nextToken = ''

    const theme = useTheme();
    console.log(theme);

    
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

    const Interventios = () => {
        if (!interventions) {
            return (
                <>
                    <Skeleton height={300}/>
                    <Skeleton height={300}/>
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
                        <Card key={value.id}>
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
            <>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Typography textAlign={'center'} variant={'h3'}>Interventions</Typography>
                                <Stack direction={'column'} spacing={2}>
                                    <ProductSort setSortFilter={setSortFilter} sortFilter={sortFilter} />
                                    {/*<ShopProductSort/>*/}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Stack direction={'column'} spacing={3}>
                            <Interventios />
                            {loading &&
                                <>
                                    <Skeleton height={300}/>
                                    <Skeleton height={300}/>
                                </>
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </>
        </div>
    );
};

export default InterventionsList;
