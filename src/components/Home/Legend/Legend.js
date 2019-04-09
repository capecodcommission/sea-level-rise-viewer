// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Grid, Row, Col, Button, Image} from 'react-bootstrap'
import css from './Legend.css'
import RootStore from '../../../store'

@observer
class Legend extends Component {

  constructor() {
    super()
    this.state = {
      legendButtonOpenness: true,
    }
  }

  toggleLegend = () => {
    this.setState(prevState => ({
      legendButtonOpenness: !prevState.legendButtonOpenness,
    }))
  }

  // Render all control panel sub-components in Bootstrap grid
  render = () => {
    let townLinesLegend = (
      <Row>
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
              style={{backgroundColor: '#fabee9'}}
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
              style={{backgroundColor: '#f500c7'}}
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
              style={{backgroundColor: '#a10085'}}
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
              style={{backgroundColor: '#be07ff'}}
              className={css.colorBar}
            />
          </Col>
          <Col md={6}>
            <p>Category 4</p>
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
          className={css.legendBtnBackground}
        >
          <Button
            className={
              (this.state.legendButtonOpenness && RootStore.EsriMapStore.loadingComplete)
                ? css.legendBtnBackgroundOpen
                : css.legendBtnBackgroundClosed
            }
            style={{
              background: '#bdbdbd',
              float: 'right',
              position: 'absolute',
              display: 'inline-block',
              zIndex: '4',
              opacity: '0.8',
            }}
            onClick={this.toggleLegend.bind(this)}
          >
            <Image
              className={
                (this.state.legendButtonOpenness && RootStore.EsriMapStore.loadingComplete)
                  ? css.legendToggleImageOpen
                  : css.legendToggleImageClosed
              }
              src={require('../ControlPanel/img/leftArrow.png')}
              circle
            />
          </Button>
        </Row>
        <Row
          className={
            (this.state.legendButtonOpenness && RootStore.EsriMapStore.loadingComplete)
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
            {disConRoadsLegend}
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
