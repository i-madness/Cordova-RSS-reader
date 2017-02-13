import React from 'react'
import { connect } from 'react-redux'

import { FeedParser } from '../core/parser.js'
import { Card } from './basic/card.jsx'

/**
 * Заголовок страницы со списком каналов
 */
export class ChannelListTitle extends React.Component {
    render() { return (<span class="mdl-layout-title">Список RSS-лент</span>) }
}

let mockPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([{ foo: 'bar' }])
    }, 1800)
})

let mockWut = () => dispatch => {
    dispatch({ type: 'SUBSCRIBERS_LOADING' })
    mockPromise().then(resp => dispatch({ type: 'SUBSCRIBERS_LOADING_SUCCESS', payload: resp }))
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
        this.props.dispatch(mockWut()) //FeedParser.validateRssFeed('/www/xml/example.xml'))
    }

    

    render() {
        console.debug('[YARRRRR]', this.props)
        return (
            <div>
                <div style={{ backgroundColor: 'cyan', display: this.props.loading ? 'block' : 'none' }}>I show up only on loading</div>
                <div>{JSON.stringify(this.props.subscriptions)}</div>
            </div>
        )
    }
}