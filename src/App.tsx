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
import {styled} from "@material-ui/core/styles";
import Router, {PreLoginRouter} from "./routes";
import {Authenticator} from "@aws-amplify/ui-react";

Amplify.configure(config)
Amplify.register(Auth);
Amplify.register(API);
export const UserContext = createContext<User | null>(null);


function App() {
    const [user, setUser] = useState<User | null>(null);
    const [authState, setAuthState] = useState<AuthState>();
    useEffect(() => {
        // return onAuthUIStateChange((nextAuthState, authData) => {
        //     setAuthState(nextAuthState);
        //     console.log('authData', authData)
        //     if (authData) {
        //         setUser(new User(authData));
        //     }else{
        //         setUser(null)
        //     }
        // });
        Hub.listen('auth', ({payload: {event, data}}) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then(userData => {
                        const initiatedUser = createUser(userData);
                        initiatedUser.getCredentials().then(res => {
                            setUser(initiatedUser);
                        })
                    });
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
        getUser().then(userData => {
            if (!userData) {
                setUser(null);
            } else {
                const initiatedUser = createUser(userData);
                initiatedUser.getCredentials().then(res => {
                    setUser(initiatedUser);
                })
            }
        });

    }, []);


    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then(userData => {
                console.log(userData)
                return userData
            })
            .catch(() => console.log('Not signed in'));
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