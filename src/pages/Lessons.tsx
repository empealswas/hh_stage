import React from 'react';
import {Container, Stack, Typography} from "@material-ui/core";
import AddingSchoolDialog from "../components/School/AddingSchoolDialog";
import {Connect} from "aws-amplify-react";
import {graphqlOperation} from "aws-amplify";
import {listSchools} from "../graphql/queries";
import {IConnectState} from "aws-amplify-react/lib/API/GraphQL/Connect";
import SchoolInteraction from "../components/School/SchoolInteraction";
import {SchoolsContext} from "./Schools";
import AddCurriculumModal from "../components/Lesson/Curriculum/AddCurriculumModal";
import CurriculaGrid from "../components/Lesson/Curriculum/CurriculaGrid";
import {Outlet} from "react-router-dom";

const Lessons = () => {
    return (
        <Container>
            <Outlet/>
        </Container>
    );
};

export default Lessons;
