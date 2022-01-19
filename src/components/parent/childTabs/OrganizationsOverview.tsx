import React, {useContext, useEffect, useState} from 'react';
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
    CardMedia, Container,
    Grid, IconButton,
    Link, Stack, TextField,
    Typography
} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {CardMembership, HdrPlus} from "@mui/icons-material";
import {Teacher} from "../../../models/Teacher";
import {UserContext} from "../../../App";
import OrganizationsSearch from "../OrganizationsSearch";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box } from '@material-ui/core';

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
const teacherOrganizationsQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    Organizations {
      items {
        id
        organization {
          name
          type
          id
        }
      }
    }
  }
}
`;
const OrganizationsOverview = () => {
    const {pupilId} = useParams();
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    const [filter, setFilter] = React.useState<string | null>('');
    const user = useContext(UserContext);
    useEffect(() => {
        const getOrganizations = async () => {
            setOrganizations(null)
            if (pupilId) {
                const result: any = await API.graphql(graphqlOperation(organizationsQuery, {id: pupilId}));
                let map = result.data.getPupil?.Organizations.items.map((item: any) => item.organization);
                setOrganizations(map);
            } else if (user instanceof Teacher) {
                const result: any = await API.graphql(graphqlOperation(teacherOrganizationsQuery, {id: user.email}));
                setOrganizations(result.data.getTeacher?.Organizations.items.map((item: any) => item.organization))
            }

        }
        getOrganizations()
        return () => {

        };
    }, [pupilId]);
    const OrganizationsGrid = () => {
        if (!organizations) {
            return (
                <>
                    {[0, 1, 2, 3, 4].map(index =>
                        <Grid item height={300} width={250} xs={12} sm={6} md={4} lg={3} key={index}>
                            <CardSkeleton/>
                        </Grid>
                    )}
                </>
            )
        }
        if (organizations.length == 0) {
            return <Container>
                <Typography variant={'h3'} textAlign={'center'}>No clubs added yet</Typography>
            </Container>
        }
        return (
            <>

                {organizations.filter(value => filter ? value.name === filter : true).map(organization =>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Link component={RouterLink} to={`/dashboard/organization/${organization.id}`} replace underline={'none'}>
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
            <Typography variant={'h3'}>Your organizations</Typography>
            <Box height={20}></Box>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={organizations?.map(value => value.name) ?? []}
                sx={{mb: 2, maxWidth: 300}}
                value={filter}
                // @ts-ignore
                onChange={(event: any, newValue: string | null) => {
                    setFilter(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Search..."/>}
            />
            <OrganizationsSearch/>
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
