export const setStateTimelineData = ({ datetime, state, method, query }) => ({
    type: 'SET_STATE_TIMELINE_DATA',
    datetime: datetime,
    state: state,
    method: method,
    query: query
})


export const setImageSources = (imageSources) => ({
    type: "SET_IMAGE_SOURCES",
    imageSources: imageSources
})


export const setStatePointer = ({ value, previous }) => ({
    type: "SET_STATE_POINTER",
    value: value,
    previous: previous
})