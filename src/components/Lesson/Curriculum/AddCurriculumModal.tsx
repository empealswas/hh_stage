import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button, Card, Paper, TextField} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {createCurriculum} from "../../../graphql/mutations";
import ProgressButton from "../../Buttons/ProgressButton";
import {Link as RouterLink} from "react-router-dom";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import SchoolAddingForm from "../../School/SchoolAddingForm";
import Dialog from "@material-ui/core/Dialog";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";

    const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddCurriculumModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setName('');
        setLoading(false);
        setSuccess(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [name, setName] = useState('');


    async function addCurriculum() {
        setLoading(true);
        const input = {
            name: name
        }
        try {
            await API.graphql(graphqlOperation(createCurriculum, {input}));
            setSuccess(true);
        } catch (e) {
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    return (
        <>
            <Button variant="contained"
                    startIcon={<Icon icon={plusFill}/>} onClick={handleOpen}>
                Add Curriculum
            </Button>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Adding New School
                    </Typography>
                </Toolbar>
                <Card style={{
                    padding: '20px',
                    margin: '30px'
                }}>
                    <TextField value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} label={'Name of Curriculum'}/>
                </Card>
                <ProgressButton success={success} loading={loading} onClick={addCurriculum} disabled={false}/>
            </Dialog>
        </>
    );
}
