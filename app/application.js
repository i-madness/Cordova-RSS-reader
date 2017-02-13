import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import store from './store'
import Layout from './components/layout.jsx'
import { ChannelList, ChannelListTitle } from './components/channel-list.jsx'
import { Feed, FeedTitle } from './components/feed.jsx'


ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout} >
                <IndexRoute components={{ title: ChannelListTitle, body: ChannelList }}></IndexRoute>
                <Route path="feed" components={{ title: FeedTitle, body: Feed }}></Route>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#app')
)