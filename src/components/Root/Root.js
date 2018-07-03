// @flow

import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import css from './Root.css'
import MapComponent from '../Map/MapRoot'

const Root = () => (
  <div className={css.component}>
    <Router>
      <div className={css.routes}>
        <Route exact path="/" component={MapComponent} />
      </div>
    </Router>
  </div>
)

export default Root
