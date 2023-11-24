const initialState = {
    showGaze: true,
}

const showGazeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHOW_GAZE':
            return {
                ...state,
                showGaze: action.showGaze,
            }
        default:
            return state
    }
}

export default showGazeReducer
