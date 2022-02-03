import React, {useContext, useEffect, useState} from 'react';
import {useParams, Link as RouterLink, Outlet} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {Organization} from "../../../API";
import {
    Autocomplete, Box,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia, Container,
    Grid, IconButton,
    Link, Stack, TextField, ToggleButton, ToggleButtonGroup,
    Typography
} from '@mui/material';

import {Teacher} from "../../../models/Teacher";
import CardSkeleton from "../../../components/skeleton/CardSkeleton";
import useAuth from "../../../hooks/useAuth";
import _mock from "../../../_mock";
import ChatAccount from "../../../sections/@dashboard/chat/ChatAccount";
import Iconify from "../../../components/Iconify";
import {PATH_DASHBOARD} from "../../../routes/paths";
import ChatContactSearch from "../../../sections/@dashboard/chat/ChatContactSearch";
import Scrollbar from "../../../components/Scrollbar";
import ChatConversationList from "../../../sections/@dashboard/chat/ChatConversationList";
import ChatSearchResults from "../../../sections/@dashboard/chat/ChatSearchResults";
import {Contact} from "../../../@types/chat";
import axios from "../../../utils/axios";
import useSettings from "../../../hooks/useSettings";
import {listOrganizations} from "../../../graphql/queries";
import EmptyContent from "../../../components/EmptyContent";
import OrganizationCard from "../organization/OrganizationCard";

const organizationsQuery = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    ownedOrganizations {
      items {
        id
        name
        type
              logo {
        id
        key
        region
      }
      }
    }
  }
}
`
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
const allOrganizationsQuery = `query MyQuery($pupilId: ID = "") {
  listOrganizations {
    items {
          logo {
        id
        key
        region
      }
      AcceptedPupils(pupilID: {eq: $pupilId}) {
        items {
          id
        }
      }
      WaitingForAcceptPupils(pupilID: {eq: $pupilId}) {
        items {
          id
        }
      }
      type
      name
      id
    }
  }
}`
const OrganizationsGrid = () => {
    const [allOrganizations, setAllOrganizations] = useState<Organization[] | null>(null);
    const [userOrganizations, setUserOrganizations] = useState<Organization[] | null>(null);
    const [filter, setFilter] = React.useState<string | null>('');
    const {user} = useAuth();
    const settings = useSettings();
    const [organizationType, setOrganizationType] = React.useState<'Your Clubs' | 'Discover'>('Your Clubs');
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        type: 'Your Clubs' | 'Discover',
    ) => {
        if (type) {
            setOrganizationType(type);
        }
    };

    useEffect(() => {
        const getOrganizations = async () => {
            setAllOrganizations(null)
            setUserOrganizations(null);
            const result: any = await API.graphql(graphqlOperation(listOrganizations));
            setAllOrganizations(result.data.listOrganizations.items);
            const data: any = await API.graphql(graphqlOperation(organizationsQuery, {id: user?.email}));
            let map = data.data.getUser?.ownedOrganizations.items;
            setUserOrganizations(map);
        }
        getOrganizations()
        return () => {

        };
    }, [organizationType]);
    const OrganizationsGrid = () => {
        if (!userOrganizations || !allOrganizations) {
            return (
                <>
                    {[0, 1, 2, 3, 4].map(index =>
                        <Grid item height={400} width={300} xs={12} sm={6} md={4} lg={4} key={index}>
                            <CardSkeleton/>
                        </Grid>
                    )}
                </>
            )
        }
        if (organizationType === 'Your Clubs') {
            if (userOrganizations.length === 0) {
                return <EmptyContent
                    title="No organizations added yet"
                    description="Looks like you have no organizations that accepted your child. Click 'Discover' button to find an organization!"
                    img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_content.svg"
                />
            }
        }
        let organizations = organizationType === 'Your Clubs' ? userOrganizations : allOrganizations;
        return (
            <>

                {organizations.filter(value => filter ? value.name === filter : true).map((organization, index) =>
                    <Grid key={organization.id} item xs={12} sm={6} md={4} lg={4} xl={4}>

                        <OrganizationCard organization={organization} index={index}
                                          discover={organizationType === 'Discover'}/>

                    </Grid>
                )}
            </>
        );
    }


    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 2}}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={organizationType === 'Your Clubs' ? userOrganizations?.map(value => value?.name ?? '') ?? [] : allOrganizations?.map(value => value?.name ?? '') ?? []}
                    value={filter}
                    sx={{minWidth: 300}}
                    // @ts-ignore
                    onChange={(event: any, newValue: string | null) => {
                        setFilter(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Search..."/>}
                />
                <ToggleButtonGroup
                    color="primary"
                    value={organizationType}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="Your Clubs">Your Clubs</ToggleButton>
                    <ToggleButton value="Discover">Discover</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <Box height={20}/>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={3}
                  columns={settings.themeStretch ? 20 : 12}
            >

                <OrganizationsGrid/>
            </Grid>

        </Container>
    );
};

export default OrganizationsGrid;
