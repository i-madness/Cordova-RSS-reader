import '../css/mdl-icons.css'
import '../css/material.min.css'
import '../css/index.css'
import '../../node_modules/material-design-lite/material.js'
import React from 'react'
import { Card } from './basic/card.jsx'

const NAV_LINKS = [
    { title : 'Подписки' },
    { title : 'Что-то ещё' },
    { title : 'И ещё!' },
]

export default class Layout extends React.Component {
    render() {
        let navLinks = NAV_LINKS.map(link => <a className={'mdl-navigation__link'} href={'#'}>{link.title}</a>)
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">RSS-ленты</span>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Действия</span>
                    <nav className="mdl-navigation">
                        {navLinks}
                    </nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">Когда-нибудь здесь действительно будет какой-то контент. Ну, возможно...</div>
                </main>
            </div>
        )
    }
}