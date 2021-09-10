import React from 'react';
import TermsGrid from "./TermsGrid";
import {Stack, Typography} from "@material-ui/core";
import AddTermModal from "./AddTermModal";
import {Can} from "../../../utils/Ability";

const TermElements = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Lesson Plans
                </Typography>
                <Can I={'create'} a={'term'}>
                    <AddTermModal/>
                </Can>
            </Stack>
            <TermsGrid/>
        </>
    );
};

export default TermElements;