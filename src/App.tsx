// routes
import Router from './routes';
import {withAuthenticator,} from "@aws-amplify/ui-react";
// components
import ScrollToTop from './components/ScrollToTop';
import ThemeConfig from "./theme";
import {createContext, useEffect, useState} from "react";
import {User} from "./models/User";

// ----------------------------------------------------------------------
import config from './aws-exports'
import {Amplify, Auth, Hub} from "aws-amplify";

Amplify.configure(config)
export const UserContext = createContext<User | null>(null);



function App() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        Hub.listen('auth', ({payload: {event, data}}) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then(userData => {
                        setUser(new User(userData));
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
                setUser(new User(userData));
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
            <UserContext.Provider value={user}>
                <ScrollToTop/>
                <Router/>
            </UserContext.Provider>
        </ThemeConfig>
    );
}
const theme = {

}

export default withAuthenticator(App)