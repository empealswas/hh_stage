import React from 'react';
import AddTermModal from "../Term/AddTermModal";
import TermsGrid from "../Term/TermsGrid";


const SubjectOverview = () => {
    return (
        <div>
            <AddTermModal/>
            <TermsGrid/>
        </div>
    );
};

export default SubjectOverview;
