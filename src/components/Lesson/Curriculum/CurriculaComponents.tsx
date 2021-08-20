import React from 'react';
import {Stack, Typography} from "@material-ui/core";
import AddCurriculumModal from "./AddCurriculumModal";
import CurriculaGrid from "./CurriculaGrid";
import {Outlet} from "react-router-dom";

const CurriculaComponents = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Curricula
                </Typography>
                <AddCurriculumModal/>
            </Stack>
            <CurriculaGrid/>
        </>
    );
};

export default CurriculaComponents;
