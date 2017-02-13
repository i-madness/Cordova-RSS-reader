import React from 'react'
import { Card } from './basic/card.jsx'

/**
 * Заголовок страницы со списком каналов
 */
export class ChannelListTitle extends React.Component {
    render() { return (<span class="mdl-layout-title">Список RSS-лент</span>) }
}

/**
 * Комопнент, отвечающий за список каналов
 * Располагается в теле страницы (!)
 */
export class ChannelList extends React.Component {
    render() {
        return (<div style={{ backgroundColor: 'red' }}>Hi!</div>)
    }
}