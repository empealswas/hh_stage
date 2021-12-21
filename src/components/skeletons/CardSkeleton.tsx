import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

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
