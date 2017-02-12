import '../css/mdl-icons.css'
import '../css/material.min.css'
import '../css/index.css'
import '../../node_modules/material-design-lite/material.js'
import React from 'react'
import { Link } from 'react-router'
import { Card } from './basic/card.jsx'

/**
 * Список навигационных ссылок
 */
const NAV_LINKS = [
    { title : 'Список подписок', to: '/' },
    { title : 'Лента', to: 'feed' }
]

/**
 * Компонент, содержащий основной каркас приложения
 */
export default class Layout extends React.Component {
    /**
     * ** TODO: сделать кастомный mdl-layout__content, адаптированный под Router,
     * ** заменить <a> на <Link>
     */
    render() {
        let navLinks = NAV_LINKS.map((link, index) => <Link to={link.to} key={index} className={'mdl-navigation__link'} >{link.title}</Link>)
        const { title, body } = this.props

        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        {title}
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Действия</span>
                    <nav className="mdl-navigation">
                        {navLinks}
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        Когда-нибудь здесь действительно будет какой-то контент. Ну, возможно...
                        ${body}
                    </div>
                </main>
            </div>
        )
    }
}