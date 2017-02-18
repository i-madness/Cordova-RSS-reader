import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducer from './reducers/index.js'
import React from 'react'
import ReactDOM from 'react-dom'

const middleware = applyMiddleware(promise(), thunk, logger())

const store =
      window.store = createStore(reducer, middleware) // dev shenanigans

store.subscribe(() => {
    let state = store.getState()
    let subscriptions = state.subscriptionReducer.subscriptions.map(sub => sub.url)
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    let error = state.subscriptionReducer.error || state.feedReducer.error
    if (error) {
        let snackbar = document.querySelector('#snackbar-message')
        snackbar.MaterialSnackbar.showSnackbar({message:error});
    }
})

export default store