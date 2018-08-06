// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './BaseMapSwitcher.css'
import {observer} from 'mobx-react'
import * as esri from 'esri-leaflet'

@observer
class BaseMapSwitcher extends Component {
  constructor(props) {
    super(props)
  }

  // 'setBasemap' USES THE 'currentBaseMap' (Topographic) FROM THE 'RootStore' & UPDATES IT BASED ON THE USER SELECTION OF DROPDOWN VALUE
  setBasemap = event => {
    RootStore.EsriMapStore.setCurrentBaseMapName(event.target.value)

    RootStore.EsriMapStore.map.removeLayer(
      RootStore.EsriMapStore.currentBaseMapObject
    )

    RootStore.EsriMapStore.setCurrentBaseMapObject(
      esri.basemapLayer(RootStore.EsriMapStore.currentBaseMapName)
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
          defaultValue={'NationalGeographic'}
        >
          <option value="Topographic">Topographic</option>
          <option value="Streets">Streets</option>
          <option value="NationalGeographic">National Geographic</option>
          <option value="Gray">Gray</option>
          <option value="DarkGray">Dark Gray</option>
          <option value="Imagery">Imagery</option>
        </select>
      </div>
    )
  }
}

export default BaseMapSwitcher
