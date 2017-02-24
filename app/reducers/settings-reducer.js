const InitialState = {
    checkDuration: 120000
}

export const ActionTypes = {
    CHECK_DURATION_CHANGE: 'CHECK_DURATION_CHANGE'
}

export function settingsReducer(state = InitialState, action) {
    switch (action.type) {
        case ActionTypes.CHECK_DURATION_CHANGE: {
            return {
                ...state,
                checkDuration: action.payload
            }
        }
    }
    return state
}