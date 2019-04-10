// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './BaseMapSwitcher.css'
import {observer} from 'mobx-react'
import * as esri from 'esri-leaflet'

@observer
class BaseMapSwitcher extends Component {
  // 'setBasemap' USES THE 'currentBaseMap' (Topographic) FROM THE 'RootStore' & UPDATES IT BASED ON THE USER SELECTION OF DROPDOWN VALUE
  setBasemap = event => {
    RootStore.ControlPanelStore.setCurrentBaseMapName(event.target.value)

    RootStore.EsriMapStore.map.removeLayer(
      RootStore.EsriMapStore.currentBaseMapObject
    )

    RootStore.EsriMapStore.setCurrentBaseMapObject(
      esri.basemapLayer(RootStore.ControlPanelStore.currentBaseMapName)
    )

    RootStore.EsriMapStore.map.addLayer(
      RootStore.EsriMapStore.currentBaseMapObject
    )
  }

  // RENDER THE BASEMAP SWITCHER USING THE 'BaseMapSwitcher.css' & SOME MARKUP
  render = () => {
    return (
      <div className={css.basemapsWrapper}>
        <span className={css.basemapSelectorTitle}>
          <strong>BASEMAP</strong>
        </span>
        <select
          className={css.basemapSelector}
          onChange={this.setBasemap}
          value={RootStore.EsriMapStore.currentBaseMap}
          defaultValue={'DarkGray'}
        >
          <option value="NationalGeographic">National Geographic</option>
          <option value="DarkGray">Dark Gray</option>
        </select>
      </div>
    )
  }
}

export default BaseMapSwitcher
