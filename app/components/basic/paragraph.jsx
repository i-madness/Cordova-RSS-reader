import React from 'react'

export default class Paragraph extends React.Component {
    render() {
        let { content } = this.props
        let matches = content.match(/<img.*\W+\/>/i)
        let images = matches ? matches.map((str, i) => <img key={i} src={str.match(/\/\/.*\.[a-z]*/g)[0]} style={{width: '100%'}} />) : null
        content = content.split(/<img.*\W+\/>/i).join('')
        return (
            <p>
                {images}
                {content}
            </p>
        )
    }
}