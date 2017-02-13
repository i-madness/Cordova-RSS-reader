import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducer from './reducers/index.js'

const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducer, middleware)