import { Card, CardHeader, Box } from '@material-ui/core';

import ReactApexChart from 'react-apexcharts';


export default function DailiesStepsDistribution(props: any) {


    if (props['data'].length===0) {
        return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
        );
    } else {
      var dataSeries = props['data'];
        const plot = {
            series: [...dataSeries],
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
                <CardHeader title={props["title"]} subheader={props["subTitle"]} />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ReactApexChart options={plot.options} series={plot.series} type="scatter" height={270} />

                </Box>
            </Card>
        )
    }

  //   function generateGarminDayWiseTimeSeries(inData: any) {
  //     var i = 0;
  //     var series = [];
    
  //     while (i < inData.length) {
  //         var x = new Date(inData[i].period).getTime();
  //         var y = inData[i].totalSteps
  //         series.push([x, y]);
  //         i++;
  //     }
  //     return series;
  // }
}