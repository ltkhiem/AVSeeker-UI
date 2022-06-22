const initialState = {
    positiveItems: [],
    negativeItems: [],
}


const visualSimilarityQueryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POSITIVE_ITEM':
            return {
                ...state,
                positiveItems: [...state.positiveItems, action.item],
            }
        case 'REMOVE_POSITIVE_ITEM':
            return {
                ...state,
                positiveItems: state.positiveItems.filter(item => item !== action.item),
            }
        case 'ADD_NEGATIVE_ITEM':
            return {
                ...state,
                negativeItems: [...state.negativeItems, action.item],
            }
        case 'REMOVE_NEGATIVE_ITEM':
            return {
                ...state,
                negativeItems: state.negativeItems.filter(item => item !== action.item),
            }
        case 'SET_POSITIVE_ITEMS':
            return {
                ...state,
                positiveItems: action.positiveItems,
            }
        case 'SET_NEGATIVE_ITEMS':
            return {
                ...state,
                negativeItems: action.negativeItems,
            }
        default:
            return state
    }
}


export default visualSimilarityQueryReducer
