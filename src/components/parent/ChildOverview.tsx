import React from 'react';
import {Card, CardMedia, Container} from "@material-ui/core";
import {Avatar, Button, CardActions, Stack, Typography} from "@mui/material";
import MyTabs from "./tabs";

const ChildOverview = () => {
    return (
            <Card>
                <CardMedia
                    component="img"
                    image="/static/mock-images/covers/cover_6.jpg"
                    alt="Paella dish"
                    style={{
                        width: '100%',
                        height: 'calc(80px + 10vw)',
                        textAlign: 'center'
                    }}
                />
                <Container maxWidth={false}>
                    <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{xs: 'center', sm: 'space-between'}} alignItems={'center'}>
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 0, sm: 2}}>
                            <Avatar sx={{
                                width: 'calc(80px + 5vw)',
                                height: 'calc(80px + 5vw)',
                                border: '3px solid white',
                                margin: '-60px auto 0'
                            }} src={'/static/mock-images/avatars/avatar_12.jpg'}/>
                            <div>
                                <Typography variant={'h5'}>
                                    Hlib Davydov
                                </Typography>
                                <Typography variant={'subtitle2'}>
                                    Class 7A
                                </Typography>
                            </div>
                        </Stack>
                        <Stack direction={'row'} height={40} spacing={2}>
                            <Button variant={'outlined'} color={'secondary'}>Change Avatar</Button>
                            <Button variant={'contained'} color={'secondary'}>Change Cover Photo</Button>
                        </Stack>
                    </Stack>
                </Container>
                <CardActions >
                    <MyTabs/>
                </CardActions>

            </Card>
    );
};

export default ChildOverview;
