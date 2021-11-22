import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FeedIcon from '@mui/icons-material/Feed';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import {Container, Grid} from "@material-ui/core";
import StepsChart from "../pupil/StepsChart";
import PupilActivitiesChart from "../pupil/PupilActivitiesChart";
import {Pupil} from "../../API";
import InterventionsList from "./InterventionsList";
import ChildInfoTab from "./ChildInfoTab";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ChildTabs(props: {pupil: Pupil}) {
    const [value, setValue] = React.useState(0);
    const {pupil} = {...props};
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                        centered={true}>
                    <Tab icon={<FeedIcon/>} label="Feed" {...a11yProps(0)} />
                    <Tab icon={<BarChartIcon/>} label="Statistics" {...a11yProps(1)} />
                    <Tab icon={<InfoIcon/>} label="Info" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel  value={value} index={0}>
                <InterventionsList pupil={pupil}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <StepsChart pupilId={pupil.id}/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <PupilActivitiesChart/>
                        </Grid>
                    </Grid>
                </Container>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ChildInfoTab pupil={pupil}/>
            </TabPanel>
        </Box>
    );
}

