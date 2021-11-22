import React from 'react';
import {Curriculum, Lesson} from "../../../API";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
type YearPageGridsProps = {
    yearPages: Curriculum[]
}
const YearPageGrids = (props: YearPageGridsProps) => {

    return (
        <>
            {props.yearPages.sort((a, b) => a.name?.localeCompare(b.name ?? '') ??0 ).map((value: Curriculum, index: number) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Link component={RouterLink} to={`${value.id}`} underline={'none'}>
                        <Card style={{height: '100%'}}>
                            <CardActionArea style={{height: '100%'}}>
                                <CardContent style={{textAlign: 'center'}}>
                                    <Typography variant="h4" color={'text.primary'}>
                                        {value.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </>
    );
};

export default YearPageGrids;
