import React, {useState} from 'react';
import {Autocomplete, TextField} from "@material-ui/core";
import {Term} from "../../API";
import {Connect} from "aws-amplify-react";
import {graphqlOperation} from "aws-amplify";
import {listTerms} from "../../graphql/queries";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import LinearProgressBottom from "../../utils/LinearProgressBottom";

const ChooseSubjectSearchField = (props: {setSelectedTerm:  React.Dispatch<React.SetStateAction<Term | null>>}) => {

    const [terms, setTerms] = useState<Term[] | null>(null);
    const {setSelectedTerm} =  {...props}

    return (
        <Connect query={graphqlOperation(listTerms)}>
            {(result: IConnectState) => {
                if (result.loading) {
                    return <LinearProgressBottom/>
                }
                const terms: Term[] = result.data.listTerms.items
                return (
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={terms}
                        getOptionLabel={(option: Term) => option.nam as string}
                        sx={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Term"/>}
                        onChange={(event, newValue) => {
                            setSelectedTerm(newValue);
                        }}
                    />
                );
            }}
        </Connect>
    );
};

export default ChooseSubjectSearchField;
