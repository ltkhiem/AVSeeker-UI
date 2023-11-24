import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import imageSourcesReducer from "./imageSources";
import stateTimelineReducer from "./stateTimeline";
import queryReducer from "./query";
import videoViewerReducer from "./videoViewer"
import comprehensionFilterReducer from "./comprehensionFilter"
import userConfigReducer from "./userConfig";
import allDayMomentsModalReducer from "./allDayMomentsModal";
import momentsRankedListReducer from "./momentsRankedListReducer";
import visualSimilaritySourcesReducer from "./visualSimilaritySources";
import visualSimilarityQueryReducer from "./visualSimilarityQuery";
import showGazeReducer from "./showGaze";
import momentTimelineReducer from "./momentTimelineReducer";
import generalReducer from "./general";
import triggerSearchReducer from "./triggerSearch";


export default configureStore({
    reducer: {
        imageSources: imageSourcesReducer,
        query: queryReducer,
        visualSimilarityQuery: visualSimilarityQueryReducer,
        stateTimeline: stateTimelineReducer,
        videoViewer: videoViewerReducer,
	comprehensionFilter: comprehensionFilterReducer,
        userConfig: userConfigReducer,
        allDayMomentsModal: allDayMomentsModalReducer,
        momentsRankedList: momentsRankedListReducer,
        visualSimilaritySources: visualSimilaritySourcesReducer,
        showGaze: showGazeReducer,
        triggerSearch: triggerSearchReducer,
        general: generalReducer,
        momentTimeline: momentTimelineReducer,
    },
    middleware: [
        thunk,
        // logger,
    ]
})
