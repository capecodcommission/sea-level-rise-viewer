// START WITH BUNDLING OF MAP & CONTROLS
import React, {Component} from 'react'
import RootStore from '../../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
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
    const esriStreets = esri.basemapLayer(RootStore.EsriMapStore.currentBaseMap)
    const townLines = esri.featureLayer({
      url:
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/6',
    })

    // Set constant using zoom level array from store
    const zoom_Level = RootStore.EsriMapStore.currentZoomLevel

    // Create and set leaflet map object into new store object using other store properties
    RootStore.EsriMapStore.setMap(
      L.map('map', {
        center: RootStore.EsriMapStore.startView,
        zoom: zoom_Level,
        layers: [esriStreets, townLines],
      })
    )

    // Set constant using map from store for ease of typing
    const map = RootStore.EsriMapStore.map

    // Add feature layer as esri-cluster feature layer to map in store
    var criticalFacilitiesCluster = eLCluster
      .featureLayer({
        url:
          'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Infrastructure/MapServer/12',
      })
      .addTo(map)

    // Bind pop-up template to each point https://leafletjs.com/reference-1.3.0.html#util-template
    criticalFacilitiesCluster.bindPopup(function(layer) {
      return L.Util.template(
        '<strong>{NAME}</strong> <p> {DESCRIPT} | {FULLADDR}</p>',
        layer.feature.properties
      )
    })
  }

  // Render html contents as component https://reactjs.org/docs/react-component.html
  render = () => {
    return <div id="map" className={css.map} />
  }
}

export default EsriLeafletMap
