import React from 'react'
import { connect } from 'react-redux'
import { FeedParser } from '../core/parser.js'
import { Card, CardTypes } from './basic/card.jsx'

/**
 * Заголовок страницы ленты
 */
export class FeedTitle extends React.Component {
    render() { return (<span class="mdl-layout-title">Лента</span>) }
}

/**
 * Комопнент, отвечающий за список каналов
 */
@connect(store => {
    return {
        channels: store.subscriptionReducer.subscriptions,
        loading: store.feedReducer.loading,
        entries: store.feedReducer.entries
    }
})
export class Feed extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let { channels } = this.props
        channels && this.props.dispatch(FeedParser.parseSubscription(channels))
    }

    render() {
        let { entries } = this.props
        let entryCards = entries.map((item, index) => {
            //let imageUrls = item.description.match(/<img.*\W+\/>/i).map(str => str.match(/\/\/.*\.[a-z]*/g)[0])
            // заменяем теги <br> на абзацы
            let cardContent = item.description.split(/<br\W*\/>/).map((paragraph, parIndex) => <p key={parIndex}>{paragraph}</p>)
            return <Card type={CardTypes.FEED_ITEM} title={item.title} text={cardContent} img={item.img} key={index} />
        })
        return (
            <div>
                {entryCards}
            </div>
        )
    }
}