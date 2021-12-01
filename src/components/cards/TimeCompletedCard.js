import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


// project imports
// assets
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MainCard from "./MainCard";
import SkeletonEarningCard from "./SkeletonEarningCard";
import { API, graphqlOperation } from "aws-amplify";
import { Menu } from "@material-ui/core";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TotalAverageSwitch from '../_garmin-selectors/total-average-switch';

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

const TimeCompletedCard = (props) => {
	const theme = useTheme();
	// const [timeCompletedTotAveswitchState, setTimeCompletedTotAveSwitchState] = useState("total");
	// const [anchorEl, setAnchorEl] = useState(null);

	// const handleClick = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };

	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };
	const [duration, setDuration] = useState(null);

	///////////////////////////////////////
	const [pupilsIdsList, setPupilsIdsList] = useState();
	const [getActiveTimeQuery, setGetActiveTimeAttendanceQuery] = useState();
	const [activityAttendanceData, setActivityAttendanceData] = useState();
	const [attendedLessonData, setAttendedLessonData] = useState();
	const [durationByDate, setDurationByDate] = useState();

	const [activeTimeCount, setActiveTimeCount] = useState(null);
	const [dateRangeState, setDateRange] = useState();
	const [filteredDataState, setFilteredDataState] = useState();
	const [sparkLineDataState, setSparkLineDataState] = useState();
	const [arrayfull, setArrayFull] = useState(false);

	////////////////////////
	const [timeValue2, setTimeValue2] = useState(false);
	const [ActiveDurationTotAveswitchState, setActiveDurationTotAveSwitchState] = useState("total");
	// const [dailyMileTotAveswitchState, setDailyMileTotAveSwitchState] = useState("total");


	//////////////////////////
	const handleChangeTime2 = (event, newValue) => {
		console.log(newValue);
		setTimeValue2(newValue);
	};
	//////////////////////////////////////////
	// ensure arry of users ids is present //
	/////////////////////////////////////////
	useEffect(() => {
		const isArrayFull = async () => {
			if (props.userArray) {
				setArrayFull(true);
			}
		}
		isArrayFull();
	}, [props]);


	/////////////////////////////////////////////////
	// Convert string of pupilIds for db query //////
	/////////////////////////////////////////////////
	useEffect(() => {
		const setLessonAndUserIds = async () => {

			if (arrayfull) {
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


	// ////////////////////////////////
	// /// prepare sparkline plot /////
	// ////////////////////////////////
	// function createSparkLineTrace(data) {

	// 	let sparklineData = [];
	// 	if (dateRangeState?.length > 0) {
	// 		dateRangeState.forEach(day => {
	// 			let mileCount = 0;
	// 			data.forEach(item => {
	// 				if (splitDate(item.createdAt) === day) {
	// 					mileCount++;
	// 				}
	// 			})
	// 			sparklineData.push(mileCount);
	// 		})
	// 	}
	// 	return sparklineData;
	// }

	function splitDate(dateTime) {
		const date = dateTime.split("T");
		return date[0];
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

			if (timeValue2) {
				startDate.setDate(1); // if month
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
			console.log("timecompleted date range");
			console.log(dateRange);
			setDateRange(dateRange);
		}
		getdates();
	}, [timeValue2]);


	////////////////////////////////////////////////////
	//  get daily mile data for lesson & pupil ids   //
	///////////////////////////////////////////////////
	useEffect(() => {
		// take the input set of lesson and pupils ids and populate the query
		// then update the state for that query
		// console.log(pupilsIdsList);
		const pupilLessonAttendanceQuery = async () => {

			if (pupilsIdsList) {

				let newQuery = `query MyQuery {listAttendances(filter:{ or: ${pupilsIdsList} },limit:1000000) 
          {items {id createdAt lessonRecordID pupilID 
            Lesson { title }
        }}}`;
				const results = await API.graphql(graphqlOperation(newQuery));
				if (results.data?.listAttendances) {
					let data = [];
					results.data.listAttendances.items.forEach((item) => {
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
					x => dateRangeState.includes(x.date)
				);
				// loop through the time period- filter the lessons by day
				dateRangeState.forEach((day) => {

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
				setDurationByDate(durationData);
			}
		}
		computeDurations();
	}, [attendedLessonData]);


	///////////////////////////////////////////////////////////
	useEffect(() => {
		const createSparkLine = async() => {
		///////////////////// create sparkline trace here
		}
		createSparkLine()
	}, [attendedLessonData]);

	useEffect(() => {
		const createDurationValues = async() => {
			////////create values to populate kpi box see below
		}
		createDurationValues()
	}, [attendedLessonData]);
	/////////////////////////////////////////////////////////

	useEffect(() => {
		console.info(ActiveDurationTotAveswitchState)
		const getCount = async () => {
			const result = await API.graphql(graphqlOperation(query));
			let duration = 0;
			const users = [];
			result.data.listPELessonRecords.items.forEach((item) => {
				if (item.duration) {
					users.push({ 'id': item.id });
					duration += item.duration;
				}
			})
			if (ActiveDurationTotAveswitchState === 'total') {
				setDuration(duration);
			} else {
				const uniqueIds = [...Array.from(new Set(users.map(item => item.id)))];
				setDuration(parseFloat((duration / uniqueIds.length).toPrecision(2)));
				console.log(uniqueIds);
			}
		}
		getCount()

	}, [ActiveDurationTotAveswitchState])

	return (
		<>
			{!duration ? (
				<SkeletonEarningCard />
			) : (
				<CardWrapper border={false} content={false}>
					<Box sx={{ p: 2.25 }}>

						<Grid container direction="column">
							{/* <Stack direction={'row'} spacing={1} > */}
							<Grid item>
								<Grid container justifyContent="spacing" spacing={2}>
									<Grid item>
										<Avatar
											variant="rounded"
											sx={{ ...theme.typography.body2, ...theme.typography.body1, backgroundColor: theme.palette.secondary.dark, mt: 1 }}
										>
											<TimelapseIcon />
										</Avatar>
									</Grid>
									<Grid item>
										<Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
											<TotalAverageSwitch totAveChanger={setActiveDurationTotAveSwitchState}
												switchVal={ActiveDurationTotAveswitchState} />
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
							{/*<TotalAverageSwitch totAveChanger={setTimeCompletedTotAveSwitchState} switchVal={timeCompletedTotAveswitchState}/>*/}
							{/* </Stack> */}

							<Grid item>
								<Grid container alignItems="center">
									<Grid item>
										<Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
											{duration}
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
										Active time (mins)
									</Typography>
									</Stack>
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
