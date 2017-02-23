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
        favorites: store.feedReducer.favorites
    }
})
export default class Favorites extends React.Component {
    render() {
        let { favorites } = this.props
        let favoriteCards = favorites
            .map((item, index) => {
                let cardContent = item.description.split(/<br\W*\/>/).map((paragraph, pIndex) => <Paragraph content={paragraph} key={pIndex} />)
                return <Card type={CardTypes.FAVORITES_ITEM} feedItem={item} title={item.title} text={cardContent} link={item.link} img={item.img} key={index} />
            })
        return (
            <div>
                {favoriteCards}
            </div>
        )
    }
}