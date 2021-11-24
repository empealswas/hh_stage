import React from 'react';
import { Outlet } from 'react-router-dom';
import Schools from "../../pages/Schools";

const SchoolOutlet = () => {
    return (
        <>
        <Outlet/>
        </>
    );
};

export default SchoolOutlet;
