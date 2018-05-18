// @flow

import React, {createElement} from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Root from './components/Root/Root'
import './index.css'

const renderApp = (component: any) =>
  render(
    <AppContainer>{createElement(component)}</AppContainer>,
    document.getElementById('mount')
  )

renderApp(Root)

if (module.hot) {
  // $FlowFixMe
  module.hot.accept('./components/Root/Root', () => {
    const nextRoot = require('./components/Root/Root').default
    renderApp(nextRoot)
  })
}
