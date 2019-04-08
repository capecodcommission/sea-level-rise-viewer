// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import css from './Logo.css'
import {observer} from 'mobx-react'

@observer
class Logo extends Component {
  render = () => {
    return (
      <div className={css.logoWrapper}></div>
    )
  }
}

export default Logo
