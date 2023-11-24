const initialState = {
    rcfilter: 'high',
}

const comprehensionFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPREHENSION_FILTER':
            return {
                ...state,
                rcfilter: action.rcfilter,
            }
        default:
            return state
    }
}

export default comprehensionFilterReducer
