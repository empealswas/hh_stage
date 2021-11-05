import { Card, CardHeader, Box } from '@material-ui/core';

import ReactApexChart from 'react-apexcharts';
import { GarminDailiesSummaryModel } from '../../../../models/garminDataModels/garminDailiesModel';

export default function DailiesStepsDistribution(props: any) {



    if (props['data'].length==0) {

        return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
        );
    } else {
  

    
        // const idList = [... new Set(props.map(item => item.garminId))];
        console.log("idList");

        console.log(props['data']);
        let n: typeof props;
        
        const unique = [...Array.from(new Set(props['data'].map(item => item.garminId)))];
        console.log(unique);
        // var processedData = generateDataSegments(props);

        const plot = {
            series: [{
                name: 'TEAM 1',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                  min: 10,
                  max: 60
                })
              },
              {
                name: 'TEAM 2',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                  min: 10,
                  max: 60
                })
              },
              {
                name: 'TEAM 3',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
                  min: 10,
                  max: 60
                })
              },
              {
                name: 'TEAM 4',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
                  min: 10,
                  max: 60
                })
              },
              {
                name: 'TEAM 5',
                data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
                  min: 10,
                  max: 60
                })
              },
            ],
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
              yaxis: {
                max: 70
              }
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


    function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
}