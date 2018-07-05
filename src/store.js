// @flow

import {observable, action} from 'mobx'
const axios = require('axios')

class EsriMapStore {
  @observable currentZoomLevel: int = 13
  @observable currentBaseMap: string = 'Topographic'
  startView: init = [41.68, -70.3405]
  @observable map: null = {}
  tileLayer: null = {}
  townLines: init = ''
  criticalFacilities: init = ''
  socialVulnerability: init = ''
  zeroFtSeaLevel: init = ''
  oneFtSeaLevel: init = ''
  twoFtSeaLevel: init = ''
  threeFtSeaLevel: init = ''
  fourFtSeaLevel: init = ''
  fiveFtSeaLevel: init = ''
  sixFtSeaLevel: init = ''
  femaFirm: init = ''
  slosh: init = ''
  buildings: init = ''
  parcels: init = ''
  roads: init = ''
  roads1ftSeaLevel: init = ''
  roads2ftSeaLevel: init = ''
  roads3ftSeaLevel: init = ''
  roads4ftSeaLevel: init = ''
  roads5ftSeaLevel: init = ''
  roads6ftSeaLevel: init = ''

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
  setCurrentBaseMap = baseMap => {
    this.currentBaseMap = baseMap
  }

  @action
  fetchTownLines = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Boundary/MapServer/6'
      )
      .then(function(response) {
        console.log('fetchTownLines --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  @action
  fetchCriticalFacilities = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Data_People/Infrastructure/MapServer/12'
      )
      .then(function(response) {
        console.log('fetchCriticalFacilities --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchSocialVulnerability = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SocialVulnerability/MapServer/0'
      )
      .then(function(response) {
        console.log('fetchSocialVulnerability --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetch0ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_0_Corrected/MapServer'
      )
      .then(function(response) {
        console.log('fetch0ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetch1ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_1_Corrected/MapServer'
      )
      .then(function(response) {
        console.log('fetch1ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetch2ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_2_Corrected/MapServer'
      )
      .then(function(response) {
        console.log('fetch2ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetch3ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_3_Corrected/MapServer'
      )
      .then(function(response) {
        console.log('fetch3ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetch4ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_4ft_Corrected/MapServer'
      )
      .then(function(response) {
        console.log('fetch4ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetch5ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_5ft_Corrected/MapServer'
      )
      .then(function(response) {
        console.log('fetch5ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetch6ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/SLR_6/MapServer'
      )
      .then(function(response) {
        console.log('fetch6ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchFemaFirm = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/FEMA_FIRM_2013/MapServer'
      )
      .then(function(response) {
        console.log('fetchFemaFirm --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchSlosh = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/SLOSH_2013/MapServer'
      )
      .then(function(response) {
        console.log('fetchSlosh --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchBuildings = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/Buildings/MapServer'
      )
      .then(function(response) {
        console.log('fetchBuildings --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchParcels = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/Web_Basedata/TaxParcel_Yellow/MapServer'
      )
      .then(function(response) {
        console.log('fetchParcels --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchRoads = () => {
    return axios
      .get(
        'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer'
      )
      .then(function(response) {
        console.log('fetchRoads --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchRoads1ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_1ft/MapServer'
      )
      .then(function(response) {
        console.log('fetchRoads1ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchRoads2ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_2ft/MapServer'
      )
      .then(function(response) {
        console.log('fetchRoads2ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchRoads3ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_3ft/MapServer'
      )
      .then(function(response) {
        console.log('fetchRoads3ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchRoads4ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_4ft/MapServer'
      )
      .then(function(response) {
        console.log('fetchRoads4ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchRoads5ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_5ft/MapServer'
      )
      .then(function(response) {
        console.log('fetchRoads5ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  fetchRoads6ftSeaLevel = () => {
    return axios
      .get(
        'http://gis-services.capecodcommission.org/arcgis/rest/services/SeaLevelRise/Roads_Isolated_6ft/MapServer'
      )
      .then(function(response) {
        console.log('fetchRoads6ftSeaLevel --> ', response)
      })
      .catch(function(error) {
        console.log(error)
      })
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
