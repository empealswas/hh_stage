import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {SET_PERIOD, SET_SHOW_STEPS} from "../../../store/actions";

export default function PeriodToggleButtons() {
    const dispatch = useDispatch();
    const customization = useSelector((state: any) => state.customization);
    const [period, setPeriod] = React.useState(customization.period);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setPeriod(newAlignment);
    };
    useEffect(() => {
        dispatch({ type: SET_PERIOD, period });
    }, [dispatch, period]);
    return (
        <ToggleButtonGroup
            color="primary"
            value={period}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="daily">Day</ToggleButton>
            <ToggleButton value="weekly">Week</ToggleButton>
            <ToggleButton value="monthly">Month</ToggleButton>
        </ToggleButtonGroup>
    );
}