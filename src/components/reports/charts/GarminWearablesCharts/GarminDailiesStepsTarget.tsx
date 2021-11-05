import React, { useState, useEffect } from 'react';

import { API, graphqlOperation } from "aws-amplify";
import { GarminDailiesSummaryModel } from "../../../../models/garminDataModels/garminDailiesModel";
import { GarminQueryData } from '../../../../models/garminDataModels/garminQueryData';
import { listPupils } from '../../../../graphql/queries';
import { Card, CardHeader, Box } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { BarPlotYAxisModel } from '../../../../models/garminDataModels/apexChartsScatterDataPair';

export default function DailiesStepsTarget(props: GarminQueryData) {

    const [dailiesData, setData] = useState<GarminDailiesSummaryModel[] | null>(null);
    const queryURL: string =
        `https://analytics.healthyhabits.link/api/garminDailies/dates/start/${props.startDate}/end/${props.endDate}/period/${props.period}/groupedby/${props.groupedBy}`;

    useEffect(() => {
        // get the users from the user database
        const getAllUsers = async () => {
            const users: String[] = [];
            const result: any = await API.graphql(graphqlOperation(listPupils));
            result.data.listPupils?.items.forEach((item: any) => {
                users.push(item.id);
            })
            return users;
        }

        // fetch data from db- set headers

        const getData = async () => {
            const users = await getAllUsers();
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify(users);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(queryURL, requestOptions)
                .then(response => response.text())
                .then(result => {
                    var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
                    setData(garminData);
                })
                .catch(error => console.log('error', error));
        }
        getData();
    }, []);


    if (!dailiesData) {
        return (
            <Card>
                <CardHeader title="Steps" subheader="No data" />
            </Card>
        );
    } else {
        var seriesData = generateDataSeries(dailiesData);
        const plot = {

            series: seriesData[0],
            options: {
                chart: {
                    type: 'column',
                    height: 300
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: seriesData[1] 
                },
                yaxis: {
                    title: {
                        text: 'time (minutes)'
                    }
                },
                fill: {
                    opacity: 1
                },
            },


        };

        return (
            <Card>
                <CardHeader title="Steps" subheader="Total duration and intensity" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ReactApexChart type="bar" series={plot.series} options={plot.options} height={350} />

                </Box>
            </Card>
            // <ReactApexChart options={plot.options} series={plot.series} type="bar" height={350} />
        )
    }

    function generateDataSeries(dataIn: GarminDailiesSummaryModel[] ) {
        var i = 0;
        var series: BarPlotYAxisModel[]=[];
        var xCategories: Date[]=[];
        var trace1 = new BarPlotYAxisModel("Steps Duration",[]);
        var trace2 = new BarPlotYAxisModel("Steps Vig",[]);
        var trace3 = new BarPlotYAxisModel("Steps Mod",[]);

        while (i < dataIn.length) {
            xCategories.push(dataIn[i].period);
            trace1.data.push(parseFloat((dataIn[i].stepDuration/60).toPrecision(2)));
            trace2.data.push(parseFloat((dataIn[i].vigorousIntensity/60).toPrecision(2)));
            trace3.data.push(parseFloat((dataIn[i].moderateIntensity/60).toPrecision(2)));
            i++;
        }
        series.push(trace1);
        series.push(trace2);
        series.push(trace3);
        return [series, xCategories];
    };
}