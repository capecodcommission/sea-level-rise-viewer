// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './ControlButtons.css'
import {observer} from 'mobx-react'
import {ButtonToolbar, Button} from 'react-bootstrap'

@observer
class ZoomHome extends Component {
  zoomHome = () => {
    RootStore.EsriMapStore.map.setView(
      RootStore.EsriMapStore.startView,
      RootStore.EsriMapStore.currentZoomLevel
    )
  }

  // RENDER THE BASEMAP SWITCHER USING THE 'BaseMapSwitcher.css' & SOME MARKUP
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
          />
        </ButtonToolbar>
      </div>
    )
  }
}

export default ZoomHome
