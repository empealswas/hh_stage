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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddSubjectModal() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [name, setName] = useState('');
    const {id} = useParams()
    const handleOpen = () => {
        setName('');
        setLoading(false);
        setSuccess(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    async function addSubject() {
        setLoading(true);
        try {
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
            setSuccess(true);
        } catch (e) {
            console.error(e)
            setErrorOccurred(true);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <Button variant="contained"
                    startIcon={<Icon icon={plusFill}/>} onClick={handleOpen}>
                Add Subject
            </Button>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Adding New Subject
                    </Typography>
                </Toolbar>
                <DialogContent>
                    <Card style={{
                        padding: '20px',
                        margin: '30px'
                    }}>
                        <TextField value={name} onChange={(event) => {
                            setName(event.target.value)
                        }} label={'Name of Subject'}/>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <ProgressButton success={success} loading={loading} onClick={addSubject} disabled={false}
                                    error={errorOccurred}/>
                </DialogActions>
            </Dialog>
        </>
    );
}
