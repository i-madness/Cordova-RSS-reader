import React from 'react'
import { FeedParser } from '../core/parser.js'
import { Card, CardTypes } from './basic/card.jsx'

/**
 * ** TODO: получилось какое-то УГ в плане отделения title от остального класса
 * ** надо бы поправить этот момент
 */
export class FeedTitle extends React.Component {
    render() { return (<span class="mdl-layout-title">Лента</span>) }
}

/**
 * Комопнент, отвечающий за список каналов
 */
export class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.subPromise = FeedParser.parseSubscription()
            .then(items => {
                items = items.map((item, index) => <Card type={CardTypes.FEED_ITEM} title={item.title} text={item.description} img={item.img} key={index} />)
                this.setState({ items })
            })
    }

    render() {
        return (
            <div>
                {this.state.items}
            </div>
        )
    }
}