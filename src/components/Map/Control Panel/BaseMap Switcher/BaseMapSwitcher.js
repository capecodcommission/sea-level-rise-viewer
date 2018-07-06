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
  // 'SetBasemap' USES THE 'currentBaseMap' (Topographic) FROM THE 'RootStore' & UPDATES IT BASED ON THE USER SELECTION OF DROPDOWN VALUE
  setBasemap = event => {
    // console.log('Old Basemap Name: ', RootStore.EsriMapStore.currentBaseMap)

    const oldBaselayer = esri.basemapLayer(
      RootStore.EsriMapStore.currentBaseMap
    )

    RootStore.EsriMapStore.setCurrentBaseMap(event.target.value)

    // console.log('New Basemap Name: ', RootStore.EsriMapStore.currentBaseMap)

    // console.log('Old Basemap Layer: ', oldBaselayer)

    RootStore.EsriMapStore.map.removeLayer(oldBaselayer)

    const layer = esri.basemapLayer(event.target.value)

    // console.log('New basemap Layer', layer)

    RootStore.EsriMapStore.map.addLayer(layer)
  }
  // RENDER THE BASEMAP SWITCHER USING THE 'BaseMapSwitcher.css' & SOME MARKUP
  render = () => {
    return (
      <div className={css.basemapsWrapper}>
        <p>BaseMap Switch</p>
        <select
          className={css.basemaps}
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
        <p>Currently Selected Value: {RootStore.EsriMapStore.currentBaseMap}</p>
      </div>
    )
  }
}

export default BaseMapSwitcher
