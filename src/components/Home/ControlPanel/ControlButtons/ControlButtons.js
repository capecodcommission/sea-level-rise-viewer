// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './ControlButtons.css'
import {observer} from 'mobx-react'
import {ButtonToolbar, Button} from 'react-bootstrap'
// import * as esri from 'esri-leaflet'

@observer
class ControlButtons extends Component {
  // Set map center and zoom level using state properties
  zoomHome = () => {
    RootStore.EsriMapStore.map.setView(
      RootStore.EsriMapStore.startView,
      RootStore.EsriMapStore.currentZoomLevel
    )
  }

  // Create parameterized URL using state properties
  saveURL = () => {
    RootStore.EsriMapStore.saveURL()
  }

  printMap = () => {
    RootStore.EsriMapStore.printerMap()
  }

  render = () => {
    return (
      <div className={css.componentsWrapper}>
        <span className={css.controlsTitle}>
          <strong>CONTROLS</strong>
        </span>
        <ButtonToolbar className={css.buttonToolbarWrapper}>
          <Button
            bsStyle="primary"
            bsSize="small"
            className="glyphicon glyphicon-home"
            onClick={this.zoomHome}
          />

          <Button
            bsStyle="primary"
            bsSize="small"
            className="glyphicon glyphicon-remove-sign"
            onClick={RootStore.EsriMapStore.removeToggleableLayers}
          />
        </ButtonToolbar>
      </div>
    )
  }
}

export default ControlButtons
