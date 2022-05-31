export const setVideoModalVisible = (visible) => ({
    type: "SET_VIDEO_MODAL_VISIBLE",
    visible: visible
})


export const setVideoModalData = (videoId, videoSrc) => ({
    type: "SET_VIDEO_MODAL_DATA",
    videoId: videoId,
    videoSrc: videoSrc,
})