import React from 'react'
import { ButtonRippleRaised } from './basic/button.jsx'

/**
 * Компонент страницы настроек
 */
export default class SettingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateInterval: 60000,
        }
        this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this)
        this.handleUpdIntervalChange = this.handleUpdIntervalChange.bind(this)
    }

    handleSaveBtnClick() {

    }

    handleUpdIntervalChange(event) {
        this.setState({
            ...this.state,
            updateInterval: event.target.value
        })
        console.log(this.state.updateInterval)
    }

    render() {
        return (
            <div>
                <div class="form-main">
                    <div class="input-group">
                        <span class="field-name">Интервал обновления записей в ленте (сек):</span>
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="number" id="upd-interval" type="url" onChange={this.handleUpdIntervalChange} />
                            <label class="mdl-textfield__label" for="upd-interval"></label>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="form-footer">
                        <ButtonRippleRaised text="Сохранить" onClick={this.handleSaveBtnClick} colored={true} />
                        <ButtonRippleRaised text="Отмена" navPath="/" />
                    </div>
                </div>
            </div>
        )
    }
}