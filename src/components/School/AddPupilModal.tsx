import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button, Card, Paper, Stack, TextField} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {School} from "../../API";
import ProgressButton from "../Buttons/ProgressButton";
import {createPupil, createSubject} from "../../graphql/mutations";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddPupilModal(props: { school: School | null }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setLoading(false);
        setSuccess(false);
        setOpen(true);
        setFirstName('');
        setLastName('');
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    async function addPupil() {
        const school = props.school;
        if (!school) return;
        setLoading(true);
        const input = {
            schoolID: school.id,
            firstName: firstName,
            lastName: lastName,
        }
        const response = await API.graphql(graphqlOperation(createPupil, {input}));
        setLoading(false);
        setSuccess(true);
        handleClose()
    }


    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    return (
        <>
            <Button variant="contained"
                    startIcon={<Icon icon={plusFill}/>} onClick={handleOpen}>
                Add Pupil
            </Button>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Adding New Pupil
                    </Typography>
                </Toolbar>
                <Card style={{
                    padding: '20px',
                    margin: '30px'
                }}>
                    <Stack direction={'column'} spacing={3}>
                        <TextField value={firstName} onChange={(event) => {
                            setFirstName(event.target.value)
                        }} label={'First Name'}/>
                        <TextField value={lastName} onChange={(event) => {
                            setLastName(event.target.value)
                        }} label={'Last Name'}/>
                    </Stack>
                </Card>
                <ProgressButton success={success} loading={loading} onClick={addPupil} disabled={false}/>
            </Dialog>
        </>
    );
}
