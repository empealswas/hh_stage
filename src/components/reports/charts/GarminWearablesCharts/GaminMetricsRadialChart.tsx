// import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Box } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { ApexRadialGraphModel } from '../../../../models/garminDataModels/ApexRadialGraphData';

export default function GarminMetricsRadialChart(props: ApexRadialGraphModel) {

    if (!props) {
        return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
        );
    } else {
        var processedData = generateRadialBars(props);

        const plot = {
            series: [processedData.active, processedData.sedentary, processedData.sleep, processedData.steps],
            options: {
              chart: {
                height: 390,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  startAngle: 0,
                  endAngle: 270,
                  hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: { show: false, },
                    value: { show: false, }
                  }
                }
              },
              colors: [getDataColour(processedData.active), getSedentaryDataColour(processedData.sedentary), getDataColour(processedData.sleep), getDataColour(processedData.steps)],
              labels: ['% Active', '% Sedentary', '% Sleep', '% Steps'],
              legend: {
                show: true, floating: true,
                fontSize: '12px', position: 'left',
                offsetX: 50, offsetY: 15,
                labels: {
                  useSeriesColors: false,
                },
                markers: {
                  size: 0
                },
                formatter: function(seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
                itemMargin: { vertical: 3 }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: { show: false }
                }
              }]
            },
          
          
          };
        
        return (
            <Card>
                <CardHeader title="User Mertics" subheader="Percentage target reached from Wearable Data" />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart options={plot.options} series={plot.series} type="radialBar" height={350} />
                </Box>
            </Card>
        )
    }

    function generateRadialBars(props: ApexRadialGraphModel ) {
      
      var adjustedData = new ApexRadialGraphModel (0,0,0,0);
      adjustedData.active = parseFloat((props.active/ 60 * 100).toPrecision(2));
      adjustedData.sleep = parseFloat((props.sleep/ 540 * 100).toPrecision(2));
      adjustedData.steps = parseFloat((props.steps/ 5000 * 100).toPrecision(2));
      adjustedData.sedentary = parseFloat((props.sedentary/ 240 * 100).toPrecision(2));
      return adjustedData
    };

    function getDataColour(value: number): string {

      if(value >= 50 && value < 69){
        return '#f29407';
      } else if (value >= 70 && value< 99 ){
        return '#f29407';
      } else if (value >= 100){
        return '#0713f2';
      } else {
        return '#f25207';
      }
    }

    function getSedentaryDataColour(value: number): string {

      if ( value < 39 ) {
        return '#0713f2';
      } else if(value >= 40 && value < 69 ){
        return '#f29407';
      } else if (value >= 70 && value < 99 ){
        return '#f29407';
      } else if (value >= 100){
        return '#f25207';
      } else {
        return 'grey';
      }
    }
}