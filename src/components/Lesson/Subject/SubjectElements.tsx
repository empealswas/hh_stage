import React from 'react';
import {Stack, Typography} from "@material-ui/core";
import AddCurriculumModal from "../Curriculum/AddCurriculumModal";
import CurriculaGrid from "../Curriculum/CurriculaGrid";
import AddSubjectModal from "./AddSubjectModal";
import SubjectsGrid from "./SubjectsGrid";

const SubjectElements = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Subjects
                </Typography>
                <AddSubjectModal/>
            </Stack>
            <SubjectsGrid/>
        </>
    );
};

export default SubjectElements;
