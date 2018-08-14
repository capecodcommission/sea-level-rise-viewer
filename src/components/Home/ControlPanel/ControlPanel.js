// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import BaseMapSwitcher from './BaseMapSwitcher/BaseMapSwitcher'
import Layers from './Layers/Layers'
import Title from './Title/Title'
import {observer} from 'mobx-react'
import {Row, Col} from 'react-bootstrap'
import css from './ControlPanel.css'

@observer
class ControlPanel extends Component {
  // Render all control panel sub-components in Bootstrap grid
  render = () => {
    return (
      <div>
        <Row className={css.ControlsWrapper}>
          <Col>
            <Title />
            <BaseMapSwitcher />
            <Layers />
          </Col>
        </Row>
      </div>
    )
  }
}
export default ControlPanel
