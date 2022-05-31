export const setQueryData = ({ userId, stateId, query }) => ({
    type: 'SET_QUERY_DATA',
    userId: userId,
    stateId: stateId,
    query: query,
})