import React from 'react'
import Utils from '../../core/utils.js'

/**
 * Константа с возможными css-классами карточек
 */
export const CardTypes = {
    SUBSCRIPTION_ITEM : 'SUBSCRIPTION_ITEM',
    FEED_ITEM: 'FEED_ITEM'
}

/**
 * Ссылки "Actions" на карточке Card
 * ** (TODO)
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
 * Карточка Material Design Lite
 */
export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.type = props.type ? CardTypes[props.type] : "";
        this.extraCss = {}
        switch (this.type) {
            case CardTypes.FEED_ITEM:
                this.extraCss['background'] = Utils.randomColor();
        }
    }

    render() {
        return (
            <div class={" mdl-card mdl-shadow--2dp " + this.type}>
                <div class={"mdl-card__title"} style={this.extraCss}>
                    <h2 class={"mdl-card__title-text"}>{this.props.title}</h2>
                </div>
                <div class={"mdl-card__supporting-text"}>
                    {this.props.text}
                </div>
            </div>
        )
    }
}