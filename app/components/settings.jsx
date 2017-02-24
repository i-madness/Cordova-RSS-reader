import React from 'react'
import connect from 'react-redux'
import { ButtonRippleRaised } from './basic/button.jsx'
import { ActionTypes } from '../reducers/settings-reducer.js'


/**
 * Компонент страницы настроек
 */
@connect(store => {
    return {
        checkDuration: store.settingsReducer.checkDuration,
    }
})
export default class SettingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateInterval: this.props.checkDuration
        }
    }

    handleSaveBtnClick(event) {
        this.props.dispatch({ type: ActionTypes.CHECK_DURATION_CHANGE, payload: this.state.updateInterval })
    }

    handleUpdIntervalChange(event) {
        this.setState({
            ...this.state,
            updateInterval: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div class="form-main">
                    <div class="input-group">
                        <span class="field-name">Интервал обновления записей в ленте (сек):</span>
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="number" id="upd-interval" type="url" onChange={() => this.handleUpdIntervalChange()} />
                            <label class="mdl-textfield__label" for="upd-interval"></label>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="form-footer">
                        <ButtonRippleRaised text="Сохранить" onClick={() => this.handleSaveBtnClick()} colored={true} />
                        <ButtonRippleRaised text="Отмена" navPath="/" />
                    </div>
                </div>
            </div>
        )
    }
}