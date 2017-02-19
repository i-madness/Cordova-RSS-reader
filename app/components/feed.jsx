import React from 'react'
import { connect } from 'react-redux'
import { FeedParser } from '../core/parser.js'
import { Card, CardTypes } from './basic/card.jsx'
import Paragraph from './basic/paragraph.jsx'

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
            // заменяем теги <br> на абзацы
            let cardContent = item.description.split(/<br\W*\/>/).map((paragraph, pIndex) => <Paragraph content={paragraph} key={pIndex} />) // <p key={pIndex}>{paragraph}</p>
            return <Card type={CardTypes.FEED_ITEM} title={item.title} text={cardContent} img={item.img} key={index} />
        })
        return (
            <div>
                {entryCards}
            </div>
        )
    }
}