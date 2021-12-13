import React, {useContext, useState} from 'react';
import {Button, Menu, MenuItem, Typography} from "@material-ui/core";
import {Icon} from "@iconify/react";
import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";
import {Box, Card, IconButton, Stack, TextField} from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';
import {LoadingButton, Rating} from "@mui/lab";
import {Intervention} from "../../../API";
import CheckIcon from '@mui/icons-material/Check';
import {API, graphqlOperation} from "aws-amplify";
import {createParentInterventionFeedback} from "../../../graphql/mutations";
import {UserContext} from "../../../App";

const InterventionMenu = (props: { intervention: Intervention }) => {
    const {intervention} = {...props}
    const [open, setOpen] = useState(null);
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(2);
    const parent = useContext(UserContext);
    const handleOpen = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };
    const sendFeedback = async () => {
        setLoading(true);
        console.log(intervention)
        await API.graphql(graphqlOperation(createParentInterventionFeedback, {
            input: {
                interventionID: intervention.id,
                parentID: parent?.email,
                comment: comment,
                rating: rating
            }
        }))
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
                <FeedbackIcon color={'action'}/>
            </IconButton>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                {(!!intervention.InterventionFeedback?.items[0] || feedbackSent) ?
                    <Stack alignItems={'center'} sx={{margin: 2}} spacing={2} direction={'column'}>
                        <CheckIcon fontSize={'large'} color={'success'}/>
                        <Typography>Thanks for the feedback</Typography>
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
