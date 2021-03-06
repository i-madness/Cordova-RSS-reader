import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import Utils from '../../core/utils.js'
import Menu from './menu.jsx'
import store from '../../store.js'
import { ActionTypes as SubActionTypes } from '../../reducers/subscription-reducer.js'
import { ActionTypes as FeedActionTypes } from '../../reducers/feed-reducer.js'

/**
 * Типы карточек, в зависимости от которых определяются связанные с ними действия и CSS-стили
 */
export const CardTypes = {
    SUBSCRIPTION_ITEM: {
        items: [
            {
                text: 'Удалить подписку', action: target => {
                    store.dispatch({ type: SubActionTypes.SUBSCRIPTIONS_DELETE, payload: target.title })
                    store.dispatch({ type: FeedActionTypes.CHANNEL_DELETE, payload: target.title })
                }
            }
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
        this.type = props.type
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
        let menuId = _.uniqueId('menu-btn-')
        let titleInner = <h2 class="mdl-card__title-text">{this.props.title}</h2>
        let titleOuter
        if (this.type === CardTypes.SUBSCRIPTION_ITEM) {
            titleOuter = <Link to={this.props.link} class="card-link-anchor">{titleInner}</Link>
        } else {
            titleOuter = <a href={this.props.link} class="card-link-anchor">{titleInner}</a>
        }
        return (
            <div class="card-wrapper">
                <div class={" mdl-card mdl-shadow--2dp "} >
                    <div class="mdl-card__title" style={this.extraTitleCss}>
                        {titleOuter}
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