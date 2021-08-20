import React from 'react';
import TermsGrid from "./TermsGrid";
import {Stack, Typography} from "@material-ui/core";
import AddTermModal from "./AddTermModal";

const TermElements = () => {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Terms
                </Typography>
                <AddTermModal/>
            </Stack>
            <TermsGrid/>
        </>
    );
};

export default TermElements;