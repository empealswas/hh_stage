import React, {useContext, useState} from 'react';
import Fade from '@material-ui/core/Fade';
import {
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Dialog, DialogActions, DialogContent,
    FormControlLabel,
    InputLabel,
    Paper,
    Select,
    Stack
} from "@material-ui/core";
import {Attendance, Classroom, Pupil} from "../../API";
import {Connect} from "aws-amplify-react";
import {API, graphqlOperation} from "aws-amplify";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import ProgressButton from "../Buttons/ProgressButton";
import {createAttendance, updateAttendance} from "../../graphql/mutations";
import {UserContext} from "../../App";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {CardContent} from "@mui/material";
import OrganizationsLinkTable from "./OrganizationsLinkTable";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AttendanceSheetModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button variant={'outlined'} size={'medium'} color={'primary'} onClick={handleOpen}>
                Organizations
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Browse Organizations
                    </Typography>
                </Toolbar>
                <DialogContent>
                    <DialogContent>
                        <OrganizationsLinkTable/>
                    </DialogContent>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default AttendanceSheetModal;
