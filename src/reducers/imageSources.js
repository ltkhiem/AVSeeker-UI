let initialState = {
    imageSources: [
        {
            id: "00001",
            video: "V3C1/videos/00001/00001.mp4",
            frames: [
                "shot00001_100_RKF.png", // First is the key-frame 
                "shot00001_101_RKF.png", // Second is the second frame in the ranked list
                "shot00001_102_RKF.png", // Third frame in the ranked list
            ],
        },
        {
            id: "00002",
            video: "V3C1/videos/00002/00002.mp4",
            frames: [
                "shot00002_10_RKF.png",
                "shot00002_11_RKF.png",
                "shot00002_12_RKF.png"
            ]
        },
        {
            id: "00003",
            video: "V3C1/videos/00003/00003.mp4",
            frames: [
                "shot00003_100_RKF.png",
                "shot00003_101_RKF.png",
                "shot00003_102_RKF.png"
            ]
        },
    ]
}


const imageSourcesReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}


export default imageSourcesReducer;
