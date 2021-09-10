import React, {useState} from 'react';
import AddingDialog from "../../../utils/AddingDialog";
import {TextField} from "@material-ui/core";
import {API, graphqlOperation} from "aws-amplify";
import {createCurriculum} from "../../../graphql/mutations";

const CurriculumModal = () => {
    const [name, setName] = useState('');

    async function addCurriculum() {
        const input = {
            name: name
        }
         await API.graphql(graphqlOperation(createCurriculum, {input}));
    }

    return (
        <AddingDialog onSubmit={addCurriculum} title={'Adding Year Group'} buttonName={'Add Year Group'}>
            <TextField value={name} onChange={(event) => {
                setName(event.target.value)
            }} label={'Name of Year Group'}/>
        </AddingDialog>
    );
};

export default CurriculumModal;
