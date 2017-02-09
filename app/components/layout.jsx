import '../css/material.min.css'
import '../css/index.css'
import React from 'react'
import Card from './basic/card.jsx'

export default class Layout extends React.Component {
    render() {
        return (
            <div id={"app-layout"}>
                <Card title={'Oops'} text={'AHHHHHHAAHAHHAHH! I fuckin did it'}/>
            </div>
        )
    }
}