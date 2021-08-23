import React from 'react';
import {Stack, TextField, Typography} from "@material-ui/core";
import CurriculaGrid from "./CurriculaGrid";
import {Outlet} from "react-router-dom";
import {Can} from "../../../utils/Ability";
import AddingDialog from "../../../utils/AddingDialog";
import CurriculumModal from "./CurriculumModal";

const CurriculaComponents = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Curricula
                </Typography>
                <Can I={'create'} a={'curriculum'}>
                    <CurriculumModal/>
                </Can>
            </Stack>
            <CurriculaGrid/>
        </>
    );
};

export default CurriculaComponents;
