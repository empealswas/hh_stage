import React, {useCallback, useState} from 'react';
import * as Yup from "yup";
import {Form, FormikConsumer, FormikProvider, useFormik, useFormikContext} from "formik";
import {Icon} from "@iconify/react";
import {
    AppBar, Button,
    Dialog,
    DialogActions,
    IconButton,
    List,
    ListItem,
    ListItemText, Slide,
    TextField, Toolbar, Tooltip,
    Typography
} from "@mui/material";
import {API, Auth, graphqlOperation, Storage} from "aws-amplify";
import {createFile, updateCurriculum, updateLesson} from "../../../graphql/mutations";
import {useParams} from "react-router-dom";
import awsConfig from "../../../aws-exports";
import EditDialog from "./EditDialog";
import {Lesson} from "../../../API";
import {CloseIcon} from "../../../theme/overrides/CustomIcons";
import {TransitionProps} from "@mui/material/transitions";
import LessonNewForm from "../../../pages/dashboard/user/LessonNewForm";
import Iconify from "../../Iconify";

type LessonEditFormProps = {
    lesson: Lesson
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const LessonEditForm = (props: LessonEditFormProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <Tooltip title={'Edit'}>
                <IconButton onClick={handleClickOpen}>
                    <Iconify icon={'mdi:edit'} sx={{fontSize: 30}} color={'error'} fontSize={'large'}/>
                </IconButton>
            </Tooltip>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <LessonNewForm currentLesson={props.lesson} isEdit={true}/>
            </Dialog>
        </div>
    );
};


export default LessonEditForm;
