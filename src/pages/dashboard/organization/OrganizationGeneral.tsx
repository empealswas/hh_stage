import React, {useEffect, useState} from 'react';
import OrganizationNewForm from "../user/OrganizationNewForm";
import {Organization} from "../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {getOrganization} from "../../../graphql/queries";
import {useParams} from "react-router-dom";
import ActivtityChartSkeleton from "../../../components/skeleton/ActivtityChartSkeleton";

const OrganizationGeneral = () => {
    const [organization, setOrganization] = useState<Organization | null>(null);
    const {organizationId} = useParams();
    useEffect(() => {
        const getOrganizationAsync = async () => {
            const result: any = await API.graphql(graphqlOperation(getOrganization, {id: organizationId}));
            setOrganization(result.data.getOrganization);
        };
        getOrganizationAsync();
        return () => {

        };
    }, []);

    return (
        <div>
            {organization ?
                <OrganizationNewForm isEdit={true} currentOrganization={organization} setOrganization={setOrganization}/>
                :
                <ActivtityChartSkeleton/>
            }
        </div>
    );
};

export default OrganizationGeneral;
