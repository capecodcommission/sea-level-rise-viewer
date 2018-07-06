// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import BaseMapSwitcher from './BaseMap Switcher/BaseMapSwitcher'
import {observer} from 'mobx-react'

@observer
class Controls extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount = () => {
    // console.log('componentWillMount')
  }

  componentDidMount = () => {
    // console.log('componentDidMount')
  }

  componentDidUpdate = () => {
    // console.log('componentDidUpdate')
  }
  // RENDER THE 'BaseMapSwitcher' WITHIN THE CONTROL PANEL
  render = () => {
    return <BaseMapSwitcher />
  }
}
export default Controls
