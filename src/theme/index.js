import PropTypes from 'prop-types';
import {useEffect, useMemo, useRef, useState} from 'react';
// material
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider, createTheme, StyledEngineProvider} from '@material-ui/core/styles';
//
import shape from './shape';
import palette, {getPalette} from './palette';
import typography from './typography';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, {customShadows} from './shadows';
import {useDispatch, useSelector} from "react-redux";
import {getParent} from "../graphql/queries";
import {SET_THEME} from "../store/actions";
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
    children: PropTypes.node
};

export default function ThemeConfig({children}) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const customization = useSelector(state => state.customization);
    const dispatch = useDispatch();
    const firstUpdate = useRef(true);
    const themeOptions = (mode) => {
        return {
            palette: getPalette(mode),
            shape,
            typography,
            shadows,
            customShadows
        }
    }

     useMemo(
        () => {
            console.log('Mode', prefersDarkMode ? 'DARK' : 'LIGHT')
            dispatch({type: SET_THEME, theme: prefersDarkMode ? 'dark' : 'light'});

        },
        [prefersDarkMode],
    );

    function createThemeWithThemeOptions(theme) {
        return createTheme(themeOptions(theme))
    }

    const theme = useMemo(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            dispatch({type: SET_THEME, theme: prefersDarkMode ? "dark" : 'light'})
        }
        return createThemeWithThemeOptions(customization.theme);
    }, [customization.theme]);

    theme.components = componentsOverride(theme);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <GlobalStyles/>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
