import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

// material-ui
import {styled, useTheme} from '@mui/material/styles';
import {Avatar, Box, Grid, Stack, Typography} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


// project imports
// assets
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MainCard from "./MainCard";
import SkeletonEarningCard from "./SkeletonEarningCard";
import {API, graphqlOperation} from "aws-amplify";
import {Menu} from "@material-ui/core";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TotalAverageSwitch from '../_garmin-selectors/total-average-switch';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));
const query = `query MyQuery {
  listPELessonRecords {
    items {
      activity
      duration
    }
  }
}`
// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TimeCompletedCard = ({ isLoading }) => {
    const theme = useTheme();
    const [timeCompletedTotAveswitchState, setTimeCompletedTotAveSwitchState] = useState("total");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [duration, setDuration] = useState(null);
    useEffect(()=>{
        console.info(timeCompletedTotAveswitchState)
        const getCount = async () =>{
            const result = await API.graphql(graphqlOperation(query));
            let duration = 0;
            result.data.listPELessonRecords.items.forEach((item: any) => {
                if (item.duration) {
                duration += item.duration
                }
            })
            setDuration(duration);

        }
        getCount()

    },[timeCompletedTotAveswitchState])

    return (
        <>
            {!duration ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.body2,
                                                ...theme.typography.body1,
                                                backgroundColor: theme.palette.secondary.dark,
                                                mt: 1
                                            }}
                                        >
                                            <TimelapseIcon/>
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.body2,
                                                ...theme.typography.body1,
                                                backgroundColor: theme.palette.primary.dark,
                                                color: theme.palette.secondary[200],
                                                zIndex: 1
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>
                                        {/*<Menu*/}
                                        {/*    id="menu-earning-card"*/}
                                        {/*    anchorEl={anchorEl}*/}
                                        {/*    keepMounted*/}
                                        {/*    open={Boolean(anchorEl)}*/}
                                        {/*    onClose={handleClose}*/}
                                        {/*    variant="selectedMenu"*/}
                                        {/*    anchorOrigin={{*/}
                                        {/*        vertical: 'bottom',*/}
                                        {/*        horizontal: 'right'*/}
                                        {/*    }}*/}
                                        {/*    transformOrigin={{*/}
                                        {/*        vertical: 'top',*/}
                                        {/*        horizontal: 'right'*/}
                                        {/*    }}*/}
                                        {/*>*/}
                                        {/*    <MenuItem onClick={handleClose}>*/}
                                        {/*        <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card*/}
                                        {/*    </MenuItem>*/}
                                        {/*    <MenuItem onClick={handleClose}>*/}
                                        {/*        <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data*/}
                                        {/*    </MenuItem>*/}
                                        {/*    <MenuItem onClick={handleClose}>*/}
                                        {/*        <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export*/}
                                        {/*    </MenuItem>*/}
                                        {/*    <MenuItem onClick={handleClose}>*/}
                                        {/*        <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File*/}
                                        {/*    </MenuItem>*/}
                                        {/*</Menu>*/}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {duration} minutes
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                ...theme.typography.smallAvatar,
                                                backgroundColor: theme.palette.secondary[200],
                                                color: theme.palette.secondary.dark
                                            }}
                                        >
                                            <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <>
                                <Stack direction={'row'}><Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 800,
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    Active time
                                </Typography>
                                </Stack>
                                {/* Added by TL */}
                                <TotalAverageSwitch totAveChanger={setTimeCompletedTotAveSwitchState} switchVal={timeCompletedTotAveswitchState}/>   
                                </>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TimeCompletedCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TimeCompletedCard;
