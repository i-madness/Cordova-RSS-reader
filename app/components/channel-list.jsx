import React from 'react'
import { connect } from 'react-redux'

import { FeedParser } from '../core/parser.js'
import { Card, CardTypes } from './basic/card.jsx'
//import '../../node_modules/material-design-lite/material.js' 

/**
 * Заголовок страницы со списком каналов
 */
export class ChannelListTitle extends React.Component {
    render() { return (<span class="mdl-layout-title">Список RSS-лент</span>) }
}

/**
 * Комопнент, отвечающий за список каналов
 * Располагается в теле страницы (!)
 */
@connect(store => {
    return {
        loading: store.subscriptionReducer.loading,
        subscriptions: store.subscriptionReducer.subscriptions
    }
})
export class ChannelList extends React.Component {
    componentWillMount() {
        this.props.dispatch(FeedParser.addRssFeed('/www/xml/example.xml'))
    }

    render() {
        let { subscriptions } = this.props;
        let subCards = subscriptions.map((sub, index) => <Card title={sub.title} text={sub.description} type={CardTypes.SUBSCRIPTION_ITEM} key={index} />)

        console.debug('[YARRRRR]', this.props)
        return (
            <div>
                <div style={{display: this.props.loading ? 'block' : 'none'}} id="ajax-preloader" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
                {subCards}
            </div>
        )
    }
}