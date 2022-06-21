const initialState = {
    // vsImageSources: [],
    vsImageSources: [
        {
            id: "20190707_075848_000",
            path: "http://lifeseeker-sv.computing.dcu.ie/201907/07/20190707_075848_000.jpg"
        },
        {
            id: "20190707_075910_000",
            path: "http://lifeseeker-sv.computing.dcu.ie/201907/07/20190707_075910_000.jpg"
        },
        {
            id: "20190707_075932_000",
            path: "http://lifeseeker-sv.computing.dcu.ie/201907/07/20190707_075932_000.jpg"
        }
    ],
    visualSimilaritySourcesVisible: true,
}


const visualSimilaritySourcesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VISUAL_SIMILARITY_SOURCES":
            return {
                ...state,
                vsImageSources: action.vsImageSources
            }
        case "SET_VISUAL_SIMILARITY_SOURCES_VISIBLE":
            return {
                ...state,
                visualSimilaritySourcesVisible: action.visualSimilaritySourcesVisible
            }
        default:
            return state
    }
}


export default visualSimilaritySourcesReducer