import { Card, CardHeader, Grid } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useEffect, useState } from "react";
import { ScatterPlotTraceModel } from "../../../../../models/garminDataModels/apexChartsScatterDataPair";
import { GarminDailiesSummaryModel } from "../../../../../models/garminDataModels/garminDailiesModel";
import DailiesStanineContourPlot from "../../../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot";
import DailiesStepsDistribution from "../../../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution";


export default function DailiesOverview(props: any) {

    // set up query url seqments
    var dailiesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/dates";
    var dailiesZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/z-values/dates";
    var startUrl: string = "/start/";
    var endUrl: string = "/end/";
    var periodUrl: string = "/period/";
    var groupedByUrl: string = "/groupedby/";
    var groupOpt: string = "group";
    var userOpt: string = "user";

    // const [dailiesZvalue, setDailiesZvalue] = useState<GarminDailiesSummaryModel[] | null>(null);
    // const [dailiesDataGroup, setDailiesGroup] = useState<GarminDailiesSummaryModel[] | null>(null);

    // constants for creating api query urls
    const [dailiesDataUser, setDailiesUser] = useState<GarminDailiesSummaryModel[]>([]);
    const [dailiesDataGroup, setDailiesGroup] = useState<GarminDailiesSummaryModel[]>([]);

    // constants for plot data
    const [dailiesScatterData, setDailiesScatterData] = useState<ScatterPlotTraceModel[]>([]);
    const [dailiesIntensityDonutData, setDailiesIntensityDonutData] = useState<number[]>([]);


    
    
    
    // const dailesDataQuery = dailiesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + props["grouping"];
    // const dailiesStanineQuery = dailiesZvaluesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + props["grouping"];

    // var radialGraphData = new ApexRadialGraphModel(0, 0, 0, 0);
    // var stepsIntensityData!: GarminDailiesSummaryModel;
    // var userDailies: GarminDailiesSummaryModel[] = [];


    ///////////////////////////////////
    /////  get dailies users data /////
    ///////////////////////////////////
    useEffect(() => {
        let isMounted = true;  
        var dailiesDataByUser = dailiesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + userOpt;
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
                fetch(dailiesDataByUser, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
                            setDailiesUser(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
        return () => { isMounted = false }; 
    }, [dailiesBaseUrl, endUrl, groupedByUrl, periodUrl, props, startUrl, userOpt]);

    ///////////////////////////////////
    /////  get dailies group data /////
    ///////////////////////////////////
    useEffect(() => {
        let isMounted = true;  
        const getData = async () => {
            var dailiesDataByGroup = dailiesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + groupOpt;
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
                fetch(dailiesDataByGroup, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
                            setDailiesGroup(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
        return () => { isMounted = false }; 
    }, [dailiesBaseUrl, endUrl, groupOpt, groupedByUrl, periodUrl, props, startUrl]);


    ///////////////////////////////////////////
    /////  create scatter plot trace data /////
    ///////////////////////////////////////////
    useEffect(() => {  
        let isMounted = true;  
        // prepare the traces for the scatter plots to be user in the scatterplot
        const prepScatterPlotData = async () => {
            const uniqueIds = [...Array.from(new Set(dailiesDataUser.map(item => item.garminId)))];

            var dataSeries: ScatterPlotTraceModel[] = [];
            for (var ids of uniqueIds) {
                const processedData = dailiesDataUser.filter(
                    (item) => {return item.garminId === ids;}
                );

                let result = processedData.map(({ period, totalSteps }) => ({ period, totalSteps }));
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
            setDailiesScatterData(dataSeries);
        }
        prepScatterPlotData();
        return () => { isMounted = false }; 
    }, [dailiesDataUser]);

    //////////////////////////////////////////////
    /////  create intensity donut trace data /////
    //////////////////////////////////////////////
    useEffect(() => {  
        console.log("intensity: do an useeffect");
        let isMounted = true;  
        // prepare the trace data for the donut chart of step intensity
        const prepDonutIntensityData = async () => {
            // initialis the output data to == 100
            // set like this so i know it is doing something :\
            var percReg = 40;
            var percMod = 30;
            var percVig = 30;

        // if data exists and the step suration for the last days
        if(dailiesDataGroup.length >0){
            var stepsRecord = dailiesDataGroup[dailiesDataGroup.length-1];
     
            if (stepsRecord.stepDuration > 0){
                console.log("and step duration > 0");
                var duration = stepsRecord.stepDuration - (stepsRecord.moderateIntensity + stepsRecord.vigorousIntensity);
                percReg = parseFloat((duration / stepsRecord.stepDuration * 100).toPrecision(2));
                percMod = parseFloat((stepsRecord.moderateIntensity / stepsRecord.stepDuration * 100).toPrecision(2));
                percVig = parseFloat((stepsRecord.vigorousIntensity / stepsRecord.stepDuration * 100).toPrecision(2));
            }
        }
        var data: number [] = [percReg, percMod, percVig];
        setDailiesIntensityDonutData(data);
        }
        prepDonutIntensityData();
        return () => { isMounted = false }; 
    }, [dailiesDataGroup]);

  
    function generateGarminDayWiseTimeSeries(inData: any) {
        var i = 0;
        var series = [];
        while (i < inData.length) {
            var x = new Date(inData[i].period).getTime();
            var y = inData[i].totalSteps
            series.push([x, y]);
            i++;
        }
        return series;
    }

    return (
        <Card >
            <CardHeader title="Steps" subheader="Total duration and intensity" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <h1>A grand design </h1>
                <>
                    <Grid item xs={12}>
                        <DailiesStanineContourPlot />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                        <StepIntensityDonut data2={dailiesIntensityDonutData} title2={"Steps Intensity"} subTitle2={"levels"} />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <DailiesStepsDistribution data={dailiesScatterData} title={"Steps"} subTitle={"Total Steps"}/>
                    </Grid>
                </>
            </Box>
        </Card>
    );

}

    // //////////////////////////////////////
    // /////  get dailies z-values ////
    // //////////////////////////////////////
    // useEffect(() => {
    //     const getData = async () => {
    //         var myHeaders = new Headers();
    //         myHeaders.append("Content-Type", "application/json");
    //         if(props['idList']){
    //         var raw = JSON.stringify(props['idList'].id);

    //         var requestOptions: any = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: raw,
    //             redirect: 'follow'
    //         };
    //         // console.log(raw);
    //             // // send request
    //             // fetch(dailiesStanineQuery, requestOptions)
    //             //     .then(response => response.text())
    //             //     .then(result => {
    //             //         var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
    //             //         setDailiesZvalueGroup(garminData);
    //             //     })
    //             //     .catch(error => console.log('error', error));
    //     }
    //     }
    //     getData();
    // }, []);