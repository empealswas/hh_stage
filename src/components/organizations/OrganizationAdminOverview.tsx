import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from "@mui/material";
import OrganizationPupilsList from "../parent/OrganizationPupilsList";
import {Can} from "../../utils/Ability";
import {useNavigate, useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {getOrganization} from "../../graphql/queries";
import {Organization} from '../../API';
import SectionOverview from "../Sections/SectionOverview";

const OrganizationAdminOverview = () => {


    const navigate = useNavigate();
    return (
        <Container>
            <SectionOverview/>
        </Container>
    );
};

export default OrganizationAdminOverview;
