import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import SubjectsGrid from "../Subject/SubjectsGrid";
import AddSubjectModal from "../Subject/AddSubjectModal";
import SubjectElements from "../Subject/SubjectElements";


const CurriculumOverview = () => {
    return (
        <SubjectElements/>
    );
};

export default CurriculumOverview;
