import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

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
import { UserContext } from '../../App';
import { Teacher } from '../../models';



const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': { position: 'relative', zIndex: 5 },
  '&:after': {
    content: '""',
    position: 'absolute', width: 210, height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%', zIndex: 1, top: -85, right: -95,
    [theme.breakpoints.down('sm')]: { top: -105, right: -140 }
  },
  '&:before': {
    content: '""',
    position: 'absolute', zIndex: 1,
    width: 210, height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%', top: -125, right: -15, opacity: 0.5,
    [theme.breakpoints.down('sm')]: { top: -155, right: -70 }
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

// const TotalDailyMiles = ({ isLoading }) => {
const TotalDailyMiles = (props) => {
  const user = useContext(UserContext);
  let userRole = user.getRole();


  // console.log(user.getPupilsIds());
  // let x = user.getPupilsIds();
  // console.log(x);
  const theme = useTheme();
  const [lessonIdsState, setLessonIdsState] = useState([]);
  const [pupilsIdsList, setPupilsIdsList] = useState();
  const [getDailyMileAttendanceQuery, setGetDailyMileAttendanceQuery] = useState();
  const [timeValue, setTimeValue] = useState(false);
  const [dailyMileTotAveswitchState, setDailyMileTotAveSwitchState] = useState("total");
  const [dailyMileCount, setDailyMileCount] = useState(null);
  const [dateRangeState, setDateRange] = useState();
  const [filteredDataState, setFilteredDataState] = useState();
  const [sparkLineDataState, setSparkLineDataState] = useState();
  const [arrayfull, setArrayFull] = useState(false);


  const handleChangeTime = (event, newValue) => {
    
    setTimeValue(newValue);
  };

  useEffect(() => {
    const getBlah = async() => {
      if(user.getRole()==="Teacher") {
        console.log("getting roles vis teacher");
        let x = await user.getPupilsIds();
        console.log(x);
      }
    }
    getBlah();
  }, []);
  /////////////////////////////////////////////////
  // check when the array of user ids is ready ///
  ////////////////////////////////////////////////
  useEffect(() => {

    const isArrayFull = async () => {
      if(props.userArray){
        setArrayFull(true);
        console.log(props.userArray);
      }
    }
    isArrayFull();
  }, [props]);

  /////////////////////////////////////////////////
  // Convert string of pupilIds for db query //////
  /////////////////////////////////////////////////
  useEffect(() => {
    
    const setLessonAndUserIds = async () => {
        if(arrayfull){
          let pupilIdsString = `[`;
          props.userArray.forEach((item: any) => {
            pupilIdsString = pupilIdsString + `{pupilID: {eq: "` + item.id + `"}}, `;
          });
          pupilIdsString = pupilIdsString.slice(0, -2) + `]`;
          setPupilsIdsList(pupilIdsString);
      };
    }
      setLessonAndUserIds();
  }, [arrayfull]);



  //////////////////////////////////
  // convert date to a string //////
  //////////////////////////////////
  function convertDateToString(date) {
    // create a string from the date format = "yyyy-mm-dd"
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
  }

  //////////////////////////////////
  ///// prepare sparkline plot /////
  //////////////////////////////////
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
    console.log("sparklineData");
    console.log(sparklineData)
    return sparklineData;
  }

  //////////////////////////////////
  // detect change in week/ month //
  //////////////////////////////////
  useEffect(() => {
    // detect change in Week/ month & create an array of dates as appropriate
    // for week- date for prev 7 days
    // for month - dates from start of current month
    const getdates = async () => {
      let endDate = new Date();
      let startDate = new Date();
      let dateRange = [];

      if (timeValue) {
        startDate.setDate(startDate.getDate() - 28); // if month
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

  //////////////////////////////////
  //// create sparkline display ////
  //////////////////////////////////
  useEffect(() => {
    //create a trace for sparkline
    const createTrace = async () => {
      setSparkLineDataState(createSparkLineTrace(filteredDataState));
    }
    createTrace();
  }, [filteredDataState]);

  //////////////////////////////////
  //  get daily mile lesson ids   //
  //////////////////////////////////
  useEffect(() => {
    const getDailyMleLessonIds = async () => {
      let getLessons = `query MyQuery {
        listLessons(filter: {sectionID: {eq: "36a01b32-923e-4ba6-bd51-3bdcc538944e"}}) {
          items {id title}
        }}`;
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


  ////////////////////////////////////////////////////
  //  get daily mile data for lesson & pupil ids   //
  ///////////////////////////////////////////////////
  useEffect(() => {
    // take the input set of lesson and pupils ids and populate the query
    // then update the state for that query
    // console.log(pupilsIdsList);
    const pupilLessonAttendanceQuery = async () => {

      if (lessonIdsState.length > 0 && pupilsIdsList) {
        console.log("about to query");
        console.log(pupilsIdsList);
        let newQuery = `query MyQuery {listAttendances(filter:{ or: ${lessonIdsState} and: {  or: ${pupilsIdsList} }},limit:1000000) 
          {items {id createdAt lessonID pupilID Pupil {
            firstName id lastName 
          } Lesson { 
            title 
        }}}}`;
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

// TotalDailyMiles.propTypes = {
//   isLoading: PropTypes.bool
// };

export default TotalDailyMiles;


  // ////////////////////////////////
  // //  create user id list     ////
  // ////////////////////////////////
  // useEffect(() => {
  //   // functio to populate the LessonIdState and pupilIdState with the required 
  //   // pupil and lesson ids
  //   let getPupils;
  //   if (userRole === "Teacher") {
  //     getPupils = `query MyQuery { getTeacher(id: "${user._email}") 
  //     {classrooms {items 
  //       { classroom {pupils { items {
  //         pupil {id firstName lastName}
  //       }}}}}}}`
  //   } else if (userRole === "Principal") {
  //     getPupils = `query MyQuery {
  //       getPrincipal(id: "davydovgleb00@gmail.com") {
  //         id
  //         School {
  //           Pupils {items {id firstName lastName
  //       }}}}}`
  //   } else if (userRole === "Parent") {
  //     getPupils = `query MyQuery {
  //       getParent(id: "alindsay14@qub.ac.uk") {
  //         children {items {
  //             pupilID Pupil {firstName id lastName
  //       }}}}}`
  //   } else {
  //     getPupils = `query MyQuery {
  //       getPupil(id: "decb3739-9468-4fbd-a578-5379fe39536c") {
  //         firstName
  //         id
  //         lastName
  //       }}`
  //   }
  //   const setLessonAndUserIds = async () => {
  //     // setGetPupilIdsQuery(getPupils);
  //     // if(getPupilIdsQuery){
  //     const results = await API.graphql(graphqlOperation(getPupils));
  //     if (userRole === "Teacher") {
  //       if (results.data?.getTeacher) {
  //         let pupilIdsString = `[`;
  //         results.data.getTeacher.classrooms.items[0].classroom.pupils.items.forEach((item: any) => {
  //           pupilIdsString = pupilIdsString + `{pupilID: {eq: "` + item.pupil.id + `"}}, `;
  //         });
  //         pupilIdsString = pupilIdsString.slice(0, -2) + `]`;
  //         // }
  //         setPupilsIdsList(pupilIdsString);
  //       }
  //     } else if (userRole === "Principal") {

  //       if (results.data?.getPrincipal) {
  //         let pupilIdsString = `[`;
  //         results.data.getPrincipal.School.Pupils.items.forEach((item: any) => {
  //           pupilIdsString = pupilIdsString + `{pupilID: {eq: "` + item.id + `"}}, `;
  //         })
  //         pupilIdsString = pupilIdsString.slice(0, -2) + `]`;
  //         setPupilsIdsList(pupilIdsString);
  //       }
  //     } else if (userRole === "Parent") {
  //       if (results.data?.getParent) {
  //         let pupilIdsString = `[`;
  //         results.data.getParent.children.items.forEach((item: any) => {
  //           pupilIdsString = pupilIdsString + `{pupilID: {eq: "` + item.pupilID + `"}}, `;
  //         })
  //         pupilIdsString = pupilIdsString.slice(0, -2) + `]`;
  //         setPupilsIdsList(pupilIdsString);
  //       }
  //     } else if (userRole === "Pupil") {
  //       if (results.data?.getPupil) {
  //         let pupilIdsString = `[{pupilID: {eq: "` + results.data.getPupil.id + `"}}]`;
  //         setPupilsIdsList(pupilIdsString);
  //       }
  //     } else {
  //       console.og("ooops!");
  //     }
  //   }
  //   setLessonAndUserIds();
  // }, [lessonIdsState]);