import React, {useState} from 'react';
import {Container, Stack, Typography} from "@material-ui/core";
import ChooseLessonPlanSearchField from "../components/reports/ChooseSubjectSearchField";
import {Section, Term} from "../API";
import TermReport from "../components/reports/TermReport";
import SectionReport from "../components/reports/SectionReport";
import ChooseSubjectSearchField from "../components/reports/ChooseSubjectSearchField";
import ChooseSectionSearchField from "../components/reports/ChooseSectionSearchField";

const ReportPage = () => {

    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    return (
        <>
            <Container>
                <Stack direction={{xs:'column', sm: 'row'}} alignItems="center" justifyContent={{xs: 'start',sm: 'space-between'}} mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Reports
                    </Typography>
                    {/*<ChooseLessonPlanSearchField setSelectedTerm={setSelectedTerm}/>*/}
                    <ChooseSectionSearchField setSelectedTerm={setSelectedSection}/>
                </Stack>
                {/*{selectedTerm && <TermReport term={selectedTerm}/>}*/}
                {selectedSection && <SectionReport section={selectedSection}/>}
            </Container>
        </>
    );
};

export default ReportPage;
