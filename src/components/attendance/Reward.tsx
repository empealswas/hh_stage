import {GridCellParams} from "@material-ui/data-grid";
import {Box, Checkbox} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import * as React from "react";
import {Icon} from "@iconify/react";
import trophyOutline from "@iconify/icons-mdi/trophy-outline";
import trophyIcon from '@iconify/icons-mdi/trophy';

export function renderReward(params: GridCellParams) {
    const value = Boolean(params.value);
    console.log('val', value);
    return (
        <Checkbox value={value} color={'warning'}
                  readOnly={true}
                  checked={value}
                  icon={<Icon icon={trophyOutline} height={30} width={30}/>}
                  checkedIcon={<Icon icon={trophyIcon} height={30} width={30}/>}/>
    )
}


function RewardEditCell(props: GridCellParams) {
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
                  icon={<Icon icon={trophyOutline} height={30} width={30}/>}
                  checkedIcon={<Icon icon={trophyIcon} height={30} width={30}/>}/>
    );
}

export function renderRatingEditInputCell(params: GridCellParams) {
    return <RewardEditCell {...params} />;
}