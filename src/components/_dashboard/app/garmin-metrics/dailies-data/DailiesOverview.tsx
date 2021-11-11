import { Card, CardHeader, Grid } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useEffect, useState } from "react";
import { ApexChartsScatterSeriesModel, ApexChartsScatterTraceModel, BarPlotYAxisModel, ScatterPlotTraceModel } from "../../../../../models/garminDataModels/apexChartsScatterDataPair";
import { ApexRadialGraphModel } from "../../../../../models/garminDataModels/ApexRadialGraphData";
import { GarminDailiesSummaryModel } from "../../../../../models/garminDataModels/garminDailiesModel";
import { GarminQueryData } from "../../../../../models/garminDataModels/garminQueryData";
import DailiesStanineContourPlot from "../../../../reports/charts/GarminWearablesCharts/DailiesStanineContourPlot";
import DailiesStepsDistribution from "../../../../reports/charts/GarminWearablesCharts/DailiesStepsDistribution";
import StepIntensityDonut from "../../../../reports/charts/GarminWearablesCharts/StepIntensityDonut";

export default function DailiesOverview(props: any, props2: any){

    // set up query url seqments
    const dailiesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/dates";
    const dailiesZvaluesBaseUrl: string = "https://analytics.healthyhabits.link/api/garminDailies/z-values/dates";
    const startUrl: string = "/start/";
    const endUrl: string = "/end/";
    const periodUrl: string = "/period/";
    const groupedByUrl: string = "/groupedby/"

    // const [dailiesZvalue, setDailiesZvalue] = useState<GarminDailiesSummaryModel[] | null>(null);
    // const [dailiesDataGroup, setDailiesGroup] = useState<GarminDailiesSummaryModel[] | null>(null);
    const [dailiesDataUser, setDailiesUser] = useState<GarminDailiesSummaryModel[]>([]);
    const [dailiesScatterData, setDailiesScatterData] = useState<ScatterPlotTraceModel[] >([]);

    
    const dailesDataQuery = dailiesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + props["grouping"];
    // const dailiesStanineQuery = dailiesZvaluesBaseUrl + startUrl + props["startDate"] + endUrl + props["endDate"] + periodUrl + props["timePeriod"] + groupedByUrl + props["grouping"];
    
    var radialGraphData = new ApexRadialGraphModel(0, 0, 0, 0);
    var stepsIntensityData!: GarminDailiesSummaryModel;
    // var userDailies: GarminDailiesSummaryModel[] = [];



useEffect(() => {

        const getData = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            if(props['idList']){
            var raw = JSON.stringify(props['idList'].id);

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            // send request
            fetch(dailesDataQuery, requestOptions)
                .then(response => response.text())
                .then(result => {
                    if(result != null){
                    var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
                    setDailiesUser(garminData);
                }
                })
                .catch(error => console.log('error', error));
        }
    }
        getData();
    }, []);

    useEffect(() => {
        // let isMounted = true;   
        const prepScatterPlotData = async() => {

            const uniqueIds = [...Array.from(new Set(dailiesDataUser.map(item => item.garminId)))];

            var dataSeries: ScatterPlotTraceModel[]=[];
            for(var ids of uniqueIds){
                
                const processedData  = dailiesDataUser.filter(
                    (item) => {
                        return item.garminId === ids;
                    }
                    );
                
                let result = processedData.map(({period, totalSteps}) => ({period, totalSteps}));
                
                if(ids==null){
                    var name = "";
                } else {
                    var name = ids;
                }
                var data = generateGarminDayWiseTimeSeries(result);
                var newTrace = new ScatterPlotTraceModel(name, data);
                dataSeries.push(newTrace);

              };
              setDailiesScatterData(dataSeries);
        }
        prepScatterPlotData();
        
        // console.log(dailiesScatterData);
        // return () => { isMounted = false }; 
    }, [dailiesDataUser]);
    // ///////////////////////////////////
    // /////  get dailies group data /////
    // ///////////////////////////////////
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

    //         // send request
    //         fetch(dailesDataQuery, requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 var garminData: GarminDailiesSummaryModel[] = JSON.parse(result);
    //                 setDailiesGroup(garminData);
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    // }
    //     getData();
    // }, []);

    // if (dailiesDataGroup) {
    //     radialGraphData.steps = dailiesDataGroup[dailiesDataGroup.length - 1].totalSteps;
    //     stepsIntensityData = dailiesDataGroup[dailiesDataGroup.length - 2];
    // }
    // ;



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

    console.log("dailiesScatterData");
    console.log(dailiesScatterData);
    return (
        <Card >
            <CardHeader title="Steps" subheader="Total duration and intensity" />
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <h1>A grand design </h1>
                <h3>start adding plot views below</h3>
                <>
                    <Grid item xs={12}>
                        <DailiesStanineContourPlot/>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                        <StepIntensityDonut {...stepsIntensityData} />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <DailiesStepsDistribution data={dailiesScatterData}/>
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