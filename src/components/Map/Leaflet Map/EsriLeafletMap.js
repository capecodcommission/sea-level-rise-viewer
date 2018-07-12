// START WITH BUNDLING OF MAP & CONTROLS
import React, {Component} from 'react'
import RootStore from '../../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as geocoder from 'esri-leaflet-geocoder'
import css from './EsriLeafletMap.css'
import {observer} from 'mobx-react'

// Reactive component https://mobx.js.org/refguide/observer-component.html
@observer
class EsriLeafletMap extends Component {
  // No constructor necessary http://cheng.logdown.com/posts/2016/03/26/683329

  // On-ready https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount = () => {
    this.initiateMap()
  }

  // Construct leaflet map object using properties from the EsriMapStore
  // Hook map object to map div contents
  initiateMap = () => {
    // Set basemap and feature layer constants to be fed into the leaflet map object
    const esriStreets = esri.basemapLayer(
      RootStore.EsriMapStore.currentBaseMapName
    )

    RootStore.EsriMapStore.setCurrentBaseMapObject(esriStreets)

    const townLines = RootStore.EsriMapStore.townLines

    // Set constant using zoom level array from store
    const zoom_Level = RootStore.EsriMapStore.currentZoomLevel

    const streets = RootStore.EsriMapStore.currentBaseMapObject

    // Create and set leaflet map object into new store object using other store properties
    RootStore.EsriMapStore.setMap(
      L.map('map', {
        center: RootStore.EsriMapStore.startView,
        zoom: zoom_Level,
        layers: [streets, townLines],
      })
    )

    const map = RootStore.EsriMapStore.map

    var searchControl = geocoder
      .geosearch()
      .setPosition('topright')
      .addTo(map)

    var results = L.layerGroup().addTo(map)

    searchControl.on('results', function(data) {
      results.clearLayers()

      data.results.map(i => {
        if (i) {
          results.addLayer(L.marker(i.latlng))
        }
      })
    })
  }

  // Render html contents as component https://reactjs.org/docs/react-component.html
  render = () => {
    return <div id="map" className={css.map} />
  }
}

export default EsriLeafletMap
