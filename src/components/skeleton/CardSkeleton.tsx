import {Card, CardContent, Typography, Skeleton} from '@mui/material';
import React from 'react';


const CardSkeleton = (props: {height?: string}) => {
    return (
            <Card sx={{height: props.height ?? "100%"}}>
                <CardContent>
                    <Typography variant={'h5'}>
                        <Skeleton animation={'pulse'} variant={'text'}/>
                    </Typography>
                    <Typography variant={'h3'}>
                        <Skeleton animation={'pulse'} variant={'text'}/>
                    </Typography>
                </CardContent>
            </Card>
    );
};

export default CardSkeleton;
