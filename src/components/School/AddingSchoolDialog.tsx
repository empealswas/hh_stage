import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SchoolAddingForm from "./SchoolAddingForm";
import {Link as RouterLink} from "react-router-dom";
import Icon from "@iconify/react";
import plusFill from '@iconify/icons-eva/plus-fill';
import {Card} from "@material-ui/core";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddingSchoolDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<Icon icon={plusFill}/>} onClick={handleClickOpen}>
                New School
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
                <Card>
                    <SchoolAddingForm/>
                </Card>
            </Dialog>
        </>
    );
}
