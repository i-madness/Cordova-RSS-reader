import React from 'react'
import { Link } from 'react-router'

/**
 * Страница "О программе"
 */
export default class AboutPage extends React.Component {
    render() {
        let copyrightStyle = {
            position: 'fixed', 
            bottom: 0, 
            fontWeight: 700
        }
        return (
            <div>
                <h2>Cordova Feed Reader</h2>
                <p>Приложение предназначено для просмотра содержимого RSS-каналов.</p>
                <p>
                    Для добавления нового канала необходимо ввести полный URL RSS-ленты (например, https://news.yandex.ru/index.rss) в <Link to="addSub">форму добавления новой подписки</Link>.
                </p>
                <p style={copyrightStyle}>© Валерий Романов <a href="https://github.com/i-madness">(i-madness)</a>, 2017</p>
            </div>
        )
    }
}