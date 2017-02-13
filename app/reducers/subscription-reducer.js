const InitialState = {
    subscriptions: [],
    loading: false,
    loaded: false,
    error: null
}

const ActionTypes = {
    ADD_SUBSCRIPTION: 'ADD_SUBSCRIPTION',
    SUBSCRIBERS_LOADING: 'SUBSCRIBERS_LOADING',
    SUBSCRIBERS_LOADING_SUCCESS: 'SUBSCRIBERS_LOADING_SUCCESS',
    SUBSCRIBERS_LOADING_FAILURE: 'SUBSCRIBERS_LOADING_FAILURE'
}


export default function subscriptionReducer(state = InitialState, action) {
    switch (action) {
        case ActionTypes.ADD_SUBSCRIPTION: {
            return {
                ...state,
                subscriptions: [...state.subscriptions, action.payload]
            }
        }
        case ActionTypes.SUBSCRIBERS_LOADING: {
            return {...state, loading: true}
        }
        case ActionTypes.SUBSCRIBERS_FAIL: {
            return {...state, loading: false, error: action.payload}
        }
        case ActionTypes.SUBSCRIBERS_FETCHED: {
            return {
                ...state,
                subscriptions: action.payload,
                loading: false,
                loaded: true
            }
        }
    }
}