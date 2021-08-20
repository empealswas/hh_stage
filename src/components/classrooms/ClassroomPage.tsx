import React from 'react';
import {useParams} from "react-router-dom";
import {Pupil, Teacher} from "../../API";
import {Connect} from "aws-amplify-react";
import {graphqlOperation} from "aws-amplify";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import Typography from "@material-ui/core/Typography";
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PupilsSearchList from "./PupilsSearchList";
import TeachersSearchList from "./TeachersSearchList";
import {useTheme} from "@material-ui/core/styles";
import {Container, Stack} from "@material-ui/core";

const query = `query MyQuery($id: ID = "") {
  getClassroom(id: $id) {
    pupils {
      items {
        pupil {
          firstName
          lastName
        }
      }
    }
    teachers {
      items {
        teacher {
          lastName
          firstName
          email
        }
      }
    }
  }
}`
const ClassroomPage = () => {

    const {classroomId, id} = useParams();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        dir?: string;
        index: any;
        value: any;
    }

    function TabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: any) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }


    return (
        <Connect query={graphqlOperation(query, {id: classroomId})}>
            {(classroom: IConnectState) => {
                if (classroom.loading) {
                    return <PupilsSearchList/>;
                }
                return (
                    <div>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                // variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Pupils" {...a11yProps(0)} />
                                <Tab label="Teachers" {...a11yProps(1)} />
                                {/*<Tab label="Item Three" {...a11yProps(2)} />*/}
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <Container>
                                    <Stack display={'column'}>

                                    <PupilsSearchList/>
                                    <Typography variant={'h5'}>
                                        Pupils In That Classroom:
                                    </Typography>
                                    {classroom.data.getClassroom.pupils.items.map((item: any) => item.pupil).map((pupil: Pupil) => {
                                        return <h4>{pupil.firstName} {pupil.lastName}</h4>
                                    })}
                                    </Stack>
                                </Container>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <TeachersSearchList/>
                                <Typography variant={'h5'}>
                                    Teachers In That Classroom:
                                </Typography>
                                {classroom.data.getClassroom.teachers.items.map((item: any) => item.teacher).map((teacher: Teacher) => {
                                    return <h4>{teacher.firstName} {teacher.lastName}</h4>
                                })}
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                ???
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                );


            }
            }
        </Connect>

    );

};

export default ClassroomPage;
