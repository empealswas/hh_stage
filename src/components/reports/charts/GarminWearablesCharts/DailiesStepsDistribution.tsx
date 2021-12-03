import { Card, CardHeader, Box } from "@material-ui/core";
import { useState } from "react";
import ScatterSwitch from "../../../_garmin-selectors/scatter-switch";
import MetricDistributionPlot from "./MetricDistributionPlot";
import MetricDistributionTable from "./MetricDistributionTable";

export default function DailiesStepsDistribution(props: any) {
  // const [scatterPlotSwitchState, setScatterPlotSwitchState] = useState("plot");

  if (props["data"].length === 0) {
    return (
      <Card>
        <CardHeader title="Garmin Metrics Data" subheader="No data available" />
      </Card>
    );
  } else {
    // if (scatterPlotSwitchState === "table") {
    //   return (
    //     <Card>
    //       <CardHeader title={props["title"]} subheader={props["subTitle"]} />
    //       <ScatterSwitch totAveChanger={setScatterPlotSwitchState} switchVal={scatterPlotSwitchState}/>
    //       <Box sx={{ p: 3, pb: 1 }} dir="ltr">
    //         <MetricDistributionTable tableData={props["tableData"]}/>
    //       </Box>
    //     </Card>
    //   );
    // } else {
      return (
        <Card>
          <CardHeader title={props["title"]} subheader={props["subTitle"]} />
          {/* <ScatterSwitch totAveChanger={setScatterPlotSwitchState} switchVal={scatterPlotSwitchState}/> */}
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <MetricDistributionPlot data={props["data"]} title={props["title"]} subTitle={props["subTitle"]} />
          </Box>
        </Card>
      );
    // }
  }
}


      // var dataSeries = props["data"];
      // const plot = {
      //   series: [...dataSeries],
      //   options: {
      //     chart: {
      //       height: 350,
      //       type: "scatter",
      //       zoom: {
      //         type: "xy",
      //       },
      //     },
      //     dataLabels: {
      //       enabled: false,
      //     },
      //     grid: {
      //       xaxis: {
      //         lines: {
      //           show: true,
      //         },
      //       },
      //       yaxis: {
      //         lines: {
      //           show: true,
      //         },
      //       },
      //     },
      //     xaxis: {
      //       type: "datetime",
      //     },
      //     yaxis: {},
      //   },
      // };


  {/* <ReactApexChart options={plot.options} series={plot.series} type="scatter" height={338} /> */}