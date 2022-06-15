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
import {UserIntervention, User} from "../../../../../../../API";
import useAuth from "../../../../../../../hooks/useAuth";
import {onCreateIntervention} from "../../../../../../../graphql/subscriptions";
import InterventionMenu from "./InterventionMenu";
import {ShopProductSort} from "../../../../../../../sections/@dashboard/e-commerce/shop";
import ProductSort from "./ProductSort";

const InterventionsList = (props: { user: User }) => {

    const [interventions, setInterventions] = useState<UserIntervention[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortFilter, setSortFilter] = useState('newest');

    const theme = useTheme();
    console.log(theme);

    const loadInterventions = async () => {
        setLoading(true);
        const response = await API.get('HealthyHabitsV2API', '/api/interventions', {
             queryStringParameters: {
                 id: props.user.terraId
             }
        });
        if (response.status == "success") {
            setInterventions(response.data);
        }
        else {
            setInterventions([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadInterventions();
        return () => {};
    }, [sortFilter, props.user]);

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
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Stack direction={'column'} spacing={3}>
                            {interventions.map((value) => {
                                return (
                                    <Card key={value.intervention_id}>
                                        <CardHeader title={'Intervention'}
                                            subheader={value.datetime_value} />
                                        <CardContent>
                                            <Typography variant={'body1'}>{value.Message}</Typography>
                                        </CardContent>
                                        {/*
                                        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <InterventionMenu intervention={value} />
                                        </CardActions>
                                        */}
                                    </Card>
                                )
                            })}
                        </Stack>
                    </Grid>
                </Grid>
            </>
        </div>
    );
};

export default InterventionsList;
