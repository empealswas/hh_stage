import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Card, CardHeader, Box} from '@material-ui/core';
import {BaseOptionChart} from "../../charts";
import {ApexOptions} from "apexcharts";
//

// ----------------------------------------------------------------------



export default function ActivityLineChart() {
    var options: any = {

        chart: {
            id: 'chart2',
            type: 'line',
            height: 230,
            toolbar: {
                autoSelected: 'pan',
                show: false
            }
        },
        colors: ['#546E7A'],
        stroke: {
            width: 3
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        }
    };


    var optionsLine: any = {

        chart: {
            id: 'chart1',
            height: 130,
            type: 'area',
            brush:{
                target: 'chart2',
                enabled: true
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: new Date('19 Jun 2017').getTime(),
                    max: new Date('14 Aug 2017').getTime()
                }
            },
        },
        colors: ['#008FFB'],
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
            }
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            tickAmount: 2
        }
    };
    function generateDayWiseTimeSeries(baseval: any, count:any , yrange:any) {
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

    var data = generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 185, {
        min: 30,
        max: 90
    })
    return (
        <Card>
            <CardHeader title="Activity" subheader="(+43%) than last week"/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <div id="wrapper">
                    <div id="chart-line2"><ReactApexChart options={options} series={[
                        {
                            name: "series1",
                            data: data,
                        },
                    ]}
                                                          type="line" height={230}/></div>
                    <div id="chart-line"><ReactApexChart options={optionsLine} series={[
                        {
                            name: "series1",
                            data: data,
                        },
                    ]}
                                                         type="area" height={130}/></div>
                </div>
                {/*<ReactApexChart type="line" series={[*/}
                {/*    {*/}
                {/*        name: "High - 2013",*/}
                {/*        data: [28, 29, 33, 36, 32, 32, 33]*/}
                {/*    },*/}
                {/*    {*/}
                {/*        name: "Low - 2013",*/}
                {/*        data: [12, 11, 14, 18, 17, 13, 13]*/}
                {/*    }*/}
                {/*]} options={chartOptions} height={364} />*/}
            </Box>
        </Card>
    );
}
