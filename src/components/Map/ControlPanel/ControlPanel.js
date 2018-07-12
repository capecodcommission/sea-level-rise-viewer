// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import BaseMapSwitcher from './BaseMapSwitcher/BaseMapSwitcher'
import Layers from './Layers/Layers'
import ZoomHome from './ZoomHome/ZoomHome'
import {observer} from 'mobx-react'
import {Row, Col} from 'react-bootstrap'
import css from './ControlPanel.css'

@observer
class ControlPanel extends Component {
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
    return (
      <div>
        <Row className={css.ControlsWrapper}>
          <Col>
            <ZoomHome />
            <BaseMapSwitcher />
            <Layers />
          </Col>
        </Row>
      </div>
    )
  }
}
export default ControlPanel
