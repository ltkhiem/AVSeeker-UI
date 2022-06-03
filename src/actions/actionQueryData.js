export const setQueryData = ({ stateId, query }) => ({
    type: 'SET_QUERY_DATA',
    stateId: stateId,
    query: query,
})


export const setIsLoadingSearch = (isLoadingSearch) => ({
    type: "SET_IS_LOADING_SEARCH",
    isLoadingSearch: isLoadingSearch,
})