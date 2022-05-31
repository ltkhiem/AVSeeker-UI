// This file is for VideoViewer control as the VideoViewer is supposed to be disposed after the model is closed.
const initialState = {
    videoId: '',
    videoSrc: '', 
    visible: false,
}


const videoViewerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIDEO_MODAL_DATA':
            return {
                ...state,
                videoId: action.videoId,
                videoSrc: action.videoSrc,
            }
        case 'SET_VIDEO_MODAL_VISIBLE':
            return {
                ...state,
                visible: action.visible,
            }
        default:
            return state
    }
}


export default videoViewerReducer;