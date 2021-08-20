import React from 'react';
import {Outlet} from "react-router-dom";

const TermOutlet = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default TermOutlet;
