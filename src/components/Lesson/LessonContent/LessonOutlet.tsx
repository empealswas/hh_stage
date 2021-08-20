import React from 'react';
import {Outlet} from "react-router-dom";

const LessonOutlet = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default LessonOutlet;
