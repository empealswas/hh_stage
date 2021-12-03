import ReactApexChart from 'react-apexcharts';

export default function DailyMileChart(props: any) {

    console.log(props);
    const chartData = {
        type: 'line',
        height: 90,
        options: {
            chart: {
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ['#fff'],
            fill: {
                type: 'solid',
                opacity: 1
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            tooltip: {
                theme: 'dark',
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: 'Total Order'
                },
                marker: {
                    show: false
                }
            }
        },
        series: [
            {
                name: 'series1',
                data: props["trace"]
            }
        ]
    };

  
    return (
                <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={90}/>
    );
}
