// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './ZoomHome.css'
import {observer} from 'mobx-react'

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
      <div onClick={this.zoomHome} className={css.zoomHome}>
        <button className="btn btn-default btn-sm">
          <span className="glyphicon glyphicon-home" />
        </button>
      </div>
    )
  }
}

export default ZoomHome
