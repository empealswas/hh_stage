import {merge} from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import {Box, Card, CardHeader} from '@material-ui/core';
// utils
import {fNumber} from '../../../utils/formatNumber';
//
import {BaseOptionChart} from '../../charts';
import {useTheme} from "@material-ui/core/styles";
import {API, graphqlOperation} from "aws-amplify";
import {useContext, useEffect, useState} from "react";
import TotalGrowthBarChartSkeleton from "./TotalGrowthBarChartSkeleton";
import {UserContext} from "../../../App";

// ----------------------------------------------------------------------

export type PupilData = {
    pupilDisplayName: string,
    amountOfTrophies: number,
}

const topByRewardsQuery = `query MyQuery {
  listPupils(limit: 10000) {
    items {
      Attendances(filter: {wasRewarded: {eq: true}}) {
        items {
          wasRewarded
        }
      }
      id
      firstName
      lastName
    }
  }
}`
const teacherQuery = `query MyQuery($id: ID = "") {
  getTeacher(id: $id) {
    classrooms {
      items {
        classroom {
          pupils {
            items {
              pupil {
                Attendances(filter: {wasRewarded: {eq: true}}) {
                  items {
                    wasRewarded
                  }
                }
                id
                firstName
                lastName
              }
            }
          }
        }
      }
    }
  }
}`
export default function TopPupilsByRewardPiechrat() {
    const theme = useTheme();
    const [chartData, setChartData] = useState<any>(null);
    const [pupilsNames, setPupilsNames] = useState<any>([]);
    const user = useContext(UserContext);
    const getTopPupilsByTrophies = async () => {
        let pupils;
        if (user?.isAdmin()) {
        const result: any = await API.graphql(graphqlOperation(topByRewardsQuery));
            pupils = result.data.listPupils.items;
        }else{
            const result: any = await API.graphql(graphqlOperation(teacherQuery, {id: user?.email}));
            pupils = result.data.getTeacher.classrooms.items
                .map((item: any) => item.classroom)
                .flatMap((item: any) => item.pupils.items).
                map((item: any)=>item.pupil)


        }
         const pupilsWithTrophies = pupils.map((item:any) => {
            return {
                pupilDisplayName: `${item.firstName} ${item.lastName}`,
                amountOfTrophies: item.Attendances.items.length
            }
        }).sort((a: any, b: any) => b.amountOfTrophies - a.amountOfTrophies).slice(0, 5);

    const data: number [] = pupilsWithTrophies.map((house:any) => house.amountOfTrophies);
        setChartData([{data: data}])
        setPupilsNames(pupilsWithTrophies.map((item: any)=>item.pupilDisplayName))
    }
    useEffect(() => {
        getTopPupilsByTrophies()
    }, [])
    const chartOptions: any = merge(BaseOptionChart(), {
        stroke: {colors: [theme.palette.background.paper]},
        legend: {floating: true, horizontalAlign: 'center'},
        dataLabels: {enabled: true, dropShadow: {enabled: false}},
        tooltip: {
            marker: {show: false},
            y: {
                formatter: (seriesName: number) => fNumber(seriesName),
                title: {
                    formatter: (seriesName: number) => `${seriesName}`
                }
            }
        },
        plotOptions: {
            bar: {
                barHeight: '28%',
                distributed: true,
                horizontal: false,
                dataLabels: {
                    position: 'center'
                },
            }
        },
        xaxis: {
            categories: pupilsNames
        },
        yaxis: {
            labels: {

                show: false
            }
        },
    });
    if (!chartData) {
        return <TotalGrowthBarChartSkeleton/>;
    }
    return (
        <Card>
            <CardHeader title="Top Pupils by gained rewards"
                        subheader={'Rewards gained in ordinary lesson as well as PE lessons'}/>
            <Box sx={{mx: 3}} dir="ltr">
                <ReactApexChart type="bar" series={chartData} options={chartOptions} height={400}/>
            </Box>
        </Card>
    );
}
