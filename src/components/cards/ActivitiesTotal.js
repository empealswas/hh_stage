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

import TimelapseIcon from '@mui/icons-material/Timelapse';
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
const ActivitiesTotal = () => {

  const user = useContext(UserContext);
  let userRole = user.getRole();
  const theme = useTheme();

  const [totalActivity, setTotalActivity] = useState(null);
  const [pupilsIdsList2, setPupilsIdsList2] = useState();

  const [totalAttendanceData, setTotalAttendanceData] = useState();
  const [attendedLessonData2, setAttendedLessonData2] = useState();
  const [totalByDate, setTotalByDate] = useState();

  const [dateRangeState3, setDateRange3] = useState();
  const [totalSparkLineDataState, setTotalSparkLineDataState] = useState();
  // const [arrayfull2, setArrayFull2] = useState(false);

  ////////////////////////
  const [timeValue, setTimeValue] = useState(false);
  const [activeTotalsTotAveswitchState, setActiveTotalsTotAveSwitchState] = useState("total");

    ///////////////////////////////////////////////////////
    const [pupilIdArray, setPupilIdArray] = useState();
    ///////////////////////////////////////////////////////
  //////////////////////////
  const handleChangeTime = (event, newValue) => {
      setTimeValue(newValue);
  };

/////////////////////////////////////////////////
// check when the array of user ids is ready ///
////////////////////////////////////////////////
useEffect(() => {
  const getPupilIds = async() => {
      let x = await user.getPupilsIds();
      console.log(x);
      setPupilIdArray(x);
  }
  getPupilIds();
}, [user]);

  // //////////////////////////////////////////
  // // ensure arry of users ids is present //
  // /////////////////////////////////////////
  // useEffect(() => {
  // 	const isArrayFull = async () => {
  // 		if (props.userArray) {
  // 			setArrayFull2(true);
  // 		}
  // 	}
  // 	isArrayFull();
  // }, [props]);


  /////////////////////////////////////////////////
  // Convert string of pupilIds for db query //////
  /////////////////////////////////////////////////
  useEffect(() => {
      const setLessonAndUserIds = async () => {
          if (pupilIdArray) {
              let pupilIdsString = `[`;
              pupilIdArray.forEach((item) => {
                  pupilIdsString = pupilIdsString + `{pupilID: {eq: "` + item.id + `"}}, `;
              });
              pupilIdsString = pupilIdsString.slice(0, -2) + `]`;
              setPupilsIdsList2(pupilIdsString);
          };
      }
      setLessonAndUserIds();
  }, [pupilIdArray]);

  //////////////////////////////////
  // convert date to a string //////
  //////////////////////////////////
  function convertDateToString(date) {
      // create a string from the date format = "yyyy-mm-dd"
      return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
  }


  ////////////////////////////////
  /// prepare sparkline plot /////
  ////////////////////////////////
  function createSparkLineTrace(data) {
      let sparklineData = [];
      data.forEach((item) => {
          sparklineData.push(item.activities);
      })
      return sparklineData;
  }

  function splitDate(dateTime) {
      const date = dateTime.split("T");
      return date[0];
  }
  //////////////////////////////////
  // detect change in week/ month //
  //////////////////////////////////
  useEffect(() => {
      // detect change in Week/ month & create an array of dates as appropriate
      // for week- date for prev 7 days && for month - past 28 days
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
              // convert startDate to string and push to array
              let dateRec = convertDateToString(startDate);
              dateRange.push(dateRec);
              startDate.setDate(startDate.getDate() + 1);
          };
          // add current date to array then set const
          dateRange.push(convertDateToString(endDate));
          setDateRange3(dateRange);
      }
      getdates();
  }, [timeValue]);


  ////////////////////////////////////////////////////
  //  get activity attendance data  pupil ids      //
  ///////////////////////////////////////////////////
  useEffect(() => {
      // take the input set of pupils ids and populate the query
      const pupilLessonAttendanceQuery2 = async () => {
          if (pupilsIdsList2) {
              let newQuery = `query MyQuery {listAttendances(filter:{ or: ${pupilsIdsList2} },limit:1000000) 
        {items {id createdAt lessonRecordID pupilID 
          Lesson { title }
      }}}`;
              const results = await API.graphql(graphqlOperation(newQuery));
              if (results.data?.listAttendances) {
                  let data = [];
                  let filteredAttendance = results.data.listAttendances.items.filter(
                      x => dateRangeState3.includes(splitDate(x.createdAt))
                  );
                  filteredAttendance.forEach((item) => {
                      if (item.lessonRecordID != null) {
                          data.push({ date: splitDate(item.createdAt), pupilID: item.pupilID, lessonRecordID: item.lessonRecordID });
                      };
                  });
                //   console.log("totalattendancedata");
                //   console.log(data);
                  setTotalAttendanceData(data);
              }
          }
      }
      pupilLessonAttendanceQuery2();
  }, [pupilsIdsList2]);

  ///////////////////////////////////////////////////
  //   get the list of lesson attended by pupils   //
  ///////////////////////////////////////////////////
  useEffect(() => {
      const getActivityDuration2 = async () => {
          // get all the lessons with an id recorded in attendances
          // compute the total activity time based on the duration for each attending pupil
          if (totalAttendanceData) {
              let peLessonsString = `[`;

              totalAttendanceData.forEach((item) => {
                  peLessonsString = peLessonsString + `{id: {eq: "` + item.lessonRecordID + `"}}, `;
              });
              peLessonsString = peLessonsString.slice(0, -2) + `]`;

              let query = `query MyQuery {
          listPELessonRecords(filter:{ or: ${peLessonsString} },limit:1000000) {
            items { id activity duration date }
          }
        }`
              const results = await API.graphql(graphqlOperation(query));
              if (results.data?.listPELessonRecords) {
                  setAttendedLessonData2(results.data?.listPELessonRecords.items);
              }
          }
      }
      getActivityDuration2()
  }, [totalAttendanceData]);

  //////////////////////////////////////////////////////
  //   get the total activities completed by pupils   //
  //////////////////////////////////////////////////////
  useEffect(() => {
      const computeTotalActivities = async () => {
          if (attendedLessonData2) {
              let totalActivityData = [];
              let filteredLessons = attendedLessonData2.filter(
                  x => dateRangeState3.includes(x.date)
              );
              // loop through the time period- filter the lessons by day
              dateRangeState3.forEach((day) => {
                  // loop through the filtered lessons then filter the attandence by day & lesson
                  let activityCount = 0;
                  filteredLessons.forEach((lesson) => {
                      let filteredPupils = totalAttendanceData.filter(
                          x => day.includes(x.date) && lesson.id === x.lessonRecordID
                      );
                      activityCount = filteredPupils.length;
                  })
                  totalActivityData.push({ date: day, activities: activityCount })
              })
              setTotalSparkLineDataState(createSparkLineTrace(totalActivityData));
              setTotalByDate(totalActivityData);
          }
      }
      computeTotalActivities();
  }, [attendedLessonData2, dateRangeState3]);


  useEffect(() => {
      const getCount = async () => {
          if(totalSparkLineDataState && totalAttendanceData){
              let activities = totalSparkLineDataState.reduce((tot, a) => tot+a, 0);
              let datasize = 0;
              if (activities === 0) {
                datasize = 0;
                setTotalActivity("0");
              } else {
                datasize = activities
                if (activeTotalsTotAveswitchState === 'total') {
                    setTotalActivity(datasize);
                } else {
                  let val = parseFloat((datasize / pupilIdArray.length).toPrecision(2));
                  setTotalActivity(val);
                }
              };
            //   const users = [];
            //   console.log(totalAttendanceData);
            //   totalAttendanceData.forEach((item) => {
            //           users.push({ 'id': item.pupilID });
            //   });
            //   if (activeTotalsTotAveswitchState === 'total') {
            //       setTotalActivity(activities);
            //   } else {
            //       console.log(users);
            //       const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];
            //       console.log(uniqueIds);
            //       setTotalActivity(parseFloat((activities / pupilIdArray.length).toPrecision(2)));
            //   }
          }
      }
      getCount()

  }, [activeTotalsTotAveswitchState, totalAttendanceData, totalSparkLineDataState, dateRangeState3])


  return (
    <>
      {!totalActivity ? (
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
                      <TimelapseIcon />
                    </Avatar>
                  </Grid>

                  <Grid item>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
                      <TotalAverageSwitch totAveChanger={setActiveTotalsTotAveSwitchState}
                        switchVal={activeTotalsTotAveswitchState} />
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
                            {totalActivity}
                          </Typography>
                        ) : (
                          <Typography sx={{
                            fontSize: '2.125rem',
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75
                          }}>
                            {totalActivity}
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
                          Total Activities
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>

                    <> 
                      <Grid item xs={12}>

                        {totalSparkLineDataState ? <DailyMileChart trace={totalSparkLineDataState} /> :
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

export default ActivitiesTotal;