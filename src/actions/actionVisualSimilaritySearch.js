export const setVisualSimilaritySources = (vsImageSources) => ({
    type: "SET_VISUAL_SIMILARITY_SOURCES",
    vsImageSources: vsImageSources,
})


export const setVisualSimilaritySourcesVisible = (visualSimilaritySourcesVisible) => ({
    type: "SET_VISUAL_SIMILARITY_SOURCES_VISIBLE",
    visualSimilaritySourcesVisible: visualSimilaritySourcesVisible,
})


export const addPositiveItem = (item) => ({
    type: "ADD_POSITIVE_ITEM",
    item: item,
})


export const addNegativeItem = (item) => ({
    type: "ADD_NEGATIVE_ITEM",
    item: item,
})


export const setPositiveItems = (positiveItems) => ({
    type: "SET_POSITIVE_ITEMS",
    positiveItems: positiveItems,
})


export const setNegativeItems = (negativeItems) => ({
    type: "SET_NEGATIVE_ITEMS",
    negativeItems: negativeItems,
})


export const removePositiveItem = (item) => ({
    type: "REMOVE_POSITIVE_ITEM",
    item: item,
})


export const removeNegativeItem = (item) => ({
    type: "REMOVE_NEGATIVE_ITEM",
    item: item,
})