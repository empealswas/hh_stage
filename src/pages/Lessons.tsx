import React from 'react';
import {Container} from "@material-ui/core";
import {Outlet} from "react-router-dom";

const Lessons = () => {
    return (
        <Container>
            <Outlet/>
        </Container>
    );
};

export default Lessons;
