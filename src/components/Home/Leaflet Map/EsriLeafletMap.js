// START WITH BUNDLING OF MAP & CONTROLS
import React, {Component} from 'react'
import RootStore from '../../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as geocoder from 'esri-leaflet-geocoder'
import css from './EsriLeafletMap.css'
import {observer} from 'mobx-react'
// eslint-disable-next-line
import {easyPrint} from 'leaflet-easyprint'

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
      RootStore.ControlPanelStore.currentBaseMapName
    )

    RootStore.EsriMapStore.setCurrentBaseMapObject(esriStreets)

    const townLines = RootStore.MapServicesStore.townLines

    // Set constant using zoom level array from store
    const zoom_Level = RootStore.EsriMapStore.currentZoomLevel
    const streets = RootStore.EsriMapStore.currentBaseMapObject

    // Create and set leaflet map object into new store object using other store properties
    RootStore.EsriMapStore.setMap(
      L.map('map', {
        center: RootStore.EsriMapStore.startView,
        zoom: zoom_Level,
        layers: [streets, townLines],
        zoomControl: false,
        attributionControl: false,
      })
    )

    const map = RootStore.EsriMapStore.map

    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(map)

    // Add custom Leaflet control to handle centered map printing in portrait and landscape formats
    // RootStore.EsriMapStore.printer.addTo(map)
    L.easyPrint({
      title: 'Print',
      position: 'topright',
      sizeModes: ['A4Portrait', 'A4Landscape'],
      customWindowTitle: 'CCC ~ Sea Level Rise Viewer',
    }).addTo(map)

    var searchControl = geocoder
      .geosearch()
      .setPosition('topright')
      .addTo(map)

    RootStore.MapServicesStore.searchResults.addTo(map)

    searchControl.on('results', function(data) {
      if (!map.hasLayer(RootStore.MapServicesStore.searchResults)) {
        RootStore.MapServicesStore.searchResults.addTo(map)
      }

      data.results.map(i => {
        if (i) {
          RootStore.MapServicesStore.searchResults.addLayer(L.marker(i.latlng))
        }

        return i
      })
    })

    L.Control.ZoomHome = L.Control.extend({
      options: {
        position: 'topright',
      },
      initialize: function(options) {
        L.Util.setOptions(this, options)
      },
      onAdd: function(map) {
        var homeButton = L.DomUtil.create(
          'div',
          'leaflet-bar leaflet-control leaflet-control-custom'
        )
        homeButton.style.backgroundColor = 'white'
        homeButton.style.backgroundImage =
          'url(https://image.flaticon.com/icons/svg/2/2144.svg)'
        homeButton.style.backgroundSize = '30px 30px'
        homeButton.style.width = '34px'
        homeButton.style.height = '30px'
        homeButton.style.marginTop = '10px'
        homeButton.style.paddingTop = '10px'
        homeButton.onclick = function() {
          RootStore.EsriMapStore.map.setView(
            RootStore.EsriMapStore.startView,
            RootStore.EsriMapStore.currentZoomLevel
          )
        }
        return homeButton
      },
    })

    L.control.zoomHome = function(opts) {
      return new L.Control.ZoomHome()
    }

    L.control.zoomHome().addTo(map)

    RootStore.ControlPanelStore.toggleSlider()
  }

  // Render html contents as component https://reactjs.org/docs/react-component.html
  render = () => {
    return <div id="map" className={css.map} />
  }
}

export default EsriLeafletMap
