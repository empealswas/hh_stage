/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import Rating from '@material-ui/lab/Rating';
import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import { Box } from '@material-ui/core';


    const labels: Record<number, string> = {
        1: 'Poor',
        2: 'Good',
        3: 'Great',
        4: 'Excellent',
        5: 'Outstanding',
    };

export function renderRating(params: GridCellParams) {
    const value = Number(params.value);
    return (
        <Box sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Rating readOnly value={Number(params.value)} />
            {value !== null && (
                <Box sx={{ml: 2}}>{labels[value]}</Box>
            )}
        </Box>
    )
}


function RatingEditInputCell(props: GridCellParams) {
    const { id, value, api, field } = props;

    const handleChange = (event: any) => {
        api.setEditCellValue({ id, field, value: Number(event.target.value) }, event);
        // Check if the event is not from the keyboard
        // https://github.com/facebook/react/issues/7407
        if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
            api.commitCellChange({ id, field });
            api.setCellMode(id, field, 'view');
        }
    };

    const handleRef = (element: any) => {
        if (element) {
            element.querySelector(`input[value="${value}"]`).focus();
        }
    };

    return (
        <Box sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
        }}>
            <Rating
                ref={handleRef}
                name="rating"
                precision={1}
                value={Number(value)}
                onChange={handleChange}
            />
        </Box>

    );
}

export function renderRewardEditInputCell(params: GridCellParams) {
    return <RatingEditInputCell {...params} />;
}

