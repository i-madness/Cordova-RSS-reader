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
            <button class={classes}>
                {this.props.text}
            </button>
        )
    }
}