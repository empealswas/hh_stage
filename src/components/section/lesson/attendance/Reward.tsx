import * as React from "react";
import {Icon} from "@iconify/react";
import Iconify from "../../../Iconify";
import {Checkbox} from "@mui/material";
import {GridCellParams, GridRenderEditCellParams} from "@mui/x-data-grid";

export function renderReward(params: GridCellParams) {
    const value = Boolean(params.value);
    console.log('val', value);
    return (
        <Checkbox value={value} color={'warning'}
                  readOnly={true}
                  checked={value}
                  icon={<Iconify sx={{fontSize: 30}} icon={'mdi:trophy-outline'}/>}
                  checkedIcon={<Iconify sx={{fontSize: 30}} icon={'mdi:trophy'}/>}/>
    )
}


function RewardEditCell(props: GridRenderEditCellParams) {
    const {id, value, api, field} = props;
    const valueOf = Boolean(value);
    const handleChange = (event: any) => {
        console.log('event', event.target)
        api.setEditCellValue({id, field, value: Boolean(event.target.checked)}, event);
        // Check if the event is not from the keyboard
        // https://github.com/facebook/react/issues/7407
        if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
            api.commitCellChange({id, field});
            api.setCellMode(id, field, 'view');
        }
    };

    const handleRef = (element: any) => {
        if (element) {
            element.querySelector(`input[value="${value}"]`).focus();
        }
    };

    return (

        <Checkbox value={valueOf} color={'warning'}
            // ref={handleRef}
                  onChange={handleChange}
            // onSubmit={handleChange}
                  checked={valueOf}
                  icon={<Iconify sx={{fontSize: 30}} icon={'mdi:trophy-outline'}/> }
                  checkedIcon={<Iconify sx={{fontSize: 30}} icon={'mdi:trophy'}/>}/>
    );
}

export function renderRatingEditInputCell(params: GridRenderEditCellParams) {
    return <RewardEditCell {...params} />;
}