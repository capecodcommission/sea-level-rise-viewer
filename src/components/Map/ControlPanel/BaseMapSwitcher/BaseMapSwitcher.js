// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './BaseMapSwitcher.css'
import {observer} from 'mobx-react'
import * as esri from 'esri-leaflet'

@observer
class BaseMapSwitcher extends Component {
  // constructor(props) {
  //   super(props)
  // }
  // 'setBasemap' USES THE 'currentBaseMap' (Topographic) FROM THE 'RootStore' & UPDATES IT BASED ON THE USER SELECTION OF DROPDOWN VALUE
  setBasemap = event => {
    const oldBaselayer = esri.basemapLayer(
      RootStore.EsriMapStore.currentBaseMap
    )

    RootStore.EsriMapStore.setCurrentBaseMap(event.target.value)

    RootStore.EsriMapStore.map.removeLayer(oldBaselayer)

    const layer = esri.basemapLayer(event.target.value)

    RootStore.EsriMapStore.map.addLayer(layer)
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
        >
          <option value="Topographic">Topographic</option>
          <option value="Streets">Streets</option>
          <option value="NationalGeographic">National Geographic</option>
          <option value="Oceans">Oceans</option>
          <option value="Gray">Gray</option>
          <option value="DarkGray">Dark Gray</option>
          <option value="Imagery">Imagery</option>
          <option value="ImageryClarity">Imagery (Clarity)</option>
          <option value="ShadedRelief">Shaded Relief</option>
        </select>
      </div>
    )
  }
}

export default BaseMapSwitcher
