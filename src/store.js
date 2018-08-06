// @flow
import * as esri from 'esri-leaflet'
import * as L from 'leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import {observable, action, reaction, autorun, toJS} from 'mobx'
import axios from 'axios'
import React, {Component} from 'react'
import easyPrint from 'leaflet-easyprint'
import css from './components/Home/ControlPanel/Layers/Layers.css'

class EsriMapStore {
  @observable currentZoomLevel: int = 13
  @observable currentBaseMapName: string = 'NationalGeographic'
  @observable currentBaseMapObject: null = {}
  @observable currentSliderValue: int = 0
  @observable sliderToggle: init = false
  startView: init = [41.68, -70.3405]
  @observable map: null = {}
  currentSLRLayer: null = {}
  currentRoadLayer: null = {}
  tileLayer: null = {}
  @observable clickedCriticalFacilitiesButton: init = css.clickedButton
  @observable initCriticalFacilitiesButton: init = css.criticalFacilities
  @observable clickedSloshButton: init = css.clickedButton
  @observable initSloshButton: init = css.slosh
  @observable clickedFemaFirmButton: init = css.clickedButton
  @observable initFemaFirmButton: init = css.femaFirm
  townLines: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/6',
  })
  criticalFacilities: init = eLCluster
    .featureLayer({
      url:
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Infrastructure/MapServer/12',
    })
    .bindPopup(function(layer) {
      return L.Util.template(
        '<strong>{NAME}</strong> <p> {DESCRIPT} | {FULLADDR}</p>',
        layer.feature.properties
      )
    })
  socialVulnerability: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SocialVulnerability/MapServer/0',
  })
  zeroFtSeaLevelToggle: init = false
  zeroFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_0_Corrected/MapServer',
  })
  oneFtSeaLevelToggle: init = false
  oneFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_1_Corrected/MapServer',
  })
  oneFtSeaLevelFL: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_1_Corrected/MapServer/0',
  })
  twoFtSeaLevelToggle: init = false
  twoFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_2_Corrected/MapServer',
  })
  threeFtSeaLevelToggle: init = false
  threeFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_3_Corrected/MapServer',
  })
  fourFtSeaLevelToggle: init = false
  fourFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_4ft_Corrected/MapServer',
  })
  fiveFtSeaLevelToggle: init = false
  fiveFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_5ft_Corrected/MapServer',
  })
  sixFtSeaLevelToggle: init = false
  sixFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_6/MapServer',
  })
  femaFirmToggle: init = false
  femaFirm: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/FEMA_FIRM_2013/MapServer',
    opacity: 0.5,
  })
  sloshToggle: init = false
  slosh: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/SLOSH_2013/MapServer',
  })
  buildings: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/Buildings/MapServer',
  })
  parcels: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/TaxParcel_Yellow/MapServer',
  })
  parcelsToggle: init = false
  roads: init = esri.dynamicMapLayer({
    url:
      'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
  })
  roadsToggle: init = false
  roads1ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_1ft/MapServer',
  })
  roads1ftSeaLevelToggle: init = false
  roads2ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_2ft/MapServer',
  })
  roads2ftSeaLevelToggle: init = false
  roads3ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_3ft/MapServer',
  })
  roads3ftSeaLevelToggle: init = false
  roads4ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_4ft/MapServer',
  })
  roads4ftSeaLevelToggle: init = false
  roads5ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_5ft/MapServer',
  })
  roads5ftSeaLevelToggle: init = false
  roads6ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_6ft/MapServer',
  })
  // TODO: FIGURE OUT BUTTON BACKGROUND STYLING USING LOGIC BELOW & IN 'Layers.js'
  @observable criticalFacilitiesBackground: init = false
  @observable sloshBackground: init = false
  @observable femaFirmBackground: init = false

  // @action
  toggleCriticalFacilitiesBackground = () => {
    this.criticalFacilitiesBackground = !this.criticalFacilitiesBackground
  }

  // @action
  toggleSloshBackground = () => {
    this.sloshBackground = !this.sloshBackground
  }

  // @action
  toggleFemaFirmBackground = () => {
    this.femaFirmBackground = !this.femaFirmBackground
  }

  @action
  handleCriticalFacilitiesClick = () => {
    this.toggleCriticalFacilities()
    this.toggleCriticalFacilitiesBackground()
  }
  toggleZeroFtSeaLevelToggle() {
    this.zeroFtSeaLevelToggle = !this.zeroFtSeaLevelToggle
  }
  roads6ftSeaLevelToggle: init = false
  @observable SLR_0ft_geojson: init = false
  @observable SLR_1ft_geojson: init = false
  @observable SLR_2ft_geojson: init = false
  @observable SLR_3ft_geojson: init = false
  @observable SLR_4ft_geojson: init = false
  @observable SLR_5ft_geojson: init = false
  @observable SLR_6ft_geojson: init = false
  @observable currentSLR_geojson: init = false
  @observable
  criticalFacilitiesIntersection: init = L.geoJSON(
    {
      type: 'FeatureCollection',
      features: [],
    },
    {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl:
              'https://cdn3.iconfinder.com/data/icons/weather-round-corner-glyph/614/439_-_Flood_Symbol-512.png',
            iconSize: [41, 37],
          }),
        })
      },
    }
  ).bindPopup(function(layer) {
    return L.Util.template(
      '<strong>{NAME}</strong> <p> {DESCRIPT} | {FULLADDR}</p>',
      layer.feature.properties
    )
  })
  @observable layerDesc: init = null
  @observable layerDescShow: init = false
  @observable critFacWhere: init = []
  @observable loadingComplete: init = true
  @observable
  marks: init = {
    0: {
      style: {
        color: 'white',
        zIndex: 3,
      },
      label: '0',
    },

    1: {
      style: {
        color: 'white',
        zIndex: 3,
      },
      label: '1',
    },

    2: {
      style: {
        color: 'white',
        zIndex: 3,
      },
      label: '2',
    },

    3: {
      style: {
        color: 'white',
        zIndex: 3,
      },
      label: '3',
    },

    4: {
      style: {
        color: 'white',
        zIndex: 3,
      },
      label: '4',
    },

    5: {
      style: {
        color: 'white',
        zIndex: 3,
      },
      label: '5',
    },

    6: {
      style: {
        color: 'white',
        zIndex: 3,
      },
      label: '6',
    },
  }

  // Creates unique URL of map center coordinates, zoom level, and toggled layers for sharing
  // TODO: Research react-router parameters, and how to parse route parameters on-start of the app
  @action
  saveURL = () => {
    console.log(window.location.href)
    // var printContents = document.getElementById('mount').innerHTML
    // var originalContents = document.body.innerHTML

    // document.body.innerHTML = printContents

    // window.print()

    // document.body.innerHTML = originalContents

    // var printControl = L.easyPrint({
    //   hidden: true,
    //   sizeModes: ['A4Portrait', 'A4Landscape'],
    // }).addTo(this.map)

    // printControl.printMap('A4Landscape', 'Sea Level Rise Viewer')
  }

  load_0ft_geojson = () => {
    axios
      .get(
        'https://opendata.arcgis.com/datasets/f05ed0d4a6444cb39c8642c8f4b7a199_0.geojson'
      )
      .then(response => {
        this.SLR_0ft_geojson = L.geoJSON(response.data)
      })
  }

  load_1ft_geojson = () => {
    axios
      .get(
        'https://opendata.arcgis.com/datasets/b80d6c3f86944c4db081a52ddead9d24_2.geojson'
      )
      .then(response => {
        this.SLR_1ft_geojson = L.geoJSON(response.data)
      })
  }

  load_2ft_geojson = () => {
    axios
      .get(
        'https://opendata.arcgis.com/datasets/a592e537476d4752a738001fd637a8de_5.geojson'
      )
      .then(response => {
        this.SLR_2ft_geojson = L.geoJSON(response.data)
      })
  }

  load_3ft_geojson = () => {
    axios
      .get(
        'https://opendata.arcgis.com/datasets/183f493d62f84b26a09badd0288d6b53_8.geojson'
      )
      .then(response => {
        this.SLR_3ft_geojson = L.geoJSON(response.data)
      })
  }

  load_4ft_geojson = () => {
    axios
      .get(
        'https://opendata.arcgis.com/datasets/3c04cf48476e477897aef4f4f2100b6d_11.geojson'
      )
      .then(response => {
        this.SLR_4ft_geojson = L.geoJSON(response.data)
      })
  }

  load_5ft_geojson = () => {
    axios
      .get(
        'https://opendata.arcgis.com/datasets/fe799f18fbda4eb0b65d07d60bb28e3e_14.geojson'
      )
      .then(response => {
        this.SLR_5ft_geojson = L.geoJSON(response.data)
      })
  }

  load_6ft_geojson = () => {
    axios
      .get(
        'https://opendata.arcgis.com/datasets/46d817c5b3dd48cca54bd56d3547b4b5_17.geojson'
      )
      .then(response => {
        this.SLR_6ft_geojson = L.geoJSON(response.data)
      })
  }

  // Use Axios to request geojson from Open Data Portal, set response into unique state properties
  @action
  loadAllSLR = () => {
    this.load_0ft_geojson()
    this.load_1ft_geojson()
    this.load_2ft_geojson()
    this.load_3ft_geojson()
    this.load_4ft_geojson()
    this.load_5ft_geojson()
    this.load_6ft_geojson()
  }

  // Adds current SLR and Road geojson layers, initializes blank intersection layer
  handleLayerAdding = () => {
    this.currentSLRLayer.addTo(this.map)
    this.currentRoadLayer.addTo(this.map)
    this.criticalFacilitiesIntersection.addTo(this.map)
  }

  // Remove or reset map-attached layers, nullify intersection-OBJECTID array if filled
  handleLayerRemoval = () => {
    if (this.map.hasLayer(this.currentSLRLayer)) {
      this.map.removeLayer(this.currentSLRLayer)
    }
    if (this.map.hasLayer(this.currentRoadLayer)) {
      this.map.removeLayer(this.currentRoadLayer)
    }
    if (this.map.hasLayer(this.criticalFacilitiesIntersection)) {
      this.criticalFacilitiesIntersection.clearLayers()
      this.map.removeLayer(this.criticalFacilitiesIntersection)
    }
    if (this.critFacWhere.length > 1) {
      this.critFacWhere.length = 0
    }
    if (this.map.hasLayer(this.criticalFacilities)) {
      this.criticalFacilities.setWhere('')
    }
  }

  // Filteres CritFac cluster layer to hide overlapping intersection points using intersection-OBJECTID array
  handleWhereClauseReaction = value => {
    if (value) {
      this.loadingComplete = false
      var whereClause = this.critFacWhere
      var thisMap = this.map
      var critFac = this.criticalFacilities

      reaction(
        () => whereClause.slice(),
        (where, reaction) => {
          whereClause = whereClause.join(',')
          if (thisMap.hasLayer(critFac)) {
            critFac.setWhere('OBJECTID NOT IN (' + whereClause + ')')
          }
          reaction.dispose()
          this.loadingComplete = true
        },
        {
          delay: 3000,
        }
      )
    }
  }

  // Intersect CritFac points and SLR polygons, create new icon layer for intersecting CritFac points
  handleIntersection = value => {
    const critFac = this.criticalFacilities
    const critFacIntersect = this.criticalFacilitiesIntersection
    var whereClause = this.critFacWhere

    if (this.currentSLR_geojson && value) {
      this.currentSLR_geojson.eachLayer(function(i) {
        critFac
          .query()
          .intersects(i)
          .run(function(err, fc, rs) {
            if (fc.features.length > 0) {
              fc.features.map(j => {
                critFacIntersect.addData(j)
                whereClause.push(j.id)
              })
            }
          })
      })
    }
  }

  // Set currently selected layers based on slider value
  handleCurrents = value => {
    switch (value) {
      case 0:
        this.currentSLRLayer = this.zeroFtSeaLevel
        this.currentRoadLayer = this.roads1ftSeaLevel
        this.currentSLR_geojson = this.SLR_0ft_geojson
        break

      case 1:
        this.currentSLRLayer = this.oneFtSeaLevel
        this.currentRoadLayer = this.roads1ftSeaLevel
        this.currentSLR_geojson = this.SLR_1ft_geojson
        break

      case 2:
        this.currentSLRLayer = this.twoFtSeaLevel
        this.currentRoadLayer = this.roads2ftSeaLevel
        this.currentSLR_geojson = this.SLR_2ft_geojson
        break

      case 3:
        this.currentSLRLayer = this.threeFtSeaLevel
        this.currentRoadLayer = this.roads3ftSeaLevel
        this.currentSLR_geojson = this.SLR_3ft_geojson
        break

      case 4:
        this.currentSLRLayer = this.fourFtSeaLevel
        this.currentRoadLayer = this.roads4ftSeaLevel
        this.currentSLR_geojson = this.SLR_4ft_geojson
        break

      case 5:
        this.currentSLRLayer = this.fiveFtSeaLevel
        this.currentRoadLayer = this.roads5ftSeaLevel
        this.currentSLR_geojson = this.SLR_5ft_geojson
        break

      case 6:
        this.currentSLRLayer = this.sixFtSeaLevel
        this.currentRoadLayer = this.roads6ftSeaLevel
        this.currentSLR_geojson = this.SLR_6ft_geojson
        break
    }

    this.currentSliderValue = value
  }

  // Set layer description based on slider value
  // TODO: Set calculated layer description properties into state, pull into layer descriptions
  // EXAMPLE:
  //  <li>{this.acreage} acres ({this.acreagePercent}%) of land is submerged</li>
  //  <li>{this.numberOfFacilities} Critical Facilities are impacted.</li>
  handleLayerDesc = value => {
    switch (value) {
      case 0:
        this.layerDesc = (
          <p>
            At present Cape Cod is 383 square miles with 116,031 acres of
            Priority Habitat. There are 728 Critical Facilities and 3,121 miles
            of roadway. Annual sales equal $19.7 billion and 127,412 people are
            employed in 14,658 businesses.
          </p>
        )
        break

      case 1:
        this.layerDesc = (
          <ul style={{paddingLeft: 3}}>
            <li>5,760 acres (2%) of land is submerged.</li>
            <li>8 Critical Facilities are impacted.</li>
            <li>3,007 Acres of Priority Habitat is lost.</li>
            <li>
              Sales of $43.7 million and 361 jobs are lost in 61 businesses.
            </li>
            <li>
              9.4 Miles of roadway are submerged and 52.7 miles are disconnected
              from the network.
            </li>
          </ul>
        )
        break

      case 2:
        this.layerDesc = (
          <ul style={{paddingLeft: 3}}>
            <li>8,960 acres (4%) of land is submerged.</li>
            <li>24 Critical Facilities are impacted.</li>
            <li>4,072 Acres of Priority Habitat is lost.</li>
            <li>
              Sales of $185.7 million and 851 jobs are lost in 97 businesses.
            </li>
            <li>
              21.9 Miles of roadway are submerged and 84.8 miles are
              disconnected from the network.
            </li>
          </ul>
        )
        break

      case 3:
        this.layerDesc = (
          <ul style={{paddingLeft: 3}}>
            <li>12,800 acres (5%) of land is submerged.</li>
            <li>52 Critical Facilities are impacted.</li>
            <li>5,644 Acres of Priority Habitat is lost.</li>
            <li>
              Sales of $288.8 million and 1,432 jobs are lost in 169 businesses.
            </li>
            <li>
              48.5 Miles of roadway are submerged and 159.9 miles are
              disconnected from the network.
            </li>
          </ul>
        )
        break

      case 4:
        this.layerDesc = (
          <ul style={{paddingLeft: 3}}>
            <li>16,000 acres (7%) of land is submerged.</li>
            <li>71 Critical Facilities are impacted.</li>
            <li>8,081 Acres of Priority Habitat is lost.</li>
            <li>
              Sales of $510.4 million and 2,657 jobs are lost in 304 businesses.
            </li>
            <li>
              85.5 Miles of roadway are submerged and 270.9 miles are
              disconnected from the network.
            </li>
          </ul>
        )
        break

      case 5:
        this.layerDesc = (
          <ul style={{paddingLeft: 3}}>
            <li>19,200 acres (8%) of land is submerged.</li>
            <li>102 Critical Facilities are impacted.</li>
            <li>10,033 Acres of Priority Habitat is lost.</li>
            <li>
              Sales of $796.9 million and 5,664 jobs are lost in 552 businesses.
            </li>
            <li>
              128.3 Miles of roadway are submerged and 340.1 miles are
              disconnected from the network.
            </li>
          </ul>
        )
        break

      case 6:
        this.layerDesc = (
          <ul style={{paddingLeft: 3}}>
            <li>21,760 acres (9%) of land is submerged.</li>
            <li>116 Critical Facilities are impacted.</li>
            <li>11,724 Acres of Priority Habitat is lost.</li>
            <li>
              Sales of $1.07 billion and 8,222 jobs are lost in 795 businesses.
            </li>
            <li>
              174.1 Miles of roadway are submerged and 708.6 miles are
              disconnected from the network.
            </li>
          </ul>
        )
        break
    }
  }

  // Handles layer visualization, intersection, and removal logic through a suite of functions
  @action
  switchSLRLayer = value => {
    this.handleWhereClauseReaction(value)
    this.handleLayerRemoval()
    this.handleCurrents(value)
    this.handleLayerAdding()
    this.handleIntersection(value)
    this.handleLayerDesc(value)
  }

  // Show/Hide SLR slider component, relevant SLR map layers, and layer descriptions
  @action
  toggleSlider() {
    this.sliderToggle = !this.sliderToggle

    if (this.sliderToggle) {
      this.switchSLRLayer(0)
      this.layerDescShow = true
    } else {
      this.handleLayerRemoval()
      this.layerDescShow = false
    }
  }

  @action
  toggleCriticalFacilities() {
    this.criticalFacilitiesToggle = !this.criticalFacilitiesToggle
  }

  @action
  handleSloshClick = () => {
    this.toggleSlosh()
    this.toggleSloshBackground()
  }

  @action
  handleFemaFirmClick = () => {
    this.toggleFemaFirm()
    this.toggleFemaFirmBackground()
  }

  // LOGIC TO TOGGLE THE TOGGLEABLE LAYERS BEING ADDED/SUBTRACTED FROM THE MAP
  @action
  toggleCriticalFacilities = () => {
    this.map.hasLayer(this.criticalFacilities)
      ? this.map.removeLayer(this.criticalFacilities)
      : this.map.addLayer(this.criticalFacilities)
  }

  @action
  toggleSlosh = () => {
    this.map.hasLayer(this.slosh)
      ? this.map.removeLayer(this.slosh)
      : this.map.addLayer(this.slosh)
  }

  @action
  toggleFemaFirm = () => {
    this.map.hasLayer(this.femaFirm)
      ? this.map.removeLayer(this.femaFirm)
      : this.map.addLayer(this.femaFirm)
  }

  // REMOVE THE TOGGLEABLE LAYERS
  @action
  removeToggleableLayers = () => {
    // ESTABLISH AN ARRAY OF THE TOGGLEABLE LAYERS TO LOOP THROUGH TO REMOVE LAYERS IF ANY EXIST IN array.map() METHOD BELOW
    // ESTABLISH THE MAP TO USE IN THE array.map() METHOD BELOW
    let toggleableLayers = [this.criticalFacilities, this.slosh, this.femaFirm]
    let map = this.map

    // CHECK TO SEE IF ALL THE LAYERS DO NOT EXIST - IF TRUE, ALERT THE USER TO ADD LAYERS
    if (
      !this.map.hasLayer(this.criticalFacilities) &&
      !this.map.hasLayer(this.slosh) &&
      !this.map.hasLayer(this.femaFirm)
    ) {
      alert("Doh! This button doesn't do anything until you add layers.")
    }
    // LOOP THROUGH THE toggleableLayers, WHICHEVER LAYER(S) THE MAP HAS, REMOVE THE LAYER(S), RETURN THE VALUE FOR THE CALLBACK f(x)
    toggleableLayers.map(i => {
      if (map.hasLayer(i)) {
        map.removeLayer(i)
      }
      return i
    })
  }

  @action
  changeZoom = level => {
    this.currentZoomLevel = level
  }

  @action
  setMap = map => {
    this.map = map
  }

  @action
  setTileLayer = layer => {
    this.tileLayer = layer
  }

  @action
  setCurrentBaseMapName = baseMapName => {
    this.currentBaseMapName = baseMapName
  }

  @action
  setCurrentBaseMapObject = baseMapObj => {
    this.currentBaseMapObject = baseMapObj
  }

  constructor(RootStore) {
    this.RootStore = RootStore
  }
}

class RootStore {
  constructor() {
    this.EsriMapStore = new EsriMapStore(this)
  }
}

export default new RootStore()
