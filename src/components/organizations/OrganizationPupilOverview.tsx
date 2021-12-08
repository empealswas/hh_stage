import React, {useEffect, useState} from 'react';
import {Container, Typography} from "@mui/material";
import OrganizationPupilsList from "../parent/OrganizationPupilsList";
import {Can} from "../../utils/Ability";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {getOrganization} from "../../graphql/queries";
import { Organization } from '../../API';

const OrganizationPupilOverview = () => {

    const {id} = useParams();
    const [organization, setOrganization] = useState<Organization | null>(null);
    useEffect(() => {
        const getOrganizationAsync = async () =>{
            const result: any = await API.graphql(graphqlOperation(getOrganization, {id: id}));
            setOrganization(result.data.getOrganization);
        }
        getOrganizationAsync()
        return () => {

        };
    }, []);

    return (
        <Container>
            {organization &&
            <Typography variant={'h1'} textAlign={'center'}>{organization.name}</Typography>
            }
        </Container>
    );
};

export default OrganizationPupilOverview;
