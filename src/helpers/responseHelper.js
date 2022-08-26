import { VIDEO_SERVER, IMAGE_SERVER } from "../constants/server"
import { IMAGE_EXTENSION } from "../constants/image"


export const handleStateTimelineResponse = (stateId, method, query) => {
    let currentDatetime = new Date()
    return {
        datetime: currentDatetime.toLocaleString(),
        state: stateId,
        query,
        method,
    }
}


export const handleRankedListResponse = (rankedList) => {
    return rankedList.map((item) => {
        return {
            id: item.shot_id,
            video: `${VIDEO_SERVER}/${item.shot_id}.mp4`,
            frames: item.keyframe_list.map((frame) => `${IMAGE_SERVER}/${item.shot_id}/${frame}.${IMAGE_EXTENSION}`),
        }
    })
}


export const handleKeyframesResponse = (keyframes, shotId) => {
    return keyframes.map((item) => `${IMAGE_SERVER}/${shotId}/${item}.${IMAGE_EXTENSION}`)
}