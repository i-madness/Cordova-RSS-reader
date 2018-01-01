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
import AboutPage from './components/about.jsx'
import { ActionTypes as SubscriptionActions } from './reducers/subscription-reducer'

let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || []
store.dispatch({ payload: subscriptions, type: SubscriptionActions.SUBSCRIPTIONS_LOADING_SUCCESS })
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
                <Route path="about"           component={AboutPage}></Route>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#app')
)