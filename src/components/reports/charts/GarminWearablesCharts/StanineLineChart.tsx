import { Card, CardHeader, Box } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';


export default function StanineLineChart(props: any) {

    if (!props) {
        return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
        );
    } else {

        const plot = {
            series: [
                {
                    name: 'Stanine',
                    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: 100,
                    curve: 'smooth'
                },
                title: {
                    text: props["subTitle"],
                    align: 'left',
                    style: { fontSize: "16px", color: '#666' }
                },
                annotations: {
                    position: 'front',
                    points: [
                        {
                            x: props["data"] + 1,
                            y: 1,
                            fillColor: '#000000',
                            marker: { size: 10 }
                            // ,
                            // label: {borderColor: '#000000', text: 'Ave Stanine'}
                        }
                    ]
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        type: 'horizontal',
                        opacityFrom: 1,
                        opacityTo: 1,

                        colorStops: [
                            { offset: 0, color: '#A50303', opacity: 1 },
                            { offset: 10, color: '#A50303', opacity: 1 },
                            { offset: 20, color: '#FD7208', opacity: 1 },
                            { offset: 30, color: '#FCE803', opacity: 1 },
                            { offset: 40, color: '#9DFC03', opacity: 1 },
                            { offset: 50, color: '#38AB03', opacity: 1 },
                            { offset: 60, color: '#02B647', opacity: 1 },
                            { offset: 70, color: '#02CAC3', opacity: 1 },
                            { offset: 80, color: '#0D65FD', opacity: 1 },
                            { offset: 90, color: '#020EF2', opacity: 1 },
                            { offset: 100, color: '#020EF2', opacity: 1 }
                        ]
                    },
                },
                yaxis: {
                    min: 0, max: 2,
                    labels: { show: false }
                },
                xaxis: {
                    categories: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', ''],
                    labels: {
                        show: true,
                        offsetX: 0.5
                    }
                }
            },


        };
        // }

        return (
            <Card>
                <CardHeader title={ props["title"]} subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ReactApexChart options={plot.options} series={plot.series} type="line" height={350} />
                </Box>
            </Card>
        )
    }

    // function generateRadialBars(props: ApexRadialGraphModel ) {

    //   var adjustedData = new ApexRadialGraphModel (0,0,0,0);
    //   adjustedData.active = parseFloat((props.active/ 60 * 100).toPrecision(2));
    //   adjustedData.sleep = parseFloat((props.sleep/ 540 * 100).toPrecision(2));
    //   adjustedData.steps = parseFloat((props.steps/ 5000 * 100).toPrecision(2));
    //   adjustedData.sedentary = parseFloat((props.sedentary/ 240 * 100).toPrecision(2));
    //   return adjustedData
    // };

    // function getDataColour(value: number): string {

    //   if(value >= 50 && value < 69){
    //     return '#f29407';
    //   } else if (value >= 70 && value< 99 ){
    //     return '#f29407';
    //   } else if (value >= 100){
    //     return '#0713f2';
    //   } else {
    //     return '#f25207';
    //   }
    // }

    // function getSedentaryDataColour(value: number): string {

    //   if ( value < 39 ) {
    //     return '#0713f2';
    //   } else if(value >= 40 && value < 69 ){
    //     return '#f29407';
    //   } else if (value >= 70 && value < 99 ){
    //     return '#f29407';
    //   } else if (value >= 100){
    //     return '#f25207';
    //   } else {
    //     return 'grey';
    //   }
    // }

    function getStanineColours(score: number): string[] {

        var brightCols: string[] = ['#742701', '#885201', '#7B9301', '#2E8D01', '#017927', '#017444', '#017973', '#01436F', '#010660'];
        var dullCols: string[] = ['#A50303', '#FD7208', '#FCE803', '#9DFC03', '#38AB03', '#02B647', '#02CAC3', '#0D65FD', '#020EF2'];
        var selectedColors: string[] = [];

        for (var counter = 0; counter < brightCols.length; counter++) {
            if (counter === score - 1) {
                selectedColors[counter] = "#8A8A8A"//brightCols[counter];
            } else {
                selectedColors[counter] = dullCols[counter];
            }
        }
        return selectedColors;
    }
}