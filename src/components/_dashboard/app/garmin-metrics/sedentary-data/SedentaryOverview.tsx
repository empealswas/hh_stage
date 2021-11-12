import { Card, CardHeader, Grid } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useEffect, useState } from "react";
import { ScatterPlotTraceModel } from "../../../../../models/garminDataModels/apexChartsScatterDataPair";
import { GarminEpochsSummaryDataModel } from "../../../../../models/garminDataModels/garminEpochsModel";
import DailiesStanineContourPlot from "../../../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot";
import DailiesStepsDistribution from "../../../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution";

export default function SedentaryOverview(props: any) {
    var epochsBaseUrl: string = "https://analytics.healthyhabits.link/api/garminEpochs/dates";
    // var epochsZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminEpochs/z-values/dates";
    var startUrl: string = "/start/";
    var endUrl: string = "/end/";
    var periodUrl: string = "/period/";
    var groupedByUrl: string = "/groupedby/";
    var groupOpt: string = "group";
    var userOpt: string = "user";


        // constants for retrieved data
        const [sedentaryDataUser, setSedentaryUser] = useState<GarminEpochsSummaryDataModel[]>([]);
        const [sedentaryDataGroup, setSedentaryGroup] = useState<GarminEpochsSummaryDataModel[]>([]);
    
        // constants for plot data
        const [sedentaryScatterData, setSedentaryScatterData] = useState<ScatterPlotTraceModel[]>([]);
        const [sedentaryIntensityDonutData, setSedentaryIntensityDonutData] = useState<number[]>([]);

            ///////////////////////////////////
    /////  get sleep users data /////
    ///////////////////////////////////
    useEffect(() => { 
        var sedentaryDataByUser = epochsBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + userOpt;

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
                fetch(sedentaryDataByUser, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
                            setSedentaryUser(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, epochsBaseUrl, groupedByUrl, periodUrl, props, startUrl, userOpt]);

    ///////////////////////////////////
    /////  get dailies group data /////
    ///////////////////////////////////
    useEffect(() => {
        const getData = async () => {
            var sedentaryDataByGroup = epochsBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + groupOpt;
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
                fetch(sedentaryDataByGroup, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result != null) {
                            var garminData: GarminEpochsSummaryDataModel[] = JSON.parse(result);
                            
                            setSedentaryGroup(garminData);
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
        getData();
    }, [endUrl, epochsBaseUrl, groupOpt, groupedByUrl, periodUrl, props, startUrl]);


    ///////////////////////////////////////////
    /////  create scatter plot trace data /////
    ///////////////////////////////////////////
    useEffect(() => {  
        // prepare the traces for the scatter plots to be user in the scatterplot
        const prepScatterPlotData = async () => {
            const uniqueIds = [...Array.from(new Set(sedentaryDataUser.map(item => item.garminId)))];

            var dataSeries: ScatterPlotTraceModel[] = [];
            for (var ids of uniqueIds) {
                const processedData = sedentaryDataUser.filter(
                    (item) => {return item.garminId === ids;}
                );

                let result = processedData.map(({ period, sedentary }) => ({ period, sedentary }));
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
            setSedentaryScatterData(dataSeries);
        }
        prepScatterPlotData();
      
    }, [sedentaryDataUser]);

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
        if(sedentaryDataGroup.length >0){
            var sedentaryRecord = sedentaryDataGroup[sedentaryDataGroup.length-1];
     
            if (sedentaryRecord.duration > 0){
                var totalActive = sedentaryRecord.sedentary + sedentaryRecord.active  + sedentaryRecord.highlyActive;
                var duration = totalActive - (sedentaryRecord.active  + sedentaryRecord.highlyActive);
                percSed = parseFloat((duration / sedentaryRecord.sedentary * 100).toPrecision(2));
                percAct = parseFloat((sedentaryRecord.active  / totalActive * 100).toPrecision(2));
                percHighAct = parseFloat((sedentaryRecord.highlyActive / totalActive * 100).toPrecision(2));
            }
        }
        var data: number [] = [percSed, percAct, percHighAct];
        setSedentaryIntensityDonutData(data);
        }
        prepDonutIntensityData();
    }, [sedentaryDataGroup]);

  
    function generateGarminDayWiseTimeSeries(inData: any) {
        var i = 0;
        var series = [];
        while (i < inData.length) {
            var x = new Date(inData[i].period).getTime();
            var y = parseFloat((inData[i].sedentary/3600).toPrecision(2));
            series.push([x, y]);
            i++;
        }
        return series;
    }
    return (
        <Card >
            <CardHeader title="Steps" subheader="Total duration and intensity" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <h1>A sitdown design </h1>
                <>
                    <Grid item xs={12}>
                        <DailiesStanineContourPlot />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                        <StepIntensityDonut data2={sedentaryIntensityDonutData} title2={"Sleep vs Activity"} subTitle2={"Comparison"} />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <DailiesStepsDistribution data={sedentaryScatterData} title={"Sedentary"} subTitle={"Total Inactivity"}/>
                    </Grid>
                </>
            </Box>
        </Card>
    );
}
