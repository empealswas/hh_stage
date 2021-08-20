import React from 'react';
import {Stack, Typography} from "@material-ui/core";
import AddLessonModal from "./AddLessonModal";
import LessonsGrid from "./LessonsGrid";

const LessonElements = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Lessons
                </Typography>
                <AddLessonModal/>
            </Stack>
            <LessonsGrid/>
        </>
    );
};

export default LessonElements;