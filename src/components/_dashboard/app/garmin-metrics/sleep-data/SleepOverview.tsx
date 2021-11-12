import { Card, CardHeader, Grid } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useEffect, useState } from "react";
import { ScatterPlotTraceModel } from "../../../../../models/garminDataModels/apexChartsScatterDataPair";
import { GarminSleepSummaryModel } from "../../../../../models/garminDataModels/garminSleepModel";
import DailiesStanineContourPlot from "../../../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot";
import DailiesStepsDistribution from "../../../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution";
import StepIntensityDonut from "../../../../reports/charts/GarminWearablesCharts/StepIntensityDonut";
import {CardContent} from "@mui/material";

export default function SleepOverview(props: any) {

    var sleepBaseUrl: string = "https://analytics.healthyhabits.link/api/garminSleep/dates";
    var sleepZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminSleep/z-values/dates";
    var startUrl: string = "/start/";
    var endUrl: string = "/end/";
    var periodUrl: string = "/period/";
    var groupedByUrl: string = "/groupedby/";
    var groupOpt: string = "group";
    var userOpt: string = "user";

    // constants for retrieved data
    const [sleepDataUser, setSleepUser] = useState<GarminSleepSummaryModel[]>([]);
    const [sleepDataGroup, setSleepGroup] = useState<GarminSleepSummaryModel[]>([]);
    const [sleepStanineGroup, setSleepStanineGroup] = useState<GarminSleepSummaryModel[]>([]);
    

    // constants for plot data
    const [sleepScatterData, setSleepScatterData] = useState<ScatterPlotTraceModel[]>([]);
    const [sleepIntensityDonutData, setSleepIntensityDonutData] = useState<number[]>([]);
    const [stanineValue, setStanineValue] = useState<number>(1);

     /////////////////////////////////
    /////  get sleep users data /////
    /////////////////////////////////
    useEffect(() => { 
        var sleepDataByUser = sleepBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + userOpt;

        const getData = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            if (props['idList']) {
                var raw = JSON.stringify(props['idList'].id);
                var requestOptions: any = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                // send request
                fetch(sleepDataByUser, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
                            setSleepUser(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, groupedByUrl, periodUrl, props, sleepBaseUrl, startUrl, userOpt]);

    ///////////////////////////////////
    /////  get sleep group data   /////
    ///////////////////////////////////
    useEffect(() => {
        const getData = async () => {
            var sleepDataByGroup = sleepBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + groupOpt;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            if (props['idList']) {
                var raw = JSON.stringify(props['idList'].id);
                var requestOptions: any = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                // send request
                fetch(sleepDataByGroup, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
                            
                            setSleepGroup(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, groupOpt, groupedByUrl, periodUrl, props, sleepBaseUrl, startUrl]);

    /////////////////////////////////////
    /////  get sleep stanine data  /////
    /////////////////////////////////////
    useEffect(() => { 
        var sleepStaninesByUser = sleepZvaluesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"]+ groupedByUrl + groupOpt;

        const getData = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            if (props['idList']) {
                var raw = JSON.stringify(props['idList'].id);
                var requestOptions: any = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                // send request
                fetch(sleepStaninesByUser, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminSleepSummaryModel[] = JSON.parse(result);
                            console.log(garminData);
                            setSleepStanineGroup(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, sleepZvaluesBaseUrl, groupOpt, groupedByUrl, props, startUrl, userOpt]);  

    ///////////////////////////////////////////
    /////  create scatter plot trace data /////
    ///////////////////////////////////////////
    useEffect(() => {  
        // prepare the traces for the scatter plots to be user in the scatterplot
        const prepScatterPlotData = async () => {
            const uniqueIds = [...Array.from(new Set(sleepDataUser.map(item => item.garminId)))];

            var dataSeries: ScatterPlotTraceModel[] = [];
            for (var ids of uniqueIds) {
                const processedData = sleepDataUser.filter(
                    (item) => {return item.garminId === ids;}
                );

                let result = processedData.map(({ period, duration }) => ({ period, duration }));
                var name!: string;
                // if the 
                if (ids == null) {
                     name = "";
                } else {
                     name = ids;
                }
                var data = generateGarminDayWiseTimeSeries(result);
                var newTrace = new ScatterPlotTraceModel(name, data);
                dataSeries.push(newTrace);
            };
            setSleepScatterData(dataSeries);
        }
        prepScatterPlotData();
      
    }, [sleepDataUser]);

    //////////////////////////////////////////////
    /////  create intensity donut trace data /////
    //////////////////////////////////////////////
    useEffect(() => {  
        // prepare the trace data for the donut chart of step intensity
        const prepDonutIntensityData = async () => {
            // initialis the output data to == 100
            // set like this so i know it is doing something :\
            var percReg = 40;
            var percLight = 30;
            var percDeep = 30;

        // if data exists and the step suration for the last days
        if(sleepDataGroup.length >0){
            var sleepRecord = sleepDataGroup[sleepDataGroup.length-1];
     
            if (sleepRecord.duration > 0){
                var duration = sleepRecord.duration - (sleepRecord.lightSleep + sleepRecord.deepSleep);
                percReg = parseFloat((duration / sleepRecord.duration * 100).toPrecision(2));
                percLight = parseFloat((sleepRecord.lightSleep / sleepRecord.duration * 100).toPrecision(2));
                percDeep = parseFloat((sleepRecord.deepSleep / sleepRecord.duration * 100).toPrecision(2));
            }
        }
        var data: number [] = [percReg, percLight, percDeep];
        setSleepIntensityDonutData(data);
        }
        prepDonutIntensityData();
    }, [sleepDataGroup]);

    //////////////////////////////////////////////
    /////  create stanine heatmap trace data /////
    //////////////////////////////////////////////
    useEffect(() => {  
        const prepStanineHeatmapData = async () => {
            if(sleepStanineGroup.length>0){
                setStanineValue(sleepStanineGroup[0].duration);
            } else {
                console.log("dailiesStanineGroup: inside useeffcet constant - mo data");
            }
        }
        prepStanineHeatmapData();

    }, [sleepStanineGroup]);

    function generateGarminDayWiseTimeSeries(inData: any) {
        var i = 0;
        var series = [];
        while (i < inData.length) {
            var x = new Date(inData[i].period).getTime();
            var y = parseFloat((inData[i].duration/3600).toPrecision(2));
            series.push([x, y]);
            i++;
        }
        return series;
    }
    return (
        <Card >
            <CardHeader title="Sleep" subheader="Total duration and intensity" />
                <CardContent>
                    <Grid container spacing={2}>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <StepIntensityDonut data2={sleepIntensityDonutData} title2={"Sleep Intensity"} subTitle2={"Depth"} labels={["Other", "Light", "Deep"]}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <DailiesStepsDistribution data={sleepScatterData} title={"Sleep"} subTitle={"Total Duration"}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DailiesStanineContourPlot data={stanineValue}/>
                    </Grid>
                    </Grid>
                </CardContent>
        </Card>
    );
}