import React from 'react';
import {Stack, Typography} from "@material-ui/core";
import AddLessonModal from "./AddLessonModal";
import LessonsGrid from "./LessonsGrid";
import {Can} from "../../../utils/Ability";

const LessonElements = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Lessons
                </Typography>
                <Can I={'create'} a={'lesson'}>
                    <AddLessonModal/>
                </Can>
            </Stack>
            <LessonsGrid/>
        </>
    );
};

export default LessonElements;