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
            clusterId: item.cluster_id,
            sources: item.image_list.map((source) => {
                return {
                    id: source,
                    path: `${IMAGE_SERVER}/${item.dataset_path}/${source}.${IMAGE_EXTENSION}`
                }
            })
        }
    })
}


export const handleKeyframesResponse = (keyframes, shotId) => {
    return keyframes.map((item) => `${IMAGE_SERVER}/${shotId}/${item}.${IMAGE_EXTENSION}`)
}