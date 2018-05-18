// START WITH BUNDLING OF MAP & CONTROLS
import React, {Component} from 'react'
import {render} from 'react-dom'
import RootStore from '../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import './EsriLeafletMap.css'
import Controls from './Control Panel/Controls'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

@observer
class EsriLeafletMap extends Component {
  @observable currentBasemap = ''
  componentWillMount = () => {}

  // constructor(props) {
  constructor() {
    super()
    // super(props)
    // this.state = {currentZoomLevel: 13, map: null, tileLayer: null}
    //this.state = {currentZoomLevel: 13, map: null, tileLayer: null}
  }

  componentDidMount = () => {
    this.initiateMap()
    RootStore.MapStore.changeMessage('Hello: Action')
    RootStore.WorldStore.changeMessage('World: Action')
  }

  componentDidUpdate = () => {
    this.addTheBasemapMenu()
  }

  onZoomChange = () => {
    // this.state.map.on('zoomend', function(e) {
    //   console.log('this.state.map.getZoom -->', this.getZoom())
    // })
  }

  initiateMap = () => {
    const startView = [41.68, -70.3405]
    const esriStreets = esri.basemapLayer('Streets')
    const townLines = esri.featureLayer({
      url:
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/6',
    })

    const zoom_Level = RootStore.MapStore.currentZoomLevel

    RootStore.MapStore.setMap(
      L.map('map', {
        center: startView,
        zoom: zoom_Level,
        layers: [esriStreets, townLines],
      })
    )

    const map = RootStore.MapStore.map

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

    RootStore.MapStore.setTileLayer(esri.basemapLayer('Streets').addTo(map))

    const tile_Layer = RootStore.MapStore.tileLayer

    this.setState({map, tile_Layer})
    window.myMap = map
  }

  addTheBasemapMenu = () => {
    // console.log('this.state.map --> ', this.state.map)

    const map = RootStore.MapStore.map
    let activeBasemap = esri.basemapLayer('Topographic').addTo(map)
    let activeBasemapLabels

    // render(baseMapMenu, document.getElementById(map))

    // let baseMapHandler = (basemap) => {
    function baseMapHandler(basemap) {
      if (activeBasemap) {
        map.removeLayer(activeBasemap)
      }

      activeBasemap = esri.basemapLayer(basemap)

      map.addLayer(activeBasemap)

      if (activeBasemapLabels) {
        map.removeLayer(activeBasemapLabels)
      }

      if (
        basemap === 'ShadedRelief' ||
        basemap === 'Oceans' ||
        basemap === 'Gray' ||
        basemap === 'DarkGray' ||
        basemap === 'Imagery' ||
        basemap === 'Terrain'
      ) {
        activeBasemapLabels = L.esri.basemapLayer(basemap + 'Labels')
        map.addLayer(activeBasemapLabels)
      }
    }

    function changeBasemap(basemaps) {
      // let changeBasemap = (basemaps) => {
      let basemap = basemaps.value
      baseMapHandler(basemap)
    }
  }

  render = () => {
    return (
      <div>
        <div
          id="map"
          className="EsriLeafletMap"
          style={{
            margin: '0',
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
        >
          <div>{RootStore.MapStore.message}</div>
          <div>{RootStore.WorldStore.message}</div>
          <form>
            {' '}
            Select Basemap:
            <input
              type="text"
              value={this.currentBasemap}
              // onChange={this.handleInputChange}
            />
            <button type="submit">Select Basemap</button>
          </form>
        </div>
      </div>
    )
  }
  // <Controls store={this.props.store} />
  // <div
  //   ref={node => (this._mapNode = node)}
  //   id="Controls"
  // />
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
  // }
}

// render(< theMap />, document.getElementById('root'))

export default EsriLeafletMap
