// routes
import {AuthState} from '@aws-amplify/ui-components';


// components
import ScrollToTop from './components/ScrollToTop';
import ThemeConfig from "./theme";
// import "../node_modules/video-react/dist/video-react.css"
import React, {createContext, useEffect, useState} from "react";
import {User} from "./models/User";

// ----------------------------------------------------------------------
import config from './aws-exports'
import {Amplify, API, Auth, Hub} from "aws-amplify";
import {AbilityContext} from "./utils/Ability";
import defineAbilityFor from "./abilities/defineAbilityFor";
import {SnackbarProvider} from "notistack";

import {createUser} from "./models/createUser";
import Router, {PreLoginRouter} from "./routes";
import LinearProgressBottom from "./utils/LinearProgressBottom";
import {useNavigate} from "react-router-dom";
import {int} from "aws-sdk/clients/datapipeline";
import {Card} from "@mui/material";
import {styled} from "@mui/material/styles";

Amplify.configure(config)
Amplify.register(Auth);
Amplify.register(API);
export const UserContext = createContext<User | null>(null);


function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        Hub.listen('auth', ({payload: {event, data}}) => {
            console.log(event);
            switch (event) {
                case 'signIn':
                    assignUser();
                    break;
                case 'cognitoHostedUI':
                    assignUser();
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });
        assignUser();

    }, []);


    async function assignUser() {
        try {
            const fetchedUser = await getUser();
            if (!fetchedUser) {
                setUser(null);
            } else if (fetchedUser) {
                const initiatedUser = createUser(fetchedUser);
                setUser(initiatedUser);
                const result = await initiatedUser?.getCredentials().then(value => {
                    console.log(initiatedUser)
                    setUser(initiatedUser)
                })
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }


    async function getUser() {
        return await Auth.currentAuthenticatedUser();
    }

    if (loading) {
        return (<LinearProgressBottom/>);
    }
    return (
                <ThemeConfig>
                    <SnackbarProvider maxSnack={3}>
                        {user ?
                            <UserContext.Provider value={user}>
                                <AbilityContext.Provider value={defineAbilityFor(user)}>
                                    <ScrollToTop/>
                                    <Router/>
                                </AbilityContext.Provider>
                            </UserContext.Provider>
                            :
                            <PreLoginRouter/>
                        }
                    </SnackbarProvider>
                </ThemeConfig>

    );
}

export default App;