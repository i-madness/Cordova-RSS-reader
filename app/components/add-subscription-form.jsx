import React from 'react'
import { connect } from 'react-redux'
import { FeedParser } from '../core/parser.js'
import { ButtonRippleRaised } from './basic/button.jsx'

/**
 * Заголовок страницы с формой добавления новой подписки
 */
export class AddSubFormTitle extends React.Component {
    render() { return (<span class="mdl-layout-title">Список RSS-лент</span>) }
}

/**
 * Форма добавления новой подписки. 
 * В идеале должна была быть модальным диалогом, но что-то пошло не так и теперь она занимает целую страницу...
 */
@connect(store => {
    return {
        loading: store.subscriptionReducer.loading,
        subscriptions: store.subscriptionReducer.subscriptions
    }
})
export class AddSubscriptionForm extends React.Component {
    render() {
        return (
            <div>
                <ButtonRippleRaised text="Добавить" colored={true} />
                <ButtonRippleRaised text="Отмена" navPath="/"/>
            </div>
        )
    }
}