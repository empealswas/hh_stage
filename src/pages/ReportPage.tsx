import React, {useState} from 'react';
import {Container, Stack, Typography} from "@material-ui/core";
import ChooseLessonPlanSearchField from "../components/reports/ChooseSubjectSearchField";
import {Term} from "../API";
import TermReport from "../components/reports/TermReport";

const ReportPage = () => {

    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Reports
                    </Typography>
                    <ChooseLessonPlanSearchField setSelectedTerm={setSelectedTerm}/>
                </Stack>
                {selectedTerm && <TermReport term={selectedTerm}/>}
            </Container>
        </>
    );
};

export default ReportPage;
