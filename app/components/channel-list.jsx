import React from 'react'
import { connect } from 'react-redux'

import { FeedParser } from '../core/parser.js'
import { Card, CardTypes } from './basic/card.jsx'
import { ButtonRippleRounded } from './basic/button.jsx'

/**
 * Комопнент, отвечающий за список каналов
 * Располагается в теле страницы (!)
 */
@connect(store => {
    return {
        subscriptions: store.subscriptionReducer.subscriptions
    }
})
export class ChannelList extends React.Component {
    render() {
        let { subscriptions } = this.props;
        let subCards = subscriptions.map((sub, index) => 
            <Card 
                link={'feed/' + sub.id}
                title={sub.title}
                text={sub.description}
                type={CardTypes.SUBSCRIPTION_ITEM}
                key={index}
            />
        )
        return (
            <div>
                {subCards}
                <ButtonRippleRounded id="add-sub-link" navPath="addSub" style={{ position: 'fixed', bottom: '15px', right: '15px', zIndex: '1000', border: '#fff 2px solid' }}>
                    <i class="material-icons">add</i>
                </ButtonRippleRounded>
            </div>
        )
    }
}