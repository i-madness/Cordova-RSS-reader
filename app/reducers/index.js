import { combineReducers } from 'redux'

import feedReducer from './feed-reducer.js'
import subscriptionReducer from './subscription-reducer.js'

export default combineReducers({
    feedReducer,
    subscriptionReducer
})