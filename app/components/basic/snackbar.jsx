import React from 'react'
import { Link } from 'react-router'
/**
 * Компонент оповещений ("тостов"), предлагаемый библеотекой Material Design Lite
 */
export default class Snackbar extends React.Component {
    render() {
        return (
            <div id={this.props.id} class="mdl-js-snackbar mdl-snackbar">
                <div class="mdl-snackbar__text"></div>
                <button class="mdl-snackbar__action" type="button"></button>
            </div>
        )
    }
}