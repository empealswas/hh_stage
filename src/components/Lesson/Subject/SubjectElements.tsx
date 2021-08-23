import React from 'react';
import {Stack, Typography} from "@material-ui/core";
import AddSubjectModal from "./AddSubjectModal";
import SubjectsGrid from "./SubjectsGrid";
import {Can} from "../../../utils/Ability";

const SubjectElements = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Subjects
                </Typography>
                <Can I={'create'} a={'subject'}>
                    <AddSubjectModal/>
                </Can>
            </Stack>
            <SubjectsGrid/>
        </>
    );
};

export default SubjectElements;
