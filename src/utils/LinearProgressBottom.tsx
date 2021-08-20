import React from 'react';
import {LinearProgress} from "@material-ui/core";

const LinearProgressBottom = () => {
    return (
        <div>
            <LinearProgress style={{
                position: 'fixed',
                left: '0px',
                bottom: '0px',
                height: '5px',
                width: '100%'
            }} color="secondary"/>
        </div>
    );
};

export default LinearProgressBottom;
