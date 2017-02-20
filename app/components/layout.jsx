import '../css/mdl-icons.css'
import '../css/material.min.css'
import '../css/index.css'
import '../../node_modules/material-design-lite/material.js'
import React from 'react'
import { Link } from 'react-router'
import Snackbar from './basic/snackbar.jsx'

const PAGE_TITLE_MAP = {
    '': 'Список RSS-каналов',
    'feed': 'Лента',
    'addSub': 'Добавление нового канала',
    'settings': 'Настройки'
}
/**
 * Список навигационных ссылок
 */
const NAV_LINKS = [
    { title: 'Список подписок', to: '/', icon: 'view_list' },
    { title: 'Лента', to: 'feed', icon: 'rss_feed' },
    { title: 'Настройки', to: 'settings', icon: 'settings' }
]

/**
 * Компонент, содержащий основной каркас приложения
 */
export default class Layout extends React.Component {
    render() {
        const title = PAGE_TITLE_MAP[window.location.hash.replace('#/', '')]
        let navLinks = NAV_LINKS.map((link, index) =>
            <Link to={link.to} key={index} className={'mdl-navigation__link'} onMouseUp={() => this.toggleDrawer()}>
                <i class="sidenav-icon material-icons">{link.icon}</i>{link.title}
            </Link>
        )
        // отображаем кнопку "Добавить новую подписку" в зависимости от текущего расположения
        let addSubBtn = this.props.location.pathname === '/' ? (
            <d><Link id="add-sub-link" class="mdl-navigation__link" to="addSub"><i class="material-icons">playlist_add</i></Link>
                <div class="mdl-tooltip" data-mdl-for="add-sub-link">Добавить подписку</div></d>
        ) : null
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <div onTouchEnd={() => this.toggleDrawer()} style={{ position: 'absolute', height: '100%', width: '30px', zIndex: 1000 }}></div>
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span class="mdl-layout-title">{title}</span>
                        <div class="mdl-layout-spacer"></div>
                        {addSubBtn}
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title sidepan-header">Действия</span>
                    <nav className="mdl-navigation">
                        {navLinks}
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
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