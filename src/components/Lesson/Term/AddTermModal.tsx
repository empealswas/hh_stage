import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button, Card, Paper, Stack, TextField} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {createCurriculum, createSubject, createSubjectTerm, createTerm} from "../../../graphql/mutations";
import ProgressButton from "../../Buttons/ProgressButton";
import {Link as RouterLink, useParams} from "react-router-dom";
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
import AddingDialog from "../../../utils/AddingDialog";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddTermModal() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);



    async function addTerm() {
        const input = {
            nam: name,
            startDate: startDate,
            finishDate: endDate
        }
            const result: any = await API.graphql(graphqlOperation(createTerm, {input}));
            await API.graphql(graphqlOperation(createSubjectTerm, {
                input: {
                    termID: result.data.createTerm.id,
                    subjectID: id
                }
            }))

    }

    return (
        <AddingDialog title={'Adding new lesson plan'} buttonName={'Add Lesson Plan'} onSubmit={addTerm}>

            <TextField value={name} onChange={(event) => {
                setName(event.target.value)
            }} label={'Name of Lesson Plan'}/>
            <TextField
                id="startDate"
                label="Choose Start Date"
                type="date"
                onChange={event => {
                    setStartDate(event.target.value);
                }}
                value={startDate}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="endDate"
                label="Choose End Date"
                type="date"
                onChange={event => {
                    setEndDate(event.target.value);
                }}
                value={endDate}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </AddingDialog>

    );
}
