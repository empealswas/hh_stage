// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
	AppTasks,
	AppNewUsers,
	AppBugReports,
	AppItemOrders,
	AppNewsUpdate,
	AppWeeklySales,
	AppOrderTimeline,
	AppCurrentVisits,
	AppWebsiteVisits,
	AppTrafficBySite,
	AppCurrentSubject,
	AppConversionRates
} from '../components/_dashboard/app';
import DashboardOfTeacher from "../components/_dashboard/app/DashboardOfTeacher";
import { Can } from "../utils/Ability";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Button, duration } from "@mui/material";
import { API, graphqlOperation, navItem } from "aws-amplify";
import { useSnackbar } from 'notistack';
import SchoolHousesPage from "./SchoolHousesPage";
import { graphql } from "graphql";
import TopPupilsByRewardBarChart from "../components/reports/charts/TopPupilsByRewardPiechrat";
import TopActivitiesPieChart from "../components/reports/charts/TopActivitiesPieChart";
import TopPupilsByPhysicalActivities from "../components/reports/charts/TopPupilsByPhysicalActivities";
import ActivityGoalChart from "../components/reports/charts/ActivityGoalChart";
import { listPELessonRecords } from "../graphql/queries";
import axios from "axios";
import TotalActivities from "../components/cards/TotalActivities";
import TotalDailyMiles from "../components/cards/TotalDailyMiles";
import ActivityLineChart from "../components/reports/charts/ActivityLineChart";
import HeatMap from "../components/reports/charts/HeatMap";
import TimeCompletedCard from "../components/cards/TimeCompletedCard";
import AverageStepsChart from "../components/reports/charts/AverageStepsChart";
import AverageSleepChart from "../components/reports/charts/AverageSleepChart";
import { getAverage } from "../apiFunctions/apiFunctions";
import DashboardSettings from "../components/_dashboard/app/DashboardSettings";
import { Teacher } from '../models';


// ----------------------------------------------------------------------
export default function DashboardApp() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const user = useContext(UserContext);
	const [userIdAndNamesState, setUserIdAndNamesState] = useState();
	const [userIdsArray, setUserArray] = useState();


	function createIdArrayForPrincipal() {
		//${user._email}
		//davydovgleb00@gmail.com
		let getPupils = `query MyQuery {
            getPrincipal(id: "davydovgleb00@gmail.com") {
              id
              School {
                Pupils { items { id firstName lastName }
						}}}}`;
		const getData = async () => {
			let userArray = [];
			const results = await API.graphql(graphqlOperation(getPupils));
			if (results.data?.getPrincipal) {
				results.data.getPrincipal.School.Pupils.items.forEach((item: any) => {
					let name = item.firstName + " " + item.lastName;
					userArray.push({ id: item.id, name: name });
				})
			};
			setUserArray(userArray);
		};
		getData();
	}

	function createIdArrayForTeacher() {

		let getPupils = `query MyQuery { getTeacher(id: "${user._email}") 
        {classrooms {items 
          { classroom { pupils { items {
            pupil {id firstName lastName}
          }}}}}}}`;
		const getData = async () => {
			let userArray = [];
			const results = await API.graphql(graphqlOperation(getPupils));
			if (results.data?.getTeacher) {
				results.data.getTeacher.classrooms.items[0].classroom.pupils.items.forEach((item: any) => {
					let name = item.pupil.firstName + " " + item.pupil.lastName;
					userArray.push({ id: item.pupil.id, name: name });
				})
			}
			setUserArray(userArray);
		}
		getData();

	}

	function createIdArrayForPupil() {
		//decb3739-9468-4fbd-a578-5379fe39536c
		//${user.id}
		
		let getPupils = `query MyQuery {
            getPupil(id: "decb3739-9468-4fbd-a578-5379fe39536c") { firstName id lastName }
					}`;
		const getData = async () => {
			let userArray = [];
			const results = await API.graphql(graphqlOperation(getPupils));
			if (results.data?.getPupil) {
				let name = results.data.getPupil.firstName + " " + results.data.getPupil.lastName;
				userArray.push({ id: results.data.getPupil.id, name: name });
			};
			setUserArray(userArray);
		};
		getData();
	}

	function createIdArrayForParent() {
		//alindsay14@qub.ac.uk
		
		let getPupils = `query MyQuery {
            getParent(id: "alindsay14@qub.ac.uk") {
              children { items {
                  pupilID 
									Pupil {firstName id lastName }
						}}}}`
		const getData = async () => {
		let userArray = [];
			const results = await API.graphql(graphqlOperation(getPupils));
			if (results.data?.getParent) {
				console.log(results.data.getParent.children.items);
				results.data.getParent.children.items.forEach((item: any) => {
					let name = item.Pupil.firstName + " " + item.Pupil.lastName;
					userArray.push({ id: item.Pupil.id, name: name });
				})
			};
			setUserArray(userArray);
		};
		getData();
	}

useEffect(() => {
	console.log("userIdsArray")
	console.log(userIdsArray);
	if(userIdsArray){
		setUserIdAndNamesState(userIdsArray);
	};
}, [userIdsArray]);

	//////////////////////////////////////////////////////////////////////
	/// create an array of HH ids & names associated with user's role ////
	//////////////////////////////////////////////////////////////////////
	useEffect(() => {

		const setUserIdArray = async () => {

			if(user.getRole()==="Teacher") {
				console.log(user.getPupilsIds());
			}

			let uRole = "parent";
			// switch(user.getRole().toLowerCase()){
			switch (uRole.toLowerCase()) {
				case "teacher":
					createIdArrayForTeacher()
					break;
				case "pupil":
					createIdArrayForPupil();
					break;
				case "principal":
					createIdArrayForPrincipal();
					break;
				case "parent":
					createIdArrayForParent()
					break;
				default:
					console.log("oops");
			}
		};
		setUserIdArray();
	}, []);



	return (
		<Page title="Dashboard | Healthy Habits">
			<Container>
				<Box sx={{ pb: 5 }}>
					<Typography variant="h4">Welcome back, {user.firstName}</Typography>
				</Box>
				<Grid container spacing={5} >
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<TotalActivities />
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<TotalDailyMiles userArray={userIdAndNamesState}/>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<TimeCompletedCard />
					</Grid>
					{/*<Grid item xs={12} md={6} lg={6}>*/}
					{/*    <AverageStepsChart/>*/}
					{/*</Grid>*/}
					{/*<Grid item xs={12} md={6} lg={6}>*/}
					{/*    <AverageSleepChart/>*/}
					{/*</Grid>*/}
					<Grid item xs={12} md={6} lg={6}>
						<TopActivitiesPieChart />
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<ActivityGoalChart goalTime={10000} />
					</Grid>
					{/*<Can I={'read'} a={'teacherDashboard'}>*/}
					{/*    <Grid item xs={12}>*/}
					{/*        <DashboardOfTeacher/>*/}
					{/*    </Grid>*/}
					{/*</Can>*/}
					{/*<Grid item xs={12} md={12} lg={12}>*/}
					{/*    <ActivityLineChart/>*/}
					{/*</Grid>*/}
					{/*<Grid item xs={12} md={12} lg={12}>*/}
					{/*    <HeatMap/>*/}
					{/*</Grid>*/}
					<Grid item xs={12} md={6} lg={6}>
						<TopPupilsByRewardBarChart />
					</Grid>
					<Grid item xs={12} md={6} lg={6}>
						<TopPupilsByPhysicalActivities />
					</Grid>
					<Grid item xs={12} md={12} lg={12}>
						<SchoolHousesPage />
					</Grid>
					{/*<DashboardSettings/>*/}

				</Grid>
			</Container>
		</Page>
	);
}
