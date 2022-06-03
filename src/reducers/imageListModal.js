const initialState = {
    videoId: '',
    visible: false,
    framesList: [],
}


const imageListModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODAL_FRAMES_LIST':
            return {
                ...state,
                framesList: action.framesList,
            }
        case "SET_IMAGE_LIST_MODAL_VISIBLE":
            return {
                ...state,
                visible: action.visible,
            }
        case "SET_IMAGE_LIST_MODAL_VIDEO_ID":
            return {
                ...state,
                videoId: action.videoId,
            }
        default:
            return state
    }
}


export default imageListModalReducer;