const initialState = {
    states: [
        {
            datetime: new Date().toLocaleString(),
            state: '',
            method: 'START',
            query: '',
        }
    ],
    statePointer: {
        value: 0,
        previous: 0
    }
}


const stateTimelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_STATE_TIMELINE_DATA':
            return {
                ...state,
                states: [
                    ...state.states,
                    {
                        datetime: action.datetime,
                        state: action.state,
                        method: action.method,
                        query: action.query
                    }
                ]
            }
        case 'SET_STATE_TIMELINE':
            return {
                ...state,
                states: action.states,
            }
        case 'SET_STATE_POINTER':
            return {
                ...state,
                statePointer: {
                    value: action.value,
                    previous: action.previous
                }
            }
        default:
            return state
    } 
}

export default stateTimelineReducer;