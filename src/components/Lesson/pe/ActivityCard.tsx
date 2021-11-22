import {Button, Card, CardActionArea, CardActions, CardHeader, CardMedia, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {ActivityCardProps} from "../../../types";
import {useEffect, useState} from "react";
import {Storage} from "aws-amplify";


export default function ActivityCard(props: ActivityCardProps) {
    const {linkTo, imagePath, title} = {...props};

    useEffect(() => {
        let keyOfObject = imagePath;
        if (keyOfObject) {
            Storage.get(keyOfObject, {expires: 10000}).then(result => {
                setLinkToPreview(result);
            })
        }

    }, [])
    const [linkToPreview, setLinkToPreview] = useState('');

    return (
        <Card>
            <Link component={RouterLink} to={linkTo} underline={'none'} color={'text.primary'}>
                <CardActionArea>
                    <CardHeader style={{textAlign: 'center'}} title={title}/>
                    {linkToPreview &&
                    <CardMedia
                        component={'img'}
                        height="194"
                        image={linkToPreview}
                        alt="Activity image"
                    />
                    }
                </CardActionArea>
            </Link>
            {/*<CardActions>*/}
            {/*    <Button size="small">Learn More</Button>*/}
            {/*</CardActions>*/}
        </Card>
    )
};
