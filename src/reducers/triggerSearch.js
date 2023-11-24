const initialState = {
    triggerSearch: false
};

const triggerSearchReducer = (state = initialState, action) => {
    switch (action.type) {
	case 'SET_TRIGGER_SEARCH':
            // Handle search trigger
            return {
                ...state,
                triggerSearch: action.triggerSearch 
            };
        // other cases
        default:
            return state;
    }
};

export default triggerSearchReducer;
