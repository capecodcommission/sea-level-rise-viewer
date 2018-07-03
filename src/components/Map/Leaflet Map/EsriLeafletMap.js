// START WITH BUNDLING OF MAP & CONTROLS
import React, {Component} from 'react'
import {render} from 'react-dom'
import RootStore from '../../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import css from './EsriLeafletMap.css'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

@observer
class EsriLeafletMap extends Component {
  @observable currentBasemap = ''

  componentWillMount = () => {}

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount = () => {
    this.initiateMap()
  }

  componentDidUpdate = () => {}

  onZoomChange = () => {
    // this.state.map.on('zoomend', function(e) {
    //   console.log('this.state.map.getZoom -->', this.getZoom())
    // })
  }

  initiateMap = () => {
    // const startView = [41.68, -70.3405]
    const esriStreets = esri.basemapLayer(RootStore.EsriMapStore.currentBaseMap)
    const townLines = esri.featureLayer({
      url:
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/6',
    })

    const zoom_Level = RootStore.EsriMapStore.currentZoomLevel

    RootStore.EsriMapStore.setMap(
      L.map('map', {
        center: RootStore.EsriMapStore.startView,
        zoom: zoom_Level,
        layers: [esriStreets, townLines],
      })
    )

    const map = RootStore.EsriMapStore.map

    var criticalFacilitiesCluster = eLCluster
      .featureLayer({
        url:
          'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Infrastructure/MapServer/12',
      })
      .addTo(map)

    criticalFacilitiesCluster.bindPopup(function(layer) {
      return L.Util.template(
        '<strong>{NAME}</strong> <p> {DESCRIPT} | {FULLADDR}</p>',
        layer.feature.properties
      )
    })
  }

  render = () => {
    return <div id="map" className={css.map} />
  }
}

export default EsriLeafletMap
