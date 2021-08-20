import React from 'react';
import {Outlet} from "react-router-dom";

const SubjectOutlet = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default SubjectOutlet;
