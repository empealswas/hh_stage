import React, {useEffect, useState} from 'react';
import {Card, CardMedia, Container} from "@material-ui/core";
import {Avatar, Button, CardActions, IconButton, Stack, Typography} from "@mui/material";
import ChildTabs from "./tabs";
import {Classroom, Pupil} from "../../API";
import WatchIcon from '@mui/icons-material/Watch';
import {useParams} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import LinearProgressBottom from "../../utils/LinearProgressBottom";
import OrganizationsSearch from "./OrganizationsSearch";
import {MHidden} from "../@material-extend";

const query = `query MyQuery($id: ID = "") {
  getPupil(id: $id) {
    firstName
          id
          lastName
          parents {
            items {
              Parent {
                firstName
                id
                lastName
              }
            }
          }
          school {
            name
          }
          schoolHouse {
            name
          }
          classrooms {
            items {
              classroom {
                name
                yearGroup {
                  name
                }
              }
            }
          }
  }
}

`
const ChildOverviewMenu = () => {
    const {pupilId} = useParams();
    const [pupil, setPupil] = useState<Pupil | null>(null);
    const [numberOfAvatar, setNumberOfAvatar] = useState(0);
    const [numberOfCover, setNumberOfCover] = useState(1);
    useEffect(() => {
        const getPupil = async () => {
            const result: any = await API.graphql(graphqlOperation(query, {id: pupilId}));
            setPupil(result.data.getPupil);
        }
        getPupil();
        return () => {

        };
    }, [pupilId]);


    console.log(pupil);
    if (!pupil) {
        return (
            <LinearProgressBottom/>
        );
    }
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
                            {pupil.classrooms?.items?.map((item: any) => item.classroom).map((classroom: Classroom) =>
                                <Typography variant={'subtitle2'}>
                                    {classroom.name}
                                </Typography>)
                            }
                        </div>
                    </Stack>
                    <MHidden width="lgDown">
                        <Stack direction={'row'} height={40} spacing={2}>
                            <Button startIcon={<WatchIcon/>} variant={'contained'} onClick={() => {
                                window.open(`https://garmin.healthyhabits.link/auth/requestTokenForString/${pupil.id}/${pupil.firstName}${pupil.lastName}`, '_blank')
                            }}>
                                Connect To Garmin
                            </Button>
                            <OrganizationsSearch/>
                            <Button variant={'outlined'} color={'secondary'} onClick={() => {
                                setNumberOfAvatar(prevState => prevState + 1)
                            }}>Change Avatar</Button>
                            <Button variant={'contained'} color={'secondary'} onClick={() => {
                                setNumberOfCover(prevState => {
                                    if (prevState === 4) {
                                        return 1;
                                    }
                                    return prevState + 1;
                                })
                            }}>Change Cover Photo</Button>
                        </Stack>
                    </MHidden>



                </Stack>

            </Container>
            <CardActions>
                <ChildTabs pupil={pupil}/>
            </CardActions>

        </Card>
    );
};

export default ChildOverviewMenu;
