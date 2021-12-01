import React from 'react';
import {Container} from "@mui/material";
import OrganizationPupilsList from "../parent/OrganizationPupilsList";
import {Can} from "../../utils/Ability";

const OrganizationOverview = () => {
    return (
        <Container>
            <Can I={'manage'} this={'pupilList'}>
                <OrganizationPupilsList/>
            </Can>
        </Container>
    );
};

export default OrganizationOverview;
