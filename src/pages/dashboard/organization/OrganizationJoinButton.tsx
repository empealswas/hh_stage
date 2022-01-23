import React, {useEffect, useState} from 'react';
import {LoadingButton} from "@mui/lab";
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {createPupilOrganizationRequest} from "../../../graphql/mutations";
import {Organization} from "../../../API";

type statusType = 'waitingForAccept' | 'accepted' | 'canSendRequest' | null;

const OrganizationJoinButton = (params: { organization: Organization }) => {
    const {organization} = {...params};
    const [loading, setLoading] = useState<boolean>(false);
    const {pupilId} = useParams();
    const [status, setStatus] = useState<statusType>(null);

    useEffect(() => {
        if (organization.WaitingForAcceptPupils?.items?.length ?? 0 > 1) {
            setStatus('waitingForAccept');
        } else if (organization.AcceptedPupils?.items?.length ?? 0 > 1) {
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
            const result: any = await API.graphql(graphqlOperation(createPupilOrganizationRequest, {
                input: {
                    organizationID: params.organization.id,
                    pupilID: pupilId,
                }
            }));
            if (result.data.createPupilOrganizationRequest) {
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
