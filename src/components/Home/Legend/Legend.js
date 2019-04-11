// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Grid, Row, Col, Image} from 'react-bootstrap'
import css from './Legend.css'
import RootStore from '../../../store'

@observer
class Legend extends Component {

  // Render all control panel sub-components in Bootstrap grid
  render = () => {
    let townLinesLegend = (
      <Row style = {{paddingTop: '5px'}}>
        <Col md={6}>
          <div style={{backgroundColor: '#7e8b9e'}} className={css.colorBar} />
        </Col>
        <Col md={6}>
          <p>Town Lines</p>
        </Col>
      </Row>
    )

    let disConRoadsLegend = (
      <Row>
        <Col md={6}>
          <div style={{backgroundColor: 'red'}} className={css.colorBar} />
        </Col>
        <Col md={6}>
          <p>Disconnected Roads</p>
        </Col>
      </Row>
    )

    let lowLyingAreasLegend = (
      <Row>
        <Col md={6}>
          <div style={{backgroundColor: '#63cc70'}} className={css.colorBar} />
        </Col>
        <Col md={6}>
          <p>Low Lying Areas</p>
        </Col>
      </Row>
    )

    let critFacLegend = (
      <div>
        <Row>
          <Col md={6}>
            <Image
              className={css.point}
              src={require('../ControlPanel/Layers/img/critFac.svg')}
              circle
            />
          </Col>
          <Col md={6}>
            <p>Critical Facilities</p>
          </Col>
        </Row>
      </div>
    )

    let sloshLegend = (
      <div>
        <Row>
          <Col md={6}>
            <div
              style={{backgroundColor: '#ff0000'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Category 1</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div
              style={{backgroundColor: '#ff3411'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Category 2</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div
              style={{backgroundColor: '#ff6823'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Category 3</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div
              style={{backgroundColor: '#ff9c35'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Category 4</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div
              style={{backgroundColor: '#ffd047'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Category 5</p>
          </Col>
        </Row>
      </div>
    )

    let femaLegend = (
      <div>
        <Row>
          <Col md={6}>
            <div
              style={{backgroundColor: '#f1a800'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Special Flood Hazard Areas</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div
              style={{backgroundColor: '#d20000'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Coastal High Hazard Areas</p>
          </Col>
        </Row>
      </div>
    )

    let intersectLegend = (
      <Row>
        <Col md={6}>
          <Image
            className={css.point}
            src={require('../ControlPanel/Layers/img/slr.svg')}
          />
        </Col>
        <Col md={6}>
          <p>Affected Critical Facilities</p>
        </Col>
      </Row>
    )

    let legendTable = (
      <Grid>
        <Row
          className={
            (RootStore.ControlPanelStore.panelButtonOpenness && RootStore.EsriMapStore.loadingComplete)
              ? css.LegendWrapperOpen
              : css.LegendWrapperClosed
          }
        >
          <Col md={12}>
            <Row>
              <b>Legend</b>
            </Row>
            <Row>
              <Col md={6}>
                <b>Symbol</b>
              </Col>
              <Col md={6}>
                <b>Description</b>
              </Col>
            </Row>
            {townLinesLegend}
            {lowLyingAreasLegend}
            {RootStore.ControlPanelStore.currentSliderValue > 0 
              ? disConRoadsLegend 
              : null}
            {RootStore.ControlPanelStore.criticalFacilitiesBackground
              ? critFacLegend
              : null}
            {RootStore.ControlPanelStore.currentSliderValue > 0
              ? intersectLegend
              : null}
            {RootStore.ControlPanelStore.sloshBackground ? sloshLegend : null}
            {RootStore.ControlPanelStore.femaFirmBackground ? femaLegend : null}
          </Col>
        </Row>
      </Grid>
    )

    return (legendTable)
  }
}
export default Legend
