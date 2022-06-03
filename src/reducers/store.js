import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import imageSourcesReducer from "./imageSources";
import stateTimelineReducer from "./stateTimeline";
import queryReducer from "./query";
import videoViewerReducer from "./videoViewer"
import interactiveQuestionReducer from "./interactiveQuestion";
import userConfigReducer from "./userConfig";
import imageListModalReducer from "./imageListModal";
import keyframesRankedListReducer from "./keyframesRankedListReducer";


export default configureStore({
    reducer: {
        imageSources: imageSourcesReducer,
        query: queryReducer,
        stateTimeline: stateTimelineReducer,
        videoViewer: videoViewerReducer,
        interactiveQuestion: interactiveQuestionReducer,
        userConfig: userConfigReducer,
        imageListModal: imageListModalReducer,
        keyframesRankedList: keyframesRankedListReducer,
    },
    middleware: [
        thunk,
        logger,
    ]
})
