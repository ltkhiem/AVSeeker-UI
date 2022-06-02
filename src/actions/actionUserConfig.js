export const setUserId = ( userId ) => ({
    type: "SET_USER_ID",
    userId: userId,
})


export const setSessionInfo = ({ id, username, role, sessionId }) => ({
    type: "SET_SESSION_INFO",
    id: id,
    username: username,
    role: role,
    sessionId: sessionId,
})


export const setSessionId = ( sessionId ) => ({
    type: "SET_SESSION_ID",
    sessionId: sessionId,
})