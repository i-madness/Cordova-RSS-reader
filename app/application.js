import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Layout from './components/layout.jsx';


ReactDom.render(
    <Route history={hashHistory}>
        <Route path='/' component={Layout}>
        </Route>
    </Route>,
    document.querySelector('#app')
)