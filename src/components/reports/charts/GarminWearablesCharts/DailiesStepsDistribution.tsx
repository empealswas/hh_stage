import { Card, CardHeader, Box } from '@material-ui/core';

import ReactApexChart from 'react-apexcharts';
// import { GarminDailiesSummaryModel } from '../../../../models/garminDataModels/garminDailiesModel';

export default function DailiesStepsDistribution(props: any) {

    if (props['data'].length==0) {
        return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
        );
    } else {
      // get a list of the unique ids from the data passed into the component
        const uniqueIds = [...Array.from(new Set(props['data'].map(item => item.garminId)))];

        // create an array to store the data series for the scatterplot, loop through the unique ids
        // filter the main data by id
        // create a scatter trace for each id with 'period' and 'total steps' using function "generateGarminDayWiseTimeSeries()"
        // which converts the date to a timestamp for plotting purposes
        
        var dataSeries: any[]=[];
        for(var ids of uniqueIds){
          const processedData  = props['data']
          .filter((item) => item.garminId==ids);
          
          let result = processedData.map(({period, totalSteps}) => ({period, totalSteps}));
          var name = ids;
          var data = generateGarminDayWiseTimeSeries(result);
          dataSeries.push({name, data});
        };
        console.log(dataSeries);
        const plot = {
            series: dataSeries,
            
            options: {
              chart: {
                height: 350,
                type: 'scatter',
                zoom: {
                  type: 'xy'
                }
              },
              dataLabels: {
                enabled: false
              },
              grid: {
                xaxis: {
                  lines: {
                    show: true
                  }
                },
                yaxis: {
                  lines: {
                    show: true
                  }
                },
              },
              xaxis: {
                type: 'datetime',
              },
              yaxis: { }
            },
        };

        return (
            <Card>
                <CardHeader title="Steps" subheader="Total steps" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ReactApexChart options={plot.options} series={plot.series} type="scatter" height={350} />

                </Box>
            </Card>
        )
    }

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
}