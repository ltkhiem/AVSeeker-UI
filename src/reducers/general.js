const initialState = {
    isPressX: false,
    isPressS: false,
    isPressR: false,
    isPressW: false,
    isPressT: false,
}


const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_PRESS_X':
            return {
                ...state,
                isPressX: action.isPressX
            }
        case 'SET_IS_PRESS_S':
            return {
                ...state,
                isPressS: action.isPressS
            }
        case 'SET_IS_PRESS_R':
            return {
                ...state,
                isPressR: action.isPressR
            }
        case 'SET_IS_PRESS_W':
            return {
                ...state,
                isPressW: action.isPressW
            }
        case 'SET_IS_PRESS_T':
            return {
                ...state,
                isPressT: action.isPressT,
            }
        // ... other cases
        default:
            return state;
    }
};

export default generalReducer
