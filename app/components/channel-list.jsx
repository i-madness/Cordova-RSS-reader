import React from 'react'

/**
 * ** TODO получилось какое-то УГ в плане отделения title от остального класса
 * ** надо бы поправить этот момент
 */
export class ChannelListTitle extends React.Component {
    render() {
        return (
            <span class="mdl-layout-title">Список RSS-лент</span>
        )
    }
}
/**
 * Комопнент, отвечающий за список каналов
 * Располагается в теле страницы (!)
 */
export class ChannelList extends React.Component {
    render() {
        return (<div style={{backgroundColor: 'red'}}>Hi!</div>)
    }
}