import React from 'react';
import {Container, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import ParentChildrenTable from "./ParentChildrenTable";

const ParentOverview = () => {
    const {parentId} = useParams()
    return (
        <div>
            <Container>
                <Typography textAlign={'center'} variant={'h2'} sx={{mb: 5}}>{parentId}</Typography>
                <ParentChildrenTable/>
            </Container>
        </div>
    );
};

export default ParentOverview;
