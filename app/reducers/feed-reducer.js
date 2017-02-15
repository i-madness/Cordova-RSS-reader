/**
 * Начальный объект состояния для feedReducer
 */
const InitialState = {
    entries: [],
    loading: false,
    loaded: true,
    error: null
}

/**
 * Типы действий, обрабатываемых feedReducer'ом
 */
export const ActionTypes = {
    ENTRIES_LOADING: 'ENTRIES_LOADING',
    ENTRIES_LOADING_SUCCESS: 'ENTRIES_LOADING_SUCCESS',
    ENTRIES_LOADING_FAILURE: 'ENTRIES_LOADING_FAILURE',
    ENTRIES_CHANNEL_FILTER: 'ENTRIES_CHANNEL_FILTER'
}

/**
 * Reducer, управляющий состоянием записей, находящихся в ленте
 */
export function feedReducer(state = InitialState, action) {
    switch (action.type) {
        case ActionTypes.ENTRIES_LOADING: {
            return { ...state, loading: true, loaded: false }
        }
        case ActionTypes.ENTRIES_LOADING_FAILURE: {
            return { ...state, loading: false, error: action.payload }
        }
        case ActionTypes.ENTRIES_LOADING_SUCCESS: {
            return { 
                ...state, 
                loading: false, 
                loaded: true,
                entries: [...state.entries, ...action.payload],
                error: null
            }
        }
        // TODO: продумать, как заимплементить эту вещь в плане UI:
        case ActionTypes.ENTRIES_CHANNEL_FILTER: {
            return {
                ...state,
                entries: state.entries.filter(entry => entry.channel.title === action.payload)
            }
        }
    }
    return state;
}