import { Card, CardHeader, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function StepIntensityDonut(props: any) {
    const [seriesData, setSeriesData] = useState<number[]>([]);

    useEffect(() => {
        const setData = async () => {
            if(props["data2"]){
                if (props["data2"].length > 0) {
                    setSeriesData([props["data2"][0], props["data2"][1], props["data2"][2]]);
                }
            }
        }
        setData();
    }, [props]);
if(props['data2']){
    if (props['data2'].length===0) {
        return (
            <Card>
                <CardHeader title="Garmin Metrics Data" subheader="No data available" />
            </Card>
        );
    } else {
        if(seriesData.length >0 ){
            const plot = {
                series: [seriesData[0], seriesData[1], seriesData[2]],
                options: {
                    chart: {
                        type: 'donut',
                    },
                    labels: [props["labels"][0], props["labels"][1], props["labels"][2]],//["Regular", "Moderate", "Vigorous"],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
    
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
    
            };
            return (
                <Card>
                    <CardHeader title={props["title2"]} subheader={props["subTitle2"]} />
                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                        <ReactApexChart type="donut" series={plot.series} options={plot.options} height={350} />
                    </Box>
                </Card>
            );
        } else {
            const plot = {
                series: [30, 40, 30], //[seriesData[0], seriesData[1], seriesData[2]]
                options: {
                    chart: {
                        type: 'donut',
                    },
                    labels: ["", "", ""],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
    
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
    
            };
            return (
                <Card>
                    <CardHeader title={props["title2"]} subheader={props["subTitle2"]} />
                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                        <ReactApexChart type="donut" series={plot.series} options={plot.options} height={350} />
                    </Box>
                </Card>
            );
        }



    }
} else {
    return (
        <Card>
            <CardHeader title="Garmin Metrics Data" subheader="No data available" />
        </Card>
    );
}
}