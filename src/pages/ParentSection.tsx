// material
import {Card, Container, CardMedia, CardHeader} from '@material-ui/core';
// components
import Page from '../components/Page';
import {Avatar, Button, CardActions, CardContent, Stack, Typography} from "@mui/material";
import MyTabs from "../components/parent/tabs";
//


const ParentSection = () => {

    return (
        // @ts-ignore
        <Page>
            <Container maxWidth={false}>
                <Card>
                    <CardMedia
                        component="img"
                        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wallpapers13.com%2Fwp-content%2Fuploads%2F2016%2F01%2FRarotonga-cook-isls-desktop-background-498319.jpg&f=1&nofb=1"
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
                                <Button variant={'outlined'} color={'secondary'}>Action 1</Button>
                                <Button variant={'contained'} color={'secondary'}>Action 1</Button>
                            </Stack>
                        </Stack>
                    </Container>
                    <CardActions>
                        <MyTabs/>
                    </CardActions>

                </Card>
            </Container>
        </Page>
    );
}
export default ParentSection;