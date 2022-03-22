import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import {format, parseISO, subDays} from "date-fns";
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";
import {useTheme} from "@mui/material/styles";
import {TerraDataContext} from "./ChildActivitiesSummary";
import {BaseOptionChart} from "../../../../../components/chart";
import {Pupil, User} from "../../../../../API";
import {fShortenNumber} from "../../../../../utils/formatNumber";
import {Box, Card, CardHeader, Skeleton} from "@mui/material";
import {SkeletonKanbanColumn, SkeletonPost, SkeletonProductItem} from "../../../../../components/skeleton";
import ActivtityChartSkeleton from "../../../../../components/skeleton/ActivtityChartSkeleton";
import {getWearablesData, TerraWearables} from "../../../../../apiFunctions/apiFunctions";
//

// ----------------------------------------------------------------------
//

//example of chart data
const CHART_DATA = [
    {
        name: 'Number of Steps',
        type: 'column',
        data: [6000, 5400, 11000, 8000, 5000, 10000, 1500]
    },
];
const childQuery = `query MyQuery {
  listUsers(limit: 100000) {
    items {
      terraId
    }
  }
}`;
export default function StepsChart(props: { userId: string }) {
    const terraData = useContext(TerraDataContext);
    let basedOptions = BaseOptionChart();
    const theme = useTheme();

    const [averageData, setAverageData] = useState<any>(null);
    useEffect(() => {
        const getAverage = async () => {
            const result: any = await API.graphql(graphqlOperation(childQuery));
            const terraIds = result.data.listUsers?.items.filter((item: User) => !!item.terraId).map((item: Pupil) => item.terraId);
            const data: TerraWearables = {
                idList: terraIds,
                grouping: "group",
                category: "daily",
                subtype: "steps",
                period: "day",
                startDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
                endDate: format(new Date(), 'yyyy-MM-dd'),
                returnType: "average"
            };
            console.log(data);
            const wearablesResult: any = await getWearablesData(data);
            console.log('Wearables', wearablesResult)
                setAverageData(wearablesResult?.data ?? []);
        }
        getAverage();
        return () => {

        };
    }, []);


    if (!terraData) {
        return (<ActivtityChartSkeleton/>);

    }
    const chartOptions: any = merge(basedOptions, {
        stroke: {width: [5, 3]},
        colors: [theme.palette.success.light, theme.palette.warning.light],
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        labels: terraData?.data?.map(value =>
            `${format(parseISO(value.metadata.start_time), "eee do")}`
        ) ?? averageData?.data?.map((value: any) =>
            `${format(parseISO(value.date), "eee do")} `),
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return fShortenNumber(value);
                }
            },
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: (y: any) => {
                    if (typeof y !== 'undefined') {
                        return `${y?.toFixed(0) ?? 'none'} steps`;
                    }
                    return y;
                }
            }
        }
    });
    return (
        <Card>
            <CardHeader title="Steps" subheader={format(new Date(), 'MMMM')}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={[{
                    data: terraData?.data?.map(value => value.distance_data.steps) ?? [], name: 'Number of Steps',
                    type: 'line'
                }, {data: averageData?.map((item: any) => item.value) ?? [], name: 'Average', type: 'line'}]}
                                options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
