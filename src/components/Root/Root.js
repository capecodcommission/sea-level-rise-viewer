import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import css from './Root.css'
import Home from '../Home/Home'

// Initialize Root component using react-router to default to Home
// Set base path to /SLR for public-facing directories
// You can reset the base path to /anything but be sure that it coincides with the public directory folder name
// https://reacttraining.com/react-router/core/api/Router
// https://reacttraining.com/react-router/core/api/Route
const Root = () => (
  <div className={css.component}>
    <Router basename="/SLR">
      <div className={css.routes}>
        <Route path="/" component={Home} />
      </div>
    </Router>
  </div>
)

export default Root
