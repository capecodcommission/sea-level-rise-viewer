// @flow

import {observable, action} from 'mobx'

class MapStore {
  @observable message: string = 'Original Message'
  @observable currentZoomLevel: int = 13
  @observable map: null = {}
  @observable tileLayer: null = {}

  @action
  changeMessage = message => {
    this.message = message
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

  constructor(RootStore) {
    this.RootStore = RootStore
  }
}

class WorldStore {
  @observable message: string = 'Original Message'

  @action
  changeMessage = message => {
    this.message = message
  }

  constructor(RootStore) {
    this.RootStore = RootStore
  }
}

class RootStore {
  constructor() {
    this.MapStore = new MapStore(this)
    this.WorldStore = new WorldStore(this)
  }
}

export default new RootStore()
