import React, {useEffect, useState} from 'react';
// form
// @mui
// hooks
import useAuth from '../../../../hooks/useAuth';
// utils
// _mock
// components
import AccountGeneralForm from "./AccountGeneralForm";
import {User} from "../../../../API";
import {API, graphqlOperation} from "aws-amplify";
import {getUser} from "../../../../graphql/queries";
import {Box, Card, Grid, Skeleton, Stack} from "@mui/material";
import {RHFSelect, RHFTextField} from "../../../../components/hook-form";
import {countries} from "../../../../_mock";
import {LoadingButton} from "@mui/lab";

// ----------------------------------------------------------------------


export default function AccountGeneral() {
    const {user} = useAuth();
    const [userDetails, setUserDetails] = useState<User | null>(null);
    useEffect(() => {
        const getUserInfo = async () => {
            console.log(user?.email)
            const result: any = await API.graphql(graphqlOperation(getUser, {
                id: user?.email,
            }))

            setUserDetails(result.data.getUser);
        }
        getUserInfo();
        return () => {

        };
    }, []);

    return (
        <>
            {userDetails ?
                <AccountGeneralForm user={userDetails}/>
                :
                <Grid container spacing={3}>

                    <Grid item xs={12} md={8}>
                        <Card sx={{p: 3}}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 2,
                                    gridTemplateColumns: {xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)'},
                                }}
                            >
                                {[0,1,2,3,4,5,6,7].map(value =>
                                    <Skeleton key={value} variant={'rectangular'} width={450} height={50}/>
                                )}

                            </Box>

                            <Stack spacing={3} alignItems="flex-end" sx={{mt: 3}}>

                                <LoadingButton disabled variant="contained" >
                                    Save Changes
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>

            }
        </>
    );
}
