import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducer from './reducers/index.js'

const middleware = applyMiddleware(promise(), thunk, logger())

const store = 
      window.store = createStore(reducer, middleware) // dev shenanigans

export default store