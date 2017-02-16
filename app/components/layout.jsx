import '../css/mdl-icons.css'
import '../css/material.min.css'
import '../css/index.css'
import '../../node_modules/material-design-lite/material.js'
import React from 'react'
import { Link } from 'react-router'

/**
 * Список навигационных ссылок
 */
const NAV_LINKS = [
    { title: 'Список подписок', to: '/' },
    { title: 'Лента', to: 'feed' }
]

/**
 * Компонент, содержащий основной каркас приложения
 */
export default class Layout extends React.Component {
    render() {
        const { title, body } = this.props
        let navLinks = NAV_LINKS.map((link, index) => <Link to={link.to} key={index} className={'mdl-navigation__link'} >{link.title}</Link>)
        // отображаем кнопку "Добавить новую подписку" в зависимости от текущего расположения
        let addSubBtn = this.props.location.pathname === '/' ? (
            <d><Link id="add-sub-link" class="mdl-navigation__link" to="addSub"><i class="material-icons">add</i></Link>
            <div class="mdl-tooltip" data-mdl-for="add-sub-link">Добавить подписку</div></d>
        ) : null
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        {title}
                        <div class="mdl-layout-spacer"></div>
                        {addSubBtn}
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
                        {body}
                    </div>
                </main>
            </div>
        )
    }
}