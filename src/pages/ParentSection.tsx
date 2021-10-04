// material
import {Card, Container, CardMedia, CardHeader} from '@material-ui/core';
// components
import Page from '../components/Page';
import {Avatar, Button, CardActions, CardContent, Stack, Typography} from "@mui/material";
import MyTabs from "../components/parent/tabs";
import ChildOverview from "../components/parent/ChildOverview";
import AttendancePieChart from "../components/reports/charts/AttendancePieChart";
import React from "react";
import {Carousel} from 'react-responsive-carousel';
//


const ParentSection = () => {

    return (
        // @ts-ignore
        <Page>
            <Container maxWidth={false}>
                <Carousel autoPlay={false}
                          showArrows={true}
                          infiniteLoop={true}
                          showStatus={false}
                          showThumbs={false}
                          showIndicators={false}>
                    <ChildOverview/>
                    <ChildOverview/>
                </Carousel>
            </Container>
        </Page>
    );
}
export default ParentSection;