// @flow
// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './Layers.css'
import {
  Image,
  Button,
  Glyphicon,
  Popover,
  OverlayTrigger,
  FormGroup,
  Checkbox,
  Col,
  Row,
  ButtonGroup,
} from 'react-bootstrap'
import {observer} from 'mobx-react'
import Slider from 'rc-slider'
import {color} from 'd3-color'
import {interpolateRgb} from 'd3-interpolate'
import LiquidFillGauge from 'react-liquid-gauge'

@observer
class Layers extends Component {
  componentDidMount = () => {
    RootStore.GeoJSONStore.loadAllSLR()
  }

  // Show/Hide slider
  toggleSlider = () => {
    RootStore.ControlPanelStore.toggleSlider()
  }

  // Switch out map layers based on slider value
  setSliderValue = value => {
    RootStore.EsriMapStore.switchSLRLayer(value)
  }

  checkSubType = e => {
    RootStore.ControlPanelStore.handleSubTypeFilter(e.target.value)
  }

  checkTown = e => {
    RootStore.ControlPanelStore.handleTownFilter(e.target.value)
  }

  setVal = val => {
    RootStore.ControlPanelStore.currentSliderValue = val
  }

  // RENDER THE LAYER ICONS USING 'Layers.css' & SOME MARKUP - REMOVE 'circle' ONCE FINAL IMGs MADE
  render = () => {
    let criticalFacilitiesDescription = (
      <Popover id="critical-facilities" title="Critical Facilities">
        <p>These are the <strong>critical facilities</strong> as identified by
        Barnstable county and municipal representatives.</p> <p>The data and more
        information is available{' '}
          <a
            href="https://gis-cccommission.opendata.arcgis.com/datasets/critical-facilities"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        .
        </p>
      </Popover>
    )

    let noaaCoastalFloodHazardCompositeDescription = (
      <Popover id="coastalFloodHazardComposite" title="NOAA Coastal Flood Hazard Composite">
        <p>The <strong>NOAA Coastal Flood Hazard Composite</strong> datalayer shows the spatial extents of multiple flood hazard data sets combined.</p> <p>The data and more
        information is available{' '}
          <a
            href="https://coast.noaa.gov/data/digitalcoast/pdf/flood-exposure-data.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        .
        </p>
      </Popover>
    )

    let slrDescription = (
      <Popover id="slr" title="Sea Level Rise">
        <p>The datalayer displays sea level intervals relative to mean high water
        representing the Cape Cod Commission's <strong>Sea Level Rise</strong>{' '}
        modeling for Barnstable County.</p> <p>The critical facilities intersecting
        with the sea level at each interval are styled differently to represent
        intersection and potential coastal flooding. </p> <p>More information and the
        data for sea level models is available{' '}
          <a
            href="https://gis-cccommission.opendata.arcgis.com/search?collection=Dataset&q=sea%20level"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        .
        </p>
      </Popover>
    )

    let clearLayerDesc = (
      <Popover id="clr" title="Clear All Layers">
        This button allows the user to remove any toggled layer from the map
      </Popover>
    )

    let critFacFilterPopover = (
      <Popover style = {{transform: 'translate(0px, -30px)'}} id="filterPop" title="Filter by Type or Town">
        <Row>
          <Col xs={6} md={6} lg={6}>
            <strong>Types</strong>
            <FormGroup>
              <Checkbox
                onChange={this.checkSubType}
                value="701"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[0].checked}
              >
                Agriculture, Food &amp; Livestock
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="710"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[1].checked}
              >
                Industry
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="720"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[2].checked}
              >
                Commercial &amp; Retail
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="730"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[3].checked}
              >
                Education
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="740"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[4].checked}
              >
                Emergency Response &amp; Law Enforcement
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="750"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[5].checked}
              >
                Energy
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="790"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[6].checked}
              >
                Building General
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="800"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[7].checked}
              >
                Health &amp; Medical
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="810"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[8].checked}
              >
                Transportation Facilities
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="820"
                checked={RootStore.ControlPanelStore.subTypeFIEArray[9].checked}
              >
                Public Attraction &amp; Landmark Buildings
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="830"
                checked={
                  RootStore.ControlPanelStore.subTypeFIEArray[10].checked
                }
              >
                Government &amp; Military
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="850"
                checked={
                  RootStore.ControlPanelStore.subTypeFIEArray[11].checked
                }
              >
                Water Supply &amp; Treatment
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="880"
                checked={
                  RootStore.ControlPanelStore.subTypeFIEArray[12].checked
                }
              >
                Information &amp; Communication
              </Checkbox>
            </FormGroup>
            <ButtonGroup>
              <Button
                bsStyle="info"
                bsSize="xsmall"
                className={'glyphicon glyphicon-star'}
                onClick={RootStore.ControlPanelStore.selectAllTypes.bind(this)}
              >
                All
              </Button>
              <Button
                bsStyle="info"
                bsSize="xsmall"
                className={'glyphicon glyphicon-star-empty pull-right'}
                onClick={RootStore.ControlPanelStore.selectNoTypes.bind(this)}
              >
                None
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <strong className="text-center">Towns</strong>
            <FormGroup>
              <Checkbox
                onChange={this.checkTown}
                value="Barnstable"
                checked={RootStore.ControlPanelStore.townArray[0].checked}
              >
                Barnstable
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Bourne"
                checked={RootStore.ControlPanelStore.townArray[1].checked}
              >
                Bourne
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Brewster"
                checked={RootStore.ControlPanelStore.townArray[2].checked}
              >
                Brewster
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Chatham"
                checked={RootStore.ControlPanelStore.townArray[3].checked}
              >
                Chatham
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Dennis"
                checked={RootStore.ControlPanelStore.townArray[4].checked}
              >
                Dennis
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Eastham"
                checked={RootStore.ControlPanelStore.townArray[5].checked}
              >
                Eastham
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Falmouth"
                checked={RootStore.ControlPanelStore.townArray[6].checked}
              >
                Falmouth
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Harwich"
                checked={RootStore.ControlPanelStore.townArray[7].checked}
              >
                Harwich
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Mashpee"
                checked={RootStore.ControlPanelStore.townArray[8].checked}
              >
                Mashpee
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Orleans"
                checked={RootStore.ControlPanelStore.townArray[9].checked}
              >
                Orleans
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Provincetown"
                checked={RootStore.ControlPanelStore.townArray[10].checked}
              >
                Provincetown
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Sandwich"
                checked={RootStore.ControlPanelStore.townArray[11].checked}
              >
                Sandwich
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Truro"
                checked={RootStore.ControlPanelStore.townArray[12].checked}
              >
                Truro
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Wellfleet"
                checked={RootStore.ControlPanelStore.townArray[13].checked}
              >
                Wellfleet
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Yarmouth"
                checked={RootStore.ControlPanelStore.townArray[14].checked}
              >
                Yarmouth
              </Checkbox>
            </FormGroup>
            <ButtonGroup>
              <Button
                bsStyle="info"
                bsSize="xsmall"
                className={'glyphicon glyphicon-star'}
                onClick={RootStore.ControlPanelStore.selectAllTowns.bind(this)}
              >
                All
              </Button>
              <Button
                bsStyle="info"
                bsSize="xsmall"
                className={'glyphicon glyphicon-star-empty pull-right'}
                onClick={RootStore.ControlPanelStore.selectNoTowns.bind(this)}
              >
                None
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Popover>
    )

    let critFacImage = (
      <div>
        <Col xs={12} md={12} lg={12}>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={criticalFacilitiesDescription}
          >
            <Button bsSize="xsmall">
              <Glyphicon glyph="glyphicon glyphicon-info-sign" />
            </Button>
          </OverlayTrigger>
          <Col><strong className = {css.layerTitle}>Critical Facilities</strong></Col>
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="right"
            overlay={RootStore.ControlPanelStore.criticalFacilitiesBackground
              ? critFacFilterPopover
              : <Popover style = {{display: 'none'}} id = 'null'></Popover>
            }
            delayHide={10000}
            rootClose
          >
            <Image
              onClick={RootStore.ControlPanelStore.handleCriticalFacilitiesClick.bind(
                this
              )}
              className={
                RootStore.ControlPanelStore.criticalFacilitiesBackground
                  ? css.clickedButton
                  : css.criticalFacilities
              }
              src={require('../img/critical-facilities.png')}
              circle
            />
          </OverlayTrigger>
        </Col>
      </div>
    )

    let noaaCoastalFloodHazardCompositeImage = (
      <div>
        <Col xs={12} md={12} lg={12}>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={noaaCoastalFloodHazardCompositeDescription}
          >
            <Button bsSize="xsmall">
              <Glyphicon glyph="glyphicon glyphicon-info-sign" />
            </Button>
          </OverlayTrigger>
          <Col><strong className = {css.layerTitle}>NOAA Coastal Flood Hazard Composite</strong></Col>
          <Image
            onClick={RootStore.ControlPanelStore.handleSloshClick.bind(
              this
            )}
            className={
              RootStore.ControlPanelStore.sloshBackground
                ? css.clickedButton
                : css.coastalFloodHazardComposite
            }
            src={require('../img/SLOSH.png')}
            circle
          />
        </Col>
      </div>
    )

    let layerDesc = (
      <Popover id="popover">{RootStore.ControlPanelStore.layerDesc}</Popover>
    )

    let slider = (
      <Slider
        style={{
          margin: '1em auto 0',
          marginTop: '2%',
          marginBottom: '15%',
        }}
        onChange={this.setVal}
        value={RootStore.ControlPanelStore.currentSliderValue}
        className={css.slider}
        dots
        marks={RootStore.ControlPanelStore.marks}
        max={6}
        
        onAfterChange={this.setSliderValue}
        railStyle={{backgroundColor: 'grey', height: 2}}
        trackStyle={{
          backgroundColor: RootStore.ControlPanelStore.endColor,
          height: 8,
          marginTop: -2,
        }}
        dotStyle={{borderColor: '#6d7177'}}
        activeDotStyle={{
          backgroundColor: RootStore.ControlPanelStore.endColor,
          borderColor: RootStore.ControlPanelStore.endColor,
        }}
        handleStyle={{
          img: 'src=liquidFillGauge',
          borderColor: 'grey',
          height: 12,
          width: 12,
          marginLeft: -5,
          marginTop: -4,
          backgroundColor: '#0077be',
        }}
      />
    )

    const radius = 40

    const interpolate = interpolateRgb(
      RootStore.ControlPanelStore.startColor,
      RootStore.ControlPanelStore.endColor
    )

    const fillColor = interpolate(
      RootStore.ControlPanelStore.currentLiquidValue / 100
    )

    const gradientStops = [
      {
        key: '0',
        stopColor: color(fillColor)
          .darker(0.5)
          .toString(),
        stopOpacity: 1,
        offset: '0%',
      },
      {
        key: '50',
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: '50%',
      },
      {
        key: '100',
        stopColor: color(fillColor)
          .brighter(0.5)
          .toString(),
        stopOpacity: 0.5,
        offset: '100%',
      },
    ]

    let layerToggles = [
      RootStore.ControlPanelStore.criticalFacilitiesBackground,
      RootStore.ControlPanelStore.sloshBackground,
      RootStore.ControlPanelStore.currentLiquidValue,
      RootStore.ControlPanelStore.currentSliderValue,
    ]

    let removeLayersButton = (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        rootClose
        placement="right"
        overlay={clearLayerDesc}
      >
        <Button
          style={{paddingBottom: '0em', marginTop: '0.4em', marginBottom: '0em', transform: 'translate(-25px, -5px)', visibility: layerToggles.every(i => !i) ? 'hidden' : 'visible'}}
          bsSize="xsmall"
          onClick={RootStore.EsriMapStore.removeToggleableLayers}
        >
          <Glyphicon glyph="glyphicon glyphicon-remove-sign" />
        </Button>
      </OverlayTrigger>
    )

    let liquidFillGauge = (
      <div>
        <Col xs={1} md={1} lg={1} mdOffset={1}>
          <Row>
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="top"
              overlay={slrDescription}
            >
              <Button
                bsSize="xsmall"
              >
                <Glyphicon glyph="glyphicon glyphicon-info-sign" />
              </Button>
            </OverlayTrigger>
          </Row>
        </Col>
        <OverlayTrigger
          trigger={['hover']}
          placement="right"
          overlay={layerDesc}
        >
          <Col style = {{paddingLeft: '0em'}} xs={6} md={6} lg={6}>
            <LiquidFillGauge
              style={{margin: '0 auto 0', backgroundImage: 'url(' + require('../img/SLR.png') + ')', backgroundSize: 'cover'}}
              width={radius * 3}
              height={radius * 3}
              value={RootStore.ControlPanelStore.currentLiquidValue}
              textSize={1}
              textOffsetX={0}
              textOffsetY={1}
              textRenderer={props => {
                const value = RootStore.ControlPanelStore.currentSliderValue
                const radius = Math.min(props.height / 2.5, props.width / 2)
                const ftPixels = (props.textSize * radius) / 2
                const slrPixels = (props.textSize * radius) / 1.75
                const ftStyle = {
                  fontSize: ftPixels,
                  fontFamily: 'sans-serif',
                }
                const slrStyle = {
                  fontSize: slrPixels,
                  fontFamily: 'sans-serif',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }

                return (
                  <tspan>
                    <tspan dy="-0.9em" x="0" style={slrStyle}>
                      Sea
                    </tspan>
                    <tspan dy="1em" x="0" style={slrStyle}>
                      Level
                    </tspan>
                    <tspan dy="1.5em" x="0" style={ftStyle}>
                      {value} ft
                    </tspan>
                  </tspan>
                )
              }}
              riseAnimation
              waveAnimation
              waveFrequency={2}
              waveAmplitude={4}
              gradient
              gradientStops={gradientStops}
              circleStyle={{
                fill: fillColor,
              }}
              waveStyle={{
                fill: fillColor,
                opacity: '1',
              }}
              textStyle={{
                fill: color('#fff').toString(),
                fontFamily: 'Open Sans',
              }}
              waveTextStyle={{
                fill: color('#fff').toString(),
                fontFamily: 'Open Sans',
              }}
            />
          </Col>
        </OverlayTrigger>
      </div>
    )

    return (
      <div className={css.LayersWrapper}>
        <Row style={{marginBottom: '20px'}}>
          <Col md = {8} mdOffset={2}>
            <strong className={css.mapLayerTitle}>MAP LAYERS</strong>
          </Col>
          <Col md = {1}>
            {removeLayersButton}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={12}>{liquidFillGauge}</Col>
        </Row>
        <Row>
          <Col xs={12} md={12} lg={12}>{slider}</Col>
        </Row>
        <Row>
          <Col style = {{marginTop: '5px'}}>{critFacImage}</Col>
        </Row>
        <Row>
          <Col style = {{marginTop: '5px'}}>{noaaCoastalFloodHazardCompositeImage}</Col>
        </Row>
      </div>
    )
  }
}

export default Layers
