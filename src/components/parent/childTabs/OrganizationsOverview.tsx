import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {Organization} from "../../../API";
import CardSkeleton from "../../skeletons/CardSkeleton";
import {
    Autocomplete,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Link, Stack, TextField,
    Typography
} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {CardMembership} from "@mui/icons-material";

const organizationsQuery = `query MyQuery($id: ID = "") {
  getPupil(id: $id) {
    Organizations {
      items {
        organization {
          name
          id
          type
        }
      }
    }
  }
}`
const OrganizationsOverview = () => {
    const {pupilId} = useParams();
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    const [filter, setFilter] = React.useState<string | null>('');
    useEffect(() => {
        const getOrganizations = async () => {
            setOrganizations(null)
            const result: any = await API.graphql(graphqlOperation(organizationsQuery, {id: pupilId}));
            let map = result.data.getPupil?.Organizations.items.map((item: any) => item.organization);

            setOrganizations(map);
        }
        getOrganizations()
        return () => {

        };
    }, [pupilId]);
    const OrganizationsGrid = () => {
        if (!organizations) {
            return (
                <>
                    {[0,1,2,3, 4].map(index=>
                        <Grid item height={300} width={250   } xs={12} sm={6} md={4} lg={3} key={index}>
                            <CardSkeleton/>
                        </Grid>
                    )}
                </>
            )
        }
        if (organizations.length == 0) {
            return <Typography textAlign={'center'}>No clubs added yet</Typography>
        }
        return (
            <>

                {organizations.filter(value => filter ? value.name === filter : true).map(organization =>
                    <Grid item xs={12} sm={6} md={4} lg={3} >
                        <Link component={RouterLink} to={`../../organization/${organization.id}`} underline={'none'}>
                            <Card>
                                <CardActionArea>
                                    <CardHeader title={organization.name} subheader={organization.type}/>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            image="/static/HHT logo RGB.png"
                                            alt="Paella dish"
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                )}
            </>
        );
    }
    return (
            <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={organizations?.map(value => value.name) ?? []}
                sx={{ mb: 2, maxWidth: 300}}
                value={filter}
                // @ts-ignore
                onChange={(event: any, newValue: string | null) => {
                    setFilter(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Search..."/>}
            />
            <Grid container spacing={3}
                  justifyContent="flex-start"
                  alignItems="flex-start"
            >
                <OrganizationsGrid/>
            </Grid>
        </>
    );
};

export default OrganizationsOverview;
