import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Container,
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography
} from '@mui/material';
import AnimateButton from "./AnimateButton";
import SettingsIcon from '@mui/icons-material/Settings';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import SubCard from "./SubCard";
import {FormGroup, Switch} from "@material-ui/core";
import PeriodToggleButtons from "./PeriodToggleButtons";
import {SET_SHOW_ACTIVITY, SET_SHOW_SEDENTARY, SET_SHOW_SLEEP, SET_SHOW_STEPS} from "../../../store/actions";

// project imports
// import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from 'store/actions';
// import { gridSpacing } from 'store/constant';

// concat 'px'
function valueText(value) {
    return `${value}px`;
}

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const DashboardSettings = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    console.log(customization)
    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };
    const [showSteps, setShowSteps] = useState(customization.showSteps);
    const [showSleep, setShowSleep] = useState(customization.showSleep);
    const [showSedentary, setShowSedentary] = useState(customization.showSedentary);
    const [showActivity, setShowActivity] = useState(customization.showActivity);
    useEffect(() => {
        dispatch({ type: SET_SHOW_STEPS, showSteps });
    }, [dispatch, showSteps]);
    useEffect(() => {
        dispatch({ type: SET_SHOW_SLEEP, showSleep });
    }, [dispatch, showSleep]);
    useEffect(() => {
        dispatch({ type: SET_SHOW_SEDENTARY, showSedentary });
    }, [dispatch, showSedentary]);
    useEffect(() => {
        dispatch({ type: SET_SHOW_ACTIVITY, showActivity });
    }, [dispatch, showActivity]);
    return (
        <>
            {/* toggle button */}
            <Tooltip title="Dashboard Settings">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple>
                            <SettingsIcon/>
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container alignItems={'center'} spacing={2} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            {/* font family */}
                            <SubCard title="Charts Type">
                                <FormControl>
                                    <FormGroup>
                                        <FormControlLabel control={<Switch checked={showSteps} onChange={event => {
                                            setShowSteps(event.target.checked);}} />} label="Steps" />
                                        <FormControlLabel control={<Switch checked={showSleep} onChange={event => {
                                            setShowSleep(event.target.checked);}} />} label="Sleep" />
                                        <FormControlLabel control={<Switch checked={showSedentary} onChange={event => {
                                            setShowSedentary(event.target.checked);}} />} label="Sedentary" />
                                        <FormControlLabel control={<Switch checked={showActivity} onChange={event => {
                                            setShowActivity(event.target.checked);}} />} label="Activity" />
                                    </FormGroup>
                                </FormControl>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard title="Period">
                                <PeriodToggleButtons/>
                            </SubCard>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </>
    );
};

export default DashboardSettings;
