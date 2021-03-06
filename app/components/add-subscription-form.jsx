import React from 'react'
import { connect } from 'react-redux'
import { FeedParser } from '../core/parser.js'
import Utils from '../core/utils'
import { ButtonRippleRaised } from './basic/button.jsx'

/**
 * Форма добавления новой подписки. 
 * В идеале должна была быть модальным диалогом, но что-то пошло не так и теперь она занимает целую страницу...
 */
@connect(store => ({
    loading: store.subscriptionReducer.loading,
    loaded: store.subscriptionReducer.loaded,
    error: store.subscriptionReducer.error,
    subscriptions: store.subscriptionReducer.subscriptions
}))
export class AddSubscriptionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newSubUrl: ''
        }
        this.handleNewSubUrlChange = this.handleNewSubUrlChange.bind(this)
        this.handleAddBtnClick = this.handleAddBtnClick.bind(this)
    }

    handleNewSubUrlChange(event) {
        this.state.newSubUrl = event.target.value
    }

    handleAddBtnClick(event) {
        this.props.dispatch(FeedParser.addRssFeed(this.state.newSubUrl))
        if (this.props.subscriptions.find(sub => this.state.newSubUrl === sub.url)) {
            window.location.hash = '#'
            return
        }
        let cb = () => {
            let snackbar = document.querySelector('#snackbar-message-success')
            snackbar.MaterialSnackbar.showSnackbar({ message: 'Подписка добавлена' })
            window.location.hash = '#'
        }
        Utils.tryUntil(cb)(100)(() => this.props.error === null) // idk why I wrote something like that...
    }

    render() {
        return (
            <div>
                <div class="form-main">
                    <div class="input-group">
                        <span class="field-name">Введите URL канала</span>
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input"
                                type="text"
                                id="channel-url"
                                type="url"
                                style={{ paddingLeft: '.5em' }}
                                onChange={ this.handleNewSubUrlChange } />
                            <label class="mdl-textfield__label" for="channel-url"></label>
                        </div>
                    </div>
                </div>
                <div class="form-footer">
                    <ButtonRippleRaised text="Добавить" onClick={this.handleAddBtnClick} colored={true} />
                    <ButtonRippleRaised text="Отмена" navPath="/" />
                </div>
            </div>
        )
    }
}