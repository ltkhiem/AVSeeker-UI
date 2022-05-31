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
            video: `${item.dataset}/videos/${item.shot_id}/${item.shot_id}.mp4`,
            frames: item.keyframe_list.map((frame) => `${frame}.webp`),
        }
    })
}