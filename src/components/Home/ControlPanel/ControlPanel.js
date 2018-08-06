// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import BaseMapSwitcher from './BaseMapSwitcher/BaseMapSwitcher'
import Layers from './Layers/Layers'
import ControlButtons from './ControlButtons/ControlButtons'
import SLRSlider from './SLRSlider/SLRSlider'
import LayerDesc from './LayerDesc/LayerDesc'
import {observer} from 'mobx-react'
import {Row, Col} from 'react-bootstrap'
import css from './ControlPanel.css'

@observer
class ControlPanel extends Component {
  constructor(props) {
    super(props)
  }

  // Render all control panel sub-components in Bootstrap grid
  render = () => {
    return (
      <div>
        <Row className={css.ControlsWrapper}>
          <Col>
            <ControlButtons />
            <BaseMapSwitcher />
            <Layers />
            <SLRSlider />
            <LayerDesc />
          </Col>
        </Row>
      </div>
    )
  }
}
export default ControlPanel
