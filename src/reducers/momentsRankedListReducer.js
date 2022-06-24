const initialState = {
    visible: false,
    momentsList: [],
    clusterId: ''
}


const keyframesRankedListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MOMENTS_RANKED_LIST_MODAL_VISIBLE":
            return {
                ...state,
                visible: action.visible
            }
        case "SET_MODAL_MOMENTS_RANKED_LIST":
            return {
                ...state,
                momentsList: action.momentsList
            }
        case "SET_MOMENTS_RANKED_LIST_MODAL_CLUSTER_ID":
            return {
                ...state,
                clusterId: action.clusterId
            }
        default:
            return state
    }
}


export default keyframesRankedListReducer;