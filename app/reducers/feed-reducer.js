const InitialState = {
    entries: []
}

export const ActionTypes = {
    ENTRIES_LOADING: 'ENTRIES_LOADING',
    ENTRIES_LOADING_SUCCESS: 'ENTRIES_LOADING_SUCCESS',
    ENTRIES_LOADING_FAILURE: 'ENTRIES_LOADING_FAILURE'
}

export function feedReducer(state = InitialState, action) {
    return state;
}