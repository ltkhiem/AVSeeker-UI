const initialState = {
    visible: false,
    framesList: [],
}


const imageListModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FRAMES_LIST':
            return {
                ...state,
                framesList: action.framesList,
            }
        case "SET_IMAGE_LIST_MODAL_VISIBLE":
            return {
                ...state,
                visible: action.visible,
            }
        default:
            return state
    }
}


export default imageListModalReducer;