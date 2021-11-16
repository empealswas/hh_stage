import {Card, CardHeader, Grid} from "@material-ui/core";
import {Box} from "@material-ui/system";
import {useEffect, useState} from "react";
import {ScatterPlotTraceModel} from "../../../../../models/garminDataModels/apexChartsScatterDataPair";
import {GarminDailiesSummaryModel} from "../../../../../models/garminDataModels/garminDailiesModel";
import DailiesStanineContourPlot from "../../../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot";
import DailiesStepsDistribution from "../../../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution";
import StepIntensityDonut from "../../../../reports/charts/GarminWearablesCharts/StepIntensityDonut";
import {CardContent} from "@mui/material";
import GarminMetricsRadialChart from "../../../../reports/charts/GarminWearablesCharts/GaminMetricsRadialChart";
import StanineLineChart from "../../../../reports/charts/GarminWearablesCharts/StanineLineChart";


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
    const [dailiesStanineGroup, setDailiesStanineGroup] = useState<GarminDailiesSummaryModel[]>([]);

    // constants for plot data
    const [dailiesScatterData, setDailiesScatterData] = useState<ScatterPlotTraceModel[]>([]);
    const [dailiesIntensityDonutData, setDailiesIntensityDonutData] = useState<number[]>([]);
    const [stanineValue, setStanineValue] = useState<number>(1);
    const [radialValue, setRadialValue] = useState<number>(1);

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
        return () => {
            isMounted = false
        };
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
        return () => {
            isMounted = false
        };
    }, [dailiesBaseUrl, endUrl, groupOpt, groupedByUrl, periodUrl, props, startUrl]);

    /////////////////////////////////////
    /////  get steps stanine data  /////
    /////////////////////////////////////
    useEffect(() => {
        var dailiesStaninesByUser = dailiesZvaluesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + groupedByUrl + groupOpt;

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
                fetch(dailiesStaninesByUser, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
                            setDailiesStanineGroup(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, dailiesZvaluesBaseUrl, groupOpt, groupedByUrl, props, startUrl, userOpt]);

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
                    (item) => {
                        return item.garminId === ids;
                    }
                );

                let result = processedData.map(({period, totalSteps}) => ({period, totalSteps}));
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
            }
            ;
            setDailiesScatterData(dataSeries);
        }
        prepScatterPlotData();
        return () => {
            isMounted = false
        };
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
            var data: any = [];

            // if data exists and the step suration for the last days
            if (dailiesDataGroup.length > 0) {
                var percReg = 40;
                var percMod = 30;
                var percVig = 30;
                var stepsRecord = dailiesDataGroup[dailiesDataGroup.length - 1];

                if (stepsRecord.stepDuration > 0) {
                    var duration = stepsRecord.stepDuration - (stepsRecord.moderateIntensity + stepsRecord.vigorousIntensity);
                    percReg = parseFloat((duration / stepsRecord.stepDuration * 100).toPrecision(2));
                    percMod = parseFloat((stepsRecord.moderateIntensity / stepsRecord.stepDuration * 100).toPrecision(2));
                    percVig = parseFloat((stepsRecord.vigorousIntensity / stepsRecord.stepDuration * 100).toPrecision(2));
                }
                data = [percReg, percMod, percVig];
            }

            setDailiesIntensityDonutData(data);
        }
        prepDonutIntensityData();
        return () => {
            isMounted = false
        };
    }, [dailiesDataGroup]);

    //////////////////////////////////////////////
    /////  create stanine heatmap trace data /////
    //////////////////////////////////////////////
    useEffect(() => {
        const prepStanineHeatmapData = async () => {
            if (dailiesStanineGroup.length > 0) {
                setStanineValue(dailiesStanineGroup[0].totalSteps);
            } else {
                console.log("dailies Stanine Group: no data");
            }
        }
        prepStanineHeatmapData();
    }, [dailiesStanineGroup]);

    //////////////////////////////////////////////
    /////  create %target radial trace data  /////
    //////////////////////////////////////////////
    useEffect(() => {  
        const prepTargetRadialData = async () => {
            if(dailiesDataGroup.length>0){
                var x = parseFloat((dailiesDataGroup[0].totalSteps/ 5000 * 100).toPrecision(2));
                setRadialValue(x);
            } else {
                console.log("dailies Radial Trace: no data");
            }
        }
        prepTargetRadialData();
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
        <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={6} lg={6}>
                <StepIntensityDonut data2={dailiesIntensityDonutData} title2={"Steps Intensity"} subTitle2={"levels"}
                                    labels={["Regular", "Moderate", "Vigorous"]}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <DailiesStepsDistribution data={dailiesScatterData} title={"Steps"} subTitle={"Total Steps"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                    <GarminMetricsRadialChart  data={radialValue} title={"Sedentary"} subTitle={"% Target Achieved"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <StanineLineChart data={stanineValue} title={"Stanine"} subTitle={"Steps"}/>
                {/* <DailiesStanineContourPlot data={stanineValue}/> */}
            </Grid>
        </Grid>
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