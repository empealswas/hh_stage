import React, {useEffect, useState} from 'react';
import {LoadingButton} from "@mui/lab";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {createPupilOrganizationRequest, createUserInOrganization} from "../../../graphql/mutations";
import {Organization} from "../../../API";
import useAuth from "../../../hooks/useAuth";
import {UserInOrganizationStatus as Status} from "src/API";

type statusType = 'waitingForAccept' | 'accepted' | 'canSendRequest' | null;

const OrganizationJoinButton = (params: { organization: Organization }) => {
    const {organization} = {...params};
    const [loading, setLoading] = useState<boolean>(false);
    const {user} = useAuth();
    const [status, setStatus] = useState<statusType>(null);

    useEffect(() => {
        if (organization.members?.items?.length ?? 0 > 1) {
            setStatus('accepted');
        } else {
            setStatus('canSendRequest');
        }
        return () => {

        };
    }, []);

    const sendRequest = async () => {
        setLoading(true);
        try {
            const result: any = await API.graphql(graphqlOperation(createUserInOrganization, {
                input: {
                    organizationID: params.organization.id,
                    userID: user?.email,
                    status: Status.WAITING_FOR_ORGANIZATION_TO_APPROVE,
                }
            }));
            if (result.data.createUserInOrganization) {
                setStatus('waitingForAccept');
            } else {
                setStatus('canSendRequest');
            }

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }


    }
    if (!status) {
        return (<LoadingButton disabled={true} loading={loading} fullWidth={true} variant={'outlined'}
                               color={'primary'}>...</LoadingButton>
        )
    }
    if (status === 'accepted') {
        return (<LoadingButton disabled={true} loading={loading} fullWidth={true} variant={'outlined'}
                               color={'success'}>Accepted</LoadingButton>
        )
    }
    if (status === 'waitingForAccept') {
        return <LoadingButton disabled={true} loading={loading} fullWidth={true} variant={'outlined'}
                              color={'secondary'}>Waiting For Accept</LoadingButton>
    }
    return (
        <LoadingButton loading={loading} onClick={sendRequest} fullWidth={true} variant={'outlined'}
                       color={'primary'}>Join Club</LoadingButton>
    );
};


export default OrganizationJoinButton;
