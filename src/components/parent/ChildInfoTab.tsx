import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Parent, Pupil} from "../../API";
import {useEffect, useState} from "react";
import CardSkeleton from "../skeletons/CardSkeleton";
import {API, graphqlOperation} from "aws-amplify";
import {Button} from "@mui/material";
import * as serviceWorker from '../../serviceWorker';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const ChildInfoTab = (props: { pupil: Pupil }) => {
    const {pupil} = {...props};

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        // const getPupil = async () => {
        //     const result: any = await API.graphql(graphqlOperation(query, {id: props.pupil.id}));
        //     setPupil(result.data.getPupil);
        // }
        // getPupil();
    }, [])
    return (
        <div>
            {pupil ?
                <Card>
                    <CardContent>
                        <Typography paragraph>
                            Hello! My name is {pupil.firstName} {pupil.lastName}
                        </Typography>
                        <Typography >
                            My parents are:
                        </Typography>
                        {pupil.parents?.items?.map((item: any) => item.Parent).map((parent: Parent) =>
                            <Typography>
                                {parent.firstName} {parent.lastName} ({parent.id})
                            </Typography>)
                        }
                        <Typography>I go to {pupil.school?.name}. I am the part of the {pupil.schoolHouse?.name} house</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>ID: {pupil.id}</Typography>
                            <Typography paragraph>Wearable Id: {pupil.terraId}</Typography>
                            <Typography paragraph>Provider: {pupil.provider}</Typography>
{/*                        <Button onClick={()=>{

                            // if (window.Notification) {
                            //     Notification.requestPermission((status) => {
                            //         if (status === 'granted') {
                            //             var notify = new Notification('Hi there!', {
                            //                 body: 'How are you doing?',
                            //                 icon: 'https://bit.ly/2DYqRrh',
                            //             });
                            //         }
                            //     });
                            // }
                        }
                        }>Notification test</Button>*/}
                        </CardContent>
                    </Collapse>
                </Card>
                :
                <CardSkeleton/>
            }
        </div>
    );
};

export default ChildInfoTab;
