import React, {useContext} from 'react';
import {Stack, TextField, Typography} from "@material-ui/core";
import CurriculaGrid from "./CurriculaGrid";
import {Outlet} from "react-router-dom";
import {Can} from "../../../utils/Ability";
import AddingDialog from "../../../utils/AddingDialog";
import CurriculumModal from "./CurriculumModal";
import {UserContext} from "../../../App";
import TeacherCurriculaGrid from "./TeacherCurriculaGrid";
import PECard from "../pe/PECard";
import {Box, Grid} from "@mui/material";


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
            {user?.isTeacher() ? <TeacherCurriculaGrid/> : <CurriculaGrid/>}
            <Box height={50}>

            </Box>
            <Grid >
                <Grid item lg={4} md={4} sm={6} xs={12}>
                    <PECard/>
                </Grid>
            </Grid>
        </>
    );
};

export default CurriculaComponents;
