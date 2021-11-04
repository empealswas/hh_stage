import React, {useContext} from 'react';
import {Stack, TextField, Typography} from "@material-ui/core";
import CurriculaGrid from "./CurriculaGrid";
import {Link as RouterLink, Outlet} from "react-router-dom";
import {Can} from "../../../utils/Ability";
import AddingDialog from "../../../utils/AddingDialog";
import CurriculumModal from "./CurriculumModal";
import {UserContext} from "../../../App";
import TeacherCurriculaGrid from "./TeacherCurriculaGrid";
import ActivityCard from "../pe/ActivityCard";
import {Box, Card, CardHeader, CardMedia, Grid} from "@mui/material";
import AddSectionModal from "../../Sections/AddSectionModal";
import SectionGrid from "../../Sections/SectionGrid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";


const CurriculaComponents = () => {
    const user = useContext(UserContext);
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Year Groups
                </Typography>
                <Can I={'create'} a={'curriculum'}>
                    <CurriculumModal/>
                </Can>
            </Stack>
            {user?.isTeacher() ?
                <TeacherCurriculaGrid/>
                :
                <CurriculaGrid/>
            }
            <Box height={20}/>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6} m={4} lg={4}>
                    <Link component={RouterLink} to={`../section/2d93de97-d7bc-41a9-84d4-29e6b691f8f3`} underline={'none'}>
                        <Card>
                            <CardActionArea>
                                <CardHeader style={{textAlign: 'center'}} title={'Sections'}/>
                                <CardMedia
                                    component={'img'}
                                    height="194"
                                    image={'/static/images/dailymile.png'}
                                    alt="Activity image"
                                />
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} m={4} lg={4}>
                    <Card>
                        <Link component={RouterLink} to={'pe'} underline={'none'} color={'text.primary'}>
                            <CardActionArea>
                                <CardHeader style={{textAlign: 'center'}} title={'PE Self Recording'}/>
                                <CardMedia
                                    component={'img'}
                                    height="194"
                                    image={'/static/images/Record_your_own_PE.png'}
                                    alt="Activity image"
                                />
                            </CardActionArea>
                        </Link>
                        {/*<CardActions>*/}
                        {/*    <Button size="small">Learn More</Button>*/}
                        {/*</CardActions>*/}
                    </Card>
                </Grid>

            </Grid>
            <Box height={50}>

            </Box>
        </>
    );
};

export default CurriculaComponents;
