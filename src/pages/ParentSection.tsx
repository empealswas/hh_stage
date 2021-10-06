// material
import {Card, Container, CardMedia, CardHeader} from '@material-ui/core';
// components
import Page from '../components/Page';
import {Avatar, Button, CardActions, CardContent, Stack, Typography} from "@mui/material";
import ChildTabs from "../components/parent/tabs";
import ChildOverview from "../components/parent/ChildOverview";
import AttendancePieChart from "../components/reports/charts/AttendancePieChart";
import React, {useContext, useEffect, useState} from "react";
import {Carousel} from 'react-responsive-carousel';
import {UserContext} from "../App";
import {Pupil} from "../API";
import {API, graphqlOperation} from "aws-amplify";
import LinearProgressBottom from "../utils/LinearProgressBottom";
//

const query = `query MyQuery($id: ID = "") {
  getParent(id: $id) {
    children {
      items {
        Pupil {
          id
          firstName
          lastName
          school {
            name
          }
          schoolHouse {
            name
          }
        }
      }
    }
  }
}`
const ParentSection = () => {
    const parent = useContext(UserContext);
    const [children, setChildren] = useState<Pupil[] | null>(null);
    useEffect(() => {
        const getChildren = async () => {
            console.log(parent?.email);
            const result: any = await API.graphql(graphqlOperation(query, {id: parent?.email}))
            setChildren(result.data.getParent.children.items.map((item: any) => item.Pupil));
        }
        getChildren()
        return () => {

        };
    }, []);
    if (children === null) {
        return (<LinearProgressBottom/>)
    }
    if (children.length === 0) {
        return (<Container>
            <Typography variant={'h2'}>It seems that you don't have any children attached to you. Please contact your
                school administrator</Typography>
        </Container>)
    }

    return (
        // @ts-ignore
        <Page>
            <Container maxWidth={false}>
                <Carousel autoPlay={false}
                    // selectedItem={1}
                          showArrows={true}
                          infiniteLoop={true}
                          showStatus={false}
                          showThumbs={true}
                          showIndicators={false}>
                    {children?.map(child => <ChildOverview pupil={child}/>)}
                </Carousel>
            </Container>
        </Page>
    );
}
export default ParentSection;