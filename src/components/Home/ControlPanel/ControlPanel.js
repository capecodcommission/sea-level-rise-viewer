// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import BaseMapSwitcher from './BaseMapSwitcher/BaseMapSwitcher'
import Layers from './Layers/Layers'
import Title from './Title/Title'
import Logo from './Logo/Logo'
import {observer} from 'mobx-react'
import {Row, Col, Grid, Button, Image} from 'react-bootstrap'
import css from './ControlPanel.css'
import RootStore from '../../../store'

@observer
class ControlPanel extends Component {

  // Render all control panel sub-components in Bootstrap grid
  render = () => {
    return (
      <Grid>
        <Row 
          className={
            (RootStore.ControlPanelStore.panelButtonOpenness && RootStore.EsriMapStore.loadingComplete) 
              ? css.ControlsWrapperOpen 
              : css.ControlsWrapperClosed
          }
        >
          <Button
            className = {css.panelToggleBtn}
            style = {{
              background: '#bdbdbd',
              float:'right', 
              position: 'absolute', 
              display: 'inline-block', 
              zIndex: '10', 
              left: '275px',
              top: '10px',
            }} 
            onClick = {RootStore.ControlPanelStore.togglePanel.bind(this)}
          >
            <Image 
              className = {
                (RootStore.ControlPanelStore.panelButtonOpenness && RootStore.EsriMapStore.loadingComplete) 
                  ? css.panelToggleImageOpen 
                  : css.panelToggleImageClosed
              } 
              src={require('./img/left-arrow.png')} 
              circle 
            />
          </Button>
          <Col>
            <Title />
            <Logo />
            <BaseMapSwitcher />
            <Layers />
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default ControlPanel
