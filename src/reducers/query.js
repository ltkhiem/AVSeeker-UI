const initialState = {
    stateId: '',
    query: '',
    isLoadingSearch: false,
}


const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QUERY_DATA':
            return {
                ...state,
                stateId: action.stateId,
                query: action.query,
            }
        case 'SET_IS_LOADING_SEARCH':
            return {
                ...state,
                isLoadingSearch: action.isLoadingSearch,
            }
        default:
            return state
    }
}

export default queryReducer;