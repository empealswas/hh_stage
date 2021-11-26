import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';

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
import { API, graphqlOperation } from "aws-amplify";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TotalAverageSwitch from '../_garmin-selectors/total-average-switch';
import DailyMileChart from '../reports/charts/KpiCharts/DailyMileChart';



const CardWrapper = styled(MainCard)(({ theme }) => ({
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
  listPELessonRecords(filter: {
      activity: { eq: "Daily Mile" }
    } ) {
    items {
      activity
      id
      date
    }
  }
}`

// const pupilLessonAttendanceQuery=`query MyQuery {
//   listAttendances {
//     items {
//       createdAt
//       lessonID
//     }
//   }`
//(filter: {and: {or: [{pupilID: {eq: "637fc42e-435f-4575-9631-725ccfe7b332"}}, {pupilID: {eq: "decb3739-9468-4fbd-a578-5379fe39536c"}}, {pupilID: {eq: "49393312-d2a5-4a05-9cda-9f7006c64dc7"}}, {pupilID: {eq: "a0c357a3-b4e2-475b-9796-dff2b7e97dd2"}}, {pupilID: {eq: "65c95845-39e5-4d56-887f-23bc1cfe7c0e"}}], lessonID: {eq: "99063afd-9d58-4a9e-88f9-0510a3c6ab38"}}})

//(filter: {or: [{pupilID: {eq: "637fc42e-435f-4575-9631-725ccfe7b332"}}, {pupilID: {eq: "decb3739-9468-4fbd-a578-5379fe39536c"}}, {pupilID: {eq: "49393312-d2a5-4a05-9cda-9f7006c64dc7"}}, {pupilID: {eq: "a0c357a3-b4e2-475b-9796-dff2b7e97dd2"}}, {pupilID: {eq: "65c95845-39e5-4d56-887f-23bc1cfe7c0e"}}]})
//   listAttendances(filter: {pupilID: {eq: "a0c357a3-b4e2-475b-9796-dff2b7e97dd2"}}, limit:1000) {
const pupilLessonAttendanceQuery =`query MyQuery {
  listAttendances(filter: {and: {
    or: [{lessonID: {eq: "dd89fb19-4cde-445a-8c4c-fe5d294a53f0"}}, {lessonID: {eq: "99063afd-9d58-4a9e-88f9-0510a3c6ab38"}}], 
    or: [{pupilID: {eq: "a0c357a3-b4e2-475b-9796-dff2b7e97dd2"}}, {pupilID: {eq: "65c95845-39e5-4d56-887f-23bc1cfe7c0e"}}, {pupilID: {eq: "49393312-d2a5-4a05-9cda-9f7006c64dc7"}}, {pupilID: {eq: "decb3739-9468-4fbd-a578-5379fe39536c"}}, {pupilID: {eq: "637fc42e-435f-4575-9631-725ccfe7b332"}}]}}, 
    limit:100000) {
    items {
      id
      createdAt
      lessonID
      pupilID
      Pupil {
        firstName
        id
        lastName
      }
      Lesson {
        title
      }
    }
  }
}
`
// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalDailyMiles = ({ isLoading }) => {
  const theme = useTheme();

  const [timeValue, setTimeValue] = useState(false);
  const [dailyMileTotAveswitchState, setDailyMileTotAveSwitchState] = useState("total");
  const [dailyMileCount, setDailyMileCount] = useState(null);

  const [dateRangeState, setDateRange] = useState();
  const [filteredDataState, setFilteredDataState] = useState();
  const [sparkLineDataState, setSparkLineDataState] = useState();
  // const [cObj, setcObj] = useState([]);

  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  function convertDateToString(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
  }

  function createSparkLineTrace(data){

    let sparklineData = [];
    if(dateRangeState?.length>0){
      dateRangeState.forEach(day => {
        let mileCount =0;
        data.forEach(item => {
          if(item.date === day){
            mileCount++;
          }
        })
        sparklineData.push( mileCount);
      })
    }
    return sparklineData;
  }


  useEffect(() => {
    // detect change in Week/ month & create an array of dates as appropriate
    // for week- date for prev 7 daya
    // for month - dates from start of current month
    const getdates = async () => {
      let endDate = new Date();
      let startDate = new Date();
      let dateRange = [];

      if (timeValue) {
        // if month
        startDate.setDate(1);
      } else {
        // if week
        startDate.setDate(startDate.getDate() - 6)
      }

      while (startDate < endDate) {
        // convert startDate to string and piush to array
        let dateRec = convertDateToString(startDate);
        dateRange.push(dateRec);
        startDate.setDate(startDate.getDate() + 1);
      };
      // add current date to array then set const
      dateRange.push(convertDateToString(endDate));
      setDateRange(dateRange);
    }
    getdates();
  }, [timeValue]);

  useEffect(() => {
    //create a trace for sparkline
    const createTrace = async() => {
      setSparkLineDataState(createSparkLineTrace(filteredDataState));
    }
    createTrace();
  }, [filteredDataState]);

  useEffect(() => {

    const getMiles = async()=>{
      const result2 = await API.graphql(graphqlOperation(pupilLessonAttendanceQuery));
      console.log("!!!!!!!!!!");
      console.log(result2);
      console.log("!!!!!!!!!!");
    }
    getMiles();
  }, []);

  useEffect(() => {
    // get data to populate KPI box
    const getCount = async () => {
      const users = [];
      const result = await API.graphql(graphqlOperation(query));

      if (dateRangeState) {
        let filteredData = result.data.listPELessonRecords.items.filter(
          x => dateRangeState.includes(x.date)
        );
        
        setFilteredDataState(filteredData);

        filteredData.forEach((item: any) => {
          users.push({ 'id': item.id });
        });
// to compute the total daily miles - need to get the lesson id then each pupil that attended that lesson
        if (dailyMileTotAveswitchState === 'total') {
          setDailyMileCount(filteredData.length);
        } else {
          const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];

          setDailyMileCount(parseFloat((filteredData.length / uniqueIds.length).toPrecision(2)));
        }
        // result.data.listPELessonRecords.items.forEach((item: any) => {
        //   users.push({ 'id': item.id });
        // });

        // if (dailyMileTotAveswitchState === 'total') {
        //   setDailyMileCount(result.data.listPELessonRecords.items.length);
        // } else {
        //   const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];
        //   setDailyMileCount(parseFloat((result.data.listPELessonRecords.items.length / uniqueIds.length).toPrecision(2)));

        // }
      }
    }
    getCount()

  }, [dailyMileTotAveswitchState, dateRangeState])

  return (
    <>
      {!dailyMileCount ? (
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
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <DirectionsRunIcon />
                    </Avatar>
                  </Grid>

                  <Grid item>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
                      <TotalAverageSwitch totAveChanger={setDailyMileTotAveSwitchState}
                        switchVal={dailyMileTotAveswitchState} />
                      <>
                        <Button
                          disableElevation
                          variant={timeValue ? 'contained' : 'text'}
                          size="small"
                          sx={{ color: 'inherit' }}
                          onClick={(e) => handleChangeTime(e, true)}
                        >
                          Month
                        </Button>
                        <Button
                          disableElevation
                          variant={!timeValue ? 'contained' : 'text'}
                          size="small"
                          sx={{ color: 'inherit' }}
                          onClick={(e) => handleChangeTime(e, false)}
                        >
                          Week
                        </Button>
                      </>
                    </Stack>

                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
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
                            sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
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
                        
                        {sparkLineDataState ? <DailyMileChart trace={sparkLineDataState}/>:
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
