import { Card, CardHeader, Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


export default function StanineLineChart(props: any) {

	const[plot, setPlot] = useState();
	useEffect(() => {
		const setStanine = async () => {
			if(props["data"]>0){
             let stanineValue = ""+props["data"];

			const dataPlot = {
				series: [
					{
						name: 'Stanine',
						data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
					}
				],
				options: {
					chart: {
						height: 350,
						type: 'line',
					},
					stroke: {
						width: 100,
						curve: 'smooth'
					},
					title: {
						text: props["subTitle"],
						align: 'left',
						style: { fontSize: "16px", color: '#666' }
					},
					annotations: {
						position: 'front',
						points: [
							{
								x: stanineValue,
								y: 1,
								fillColor: '#000000',
								marker: { size: 15 }
								// ,
								// label: {borderColor: '#000000', text: 'Ave Stanine'}
							}
						]
					},
					fill: {
						type: 'gradient',
						gradient: {
							shadeIntensity: 1,
							type: 'horizontal',
							opacityFrom: 1,
							opacityTo: 1,

							colorStops: [
								{ offset: 0, color: '#A50303', opacity: 0.7 },
								{ offset: 10, color: '#A50303', opacity: 0.7 },
								{ offset: 20, color: '#FD7208', opacity: 0.7 },
								{ offset: 30, color: '#FCE803', opacity: 0.7 },
								{ offset: 40, color: '#9DFC03', opacity: 0.7 },
								{ offset: 50, color: '#38AB03', opacity: 0.7 },
								{ offset: 60, color: '#02B647', opacity: 0.7 },
								{ offset: 70, color: '#02CAC3', opacity: 0.7 },
								{ offset: 80, color: '#0D65FD', opacity: 0.7 },
								{ offset: 90, color: '#020EF2', opacity: 0.7 },
								{ offset: 100, color: '#020EF2', opacity: 0.7 }
							]
						},
					},
					yaxis: {
						min: 0, max: 2,
						labels: { show: false }
					},
					xaxis: {
						categories: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', ''],
						labels: {
							show: true,
							offsetX: 0.5
						}
					}
				},

			};
			setPlot(dataPlot);
		}

		};
		setStanine();
	}, [props]);


	if (!plot) {
		return (
			<Card>
				<CardHeader title="Garmin Metrics Data" subheader="No data available" />
			</Card>
		);
	} else{
		console.log("stanine props")
		console.log(props);
		console.log(plot);
		// return (
		// 	<Card>
		// 		<CardHeader title="Garmin Metrics Data" subheader="No data available" />
		// 	</Card>
		// );
		return (
			<Card>
				<CardHeader title={props["title"]} subheader="" />
				<Box sx={{ p: 3, pb: 1 }} dir="ltr">
					<ReactApexChart options={plot.options} series={plot.series} type="line" height={350} />
				</Box>
			</Card>
		)
	 } //else {
	// 	return (
	// 		<Card>
	// 			<CardHeader title="Garmin Metrics Data" subheader="No data available" />
	// 		</Card>
	// 	);
	// }


	function getStanineColours(score: number): string[] {

		var brightCols: string[] = ['#742701', '#885201', '#7B9301', '#2E8D01', '#017927', '#017444', '#017973', '#01436F', '#010660'];
		var dullCols: string[] = ['#A50303', '#FD7208', '#FCE803', '#9DFC03', '#38AB03', '#02B647', '#02CAC3', '#0D65FD', '#020EF2'];
		var selectedColors: string[] = [];

		for (var counter = 0; counter < brightCols.length; counter++) {
			if (counter === score - 1) {
				selectedColors[counter] = "#8A8A8A"//brightCols[counter];
			} else {
				selectedColors[counter] = dullCols[counter];
			}
		}
		return selectedColors;
	}
}