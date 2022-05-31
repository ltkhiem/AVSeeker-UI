const initialState = {
    userId: 'nvtu',
    stateId: '',
    query: '',
}


const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QUERY_DATA':
            return {
                ...state,
                userId: action.userId,
                stateId: action.stateId,
                query: action.query,
            }
        default:
            return state
    }
}

export default queryReducer;