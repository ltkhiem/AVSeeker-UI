const initialState = {
    clusterId: '',
    visible: false,
    momentsList: [],
}


const allDayMomentsModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MODAL_ALL_DAY_MOMENTS_LIST':
            return {
                ...state,
                momentsList: action.momentsList,
            }
        case "SET_ALL_DAY_MOMENTS_MODAL_VISIBLE":
            return {
                ...state,
                visible: action.visible,
            }
        case "SET_ALL_DAY_MOMENTS_MODAL_CLUSTER_ID":
            return {
                ...state,
                clusterId: action.clusterId,
            }
        default:
            return state
    }
}


export default allDayMomentsModalReducer;