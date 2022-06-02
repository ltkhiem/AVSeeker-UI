const initialState = {
    id: '',
    sessionId: '',
    role: '',
    userId: '',
}


const userConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SESSION_INFO':
            return {
                ...state,
                id: action.id,
                sessionId: action.sessionId,
                role: action.role,
                userId: action.userId,
            }
        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.userId,
            }
        case 'SET_SESSION_ID':
            return {
                ...state,
                sessionId: action.sessionId,
            }
        default:
            return state
    }
}


export default userConfigReducer