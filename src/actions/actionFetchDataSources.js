export const addStateTimelineData = ({ datetime, state, method, query }) => ({
    type: 'ADD_STATE_TIMELINE_DATA',
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


export const setStateTimeline = (states) => ({
    type: 'SET_STATE_TIMELINE',
    states: states,
})


export const setFramesList = (framesList) => ({
    type: "SET_FRAMES_LIST",
    framesList: framesList,
})


export const setImageListModalVisible = (visible) => ({
    type: "SET_IMAGE_LIST_MODAL_VISIBLE",
    visible: visible,
})
