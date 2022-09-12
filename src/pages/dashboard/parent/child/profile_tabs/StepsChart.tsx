import {merge,} from 'lodash';
import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from "apexcharts";
import {useContext, useEffect, useState} from "react";
import {format, parseISO, subDays} from "date-fns";
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";
import {useTheme} from "@mui/material/styles";
import {BaseOptionChart} from "../../../../../components/chart";
import {Pupil, User} from "../../../../../API";
import {fShortenNumber} from "../../../../../utils/formatNumber";
import {Box, Card, CardHeader, Skeleton} from "@mui/material";
import {SkeletonKanbanColumn, SkeletonPost, SkeletonProductItem} from "../../../../../components/skeleton";
import ActivtityChartSkeleton from "../../../../../components/skeleton/ActivtityChartSkeleton";
import {getWearablesData, TerraWearables} from "../../../../../apiFunctions/apiFunctions";

const userQuery = `query MyQuery($id: ID = "") {
  getUser(id: $id) {
    organizations {
      items {
        organization {
          name
          members {
            items {
              user {
                terraId
              }
            }
          }
        }
      }
    }
  }
}`;

export default function StepsChart(props: { user: User }) {

    let basedOptions = BaseOptionChart();
    const theme = useTheme();

    const [seriesData, setSeriesData] = useState<any>(null);

    const getUserData = async (terraId: any) => {
        const data: TerraWearables = {
            idList: [terraId],
            grouping: "user",
            category: "daily",
            subtype: "steps",
            period: "day",
            startDate: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            endDate: format(new Date(), 'yyyy-MM-dd'),
            returnType: "total"
        };
        const wearablesResult: any = await getWearablesData(data);
        return wearablesResult?.data ?? [];
    };

    const getAverageData = async (terraIds: any) => {
        const data: TerraWearables = {
            idList: terraIds,
            grouping: "group",
            category: "daily",
            subtype: "steps",
            period: "day",
            startDate: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
            endDate: format(new Date(), 'yyyy-MM-dd'),
            returnType: "average"
        };
        const wearablesResult: any = await getWearablesData(data);
        return wearablesResult?.data ?? [];
    };

    const getResults = async () => {
        let theSeriesData = [];
        // get user data
        let terraId = props.user.terraId;
        let userData = null;
        if (terraId) userData = await getUserData(terraId);
        // push user data to series
        theSeriesData.push({data: userData?.map((item: any) => item.value) ?? [], name: 'User', type: 'line'});
        // get average data for each organization
        let result: any = await API.graphql(graphqlOperation(userQuery, {id: props.user.id}));
        let organizations = result?.data?.getUser?.organizations?.items ?? [];
        for (let item of organizations) {
            // get terraIds
            let members = item?.organization?.members?.items ?? [];
            let terraIds: any = [];
            for (let item of members) {
                let terraId = item.user.terraId;
                if (terraId != null) terraIds.push(terraId);
            }
            // get average data
            let averageData: any = await getAverageData(terraIds);
            // push average data to series
            theSeriesData.push({data: averageData?.map((item: any) => item.value) ?? [], name: item.organization.name, type: 'line'});
        }
        setSeriesData(theSeriesData);
    };

    useEffect(() => {
        getResults();
        return () => {};
    }, []);

    if (!seriesData) {
        return (<ActivtityChartSkeleton/>);
    }

    const getChartDates = () => {
        if (seriesData == null || seriesData.length == 0) return [];
        let dateCount = seriesData[1].data.length;
        if (dateCount == 0) {
            return [];
        }
        else {
            let currentDate = new Date();
            let dates = [];
            for (let i = 0; i < dateCount; i++) {
                dates.push(subDays(currentDate, dateCount - 1 - i));
            }
            return dates;
        }
    };

    const chartOptions: any = merge(basedOptions, {
        stroke: {width: [5, 3]},
        plotOptions: {bar: {columnWidth: '11%', borderRadius: 4}},
        labels: getChartDates().map((date: any) =>
            `${format(date, "eee do")}`
        ),
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
            <CardHeader title="Steps" subheader={'Last 7 days'}/>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={seriesData}
                                options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}
