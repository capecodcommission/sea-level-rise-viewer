// @flow
import * as esri from 'esri-leaflet'
import * as L from 'leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import {observable, action} from 'mobx'

class EsriMapStore {
  @observable currentZoomLevel: int = 13
  @observable currentBaseMapName: string = 'Topographic'
  @observable currentBaseMapObject: null = {}
  startView: init = [41.68, -70.3405]
  @observable map: null = {}
  tileLayer: null = {}
  townLines: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/6',
  })
  townLinesToggle: init = false
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
  @observable criticalFacilitiesToggle: init = false
  socialVulnerability: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SocialVulnerability/MapServer/0',
  })
  socialVulnerabilityToggle: init = false
  zeroFtSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_0_Corrected/MapServer',
  })
  zeroFtSeaLevelToggle: init = false
  oneFtSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_1_Corrected/MapServer',
  })
  oneFtSeaLevelToggle: init = false
  twoFtSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_2_Corrected/MapServer',
  })
  twoFtSeaLevelToggle: init = false
  threeFtSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_3_Corrected/MapServer',
  })
  threeFtSeaLevelToggle: init = false
  fourFtSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_4ft_Corrected/MapServer',
  })
  fourFtSeaLevelToggle: init = false
  fiveFtSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_5ft_Corrected/MapServer',
  })
  fiveFtSeaLevelToggle: init = false
  sixFtSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_6/MapServer',
  })
  sixFtSeaLevelToggle: init = false
  femaFirm: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/FEMA_FIRM_2013/MapServer',
  })
  femaFirmToggle: init = false
  slosh: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/SLOSH_2013/MapServer',
  })
  sloshToggle: init = false
  buildings: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/Buildings/MapServer',
  })
  buildingsToggle: init = false
  parcels: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/TaxParcel_Yellow/MapServer',
  })
  parcelsToggle: init = false
  roads: init = esri.featureLayer({
    url:
      'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
  })
  roadsToggle: init = false
  roads1ftSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_1ft/MapServer',
  })
  roads1ftSeaLevelToggle: init = false
  roads2ftSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_2ft/MapServer',
  })
  roads2ftSeaLevelToggle: init = false
  roads3ftSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_3ft/MapServer',
  })
  roads3ftSeaLevelToggle: init = false
  roads4ftSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_4ft/MapServer',
  })
  roads4ftSeaLevelToggle: init = false
  roads5ftSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_5ft/MapServer',
  })
  roads5ftSeaLevelToggle: init = false
  roads6ftSeaLevel: init = esri.featureLayer({
    url:
      'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_6ft/MapServer',
  })
  roads6ftSeaLevelToggle: init = false

  @action
  toggleCriticalFacilities() {
    this.criticalFacilitiesToggle = !this.criticalFacilitiesToggle

    if (this.criticalFacilitiesToggle) {
      this.criticalFacilities.addTo(this.map)
    } else {
      this.map.removeLayer(this.criticalFacilities)
    }
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
