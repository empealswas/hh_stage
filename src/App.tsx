// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import {ChartStyle} from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import {ProgressBarStyle} from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import {Amplify, API, Auth, Hub} from "aws-amplify";
import config from './aws-exports'
import useAuth from "./hooks/useAuth";
import {AbilityContext} from './abilities/Ability';
import defineAbilityFor from "./abilities/defineAbilityFor";

// ----------------------------------------------------------------------

Amplify.configure(config)
Amplify.register(Auth);
Amplify.register(API);
export default function App() {
    const {user} = useAuth();
    return (

        <ThemeProvider>
            <ThemeColorPresets>
                <ThemeLocalization>
                    <RtlLayout>
                        <NotistackProvider>
                            <MotionLazyContainer>
                                <AbilityContext.Provider value={defineAbilityFor(user)}>
                                    <ProgressBarStyle/>
                                    <ChartStyle/>
                                    <Settings/>
                                    <ScrollToTop/>
                                    <Router/>
                                </AbilityContext.Provider>
                            </MotionLazyContainer>
                        </NotistackProvider>
                    </RtlLayout>
                </ThemeLocalization>
            </ThemeColorPresets>
        </ThemeProvider>
    );
}
