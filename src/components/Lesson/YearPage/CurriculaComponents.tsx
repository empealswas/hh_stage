import React, {useContext} from 'react';
import {Stack, TextField, Typography} from "@material-ui/core";
import CurriculaGrid from "./CurriculaGrid";
import {Outlet} from "react-router-dom";
import {Can} from "../../../utils/Ability";
import AddingDialog from "../../../utils/AddingDialog";
import CurriculumModal from "./CurriculumModal";
import {UserContext} from "../../../App";
import TeacherCurriculaGrid from "./TeacherCurriculaGrid";

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

        </>
    );
};

export default CurriculaComponents;
