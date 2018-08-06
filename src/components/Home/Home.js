// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import EsriLeafletMap from './Leaflet Map/EsriLeafletMap'
import ControlPanel from './ControlPanel/ControlPanel'
import {Grid, Row, Col} from 'react-bootstrap'
import css from './Home.css'
import RootStore from '../../store'

// RENDER THE CONTROL PANEL & THE MAP WITHIN A SINGLE COLUMN/ROW OF THE 'react-bootstrap' LAYOUT
// Show loading gif and background on toggle of boolean state property
@observer
class Home extends Component {
  render = () => {
    return (
      <Grid>
        <div
          className={
            RootStore.EsriMapStore.loadingComplete ? null : css.loading
          }
        />
        <Row>
          <Col>
            <ControlPanel />
            <EsriLeafletMap />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Home
