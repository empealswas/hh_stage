import { Card, CardHeader, Box } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { ApexRadialGraphModel } from '../../../../models/garminDataModels/ApexRadialGraphData';

export default function DailiesStanineContourPlot(props: any) {

    if (!props) {
        return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
        );
    } else {
      console.log(props["data"]);
        var cellColors = getStanineColours(props["data"]);
        const plot = {
            series: [
                {
                name: 'Steps',
                data: [1,2,3,4,5,6,7,8,9]
              }
            ],
            options: {
              chart: {
                height: 350,
                type: 'heatmap',
              },
              plotOptions: {
                heatmap: {
                  shadeIntensity: 1.0,
                  radius: 0,
                  useFillColorAsStroke: true,
                  colorScale: {
                    ranges: [
                        {
                            from: 1, to: 1, name: 'one', color: cellColors[0]
                          },
                          {
                            from: 2, to: 2, name: 'two', color: cellColors[1]
                          },
                          {
                            from: 3, to: 3, name: 'three', color: cellColors[2]
                          },
                          {
                            from: 4, to: 4, name: 'four', color: cellColors[3]
                          },
                          {
                            from: 5, to: 5, name: 'five', color: cellColors[4]
                          },
                          {
                            from: 6, to: 6, name: 'six', color: cellColors[5]
                          },
                          {
                            from: 7, to: 7, name: 'seven', color: cellColors[6]
                          },
                          {
                            from: 8, to: 8, name: 'eight', color: cellColors[7]
                          },
                          {
                            from: 9, to: 8, name: 'nine', color: cellColors[8]
                          }
                    ]
                  }
                }
              },
              markers: {
                  discrete: [{
                    seriesIndex: 0,
                    dataPointIndex: 2,
                    fillColor: '#000000',
                    strokeColor: '#000000',
                    size: 5,
                    shape: "circle"
                  }]

              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                width: 1
              },
              title: {
                text: 'HeatMap Chart with Color Range'
              },
            },
          
          
          };
        
        return (
            <Card>
                <CardHeader title="Steps Stanines" subheader="" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart options={plot.options} series={plot.series} type="heatmap" height={175} />
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

    function getStanineColours(score: number):string []{

        var brightCols: string[] = [ '#742701', '#885201', '#7B9301', '#2E8D01', '#017927', '#017444', '#017973', '#01436F', '#010660'];
        var dullCols: string[] = [ '#A50303', '#FD7208', '#FCE803', '#9DFC03', '#38AB03', '#02B647', '#02CAC3', '#0D65FD', '#020EF2'];
        var selectedColors: string []=[];

        for(var counter = 0; counter < brightCols.length; counter++) {
            if(counter===score-1){
                selectedColors[counter]=  "#8A8A8A"//brightCols[counter];
            } else {
                selectedColors[counter]= dullCols[counter];
            }
        }
        return selectedColors;
    }
}