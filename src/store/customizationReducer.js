// project imports

// action - state management
import * as actionTypes from './actions';

export const initialState = {
    isOpen: [], // for active default menu
    opened: true,
    period: 'weekly',
    showSteps: true,
    showSleep: false,
    showSedentary: false,
    showActivity: false,
}

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_TEXT:
            return {
                ...state,
                text: action.text
            };
        case actionTypes.SET_SHOW_STEPS:
            return {
                ...state,
                showSteps: action.showSteps
            };
        case actionTypes.SET_SHOW_SLEEP:
            return {
                ...state,
                showSleep: action.showSleep
            };
        case actionTypes.SET_SHOW_SEDENTARY:
            return {
                ...state,
                showSedentary: action.showSedentary
            };
        case actionTypes.SET_SHOW_ACTIVITY:
            return {
                ...state,
                showActivity: action.showActivity
            };
        case actionTypes.SET_PERIOD:
            return{
                ...state,
                period: action.period
            }
        default:
            return state;
    }
};

export default customizationReducer;
