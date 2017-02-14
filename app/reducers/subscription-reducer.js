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
    SUBSCRIBERS_LOADING: 'SUBSCRIBERS_LOADING',
    SUBSCRIBERS_LOADING_SUCCESS: 'SUBSCRIBERS_LOADING_SUCCESS',
    SUBSCRIBERS_LOADING_FAILURE: 'SUBSCRIBERS_LOADING_FAILURE'
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
                subscriptions: [...state.subscriptions, action.payload]
            }
        }
        case ActionTypes.SUBSCRIBERS_LOADING: {
            return {...state, loading: true}
        }
        case ActionTypes.SUBSCRIBERS_LOADING_FAILURE: {
            return {...state, loading: false, error: action.payload}
        }
        case ActionTypes.SUBSCRIBERS_LOADING_SUCCESS: {
            return {
                ...state,
                subscriptions: action.payload,
                loading: false,
                loaded: true
            }
        }
    }
    return state;
}