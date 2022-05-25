import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import imageSourcesReducer from "./imageSources";


export default configureStore({
    reducer: {
        imageSources: imageSourcesReducer,
    },
    middleware: [
        thunk,
        logger,
    ]
})
