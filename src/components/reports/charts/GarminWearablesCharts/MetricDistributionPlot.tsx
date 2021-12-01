import React, { useState, useEffect } from 'react';

import { API, graphqlOperation } from "aws-amplify";
import { GarminDailiesSummaryModel } from "../../../../models/garminDataModels/garminDailiesModel";
import { GarminQueryData } from '../../../../models/garminDataModels/garminQueryData';
import { listPupils } from '../../../../graphql/queries';
import { Card, CardHeader, Box } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { BarPlotYAxisModel } from '../../../../models/garminDataModels/apexChartsScatterDataPair';

function MetricDistributionPlot(props:any) {

    var dataSeries = props["data"];
    const plot = {
      series: [...dataSeries],
      options: {
        chart: {
          height: 350,
          type: "scatter",
          zoom: {
            type: "xy",
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {},
      },
    };
    return (


        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart
            options={plot.options}
            series={plot.series}
            type="scatter"
            height={338}
          />
        </Box>

    );
}
export default MetricDistributionPlot;