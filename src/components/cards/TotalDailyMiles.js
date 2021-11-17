import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

// material-ui
import {useTheme, styled} from '@mui/material/styles';
import {Avatar, Box, Button, Grid, Stack, Typography} from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports

import ChartDataMonth from './total-order-month-line-chart';
import ChartDataYear from './total-order-year-line-chart';


// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SkeletonEarningCard from "./SkeletonEarningCard";
import MainCard from "./MainCard";
import {API, graphqlOperation} from "aws-amplify";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TotalAverageSwitch from '../_garmin-selectors/total-average-switch';


const CardWrapper = styled(MainCard)(({theme}) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
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
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
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
  listPELessonRecords(filter: {activity: {eq: "Daily Mile"}}) {
    items {
      activity
      id
    }
  }
}`
// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalDailyMiles = ({isLoading}) => {
    const theme = useTheme();

    const [timeValue, setTimeValue] = useState(false);
    const [dailyMileTotAveswitchState, setDailyMileTotAveSwitchState] = useState("total");
    const [dailyMileCount, setDailyMileCount] = useState(null);

    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    useEffect(() => {
        console.warn(dailyMileTotAveswitchState);
        const getCount = async () => {
            const users = [];
            const result = await API.graphql(graphqlOperation(query));


            result.data.listPELessonRecords.items.forEach((item:any) => {
                users.push({'id': item.id});
            })
            if (dailyMileTotAveswitchState === 'total') {
                setDailyMileCount(result.data.listPELessonRecords.items.length);
            } else {
                const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];
                setDailyMileCount(parseFloat((result.data.listPELessonRecords.items.length / uniqueIds.length).toPrecision(2)));
                // setDuration(parseFloat((duration).toPrecision(2)));
                console.log(uniqueIds);
            }
        }
        getCount()

    }, [dailyMileTotAveswitchState])

    return (
        <>
            {!dailyMileCount ? (
                <SkeletonEarningCard/>
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{p: 2.25}}>
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
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <DirectionsRunIcon/>
                                        </Avatar>
                                    </Grid>
                                    {/* added by TL */}
                                    {/* <Grid item>
                                        <TotalAverageSwitch />
                                    </Grid> */}

                                    <Grid item>
                                        <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
                                            <TotalAverageSwitch totAveChanger={setDailyMileTotAveSwitchState}
                                                                switchVal={dailyMileTotAveswitchState}/>
                                            <>
                                                <Button
                                                    disableElevation
                                                    variant={timeValue ? 'contained' : 'text'}
                                                    size="small"
                                                    sx={{color: 'inherit'}}
                                                    onClick={(e) => handleChangeTime(e, true)}
                                                >
                                                    Month
                                                </Button>
                                                <Button
                                                    disableElevation
                                                    variant={!timeValue ? 'contained' : 'text'}
                                                    size="small"
                                                    sx={{color: 'inherit'}}
                                                    onClick={(e) => handleChangeTime(e, false)}
                                                >
                                                    Year
                                                </Button>
                                            </>
                                        </Stack>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{mb: 0.75}}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                {timeValue ? (
                                                    <Typography sx={{
                                                        fontSize: '2.125rem',
                                                        fontWeight: 500,
                                                        mr: 1,
                                                        mt: 1.75,
                                                        mb: 0.75
                                                    }}>
                                                        {dailyMileCount}
                                                    </Typography>
                                                ) : (
                                                    <Typography sx={{
                                                        fontSize: '2.125rem',
                                                        fontWeight: 500,
                                                        mr: 1,
                                                        mt: 1.75,
                                                        mb: 0.75
                                                    }}>
                                                        {dailyMileCount}
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        ...theme.typography.subtitle2,
                                                        cursor: 'pointer',
                                                        backgroundColor: theme.palette.primary[200],
                                                        color: theme.palette.primary.dark
                                                    }}
                                                >
                                                    <ArrowDownwardIcon fontSize="inherit"
                                                                       sx={{transform: 'rotate3d(1, 1, 1, 45deg)'}}/>
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: theme.palette.primary[200]
                                                    }}
                                                >
                                                    Total Miles
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>

                                        <>
                                            <Grid item xs={12}>
                                                {timeValue ? <Chart {...ChartDataMonth} /> :
                                                    <Chart {...ChartDataYear} />}
                                            </Grid>

                                        </>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalDailyMiles.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalDailyMiles;
