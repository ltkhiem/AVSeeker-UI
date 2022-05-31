const initialState = {
    question: '',
    choice: '',
}

const interactiveQuestionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INTERACTIVE_QUESTION':
            return {
                ...state,
                question: action.question,
            }
        case 'SET_INTERACTION_CHOICE':
            return {
                ...state,
                choice: action.choice,
            }
        default:
            return state
    }
}

export default interactiveQuestionReducer