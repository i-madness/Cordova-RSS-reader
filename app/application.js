import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { FeedParser } from './core/parser.js'
import UpdateScheduler from './core/scheduler.js'
import Utils from './core/utils.js'

import store from './store'
import Layout from './components/layout.jsx'
import { ChannelList } from './components/channel-list.jsx'
import { Feed } from './components/feed.jsx'
import { AddSubscriptionForm } from './components/add-subscription-form.jsx'
import SettingsPage from './components/settings.jsx'
import Favorites from './components/favorites.jsx'

/**
 * Главный DOM-элемент, в котором рендерится всё приложение
 */
const APP_CONTAINER = document.querySelector('#app')

let subscriptionUrls = JSON.parse(localStorage.getItem('subscriptions'))
subscriptionUrls && subscriptionUrls.forEach(url => store.dispatch(FeedParser.addRssFeed(url)))
Utils.tryUntil(UpdateScheduler.update)(50)(() => !!store.getState().subscriptionReducer.subscriptions.length)

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout} >
                <IndexRoute component={ChannelList}></IndexRoute>
                <Route path="feed(/:channel)" component={Feed} ></Route>
                <Route path="addSub"          component={AddSubscriptionForm}></Route>
                <Route path="settings"        component={SettingsPage}></Route>
                <Route path="favorites"       component={Favorites}></Route>
            </Route>
        </Router>
    </Provider>,
    APP_CONTAINER
)