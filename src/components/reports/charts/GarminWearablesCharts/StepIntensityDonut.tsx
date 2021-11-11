import { Card, CardHeader, Box } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { GarminDailiesSummaryModel } from '../../../../models/garminDataModels/garminDailiesModel';

export default function StepIntensityDonut(props: GarminDailiesSummaryModel) {

    console.log("StepIntensityDonut");
    console.log(props);
    
    return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
    );
    // if (!props) {
    //     return (
    //         <Card>
    //             <CardHeader title="Garmin Metrics Data" subheader="No data available" />
    //         </Card>
    //     );
    // } else {

    //     var processedData = generateDataSegments(props);

    //     const plot = {
    //         series: [processedData[0], processedData[1], processedData[2]],

    //         options: {
    //             chart: {
    //                 type: 'donut',
    //             },
    //             labels: ["Regular", "Moderate", "Vigorous"],
    //             responsive: [{
    //                 breakpoint: 480,
    //                 options: {
    //                     chart: {
    //                         width: 200
    //                     },

    //                     legend: {
    //                         position: 'bottom'
    //                     }
    //                 }
    //             }]
    //         },


    //     };

    //     return (
    //         <Card>
    //             <CardHeader title="Steps Intensity" subheader="Intensity Propotion" />
    //             <Box sx={{ p: 3, pb: 1 }} dir="ltr">
    //                 <ReactApexChart options={plot.options} series={plot.series} type="donut" height={350} />

    //             </Box>
    //         </Card>
    //     )
    // }

    // function generateDataSegments(props: GarminDailiesSummaryModel) {

    //     var duration = props.stepDuration - (props.moderateIntensity + props.vigorousIntensity);
    //     var percReg = parseFloat((duration / props.stepDuration * 100).toPrecision(2));
    //     var percMod = parseFloat((props.moderateIntensity / props.stepDuration * 100).toPrecision(2));
    //     var percVig = parseFloat((props.vigorousIntensity / props.stepDuration * 100).toPrecision(2));

    //     return [percReg, percMod, percVig];
    // };

}