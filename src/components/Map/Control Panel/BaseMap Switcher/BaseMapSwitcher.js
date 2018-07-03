// START WITH BUNDLING OF MAP & CONTROLS
import React, {Component} from 'react'
import {render} from 'react-dom'
import RootStore from '../../../../store'
import css from './BaseMapSwitcher.css'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

@observer
class BaseMapSwitcher extends Component {
  constructor(props) {
    super(props)
  }

  setBasemap = basemap => {
    //   const thisMap = RootStore.EsriMapStore.map
    //   if (layer) {
    //     map.removeLayer(layer);
    //   }
    //   layer = L.esri.basemapLayer(basemap);
    //   map.addLayer(layer);
    //   if (layerLabels) {
    //     map.removeLayer(layerLabels);
    //   }
    //   if (basemap === 'ShadedRelief'
    //    || basemap === 'Oceans'
    //    || basemap === 'Gray'
    //    || basemap === 'DarkGray'
    //    || basemap === 'Imagery'
    //    || basemap === 'Terrain'
    //  ) {
    //     layerLabels = L.esri.basemapLayer(basemap + 'Labels');
    //     map.addLayer(layerLabels);
    //   }
  }

  render = () => {
    return (
      <div className={css.basemapsWrapper}>
        <p>BaseMap Switch</p>
        <select
          className={css.basemaps}
          onChange={RootStore.EsriMapStore.setBaseMap}
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
