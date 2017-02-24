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
        entries: store.feedReducer.entries,
        hiddenEntries: store.feedReducer.hiddenEntries
    }
})
export class Feed extends React.Component {

    componentWillMount() {
        let { channels } = this.props
        channels && this.props.dispatch(FeedParser.parseSubscription(channels))
    }

    render() {
        let { entries, hiddenEntries } = this.props
        let entryCards = entries
            .filter(entry => !hiddenEntries.length || !hiddenEntries.find(hidden => {
                return hidden.title === entry.title
            }))
            .map((item, index) => {
                // заменяем теги <br> на абзацы
                let cardContent = item.description.split(/<br\W*\/>/).map((paragraph, pIndex) => <Paragraph content={paragraph} key={pIndex} />)
                return <Card type={CardTypes.FEED_ITEM} feedItem={item} title={item.title} text={cardContent} link={item.link} img={item.img} key={index} />
            })
        return (
            <div>
                {entryCards}
            </div>
        )
    }
}