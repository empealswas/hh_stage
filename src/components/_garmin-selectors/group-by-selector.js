import React, { useState } from 'react'
import {Select} from "@material-ui/core";
import {FormControl, InputLabel, MenuItem} from "@mui/material";

function GroupBySelector( {groupByChanger, group}) {
    let groupByOptions = ["group", "user"];

    const handleChange = (event) => {
        groupByChanger(event.target.value);
    };
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label-1">Group By</InputLabel>
            <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select-1"
                label="Group By"
                value={group}
                onChange={handleChange}
            >
                {groupByOptions.map(result => (
                    <MenuItem value={result}>{result}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
export default GroupBySelector;