import React, {useState} from 'react';
import {Button, Card, DialogActions, DialogContent, TextField} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {createCurriculumSubject, createSubject} from "../../../graphql/mutations";
import ProgressButton from "../../Buttons/ProgressButton";
import Icon from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import {TransitionProps} from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import {useParams} from "react-router-dom";
import AddingDialog from "../../../utils/AddingDialog";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddSubjectModal() {
    const [name, setName] = useState('');
    const {id} = useParams()


    async function addSubject() {
        const result: any = await API.graphql(graphqlOperation(createSubject, {
            input: {
                name: name
            }
        }));
        const output: any = await API.graphql(graphqlOperation(createCurriculumSubject, {
            input: {
                curriculumID: id,
                subjectID: result.data.createSubject.id
            }
        }))
    }


    return (
        <AddingDialog title={'Adding new Subject'} buttonName={'Add Subject'} onSubmit={addSubject}>
            <TextField value={name} onChange={(event) => {
                setName(event.target.value)
            }} label={'Name of Subject'}/>
        </AddingDialog>
    );
}
