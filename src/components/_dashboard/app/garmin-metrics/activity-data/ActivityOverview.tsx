import {Card, CardHeader, Grid} from "@material-ui/core";
import {Box} from "@material-ui/system";
import {useEffect, useState} from "react";
import {ScatterPlotTraceModel} from "../../../../../models/garminDataModels/apexChartsScatterDataPair";
import {GarminEpochsSummaryDataModel} from "../../../../../models/garminDataModels/garminEpochsModel";
import DailiesStanineContourPlot from "../../../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot";
import DailiesStepsDistribution from "../../../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution";
import StepIntensityDonut from "../../../../reports/charts/GarminWearablesCharts/StepIntensityDonut";
import {CardContent} from "@mui/material";
import GarminMetricsRadialChart from "../../../../reports/charts/GarminWearablesCharts/GaminMetricsRadialChart";
import StanineLineChart from "../../../../reports/charts/GarminWearablesCharts/StanineLineChart";

export default function ActivityOverview(props: any) {
    var epochsBaseUrl: string = "https://analytics.healthyhabits.link/api/garminEpochs/dates";
    var epochsZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminEpochs/z-values/dates";
    var startUrl: string = "/start/";
    var endUrl: string = "/end/";
    var periodUrl: string = "/period/";
    var groupedByUrl: string = "/groupedby/";
    var groupOpt: string = "group";
    var userOpt: string = "user";


    // constants for retrieved data
    const [activityDataUser, setActivityUser] = useState<GarminEpochsSummaryDataModel[]>([]);
    const [activityDataGroup, setActivityGroup] = useState<GarminEpochsSummaryDataModel[]>([]);
    const [activityStanineGroup, setActivityStanineGroup] = useState<GarminEpochsSummaryDataModel[]>([]);
    const [stanineValue, setStanineValue] = useState<number>(1);

    // constants for plot data
    const [activityScatterData, setScatterData] = useState<ScatterPlotTraceModel[]>([]);
    const [activityIntensityDonutData, setIntensityDonutData] = useState<number[]>([]);
    const [radialValue, setRadialValue] = useState<number>(1);

    ///////////////////////////////////
    /////  get epochs users data  /////
    ///////////////////////////////////
    useEffect(() => {
        var dataByUser = epochsBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + userOpt;

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
                fetch(dataByUser, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
                            setActivityUser(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, epochsBaseUrl, groupedByUrl, periodUrl, props, startUrl, userOpt]);

    ///////////////////////////////////
    /////  get epochs group data  /////
    ///////////////////////////////////
    useEffect(() => {
        const getData = async () => {
            var dataByGroup = epochsBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + groupOpt;
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
                fetch(dataByGroup, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
                            setActivityGroup(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, epochsBaseUrl, groupOpt, groupedByUrl, periodUrl, props, startUrl]);

    /////////////////////////////////////
    /////  get epochs stanine data  /////
    /////////////////////////////////////
    useEffect(() => {
        var staninesByGroup = epochsZvaluesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + groupedByUrl + groupOpt;

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
                fetch(staninesByGroup, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
                            console.log(garminData);
                            setActivityStanineGroup(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, epochsZvaluesBaseUrl, groupOpt, groupedByUrl, props, startUrl, userOpt]);

    ///////////////////////////////////////////
    /////  create scatter plot trace data /////
    ///////////////////////////////////////////
    useEffect(() => {
        // prepare the traces for the scatter plots to be user in the scatterplot
        const prepScatterPlotData = async () => {
            const uniqueIds = [...Array.from(new Set(activityDataUser.map(item => item.garminId)))];

            var dataSeries: ScatterPlotTraceModel[] = [];
            for (var ids of uniqueIds) {
                const processedData = activityDataUser.filter(
                    (item) => {
                        return item.garminId === ids;
                    }
                );

                let result = processedData.map(({period, active, highlyActive}) => ({period, active, highlyActive}));
                var name!: string;
                if (ids == null) {
                    name = "";
                } else {
                    name = ids;
                }
                var data = generateGarminDayWiseTimeSeries(result);
                var newTrace = new ScatterPlotTraceModel(name, data);
                dataSeries.push(newTrace);
            };
            setScatterData(dataSeries);
        }
        prepScatterPlotData();

    }, [activityDataUser]);

    //////////////////////////////////////////////
    /////  create intensity donut trace data /////
    //////////////////////////////////////////////
    useEffect(() => {
        // prepare the trace data for the donut chart of step intensity
        const prepDonutIntensityData = async () => {
            // initialis the output data to == 100
            // set like this so i know it is doing something :\
            var percSed = 40;
            var percAct = 30;
            var percHighAct = 30;

            // if data exists and the step suration for the last days
            if (activityDataGroup.length > 0) {
                var sedentaryRecord = activityDataGroup[activityDataGroup.length - 1];

                if (sedentaryRecord.duration > 0) {
                    var totalActive = sedentaryRecord.sedentary + sedentaryRecord.active + sedentaryRecord.highlyActive;
                    var duration = totalActive - (sedentaryRecord.active + sedentaryRecord.highlyActive);
                    percSed = parseFloat((duration / sedentaryRecord.sedentary * 100).toPrecision(2));
                    percAct = parseFloat((sedentaryRecord.active / totalActive * 100).toPrecision(2));
                    percHighAct = parseFloat((sedentaryRecord.highlyActive / totalActive * 100).toPrecision(2));
                }
            }
            var data: number [] = [percSed, percAct, percHighAct];
            setIntensityDonutData(data);
        }
        prepDonutIntensityData();
    }, [activityDataGroup]);

    //////////////////////////////////////////////
    /////  create stanine heatmap trace data /////
    //////////////////////////////////////////////
    useEffect(() => {
        const prepStanineHeatmapData = async () => {

            if (activityStanineGroup.length > 0) {
                setStanineValue(activityStanineGroup[0].active);
            } else {
                console.log("Sedentary Stanine Group: no data");
            }
        }
        prepStanineHeatmapData();
    }, [activityStanineGroup]);

    //////////////////////////////////////////////
    /////  create %target radial trace data  /////
    //////////////////////////////////////////////
    useEffect(() => {  
        const prepTargetRadialData = async () => {
            if(activityDataGroup.length>0){
                var x = parseFloat(((activityDataGroup[0].active + activityDataGroup[0].highlyActive) / 3600 * 100).toPrecision(2));
                setRadialValue(x);
            } else {
                console.log("Active radial trace: no data");
            }
        }
        prepTargetRadialData();
    }, [activityDataGroup]);

    function generateGarminDayWiseTimeSeries(inData: any) {
        var i = 0;
        var series = [];
        while (i < inData.length) {
            var x = new Date(inData[i].period).getTime();
            var y = parseFloat(((inData[i].active + inData[i].highlyActive) / 3600).toPrecision(2));
            series.push([x, y]);
            i++;
        }
        return series;
    }

    return (

                <Grid container spacing={2}>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <StepIntensityDonut data2={ activityIntensityDonutData} title2={"Sedentary vs Activity"}
                                        subTitle2={"Comparison"} labels={["Sedentary", "Active", "Highly Active"]}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <DailiesStepsDistribution data={ activityScatterData} title={"Activity"}
                                              subTitle={"Total Activity"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <GarminMetricsRadialChart  data={radialValue} title={"Activity"} subTitle={"% Target Achieved"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <StanineLineChart data={stanineValue} title={"Stanine"} subTitle={"Activity"}/>
                    {/* <DailiesStanineContourPlot data={stanineValue}/> */}
                </Grid>
                </Grid>

    );
}
