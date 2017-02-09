import React from 'react'

/**
 * Карточка Material Design Lite
 */
export default class Card extends React.Component {
    //mdl-card__title
    render() {
        return (
            <div class={"demo-card-wide mdl-card mdl-shadow--2dp"}>
                <div class={"mdl-card__title"}>
                    <h2 class={"mdl-card__title-text"}>{this.props.title}</h2>
                </div>
                <div class={"mdl-card__supporting-text"}>
                    {this.props.text}
                </div>
                <div class={"mdl-card__actions mdl-card--border"}>
                    <a class={"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"}>
                        Get Started
                    </a>
                </div>
            </div>
        )
    }
}