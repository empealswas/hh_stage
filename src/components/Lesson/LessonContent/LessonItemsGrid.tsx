import React from 'react';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Lesson} from "../../../API";


type LessonItemsGridProps = {
    lessons: Lesson[]
}
const LessonItemsGrid = (props: LessonItemsGridProps) => {
    const {lessons} = {...props}

    return (
        <>
            {lessons.map((value: Lesson, index: number) => (

                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Link component={RouterLink} to={`../lessons/${value.id}`} underline={'none'}>
                        <Card style={{height: '100%'}}>
                            <CardActionArea style={{height: '100%'}}>
                                <CardContent style={{textAlign: 'center'}}>
                                    <Typography variant="h5" component="h2">
                                        {value.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </>
    )
};

export default LessonItemsGrid;
