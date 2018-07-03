import React, {Component} from 'react'
import {render} from 'react-dom'
import mapStore from '../../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import css from './Controls.css'
import BaseMapSwitcher from './BaseMap Switcher/BaseMapSwitcher'
import {observer} from 'mobx-react'

@observer
class Controls extends Component {
  componentWillMount = () => {
    console.log('componentWillMount')
  }

  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    console.log('componentDidMount')
  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate')
  }

  render = () => {
    return <BaseMapSwitcher />
  }
}
export default Controls
