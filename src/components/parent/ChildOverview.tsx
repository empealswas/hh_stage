import React, {useState} from 'react';
import {Card, CardMedia, Container} from "@material-ui/core";
import {Avatar, Button, CardActions, Stack, Typography} from "@mui/material";
import ChildTabs from "./tabs";
import {Pupil} from "../../API";

const ChildOverview = (props: {pupil: Pupil}) => {
    const [numberOfAvatar, setNumberOfAvatar] = useState(1);
    const [numberOfCover, setNumberOfCover] = useState(1);
    const {pupil} = {...props};
    return (
        <Card>
            <CardMedia
                component="img"
                image={`/static/mock-images/pupilsPageCover/${numberOfCover}.jpg`}
                alt="Paella dish"
                style={{
                    width: '100%',
                    height: 'calc(80px + 10vw)',
                    textAlign: 'center'
                }}
            />
            <Container maxWidth={false}>
                <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{xs: 'center', sm: 'space-between'}}
                       alignItems={'center'}>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 0, sm: 2}}>
                        <Avatar sx={{
                            width: 'calc(80px + 5vw)',
                            height: 'calc(80px + 5vw)',
                            border: '3px solid white',
                            margin: '-60px auto 0'
                        }} src={`/static/mock-images/avatars/avatar_${numberOfAvatar}.jpg`}/>
                        <div>
                            <Typography variant={'h5'}>
                                {pupil.firstName} {pupil.lastName}
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                class
                            </Typography>
                        </div>
                    </Stack>
                    <Stack direction={'row'} height={40} spacing={2}>
                        <Button variant={'outlined'} color={'secondary'} onClick={() => {
                            setNumberOfAvatar(prevState => prevState + 1)
                        }}>Change Avatar</Button>
                        <Button variant={'contained'} color={'secondary'} onClick={()=>{
                            setNumberOfCover(prevState => {
                                if (prevState === 4) {
                                    return 1;
                                }
                                return prevState + 1;
                            })
                        }}>Change Cover Photo</Button>
                    </Stack>
                </Stack>
            </Container>
            <CardActions>
                <ChildTabs pupil={pupil}/>
            </CardActions>

        </Card>
    );
};

export default ChildOverview;
