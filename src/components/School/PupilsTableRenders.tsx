import {GridCellParams} from "@material-ui/data-grid";
import {Box, Checkbox} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import * as React from "react";
import {Icon} from "@iconify/react";
import trophyOutline from "@iconify/icons-mdi/trophy-outline";
import trophyIcon from '@iconify/icons-mdi/trophy';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {InputLabel, MenuItem} from "@mui/material";
import {SchoolHouse} from "../../API";

export function RenderHouseCell(params: GridCellParams, houses: SchoolHouse[]) {
    console.log(params.value)
    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">House</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={params.value ?? ''}
                    label="Age"
                >
                    {houses.map(house =>
                        <MenuItem key={house.id} value={house.id}>{house.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}


function EditCell(params: {
    props: GridCellParams,
    houses: SchoolHouse[]
}) {
    const {id, value, api, field} = {...params.props};
    const handleChange = (event: any) => {
        console.log('event', event.target)
        api.setEditCellValue({id, field, value: event.target.value}, event);
        // Check if the event is not from the keyboard
        // https://github.com/facebook/react/issues/7407
            api.commitCellChange({id, field});
            api.setCellMode(id, field, 'view');
    };

    const handleRef = (element: any) => {
        if (element) {
            element.querySelector(`input[value="${value}"]`).focus();
        }
    };
    console.log(value)
    return (

        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">House</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value ?? ''}
                    label="Age"
                    onChange={handleChange}
                >
                    {params.houses.map(house =>
                        <MenuItem key={house.id} value={house.id}>{house.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

export function renderHouseEdit(params: GridCellParams, houses: SchoolHouse[]) {
    return (
        <EditCell props={params} houses={houses}/>
    );
}