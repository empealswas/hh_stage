import ReactApexChart from 'react-apexcharts';
import {useState, useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import {Card, CardHeader} from "@mui/material";

export default function StepsLeagueBarChart({data}: { data: any }) {

    const [stepsData, setStepsData] = useState<any>(data);

    let options: any = {
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: stepsData.map((item: any) => item.name)
        }
    };

    let series: any = [{
        data: stepsData.map((item: any) => Math.floor(item.value))
    }];

    useEffect(() => {
        setStepsData(data);
        return () => {};
    }, [data]);

    return (
        <ReactApexChart type="bar" options={options} series={series} />
    );

}
