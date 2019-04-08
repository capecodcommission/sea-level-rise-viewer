// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import BaseMapSwitcher from './BaseMapSwitcher/BaseMapSwitcher'
import Layers from './Layers/Layers'
import Title from './Title/Title'
import {observer} from 'mobx-react'
import {Row, Col, Grid, Button} from 'react-bootstrap'
import css from './ControlPanel.css'
import RootStore from '../../../store'

@observer
class ControlPanel extends Component {

  constructor() {
    super()
    this.state = {
      panelButtonOpenness: false,
    }
  }

  togglePanel = () => {
    this.setState(prevState => ({
      panelButtonOpenness: !prevState.panelButtonOpenness,
    }))
  }

  // Render all control panel sub-components in Bootstrap grid
  render = () => {
    return (
      <Grid>
        <Row 
          className={
            (this.state.panelButtonOpenness && RootStore.EsriMapStore.loadingComplete) 
              ? css.ControlsWrapperOpen 
              : css.ControlsWrapperClosed
          }
        >
          <Button
            className = "btn btn-primary" 
            style = {{
              float:'right', 
              position: 'absolute', 
              display: 'inline-block', 
              zIndex: '10', 
              left: '275px',
            }} 
            onClick = {this.togglePanel.bind(this)}>-->
          </Button>
          <Col>
            <Title />
            <BaseMapSwitcher />
            <Layers />
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default ControlPanel
