import React, {useState} from 'react';
import {SchoolSearchInput} from "./SchoolSearchInput";
import SchoolsTable from "./SchoolsTable";
import {Card} from "@material-ui/core";

const SchoolInteraction = () => {
    const [filterOption, setFilterOption] = useState('');
    return (
        <>
            <SchoolSearchInput setFilterOption={setFilterOption}/>
        <Card>
            <SchoolsTable filterOption={filterOption}/>
        </Card>
        </>
    );
};

export default SchoolInteraction;
