import React, {Component} from 'react'
import {render} from 'react-dom'
import mapStore from '../../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import css from '../EsriLeafletMap.css'

export default class theMap extends Component {
  componentWillMount = () => {
    console.log('componentWillMount')
  }

  constructor(props) {
    super(props)
    this.state = {currentZoomLevel: 13, map: null, tileLayer: null}
  }

  componentDidMount = () => {
    console.log('componentDidMount')
  }

  componentDidUpdate = () => {
    this.addTheBasemapMenu()
    console.log('componentDidUpdate')
  }

  onZoomChange = () => {
    // this.state.map.on('zoomend', function(e) {
    //   console.log('this.state.map.getZoom -->', this.getZoom())
    // })
  }

  addTheBasemapMenu = () => {
    console.log('this.state.map --> ', this.state.map)

    // const map = this.state.map
    // let activeBasemap = esri.basemapLayer('Topographic').addTo(map)
    // let activeBasemapLabels

    // render(baseMapMenu, document.getElementById(map))

    // let baseMapHandler = (basemap) => {
    //   function baseMapHandler(basemap) {
    //     if (activeBasemap) {
    //       map.removeLayer(activeBasemap)
    //     }
    //
    //     activeBasemap = esri.basemapLayer(basemap)
    //
    //     map.addLayer(activeBasemap)
    //
    //     if (activeBasemapLabels) {
    //       map.removeLayer(activeBasemapLabels)
    //     }
    //
    //     if (basemap === 'ShadedRelief'
    //     || basemap === 'Oceans'
    //     || basemap === 'Gray'
    //     || basemap === 'DarkGray'
    //     || basemap === 'Imagery'
    //     || basemap === 'Terrain'
    //     ) {
    //       activeBasemapLabels = L.esri.basemapLayer(basemap + 'Labels')
    //       map.addLayer(activeBasemapLabels)
    //     }
    //   }
    //
    //   function changeBasemap(basemaps) {
    //   // let changeBasemap = (basemaps) => {
    //     let basemap = basemaps.value
    //     baseMapHandler(basemap)
    //   }
    // }
    //
    // render = () => {
    //   return (
    //     <div>
    //       <div
    //         ref={node => (this._mapNode = node)}
    //         id="map"
    //         style={{
    //           margin: '0',
    //           padding: '0',
    //           position: 'absolute',
    //           top: '0',
    //           bottom: '0',
    //           right: '0',
    //           left: '0',
    //         }}
    //       />
    //     </div>
    //   )
    // }
    // render = () => {
    //   return (
    //     <div classID = {css.basemapsWrapper} id = 'basemapsWrapper'>
    //       <select classID = {css.basemaps} id = 'basemaps' onChange = 'changeBasemap(basemaps)'>
    //         <option value = 'Topographic'>Topographic</option>
    //         <option value = 'Streets'>Streets</option>
    //         <option value = 'NationalGeographic'>National Geographic</option>
    //         <option value = 'Oceans'>Oceans</option>
    //         <option value = 'Gray'>Gray</option>
    //         <option value = 'DarkGray'>Dark Gray</option>
    //         <option value = 'Imagery'>Imagery</option>
    //         <option value = 'ImageryClarity'>Imagery (Clarity)</option>
    //         <option value = 'ShadedRelief'>Shaded Relief</option>
    //       </select>
    //     </div>
    //   )
  }
}

// render(< theMap />, document.getElementById('root'))
