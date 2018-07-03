// START WITH BUNDLING OF MAP & CONTROLS
import React, {Component} from 'react'
import {render} from 'react-dom'
import RootStore from '../../store'
import * as L from 'leaflet'
import * as esri from 'esri-leaflet'
import * as eLCluster from 'esri-leaflet-cluster'
import * as leafletMarkerCluster from 'leaflet.markercluster'
import css from './MapRoot.css'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'
import EsriLeafletMap from './Leaflet Map/EsriLeafletMap'
import Controls from './Control Panel/Controls'
import {Grid, Row, Col} from 'react-bootstrap'

@observer
class MapRoot extends Component {
  constructor() {
    super()
  }

  render = () => {
    return (
      <Grid>
        <Row>
          <Col>
            <Controls />
            <EsriLeafletMap />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default MapRoot
