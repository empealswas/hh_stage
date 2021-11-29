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
// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalDailyMiles = ({ isLoading }) => {

  const theme = useTheme();
  const [lessonIdsState, setLessonIdsState] = useState([]);
  const [pupilIdsState, setPupilIdsState] = useState([]);
  const [pupilsIdsList, setPupilsIdsList] = useState([]);
  const [getDailyMileAttendanceQuery, setGetDailyMileAttendanceQuery] = useState();
  const [getPupilIdsQuery, setGetPupilIdsQuery] = useState();
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
    // create a string from the date format = "yyyy-mm-dd"
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
  }

  function createSparkLineTrace(data) {
    // counts the number of Daily miles recorded
    // each day in the selected date range
    // loop through the date range, then loop through each day
    let sparklineData = [];
    if (dateRangeState?.length > 0) {
      dateRangeState.forEach(day => {
        let mileCount = 0;
        data.forEach(item => {
          if (splitDate(item.createdAt) === day) {
            mileCount++;
          }
        })
        sparklineData.push(mileCount);
      })
    }
    return sparklineData;
  }


  useEffect(() => {
    // detect change in Week/ month & create an array of dates as appropriate
    // for week- date for prev 7 days
    // for month - dates from start of current month
    const getdates = async () => {
      let endDate = new Date();
      let startDate = new Date();
      let dateRange = [];

      if (timeValue) {
        startDate.setDate(1); // if month
      } else {
        startDate.setDate(startDate.getDate() - 6); // if week
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
    const createTrace = async () => {
      setSparkLineDataState(createSparkLineTrace(filteredDataState));
    }
    createTrace();
  }, [filteredDataState]);

  useEffect(() => {

    const getDailyMleLessonIds = async () => {
      let getLessons = `query MyQuery {
        listLessons(filter: {sectionID: {eq: "36a01b32-923e-4ba6-bd51-3bdcc538944e"}}) {
          items {id title}
        }}`;
      const lessonIds = [];
      let lessonIdsString = '[';
      const results = await API.graphql(graphqlOperation(getLessons));
      let data = results.data.listLessons.items;
      if (results.data?.listLessons) {
        data.forEach((item: any) => {
          lessonIdsString = lessonIdsString + '{lessonID: {eq: "' + item.id + '"}},';
        });
        lessonIdsString = lessonIdsString.slice(0, -1) + ']';
        setLessonIdsState(lessonIdsString);
      }
    }
    getDailyMleLessonIds();
  }, []);

  useEffect(() => {
    // functio to populate the LessonIdState and pupilIdState with the required 
    // pupil and lesson ids
      let getPupils = `query MyQuery {
        getTeacher(id: "lindsay-a5@email.ulster.ac.uk") {
          classrooms {
            items { classroom {
              pupils { items {
                pupil {id firstName lastName
        }}}}}}}}`


    const setLessonAndUserIds = async () => {
      setGetPupilIdsQuery(getPupils);
      // const pupilIds = '[{pupilID: {eq: "a0c357a3-b4e2-475b-9796-dff2b7e97dd2"}}, {pupilID: {eq: "65c95845-39e5-4d56-887f-23bc1cfe7c0e"}}, {pupilID: {eq: "49393312-d2a5-4a05-9cda-9f7006c64dc7"}}, {pupilID: {eq: "decb3739-9468-4fbd-a578-5379fe39536c"}}, {pupilID: {eq: "637fc42e-435f-4575-9631-725ccfe7b332"}}]';
      // // const lessonIds = '[{lessonID: {eq: "dd89fb19-4cde-445a-8c4c-fe5d294a53f0"}}, {lessonID: {eq: "99063afd-9d58-4a9e-88f9-0510a3c6ab38"}}, {lessonID: {eq: "21d0946d-c5bb-4ad1-b50a-a93f6efe6d5b"}}, {lessonID: {eq: "dbd59a2e-507a-478a-9f88-7fc26d79233c"}}]';
      // // setLessonIdsState(lessonIds);
      // setPupilIdsState(pupilIds);
    }
    setLessonAndUserIds();
  }, []);

  useEffect(() => {
    // create a correctly formatted list of pupil ids for the database query
    const getPupilIds= async() => {
      const pupilIds = [];
      let pupilIdsString = '[';
      if(getPupilIdsQuery){
        const results = await API.graphql(graphqlOperation(getPupilIdsQuery));
        results.data.getTeacher.classrooms.items[0].classroom.pupils.items.forEach((item: any) => {
          pupilIdsString = pupilIdsString + '{pupilID: {eq: "' + item.pupil.id + '"}},';
        });
        pupilIdsString = pupilIdsString.slice(0, -1) + ']';
      }
      setPupilsIdsList(pupilIdsString);
    }
    getPupilIds();
  }, [getPupilIdsQuery]);


  
  useEffect(() => {
    // take the input set of lesson and pupils ids and populate the query
    // then update the state for that query
    const pupilLessonAttendanceQuery = async () => {
      if (lessonIdsState.length > 0 && pupilsIdsList.length > 0) {
        let newQuery = `query MyQuery {
        listAttendances(filter:{ or: ${lessonIdsState} and: {  or: ${pupilsIdsList}}}, 
        limit:1000000) {
        items {
          id createdAt lessonID pupilID
          Pupil {firstName id lastName }
          Lesson { title }
        }}}`;
        setGetDailyMileAttendanceQuery(newQuery);
      }
    }
    pupilLessonAttendanceQuery();
  }, [lessonIdsState, pupilsIdsList]);


  function splitDate(dateTime) {
    const date = dateTime.split("T");
    return date[0];
  }

  useEffect(() => {
    // execute query to get daily mile data for the 
    // releveant lesson and user ids
    const createRunQuery = async () => {
      const users = [];

      if (getDailyMileAttendanceQuery) {
        const result2 = await API.graphql(graphqlOperation(getDailyMileAttendanceQuery));
        let data = result2.data?.listAttendances.items;
        data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

        // for(let i=0; i<data.length; i++) {
        //   data[i].createdAt = splitDate(data[i].createdAt);
        // }

        // now fiter by date
        if (dateRangeState) {
          let filteredData = data.filter(
            x => dateRangeState.includes(splitDate(x.createdAt))
          );
          setFilteredDataState(filteredData);

          filteredData.forEach((item: any) => {
            users.push({ 'id': item.pupilID });
          });
          // to compute the total daily miles - need to get the lesson id then each pupil that attended that lesson
          if (dailyMileTotAveswitchState === 'total') {
            setDailyMileCount(filteredData.length);
          } else {
            const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];
            setDailyMileCount(parseFloat((filteredData.length / uniqueIds.length).toPrecision(2)));
          }
        }
      }
    }
    createRunQuery();
  }, [getDailyMileAttendanceQuery, dailyMileTotAveswitchState, dateRangeState]);


  // useEffect(() => {
  //   // get data to populate KPI box
  //   const getCount = async () => {
  //     const users = [];
  //     const result = await API.graphql(graphqlOperation(query));

  //     if (dateRangeState) {
  // let filteredData = result.data.listPELessonRecords.items.filter(
  //   x => dateRangeState.includes(x.date)
  // );

  // setFilteredDataState(filteredData);

  // filteredData.forEach((item: any) => {
  //   users.push({ 'id': item.id });
  // });
  // // to compute the total daily miles - need to get the lesson id then each pupil that attended that lesson
  // if (dailyMileTotAveswitchState === 'total') {
  //   setDailyMileCount(filteredData.length);
  // } else {
  //   const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];

  //   setDailyMileCount(parseFloat((filteredData.length / uniqueIds.length).toPrecision(2)));
  // }

  //     }
  //   }
  //   getCount()

  // }, [dailyMileTotAveswitchState, dateRangeState])

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

                        {sparkLineDataState ? <DailyMileChart trace={sparkLineDataState} /> :
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
