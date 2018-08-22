// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import css from './Title.css'
import {observer} from 'mobx-react'

@observer
class Title extends Component {
  render = () => {
    return (
      <div className={css.titleWrapper}>
        <span className={css.title}>
          <p>
            <strong>Cape Cod</strong>
          </p>
          <p>
            <strong>Sea Level Rise</strong>
          </p>
        </span>
      </div>
    )
  }
}

export default Title
