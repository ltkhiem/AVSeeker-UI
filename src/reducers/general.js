const initialState = {
    isPressX: false,
    isPressS: false
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
        default: return state
    }
}

export default generalReducer