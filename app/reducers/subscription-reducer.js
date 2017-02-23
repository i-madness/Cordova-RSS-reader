/**
 * Начальный объект состояния для subscriptionReducer
 */
const InitialState = {
    subscriptions: [],
    loading: false,
    loaded: false,
    error: null
}

/**
 * Типы действий, обрабатываемых subscriptionReducer'ом
 */
export const ActionTypes = {
    ADD_SUBSCRIPTION: 'ADD_SUBSCRIPTION',
    SUBSCRIPTIONS_LOADING: 'SUBSCRIPTIONS_LOADING',
    SUBSCRIPTIONS_LOADING_SUCCESS: 'SUBSCRIPTIONS_LOADING_SUCCESS',
    SUBSCRIPTIONS_LOADING_FAILURE: 'SUBSCRIPTIONS_LOADING_FAILURE',
    SUBSCRIPTIONS_DELETE: 'SUBSCRIPTIONS_DELETE',
    SUBSCRIPTIONS_CLEAR: 'SUBSCRIPTIONS_CLEAR'
}

/**
 * Reducer, управляющий состоянием подписок на RSS-каналы
 */
export function subscriptionReducer(state = InitialState, action) {
    switch (action.type) {
        case ActionTypes.ADD_SUBSCRIPTION: {
            return {
                ...state,
                loaded: true,
                loading: false,
                subscriptions: [...state.subscriptions, action.payload],
                error: null
            }
        }
        case ActionTypes.SUBSCRIPTIONS_LOADING: {
            return { ...state, loading: true, loaded: false, error: null }
        }
        case ActionTypes.SUBSCRIPTIONS_LOADING_FAILURE: {
            return { ...state, loading: false, error: action.payload }
        }
        case ActionTypes.SUBSCRIPTIONS_LOADING_SUCCESS: {
            return {
                ...state,
                subscriptions: action.payload,
                loading: false,
                loaded: true,
                error: null,
            }
        }
        case ActionTypes.SUBSCRIPTIONS_CLEAR: {
            return {
                ...state,
                subscriptions: []
            }
        }
        case ActionTypes.SUBSCRIPTIONS_DELETE: {
            let newSubs = state.subscriptions.filter(sub => sub.title !== action.payload)
            return {
                ...state,
                subscriptions: newSubs
            }
        }
    }
    return state;
}