import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

// material-ui
import {styled, useTheme} from '@mui/material/styles';
import {Avatar, Box, Button, Grid, Typography} from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports


// assets
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {API, graphqlOperation} from "aws-amplify";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SkeletonEarningCard from "../../../cards/SkeletonEarningCard";
import MainCard from "../../../cards/MainCard";


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
    }
  }
}`
// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TabCard = ({isLoading}) => {
    const theme = useTheme();

    const [timeValue, setTimeValue] = useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };
    const [dailyMileCount, setDailyMileCount] = useState(null);
    useEffect(() => {
        const getCount = async () => {
            const result = await API.graphql(graphqlOperation(query));
            setDailyMileCount(result.data.listPELessonRecords.items.length);

        }
        getCount()

    }, [])

    return (
        <CardWrapper border={false} content={false}>
            <Box sx={{p: 2.25}}>
                <Grid container direction="column" alignItems={'center'} spacing={3}>
                    <Grid item>
                        <Typography variant={'body1'} fontWeight={800}>Period</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};

TabCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TabCard;
