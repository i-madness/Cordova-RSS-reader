import React from 'react'
import { Link } from 'react-router'

export class ButtonRippleRaised extends React.Component {
    render() {
        let classes = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect '
        if (this.props.colored) {
            classes += 'mdl-button--colored '
        }
        if (this.props.navPath) {
            return (
                <Link to={this.props.navPath} class={classes}>
                    {this.props.text}
                </Link>
            )
        }
        return (
            <button onClick={this.props.onClick} class={classes}>
                {this.props.text}
            </button>
        )
    }
}

export class ButtonRippleRounded extends React.Component {
    render() {
        let classes = 'mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-color--indigo'
        if (this.props.navPath) {
            return (
                <Link to={this.props.navPath} style={this.props.style} class={classes}>
                    {this.props.text || this.props.children}
                </Link>
            )
        }
        return (
            <button onClick={this.props.onClick} style={this.props.style} class={classes}>
                {this.props.text || this.props.children}
            </button>
        )
    }
}