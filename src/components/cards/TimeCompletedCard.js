import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

// third-party
import Chart from 'react-apexcharts';
// project imports
import ChartDataYear from './total-order-year-line-chart';
// assets
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MainCard from "./MainCard";
import SkeletonEarningCard from "./SkeletonEarningCard";
import { API, graphqlOperation } from "aws-amplify";
import { Menu } from "@material-ui/core";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TotalAverageSwitch from '../_garmin-selectors/total-average-switch';
import DailyMileChart from '../reports/charts/KpiCharts/DailyMileChart';
import { UserContext } from '../../App';

const CardWrapper = styled(MainCard)(({ theme }) => ({
	backgroundColor: theme.palette.primary.dark,
	color: '#fff',
	overflow: 'hidden',
	position: 'relative',
	'&:after': {
		content: '""',
		position: 'absolute', width: 210, height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%', top: -85, right: -95,
		[theme.breakpoints.down('sm')]: { top: -105, right: -140 }
	},
	'&:before': {
		content: '""',
		position: 'absolute', width: 210, height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%',
		top: -125, right: -15, opacity: 0.5,
		[theme.breakpoints.down('sm')]: { top: -155, right: -70 }
	}
}));
const query = `query MyQuery {
  listPELessonRecords {
    items {
      id
      activity
      duration
      date
    }
  }
}`
// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TimeCompletedCard = () => {


	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => { setAnchorEl(event.currentTarget); };
	const handleClose = () => { setAnchorEl(null); };
	// const [dailyMileTotAveswitchState, setDailyMileTotAveSwitchState] = useState("total");
	// const [getActiveTimeQuery, setGetActiveTimeAttendanceQuery] = useState();
	// const [filteredDataState, setFilteredDataState] = useState();
	// const [activeTimeCount, setActiveTimeCount] = useState(null);
	const theme = useTheme();
	const user = useContext(UserContext);
	let userRole = user.getRole();

	const [duration, setDuration] = useState(0);
	const [pupilsIdsList, setPupilsIdsList] = useState();
	const [activityAttendanceData, setActivityAttendanceData] = useState();
	const [attendedLessonData, setAttendedLessonData] = useState();
	const [durationByDate, setDurationByDate] = useState();
	const [timeValue2, setTimeValue2] = useState(false);
	const [dateRangeState2, setDateRange2] = useState();
	const [durationSparkLineDataState, setDurationSparkLineDataState] = useState();
	const [arrayfull, setArrayFull] = useState(false);
	const [activeDurationTotAveswitchState, setActiveDurationTotAveSwitchState] = useState("total");


  ///////////////////////////////////////////////////////
  const [pupilIdArray, setPupilIdArray] = useState();
  ///////////////////////////////////////////////////////
	const handleChangeTime2 = (event, newValue) => {
		console.log(newValue);
		setTimeValue2(newValue);
	};
	// //////////////////////////////////////////
	// // ensure arry of users ids is present //
	// /////////////////////////////////////////
	// useEffect(() => {
	// 	const isArrayFull = async () => {
	// 		if (props.userArray) {
	// 			setArrayFull(true);
	// 		}
	// 	}
	// 	isArrayFull();
	// }, [props]);


	/////////////////////////////////////////////////
  // check when the array of user ids is ready ///
  ////////////////////////////////////////////////
  useEffect(() => {
    const getPupilIds = async() => {
        let x = await user.getPupilsIds();
        setPupilIdArray(x);
    }
    getPupilIds();
  }, [user]);

	/////////////////////////////////////////////////
	// Convert string of pupilIds for db query //////
	/////////////////////////////////////////////////
	useEffect(() => {
		const setLessonAndUserIds = async () => {
			console.log("setLessonAndUserIds");
			if (pupilIdArray) {
				let pupilIdsString = `[`;
				pupilIdArray.forEach((item: any) => {
					pupilIdsString = pupilIdsString + `{pupilID: {eq: "` + item.id + `"}}, `;
				});
				pupilIdsString = pupilIdsString.slice(0, -2) + `]`;
				setPupilsIdsList(pupilIdsString);
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
			sparklineData.push(item.duration);
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
			console.log("getdates");
			let endDate = new Date();
			let startDate = new Date();
			let dateRange = [];

			if (timeValue2) {
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
			setDateRange2(dateRange);
		}
		getdates();
	}, [timeValue2]);


	////////////////////////////////////////////////////
	//  get activity attendance data  pupil ids      //
	///////////////////////////////////////////////////
	useEffect(() => {
		// take the input set of pupils ids and populate the query
		const pupilLessonAttendanceQuery = async () => {
			if (pupilsIdsList) {
				let newQuery = `query MyQuery {listAttendances(filter:{ or: ${pupilsIdsList} },limit:1000000) 
          {items {id createdAt lessonRecordID pupilID 
            Lesson { title }
        }}}`;
				const results = await API.graphql(graphqlOperation(newQuery));
				if (results.data?.listAttendances) {
					let data = [];
					let filteredAttendance = results.data.listAttendances.items.filter(
						x => dateRangeState2.includes(splitDate(x.createdAt))
					);
					filteredAttendance.forEach((item) => {
						if (item.lessonRecordID != null) {
							data.push({ date: splitDate(item.createdAt), pupilID: item.pupilID, lessonRecordID: item.lessonRecordID });
						};
					});
					setActivityAttendanceData(data);
				}
			}
		}
		pupilLessonAttendanceQuery();
	}, [pupilsIdsList]);

	///////////////////////////////////////////////////
	// from the list of activities get the duration  //
	///////////////////////////////////////////////////
	useEffect(() => {
		const getActivityDuration = async () => {
			// get all the lessons with an id recorded in attendances
			// compute the total activity time based on the duration for each attending pupil
			if (activityAttendanceData) {
				let peLessonsString = `[`;

				activityAttendanceData.forEach((item: any) => {
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
					setAttendedLessonData(results.data?.listPELessonRecords.items);
				}
			}
		}
		getActivityDuration()
	}, [activityAttendanceData]);

	useEffect(() => {
		
		const computeDurations = async () => {
			if (attendedLessonData) {
				let durationData = [];
				let filteredLessons = attendedLessonData.filter(
					x => dateRangeState2.includes(x.date)
				);
				// loop through the time period- filter the lessons by day
				dateRangeState2.forEach((day) => {

					// loop through the filtered lessons then filter the attandence by day & lesson
					let durationCount = 0;
					filteredLessons.forEach((lesson) => {
						let filteredPupils = activityAttendanceData.filter(
							x => day.includes(x.date) && lesson.id === x.lessonRecordID
						);
						durationCount = filteredPupils.length * lesson.duration;
					})
					durationData.push({ date: day, duration: durationCount })
				})
				console.log(durationData);
				setDurationSparkLineDataState(createSparkLineTrace(durationData));
				setDurationByDate(durationData);
			}
		}
		computeDurations();
	}, [attendedLessonData, dateRangeState2]);


	useEffect(() => {
		const getCount = async () => {
			if(durationSparkLineDataState && activityAttendanceData){
				let duration = durationSparkLineDataState.reduce((tot, a) => tot+a, 0);
				if (activeDurationTotAveswitchState === 'total') {
					setDuration(duration);
				} else {
					// const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];
					setDuration(parseFloat((duration / pupilIdArray.length).toPrecision(2)));
				}
			}
		}
		getCount()

	}, [activeDurationTotAveswitchState, activityAttendanceData, durationSparkLineDataState, dateRangeState2])

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
											color: '#fff',
											mt: 1
										}}
									>
										<TimelapseIcon />
									</Avatar>
								</Grid>

								<Grid item>
									<Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
										<TotalAverageSwitch totAveChanger={setActiveDurationTotAveSwitchState}
											switchVal={activeDurationTotAveswitchState} />
										<>
											<Button
												disableElevation
												variant={timeValue2 ? 'contained' : 'text'}
												size="small"
												sx={{ color: 'inherit' }}
												onClick={(e) => handleChangeTime2(e, true)}
											>
												Month
											</Button>
											<Button
												disableElevation
												variant={!timeValue2 ? 'contained' : 'text'}
												size="small"
												sx={{ color: 'inherit' }}
												onClick={(e) => handleChangeTime2(e, false)}
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
											{timeValue2 ? (
												<Typography sx={{
													fontSize: '2.125rem',
													fontWeight: 500,
													mr: 1,
													mt: 1.75,
													mb: 0.75
												}}>
													{duration}
												</Typography>
											) : (
												<Typography sx={{
													fontSize: '2.125rem',
													fontWeight: 500,
													mr: 1,
													mt: 1.75,
													mb: 0.75
												}}>
													{duration}
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
												<ArrowUpwardIcon fontSize="inherit"
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
												Active time (mins)
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>

									<>
										<Grid item xs={12}>

											{durationSparkLineDataState ? <DailyMileChart trace={durationSparkLineDataState} /> :
												<Chart {...ChartDataYear} />}
										</Grid>

									</>

								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</CardWrapper>






				// <CardWrapper border={false} content={false}>
				// 	<Box sx={{ p: 2.25 }}>

				// 		<Grid container direction="column">
				// 			{/* <Stack direction={'row'} spacing={1} > */}
				// 			<Grid item>
				// 				<Grid container justifyContent="spacing" spacing={2}>
				// 					<Grid item>
				// 						<Avatar
				// 							variant="rounded"
				// 							sx={{ ...theme.typography.body2, ...theme.typography.body1, backgroundColor: theme.palette.secondary.dark, mt: 1 }}
				// 						>
				// 							<TimelapseIcon />
				// 						</Avatar>
				// 					</Grid>
				// 					<Grid item>
				// 						<Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
				// 							<TotalAverageSwitch totAveChanger={setActiveDurationTotAveSwitchState}
				// 								switchVal={ActiveDurationTotAveswitchState} />
				// 							<>
				// 								<Button
				// 									disableElevation
				// 									variant={timeValue2 ? 'contained' : 'text'}
				// 									size="small"
				// 									sx={{ color: 'inherit' }}
				// 									onClick={(e) => handleChangeTime2(e, true)}
				// 								>
				// 									Month
				// 								</Button>
				// 								<Button
				// 									disableElevation
				// 									variant={!timeValue2 ? 'contained' : 'text'}
				// 									size="small"
				// 									sx={{ color: 'inherit' }}
				// 									onClick={(e) => handleChangeTime2(e, false)}
				// 								>
				// 									Week
				// 								</Button>
				// 							</>
				// 						</Stack>
				// 					</Grid>

				// 				</Grid>
				// 			</Grid>
				// 			{/*<TotalAverageSwitch totAveChanger={setTimeCompletedTotAveSwitchState} switchVal={timeCompletedTotAveswitchState}/>*/}
				// 			{/* </Stack> */}

				// 			<Grid item>
				// 				<Grid container alignItems="center">
				// 					<Grid item>
				// 						<Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
				// 							{duration}
				// 						</Typography>
				// 					</Grid>
				// 					<Grid item>
				// 						<Avatar
				// 							sx={{
				// 								cursor: 'pointer',
				// 								...theme.typography.smallAvatar,
				// 								backgroundColor: theme.palette.secondary[200],
				// 								color: theme.palette.secondary.dark
				// 							}}
				// 						>
				// 							<ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
				// 						</Avatar>
				// 					</Grid>
				// 				</Grid>
				// 			</Grid>
				// 			<Grid item sx={{ mb: 1.25 }}>
				// 				<>
				// 					<Stack direction={'row'}><Typography
				// 						sx={{
				// 							fontSize: '1rem',
				// 							fontWeight: 800,
				// 							color: theme.palette.secondary[200]
				// 						}}
				// 					>
				// 						Active time (mins)
				// 					</Typography>
				// 					</Stack>
				// 				</>
				// 			</Grid>
				// 		</Grid>
				// 	</Box>
				// </CardWrapper>
			)}
		</>
	);
};

TimeCompletedCard.propTypes = {
	isLoading: PropTypes.bool
};

export default TimeCompletedCard;