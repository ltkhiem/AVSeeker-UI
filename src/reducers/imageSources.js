let initialState = {
    // Main image grid container is shown by default. 
    // Therefore, we don't need a variable to manage the visibility of the image grid container.
    // imageSources: [],
    imageSources: [
        {
            date: "2019-07-07",
            sources: [
                {
                    id: "20190707_075848_000",
                    time: '07:58:48',
                    path: "http://lifeseeker-sv.computing.dcu.ie/201907/07/20190707_075848_000.jpg"
                },
                {
                    id: "20190707_075910_000",
                    time: '07:59:10',
                    path: "http://lifeseeker-sv.computing.dcu.ie/201907/07/20190707_075910_000.jpg"
                },
                {
                    id: "20190707_075932_000",
                    time: '07:59:32',
                    path: "http://lifeseeker-sv.computing.dcu.ie/201907/07/20190707_075932_000.jpg"
                }
            ]
        }
    ],
}


const imageSourcesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IMAGE_SOURCES":
            return {
                ...state,
                imageSources: action.imageSources
            }
        default:
            return state
    }
}


export default imageSourcesReducer;
