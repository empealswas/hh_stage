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
import {Button, Stack, Tooltip} from "@mui/material";
import * as serviceWorker from '../../serviceWorker';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TaskIcon from '@mui/icons-material/Task';

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
const CopyToClipboard = (props: { text: string }) => {
    const [textCopied, setTextCopied] = useState(false);
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setTextCopied(true);
    }

    useEffect(() => {
        return () => {

        };
    }, []);

    return <Tooltip title={textCopied ? 'Copied!' : 'Copy to clipboard'}>
        <IconButton onClick={() => {
            copyToClipboard(props.text);
        }}>
            {textCopied ? <TaskIcon/> : <ContentCopyIcon/>}
        </IconButton>
    </Tooltip>;
}
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
                        <Typography>
                            My parents are:
                        </Typography>
                        {pupil.parents?.items?.map((item: any) => item.Parent).map((parent: Parent) =>
                            <Typography>
                                {parent.firstName} {parent.lastName} ({parent.id})
                            </Typography>)
                        }
                        <Typography>I go to {pupil.school?.name}. I am the part of
                            the {pupil.schoolHouse?.name} house</Typography>
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
                            <Stack direction={'row'}>
                                <Typography>ID: {pupil.id}</Typography>
                                <CopyToClipboard text={pupil.id}/>
                            </Stack>
                            <Stack direction={'row'}>
                                <Typography paragraph>Wearable Id: {pupil.terraId}</Typography>

                                <CopyToClipboard text={String(pupil.terraId)}/>
                            </Stack>
                            <Stack direction={'row'}>
                                <Typography paragraph>Provider: {pupil.provider}</Typography>
                                <CopyToClipboard text={String(pupil.provider)}/>
                            </Stack>
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
