import React from 'react'

/**
 * Константа с возможными css-классами карточек
 */
const cardTypes = {
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
            <div className={"mdl-card__actions mdl-card--border"}>
                <a className={"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"} href={this.props.url}>
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
        this.type = props.type ? cardTypes[props.type] : "";
    }

    render() {
        return (
            <div className={" mdl-card mdl-shadow--2dp " + this.type}>
                <div className={"mdl-card__title"}>
                    <h2 className={"mdl-card__title-text"}>{this.props.title}</h2>
                </div>
                <div class={"mdl-card__supporting-text"}>
                    {this.props.text}
                </div>
            </div>
        )
    }
}