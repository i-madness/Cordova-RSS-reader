import React from 'react'

/**
 * Компонент, включающий в себя абзац для контента, содержащегося в карточке (Card).
 * Может содержать в себе изображения. Перед рендером контента чистит его и форматирует дожным образом.ы
 */
export default class Paragraph extends React.Component {
    render() {
        let { content } = this.props
        let matches = content.match(/<img.*\W+\/>/i)
        let images = matches ? matches.map((str,i) => {
            let url = str.match(/\/\/.*\.[a-z]*/g)[0]
            url = url.replace(/(http:){0,1}\/\//, 'http://') // данное преобразование таргетит обрезанные (без "http://") URL
            return <img key={i} src={url} style={{width: '100%', marginBottom: '7px'}} />
        }) : null
        content = content
            .split(/<img.*\W+\/>/i).join('')
            .split('&amp;quot;').join('"')
        return (
            <p>
                {images}
                {content}
            </p>
        )
    }
}