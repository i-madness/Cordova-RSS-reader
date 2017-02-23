import React from 'react'
import Utils from '../../core/utils.js'
import Menu from './menu.jsx'
import store from '../../store.js'
import { ActionTypes as SubActionTypes } from '../../reducers/subscription-reducer.js'
import { ActionTypes as FeedActionTypes } from '../../reducers/feed-reducer.js'

/**
 * Константа с возможными css-классами карточек
 */
export const CardTypes = {
    SUBSCRIPTION_ITEM: {
        items: [
            { text: 'Удалить подписку', action: target => store.dispatch({ type: SubActionTypes.SUBSCRIPTIONS_DELETE, payload: target.title }) }
        ]
    },
    FEED_ITEM: {
        items: [
            { text: 'Скрыть', action: target => store.dispatch({ type: FeedActionTypes.ENTRY_HIDE, payload: target.title }) },
            { text: 'Добавить в избранное', action: target => store.dispatch({ type: FeedActionTypes.ADD_TO_FAVORITES, payload: target.feedItem }) }
        ]
    },
    FAVORITES_ITEM: {
        items: [
            { text: 'Удалить из избранного', action: target => store.dispatch({ type: FeedActionTypes.REMOVE_FROM_FAVORITES, payload: target.title }) }
        ]
    }
}

/**
 * Ссылки "Actions" на карточке Card
 * ** TODO: нужно ли это вообще?
 */
export class CardActions extends React.Component {
    render() {
        return (
            <div class={"mdl-card__actions mdl-card--border"}>
                <a class={"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"} href={this.props.url}>
                    {this.props.text}
                </a>
            </div>
        )
    }
}

/**
 * Карточка Material Design Lite, основная единица контента на страницах ленты и подписок
 */
export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.type = props.type // ? CardTypes[props.type] : "";
        this.extraTitleCss = {}
        switch (this.type) {
            case CardTypes.FEED_ITEM: {
                this.extraTitleCss['backgroundColor'] = Utils.randomColor()
                break;
            }
            case CardTypes.FAVORITES_ITEM: {
                this.extraTitleCss['backgroundColor'] = Utils.randomColor()
                break;
            }
            case CardTypes.SUBSCRIPTION_ITEM: {
                this.extraTitleCss['backgroundImage'] = `-webkit-gradient(linear, left top, left bottom, from(${Utils.randomColor()}), to(${Utils.randomColor()}))`
                break;
            }
        }
        if (props.img) {
            this.extraTitleCss['paddingLeft'] = '40%';
            this.extraTitleCss['backgroundImage'] = `url(${props.img})`;
            this.extraTitleCss['backgroundPosition'] = 'left';
            this.extraTitleCss['backgroundSize'] = 'contain';
            this.extraTitleCss['backgroundRepeat'] = 'no-repeat';
        }
    }

    render() {
        let menuItems = this.type.items
        let menuId = Math.floor(Math.random() * 1000).toString()
        return (
            <div class="card-wrapper">
                <div class={" mdl-card mdl-shadow--2dp "} >
                    <div class="mdl-card__title" style={this.extraTitleCss}>
                        <a class="card-link-anchor" href={this.props.link}><h2 class="mdl-card__title-text">{this.props.title}</h2></a>
                        <div class="mdl-layout-spacer"></div>
                        <Menu domId={menuId} options={menuItems} actionTarget={this.props} />
                    </div>
                    <div class="mdl-card__supporting-text">
                        {this.props.text}
                    </div>
                </div>
                <span style={{ display: this.props.badge ? 'block' : 'none' }} class="card-badge mdl-badge" data-badge={this.props.badge}></span>
            </div>
        )
    }
}