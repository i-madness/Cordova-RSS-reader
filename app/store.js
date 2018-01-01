import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducer from './reducers/index.js'
import React from 'react'
import ReactDOM from 'react-dom'

const middleware = applyMiddleware(promise(), thunk, logger())
const store = createStore(reducer, middleware)

let errorWasShown = false

store.subscribe(() => {
    let state = store.getState()
    let { subscriptions } = state.subscriptionReducer
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    localStorage.setItem('favoriteEntries', JSON.stringify(state.feedReducer.favorites))
    // отображение ошибок
    // TODO: вынести Snackbar в отдельный компонент и использовать componentWillReceiveProps для схожей логики
    let error = state.subscriptionReducer.error || state.feedReducer.error
    if (error && !errorWasShown) {
        if (/.*failed to fetch/i.test(error.toString())) {
            error = "Ошибка: не удалось выполнить запрос"
        }
        let snackbar = document.querySelector('#snackbar-message-error').MaterialSnackbar
        snackbar.showSnackbar({ message: error })
        errorWasShown = true
    } else {
        errorWasShown = false
    }
})

export default store