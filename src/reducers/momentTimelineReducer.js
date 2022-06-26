const initialState = {
    imageId: '',
    momentsTimeline: [],
    visible: false,
}


const momentTimelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOMENT_TIMELINE_VISIBLE':
            return {
                ...state,
                visible: action.visible,
            }
        case 'SET_MOMENT_TIMELINE_IMAGE_ID':
            return {
                ...state,
                imageId: action.imageId,
            }
        case "SET_MOMENT_TIMELINE": {
            return {
                ...state,
                momentsTimeline: action.momentsTimeline,
            }

        }
        default:
            return state
    }
}


export default momentTimelineReducer;