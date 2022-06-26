import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import imageSourcesReducer from "./imageSources";
import stateTimelineReducer from "./stateTimeline";
import queryReducer from "./query";
import videoViewerReducer from "./videoViewer"
import interactiveQuestionReducer from "./interactiveQuestion";
import userConfigReducer from "./userConfig";
import allDayMomentsModalReducer from "./allDayMomentsModal";
import momentsRankedListReducer from "./momentsRankedListReducer";
import visualSimilaritySourcesReducer from "./visualSimilaritySources";
import visualSimilarityQueryReducer from "./visualSimilarityQuery";
import generalReducer from "./general";


export default configureStore({
    reducer: {
        imageSources: imageSourcesReducer,
        query: queryReducer,
        visualSimilarityQuery: visualSimilarityQueryReducer,
        stateTimeline: stateTimelineReducer,
        videoViewer: videoViewerReducer,
        interactiveQuestion: interactiveQuestionReducer,
        userConfig: userConfigReducer,
        allDayMomentsModal: allDayMomentsModalReducer,
        momentsRankedList: momentsRankedListReducer,
        visualSimilaritySources: visualSimilaritySourcesReducer,
        general: generalReducer,
    },
    middleware: [
        thunk,
        // logger,
    ]
})
