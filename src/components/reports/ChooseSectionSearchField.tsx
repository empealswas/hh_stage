import React, {useState} from 'react';
import {Autocomplete, TextField} from "@material-ui/core";
import {Section, Term} from "../../API";
import {Connect} from "aws-amplify-react";
import {graphqlOperation} from "aws-amplify";
import {listSections, listTerms} from "../../graphql/queries";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import LinearProgressBottom from "../../utils/LinearProgressBottom";
import {Skeleton, Typography} from "@mui/material";

const ChooseSectionSearchField = (props: { setSelectedTerm: React.Dispatch<React.SetStateAction<Section | null>> }) => {

    const [terms, setTerms] = useState<Section[] | null>(null);
    const {setSelectedTerm} = {...props}

    return (
        <Connect query={graphqlOperation(`query MyQuery {
  listSections {
    items {
      name
      id
      OrganizationOwner {
        name
      }
    }
  }
}`)}>
            {(result: IConnectState) => {
                if (result.loading) {
                    return <LinearProgressBottom/>
                }
                const terms: Section[] = result.data.listSections.items
                return (
                    <LessonPlansSearchField terms={terms} setSelectedTerm={setSelectedTerm}/>
                )
            }}
        </Connect>
    );
};
export const LessonPlansSearchField = (props: { terms?: Section[] | null, setSelectedTerm: React.Dispatch<React.SetStateAction<Section | null>> }) => {
    const {terms, setSelectedTerm} = {...props};
    if (!terms) {
        return <Skeleton variant={'text'}>
            <Typography variant={'h3'}/>
        </Skeleton>
    }
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={terms.sort((a, b) => (a.OrganizationOwner?.name ?? 'Schools')
                .localeCompare(b.OrganizationOwner?.name ?? 'Schools'))}
            getOptionLabel={(option: Section) => option.name as string}
            groupBy={option => option.OrganizationOwner?.name ?? 'Schools'}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Lesson Plan"/>}
            onChange={(event, newValue) => {
                setSelectedTerm(newValue);
            }}
        />
    );
}

export default ChooseSectionSearchField;
