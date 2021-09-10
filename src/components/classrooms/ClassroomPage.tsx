import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Classroom, Curriculum, Pupil, Teacher} from "../../API";
import {Connect} from "aws-amplify-react";
import {API, graphqlOperation} from "aws-amplify";
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
import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack
} from "@material-ui/core";
import PupilsAddingList from "./PupilsAddingList";
import {listCurricula} from "../../graphql/queries";
import {updateClassroom} from "../../graphql/mutations";

const query = `query MyQuery($id: ID = "") {
  getClassroom(id: $id) {
    yearGroupID
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
    const [curriculumOfClassroom, setCurriculumOfClassroom] = useState('');
    const [curricula, setCurricula] = useState<Curriculum[] | null>(null);
    const [classroom, setClassroom] = useState<Classroom | null>(null);

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

    const SelectYearForClassroom = () => {
        const handleChange = (event: SelectChangeEvent) => {
            const yearPageId = event.target.value;
            API.graphql(graphqlOperation(updateClassroom, {
                input: {
                    id: classroomId,
                    yearGroupID: yearPageId
                }
            }))
            setCurriculumOfClassroom(yearPageId);
        };
        if (!curricula) {
            return <></>
        }
        console.log(curricula)
        return (
            <FormControl sx={{minWidth: 200}}>
                <InputLabel id="demo-simple-select-label">Year Group</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={curriculumOfClassroom}
                    label="Year Group"
                    onChange={handleChange}
                >
                    {curricula.map(curriculum => (
                        <MenuItem value={curriculum.id} key={curriculum.id}>{curriculum.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }

    useEffect(() => {
        const fetchYearGroups = async (): Promise<any> => {
            try {
                const curriculaData: any = await API.graphql(
                    graphqlOperation(listCurricula)
                );
                const curricula: Curriculum[] = curriculaData.data.listCurricula.items;
                setCurricula(curricula)

                const classroomData: any = await API.graphql(graphqlOperation(query, {id: classroomId}))
                setClassroom(classroomData.data.getClassroom);
                setCurriculumOfClassroom(classroomData.data.getClassroom.yearGroupID)
            } catch (err) {
                console.log("error fetching posts: ", err);
            }
        };
        fetchYearGroups()
    }, []);


    return (
        <Connect query={graphqlOperation(query, {id: classroomId})}>
            {(classroom: IConnectState) => {
                if (classroom.loading) {
                    return <PupilsSearchList/>;
                }
                return (
                    <div>
                        <AppBar position="static" color="default">
                            <Stack direction={"row"} spacing={5}>
                                <SelectYearForClassroom/>
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
                                </Tabs>
                            </Stack>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                {/*<PupilsSearchList/>*/}
                                <PupilsAddingList/>
                                <Typography variant={'h5'}>
                                    Pupils In That Classroom:
                                </Typography>
                                {classroom.data.getClassroom.pupils.items.map((item: any) => item.pupil).map((pupil: Pupil) => {
                                    return <Typography key={pupil.id}
                                                       variant={'h6'}>{pupil.firstName} {pupil.lastName}</Typography>
                                })}
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
