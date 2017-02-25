import React from 'react'
import { connect } from 'react-redux'
import { FeedParser, feedPromise } from '../core/parser.js'
import UpdateScheduler from '../core/scheduler.js'
import { ActionTypes as FeedReducerActions } from '../reducers/feed-reducer.js'
import { Card, CardTypes } from './basic/card.jsx'
import { ButtonRippleRounded } from './basic/button.jsx'
import Paragraph from './basic/paragraph.jsx'

/**
 * Комопнент, отвечающий за отображение ленты. В ленте по умолчанию отображается контент всех каналов сразу,
 * но если выбрать определённый канал на странице подписок, то будет отображено содержимое только этого канала
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
        //channels && this.props.dispatch(FeedParser.parseSubscription(channels))
        UpdateScheduler.stop()
        UpdateScheduler.update()
        if (channels && this.props.params && this.props.params.channel) {
            feedPromise.then(() => {
                let requiredChannel = channels.find(ch => ch.id === this.props.params.channel)
                this.props.dispatch({ type: FeedReducerActions.ENTRIES_CHANNEL_FILTER, payload: requiredChannel })
            })
        }
    }

    refresh() {
        UpdateScheduler.stop() // пока не понятно, что вообще делать с этим планировщиком
        UpdateScheduler.update()
        if (this.props.params && this.props.params.channel) {
            feedPromise.then(() => {
                let requiredChannel = this.props.channels.find(ch => ch.id === this.props.params.channel)
                this.props.dispatch({ type: FeedReducerActions.ENTRIES_CHANNEL_FILTER, payload: requiredChannel })
            })
        } else {
            UpdateScheduler.scheduleCheckingTask()
        }
    }

    render() {
        let { query } = this.props.location
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
                <ButtonRippleRounded id="refresh-feed-btn" onClick={() => this.refresh()} style={{ position: 'fixed', bottom: '15px', right: '15px', zIndex: '1000', border: '#fff 2px solid' }}>
                    <i class="material-icons">refresh</i>
                </ButtonRippleRounded>
            </div>
        )
    }
}