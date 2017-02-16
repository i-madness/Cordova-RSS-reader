import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { FeedParser } from './core/parser.js'

import store from './store'
import Layout from './components/layout.jsx'
import { ChannelList, ChannelListTitle } from './components/channel-list.jsx'
import { Feed, FeedTitle } from './components/feed.jsx'
import { AddSubscriptionForm, AddSubFormTitle } from './components/add-subscription-form.jsx'

/**
 * Главный DOM-элемент, в котором рендерится всё приложение
 */
const APP_CONTAINER = document.querySelector('#app')

/**
 * Составные части Layout'а, используемые для отдельного роута/страницы
 */
const PageItemMap = {
    subscriptions: { title: ChannelListTitle, body: ChannelList },
    feed: { title: FeedTitle, body: Feed },
    addSub: { title: AddSubFormTitle, body: AddSubscriptionForm }
}

let subscriptionUrls = JSON.parse(localStorage.getItem('subscriptions'))
subscriptionUrls && subscriptionUrls.forEach(url => store.dispatch(FeedParser.addRssFeed(url)));

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout} >
                <IndexRoute components={PageItemMap.subscriptions}></IndexRoute>
                <Route path="feed" components={PageItemMap.feed}></Route>
                <Route path="addSub" components={PageItemMap.addSub}></Route>
            </Route>
        </Router>
    </Provider>,
    APP_CONTAINER
)