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

let errorWasShown = false;

store.subscribe(() => {
    let state = store.getState()
    let subscriptions = state.subscriptionReducer.subscriptions.map(sub => sub.url)
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    localStorage.setItem('favoriteEntries', JSON.stringify(state.feedReducer.favorites))
    // отображение ошибок:
    let error = state.subscriptionReducer.error || state.feedReducer.error
    if (error && !errorWasShown) {
        if (error.toString().match(/.*failed to fetch/i)) {
            error = "Ошибка: не удалось выполнить запрос"
        }
        let snackbar = document.querySelector('#snackbar-message-error')
        snackbar.MaterialSnackbar.showSnackbar({ message: error });
        errorWasShown = true
    } else {
        errorWasShown = false
    }
})

export default store