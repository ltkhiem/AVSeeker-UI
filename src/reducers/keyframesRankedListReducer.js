const initialState = {
    visible: false,
    framesList: [],
    videoId: ''
}


const keyframesRankedListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_KEYFRAMES_RANKED_LIST_MODAL_VISIBLE":
            return {
                ...state,
                visible: action.visible
            }
        case "SET_MODAL_KEYFRAMES_RANKED_LIST":
            return {
                ...state,
                framesList: action.framesList
            }
        case "SET_KEYFRAMES_RANKED_LIST_MODAL_VIDEO_ID":
            return {
                ...state,
                videoId: action.videoId
            }
        default:
            return state
    }
}


export default keyframesRankedListReducer;