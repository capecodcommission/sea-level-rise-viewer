// @flow
import * as esri from 'esri-leaflet'
import * as L from 'leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import {observable, action, reaction} from 'mobx'
import axios from 'axios'
import React from 'react'
import css from './index.css'

class EsriMapStore {
  @observable
  currentZoomLevel: int = 13
  @observable
  currentBaseMapObject: null = {}
  startView: init = [41.68, -70.3405]
  @observable
  map: null = {}
  @observable
  loadingComplete: init = true

  // Filter Critical Facilities layer using checked sub types and towns
  filterCritFac = () => {
    // Create filtered subsets of type and town arrays using checked property
    var townFilter = this.RootStore.ControlPanelStore.townArray.filter(i => {
      return i.checked
    })
    var subFilter = this.RootStore.ControlPanelStore.subTypeFIEArray.filter(
      i => {
        return i.checked
      }
    )

    // Create array-like strings from filtered arrays to pass to Critical Facilities layer query
    var queryTownString = townFilter
      .map(i => {
        return "'" + i.town + "'"
      })
      .join(',')
    var querySubString = subFilter
      .map(i => {
        return i.subTypeFIE
      })
      .join(',')

    if (this.map.hasLayer(this.RootStore.MapServicesStore.criticalFacilities)) {
      this.RootStore.MapServicesStore.criticalFacilities.setWhere(
        'MUNICIPALI IN (' +
          queryTownString +
          ') AND SUBTYPEFIE IN (' +
          querySubString +
          ')'
      )
    }
  }

  // Adds current SLR and Road geojson layers, initializes blank intersection layer
  handleLayerAdding = () => {
    this.RootStore.GeoJSONStore.currentSLRLayer.addTo(this.map)
    this.RootStore.GeoJSONStore.currentRoadLayer.addTo(this.map)
    this.RootStore.GeoJSONStore.criticalFacilitiesIntersection.addTo(this.map)
  }

  // Remove or reset map-attached layers, nullify intersection-OBJECTID array if filled
  handleLayerRemoval = () => {
    if (this.map.hasLayer(this.RootStore.GeoJSONStore.currentSLRLayer)) {
      this.map.removeLayer(this.RootStore.GeoJSONStore.currentSLRLayer)
    }
    if (this.map.hasLayer(this.RootStore.GeoJSONStore.currentRoadLayer)) {
      this.map.removeLayer(this.RootStore.GeoJSONStore.currentRoadLayer)
    }
    if (
      this.map.hasLayer(
        this.RootStore.GeoJSONStore.criticalFacilitiesIntersection
      )
    ) {
      this.RootStore.GeoJSONStore.criticalFacilitiesIntersection.clearLayers()
      this.map.removeLayer(
        this.RootStore.GeoJSONStore.criticalFacilitiesIntersection
      )
    }
    if (this.RootStore.GeoJSONStore.critFacWhere.length > 1) {
      this.RootStore.GeoJSONStore.critFacWhere.length = 0
    }
    if (this.map.hasLayer(this.RootStore.MapServicesStore.criticalFacilities)) {
      this.RootStore.MapServicesStore.criticalFacilities.setWhere('')
    }
  }

  // Filteres CritFac cluster layer to hide overlapping intersection points using intersection-OBJECTID array
  // Fills layer descriptions with number of critical faciliites affected
  handleWhereClauseReaction = value => {
    if (value) {
      this.loadingComplete = false
      var whereClause = this.RootStore.GeoJSONStore.critFacWhere
      var thisMap = this.map
      var critFac = this.RootStore.MapServicesStore.criticalFacilities

      reaction(
        () => whereClause.slice(),
        (where, reaction) => {
          this.RootStore.ControlPanelStore.handleLayerDesc(
            this.RootStore.ControlPanelStore.currentSliderValue,
            whereClause.length
          )

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
    const critFac = this.RootStore.MapServicesStore.criticalFacilities
    const critFacIntersect = this.RootStore.GeoJSONStore
      .criticalFacilitiesIntersection
    var whereClause = this.RootStore.GeoJSONStore.critFacWhere

    if (this.RootStore.GeoJSONStore.currentSLR_geojson && value) {
      this.RootStore.GeoJSONStore.currentSLR_geojson.eachLayer(function(i) {
        critFac
          .query()
          .intersects(i)
          .run(function(err, fc, rs) {
            if (fc.features.length > 0) {
              fc.features.map(j => {
                critFacIntersect.addData(j)
                whereClause.push(j.id)
                return j
              })
            }
          })
      })
    }
  }

  // Handles layer visualization, intersection, and removal logic through a suite of functions
  @action
  switchSLRLayer = value => {
    this.handleWhereClauseReaction(value)
    this.handleLayerRemoval()
    this.RootStore.ControlPanelStore.handleCurrents(value)
    this.handleLayerAdding()
    this.handleIntersection(value)
    this.RootStore.ControlPanelStore.handleLiquidChange()
  }

  // LOGIC TO TOGGLE THE TOGGLEABLE LAYERS BEING ADDED/SUBTRACTED FROM THE MAP
  // Remove SLR-intersecting OBJECTIDS from Critical Facility layer
  @action
  toggleCriticalFacilities = () => {
    var whereClause = this.RootStore.GeoJSONStore.critFacWhere
    whereClause = whereClause.slice().join(',')

    if (this.map.hasLayer(this.RootStore.MapServicesStore.criticalFacilities)) {
      this.RootStore.MapServicesStore.criticalFacilities.setWhere('')
      this.map.removeLayer(this.RootStore.MapServicesStore.criticalFacilities)
    } else {
      this.map.addLayer(this.RootStore.MapServicesStore.criticalFacilities)

      if (
        this.map.hasLayer(this.RootStore.MapServicesStore.criticalFacilities) &&
        whereClause.length > 1
      ) {
        setTimeout(() => {
          this.RootStore.MapServicesStore.criticalFacilities.setWhere(
            'OBJECTID NOT IN (' + whereClause + ')'
          )
        }, 500)
      }
    }
  }

  @action
  toggleSlosh = () => {
    this.map.hasLayer(this.RootStore.MapServicesStore.slosh)
      ? this.map.removeLayer(this.RootStore.MapServicesStore.slosh)
      : this.map.addLayer(this.RootStore.MapServicesStore.slosh)
  }

  @action
  toggleFemaFirm = () => {
    this.map.hasLayer(this.RootStore.MapServicesStore.femaFirm)
      ? this.map.removeLayer(this.RootStore.MapServicesStore.femaFirm)
      : this.map.addLayer(this.RootStore.MapServicesStore.femaFirm)
  }

  // REMOVE THE TOGGLEABLE LAYERS
  @action
  removeToggleableLayers = () => {
    // ESTABLISH AN ARRAY OF THE TOGGLEABLE LAYERS TO LOOP THROUGH TO REMOVE LAYERS IF ANY EXIST IN array.map() METHOD BELOW
    // ESTABLISH THE MAP TO USE IN THE array.map() METHOD BELOW
    let toggleableLayers = [
      this.RootStore.MapServicesStore.criticalFacilities,
      this.RootStore.MapServicesStore.slosh,
      this.RootStore.MapServicesStore.femaFirm,
      this.RootStore.MapServicesStore.currentSLRLayer,
      this.RootStore.MapServicesStore.currentRoadLayer,
      this.RootStore.MapServicesStore.criticalFacilitiesIntersection,
      this.RootStore.MapServicesStore.searchResults,
    ]
    let map = this.map

    // CHECK TO SEE IF ALL THE LAYERS DO NOT EXIST - IF TRUE, ALERT THE USER TO ADD LAYERS
    if (
      !this.map.hasLayer(this.RootStore.MapServicesStore.criticalFacilities) &&
      !this.map.hasLayer(this.RootStore.MapServicesStore.slosh) &&
      !this.map.hasLayer(this.RootStore.MapServicesStore.femaFirm) &&
      !this.map.hasLayer(this.RootStore.MapServicesStore.currentSLRLayer) &&
      !this.map.hasLayer(this.RootStore.MapServicesStore.currentRoadLayer) &&
      !this.map.hasLayer(
        this.RootStore.MapServicesStore.criticalFacilitiesIntersection
      ) &&
      !this.map.hasLayer(this.RootStore.MapServicesStore.searchResults)
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

    this.RootStore.ControlPanelStore.criticalFacilitiesBackground = false
    this.RootStore.ControlPanelStore.femaFirmBackground = false
    this.RootStore.ControlPanelStore.sloshBackground = false
    this.RootStore.ControlPanelStore.sliderToggle = false
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
  setCurrentBaseMapObject = baseMapObj => {
    this.currentBaseMapObject = baseMapObj
  }

  constructor(RootStore) {
    this.RootStore = RootStore
  }
}

class ControlPanelStore {
  @observable
  sliderToggle: init = false
  @observable
  layerDesc: init = null
  @observable
  layerDescShow: init = false
  @observable
  currentSliderValue: init = 0
  @observable
  currentLiquidValue: init = 0
  @observable
  subTypeFIEArray: init = [
    {
      subTypeFIE: '701',
      checked: true,
    },
    {
      subTypeFIE: '710',
      checked: true,
    },
    {
      subTypeFIE: '720',
      checked: true,
    },
    {
      subTypeFIE: '730',
      checked: true,
    },
    {
      subTypeFIE: '740',
      checked: true,
    },
    {
      subTypeFIE: '750',
      checked: true,
    },
    {
      subTypeFIE: '790',
      checked: true,
    },
    {
      subTypeFIE: '800',
      checked: true,
    },
    {
      subTypeFIE: '810',
      checked: true,
    },
    {
      subTypeFIE: '820',
      checked: true,
    },
    {
      subTypeFIE: '830',
      checked: true,
    },
    {
      subTypeFIE: '850',
      checked: true,
    },
    {
      subTypeFIE: '880',
      checked: true,
    },
  ]
  @observable
  townArray: init = [
    {
      town: 'Barnstable',
      checked: true,
    },
    {
      town: 'Bourne',
      checked: true,
    },
    {
      town: 'Brewster',
      checked: true,
    },
    {
      town: 'Chatham',
      checked: true,
    },
    {
      town: 'Dennis',
      checked: true,
    },
    {
      town: 'Eastham',
      checked: true,
    },
    {
      town: 'Falmouth',
      checked: true,
    },
    {
      town: 'Harwich',
      checked: true,
    },
    {
      town: 'Mashpee',
      checked: true,
    },
    {
      town: 'Orleans',
      checked: true,
    },
    {
      town: 'Provincetown',
      checked: true,
    },
    {
      town: 'Sandwich',
      checked: true,
    },
    {
      town: 'Truro',
      checked: true,
    },
    {
      town: 'Wellfleet',
      checked: true,
    },
    {
      town: 'Yarmouth',
      checked: true,
    },
  ]
  @observable
  criticalFacilitiesBackground: init = false
  @observable
  sloshBackground = false
  @observable
  femaFirmBackground: init = false
  @observable
  currentBaseMapName: string = 'NationalGeographic'
  @observable
  startColor = '#0ca4ff'
  @observable
  endColor = '#0077be'

  // Set currently selected layers based on slider value
  handleCurrents = value => {
    const geoJSONStore = this.RootStore.GeoJSONStore
    const mapServicesStore = this.RootStore.MapServicesStore
    switch (value) {
      case 0:
        geoJSONStore.currentSLRLayer = mapServicesStore.zeroFtSeaLevel
        geoJSONStore.currentRoadLayer = mapServicesStore.roads
        geoJSONStore.currentSLR_geojson = geoJSONStore.SLR_0ft_geojson
        break

      case 1:
        geoJSONStore.currentSLRLayer = mapServicesStore.oneFtSeaLevel
        geoJSONStore.currentRoadLayer = mapServicesStore.roads1ftSeaLevel
        geoJSONStore.currentSLR_geojson = geoJSONStore.SLR_1ft_geojson
        break

      case 2:
        geoJSONStore.currentSLRLayer = mapServicesStore.twoFtSeaLevel
        geoJSONStore.currentRoadLayer = mapServicesStore.roads2ftSeaLevel
        geoJSONStore.currentSLR_geojson = geoJSONStore.SLR_2ft_geojson
        break

      case 3:
        geoJSONStore.currentSLRLayer = mapServicesStore.threeFtSeaLevel
        geoJSONStore.currentRoadLayer = mapServicesStore.roads3ftSeaLevel
        geoJSONStore.currentSLR_geojson = geoJSONStore.SLR_3ft_geojson
        break

      case 4:
        geoJSONStore.currentSLRLayer = mapServicesStore.fourFtSeaLevel
        geoJSONStore.currentRoadLayer = mapServicesStore.roads4ftSeaLevel
        geoJSONStore.currentSLR_geojson = geoJSONStore.SLR_4ft_geojson
        break

      case 5:
        geoJSONStore.currentSLRLayer = mapServicesStore.fiveFtSeaLevel
        geoJSONStore.currentRoadLayer = mapServicesStore.roads5ftSeaLevel
        geoJSONStore.currentSLR_geojson = geoJSONStore.SLR_5ft_geojson
        break

      case 6:
        geoJSONStore.currentSLRLayer = mapServicesStore.sixFtSeaLevel
        geoJSONStore.currentRoadLayer = mapServicesStore.roads6ftSeaLevel
        geoJSONStore.currentSLR_geojson = geoJSONStore.SLR_6ft_geojson
        break

      default:
        console.log("Sorry, this isn't working.")
    }

    this.currentSliderValue = value
  }

  @action
  handleLiquidChange = () => {
    this.currentLiquidValue = (this.currentSliderValue / 6) * 100
  }

  @action
  setCurrentBaseMapName = baseMapName => {
    this.currentBaseMapName = baseMapName
  }

  @action
  handleFemaFirmClick = () => {
    this.RootStore.EsriMapStore.toggleFemaFirm()
    this.toggleFemaFirmBackground()
  }

  @action
  handleSloshClick = () => {
    this.RootStore.EsriMapStore.toggleSlosh()
    this.toggleSloshBackground()
  }

  @action
  handleCriticalFacilitiesClick = () => {
    this.RootStore.EsriMapStore.toggleCriticalFacilities()
    this.toggleCriticalFacilitiesBackground()
  }

  // Toggle check property for singular sub-type using passed sub-type value from checkbox
  @action
  handleSubTypeFilter = subTypeFIE => {
    // Find object in type array that matches the passed type from checkbox, toggle checked property
    var subRow = this.subTypeFIEArray.find(i => {
      return i.subTypeFIE === subTypeFIE
    })
    subRow.checked = !subRow.checked

    this.RootStore.EsriMapStore.filterCritFac()
  }

  // Toggle check property for singular town using passed town value from checkbox
  @action
  handleTownFilter = town => {
    // Find object in town array that matches the passed town from checkbox, toggle checked property
    var townRow = this.townArray.find(i => {
      return i.town === town
    })
    townRow.checked = !townRow.checked

    this.RootStore.EsriMapStore.filterCritFac()
  }

  @action
  toggleCriticalFacilitiesBackground = () => {
    this.criticalFacilitiesBackground = !this.criticalFacilitiesBackground
  }

  @action
  toggleSloshBackground = () => {
    this.sloshBackground = !this.sloshBackground
  }

  @action
  toggleFemaFirmBackground = () => {
    this.femaFirmBackground = !this.femaFirmBackground
  }

  // Check all types and towns, rerun Critical Facilities filter
  @action
  selectAll = () => {
    // Check all items from types and towns arrays
    this.subTypeFIEArray.map(i => {
      i.checked = true
    })
    this.townArray.map(i => {
      i.checked = true
    })

    this.RootStore.EsriMapStore.filterCritFac()
  }

  // Uncheck all types and towns, rerun Critical Facilities filter
  @action
  selectNone = () => {
    // Uncheck all items from types and towns arrays
    this.subTypeFIEArray.map(i => {
      i.checked = false
    })
    this.townArray.map(i => {
      i.checked = false
    })

    this.RootStore.EsriMapStore.filterCritFac()
  }

  // Set layer description and calculated properties
  // Based on slider value and intersecting points array respectively
  handleLayerDesc = (value, facCount = null) => {
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
            <li>{facCount} Critical Facilities are impacted.</li>
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
            <li>{facCount} Critical Facilities are impacted.</li>
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
            <li>{facCount} Critical Facilities are impacted.</li>
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
            <li>{facCount} Critical Facilities are impacted.</li>
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
            <li>{facCount} Critical Facilities are impacted.</li>
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
            <li>{facCount} Critical Facilities are impacted.</li>
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

      default:
        console.log("Sorry, this isn't working.")
    }
  }

  // Show/Hide SLR slider component, relevant SLR map layers, and layer descriptions
  @action
  toggleSlider() {
    this.sliderToggle = !this.sliderToggle

    if (this.sliderToggle) {
      this.RootStore.EsriMapStore.switchSLRLayer(0)
      this.handleLayerDesc(0)
      this.layerDescShow = true
    } else {
      this.RootStore.EsriMapStore.handleLayerRemoval()
      this.layerDescShow = false
    }
  }

  constructor(RootStore) {
    this.RootStore = RootStore
  }
}

class MapServicesStore {
  townLines: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/6',
    style: function(feature) {
      return {
        color: '#7e8b9e',
        weight: 2,
      }
    },
  })
  criticalFacilities: init = eLCluster
    .featureLayer({
      url:
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Infrastructure/MapServer/12',
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl:
              'https://cdn3.iconfinder.com/data/icons/home-insurance-2/380/2-512.png',
            iconSize: [41, 37],
          }),
        })
      },
      polygonOptions: {
        color: '#2CA5C3',
      },
      iconCreateFunction: function(cluster) {
        // Get number of points within cluster
        var count = cluster.getChildCount()

        // Create new cluster icon with point number in center
        // Style using imported css
        return new L.divIcon({
          html: count,
          className: [css.cluster, css.digits].join(' '),
          iconSize: null,
        })
      },
    })
    .bindPopup(function(layer) {
      return L.Util.template(
        '<strong>{NAME}</strong> <p> {DESCRIPT} | {FULLADDR}</p> <p>{MUNICIPALI}</p>',
        layer.feature.properties
      )
    })
  socialVulnerability: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SocialVulnerability/MapServer/0',
  })
  zeroFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_0_Corrected/MapServer',
    opacity: 0.5,
  })
  oneFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_1_Corrected/MapServer',
    opacity: 0.5,
  })
  twoFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_2_Corrected/MapServer',
    opacity: 0.5,
  })
  threeFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_3_Corrected/MapServer',
    opacity: 0.5,
  })
  fourFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_4ft_Corrected/MapServer',
    opacity: 0.5,
  })
  fiveFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_5ft_Corrected/MapServer',
    opacity: 0.5,
  })
  sixFtSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_6/MapServer',
    opacity: 0.5,
  })
  femaFirm: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/FEMA_FIRM_2013/MapServer',
    opacity: 0.5,
  })
  slosh: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/SLOSH_2013/MapServer',
    opacity: 0.5,
  })
  buildings: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/Buildings/MapServer',
    opacity: 0.3,
  })
  parcels: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/TaxParcel_Yellow/MapServer',
  })
  roads: init = esri.dynamicMapLayer({
    url:
      'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
  })
  roads1ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_1ft/MapServer',
  })
  roads2ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_2ft/MapServer',
  })
  roads3ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_3ft/MapServer',
  })
  roads4ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_4ft/MapServer',
  })
  roads5ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_5ft/MapServer',
  })
  roads6ftSeaLevel: init = esri.dynamicMapLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_6ft/MapServer',
  })
  @observable
  searchResults: init = L.layerGroup()

  constructor(RootStore) {
    this.RootStore = RootStore
  }
}

class GeoJSONStore {
  @observable
  SLR_0ft_geojson: init = false
  @observable
  SLR_1ft_geojson: init = false
  @observable
  SLR_2ft_geojson: init = false
  @observable
  SLR_3ft_geojson: init = false
  @observable
  SLR_4ft_geojson: init = false
  @observable
  SLR_5ft_geojson: init = false
  @observable
  SLR_6ft_geojson: init = false
  @observable
  currentSLR_geojson: init = false
  @observable
  critFacWhere: init = []
  currentSLRLayer: null = {}
  currentRoadLayer: null = {}
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

  constructor(RootStore) {
    this.RootStore = RootStore
  }
}

class RootStore {
  constructor() {
    this.EsriMapStore = new EsriMapStore(this)
    this.ControlPanelStore = new ControlPanelStore(this)
    this.MapServicesStore = new MapServicesStore(this)
    this.GeoJSONStore = new GeoJSONStore(this)
  }
}

export default new RootStore()
