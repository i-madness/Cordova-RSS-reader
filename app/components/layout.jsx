import '../css/mdl-icons.css'
import '../css/material.min.css'
import '../css/index.css'
import '../../node_modules/material-design-lite/material.js'
import React from 'react'
import { Link } from 'react-router'
import Snackbar from './basic/snackbar.jsx'
import { connect } from 'react-redux'

const PAGE_TITLE_MAP = {
    '': 'Список RSS-каналов',
    'feed': 'Лента',
    'addSub': 'Добавление нового канала',
    'settings': 'Настройки',
    'favorites': 'Избранное',
    'about': 'О программе',
}
/**
 * Список навигационных ссылок
 */
const NAV_LINKS = [
    { title: 'Список подписок', to: '/', icon: 'view_list' },
    { title: 'Лента', to: 'feed', icon: 'rss_feed' },
    { title: 'Избранное', to: 'favorites', icon: 'star' },
    { title: 'О программе', to: 'about', icon: 'info' }
    /*{ title: 'Настройки', to: 'settings', icon: 'settings' },*/
]

/**
 * Компонент, содержащий основной каркас приложения
 */
@connect(store => {
    return {
        subsLoading: store.subscriptionReducer.loading,
        subscriptions: store.subscriptionReducer.subscriptions,
        feedLoading: store.feedReducer.loading,
        selectedChannel: store.feedReducer.selectedChannel,
    }
})
export default class Layout extends React.Component {
    render() {
        let title = PAGE_TITLE_MAP[window.location.hash.replace('#/', '')] || this.props.selectedChannel
        if (title && window.screen.width < 500 && title.length > 30) {
            title = title.substring(0, 30) + '...'
        }
        let navLinks = NAV_LINKS.map((link, index) =>
            <Link to={link.to} key={index} className={'mdl-navigation__link'} onMouseUp={() => this.toggleDrawer()}>
                <i class="sidenav-icon material-icons">{link.icon}</i>{link.title}
            </Link>
        )
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <div onTouchEnd={() => this.toggleDrawer()} style={{ position: 'absolute', height: '100%', width: '30px', zIndex: 1000 }}></div>
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span class="mdl-layout-title">{title}</span>
                        <div class="mdl-layout-spacer"></div>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title sidepan-header">Feed Reader</span>
                    <nav className="mdl-navigation">
                        {navLinks}
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <div style={{ display: this.props.loading || this.props.feedLoading ? 'block' : 'none' }} id="ajax-preloader" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
                        {this.props.children}
                    </div>
                </main>
                <Snackbar id="snackbar-message-success" />
                <Snackbar id="snackbar-message-error" />
            </div>
        )
    }

    toggleDrawer() {
        let layout = document.querySelector('.mdl-layout')
        layout.MaterialLayout.toggleDrawer()
    }

}