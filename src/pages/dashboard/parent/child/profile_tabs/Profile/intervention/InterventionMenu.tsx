import React, {useContext, useState} from 'react';
import {Icon} from "@iconify/react";
import {Box, Card, IconButton, Menu, Stack, TextField, Typography} from "@mui/material";
import {LoadingButton, Rating} from "@mui/lab";
import {API, graphqlOperation} from "aws-amplify";
import useAuth from "../../../../../../../hooks/useAuth";
import {Intervention, UpdateUserInterventionInput, UserIntervention} from "../../../../../../../API";
import {createParentInterventionFeedback, updateUserIntervention} from "../../../../../../../graphql/mutations";
import Iconify from "../../../../../../../components/Iconify";

const InterventionMenu = (props: { intervention: UserIntervention }) => {
    const {intervention} = {...props}
    const [open, setOpen] = useState(null);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(2);
    const {user} = useAuth()
    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };
    const sendFeedback = async () => {
        setLoading(true);
        console.log(intervention)
        const input: UpdateUserInterventionInput = {
            id: intervention.id,
            rating: rating,
            feedbackMessageFromUser: comment,
        }
        const result: any = await API.graphql(graphqlOperation(updateUserIntervention, {input}));
        console.log(result);

        setFeedbackSent(true);
        setLoading(false);
    }
    return (
        <>
            <IconButton
                color="inherit"
                disableRipple
                onClick={handleOpen}
            >
                <Iconify icon={'fluent:person-feedback-24-regular'} color={'action'}/>
            </IconButton>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                {( feedbackSent) ?
                    <Stack alignItems={'center'} sx={{margin: 2}} spacing={2} direction={'column'}>
                        <Iconify fontSize={'30px'} icon={'mdi:check-bold'} color={'green'}/>
                        <Typography>Thanks for the feedback!</Typography>
                    </Stack>
                    :
                    <Stack sx={{margin: 2}} spacing={2} direction={'column'}>
                        <Typography>Please rate this intervention</Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setRating(newValue);
                                }
                            }}
                        />
                        <TextField label={'Comment'} value={comment} onChange={event => setComment(event.target.value)}
                                   multiline={true}>
                        </TextField>
                        <LoadingButton loading={loading} onClick={sendFeedback}
                                       variant={'outlined'}>Submit</LoadingButton>
                    </Stack>

                }

            </Menu>
        </>
    );
};

export default InterventionMenu;
