// @flow
// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './Layers.css'
import {
  Image,
  Button,
  ButtonToolbar,
  Glyphicon,
  Popover,
  OverlayTrigger,
  FormGroup,
  Checkbox,
  Table,
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

  // RENDER THE LAYER ICONS USING 'Layers.css' & SOME MARKUP - REMOVE 'circle' ONCE FINAL IMGs MADE
  render = () => {
    let criticalFacilitiesDescription = (
      <Popover id="critical-facilities" title="Critical Facilities">
        These are the <strong>critical facilities</strong> as identified by
        Barnstable county and municipal representatives. The data and more
        information is available{' '}
        <a
          href="http://gis-cccommission.opendata.arcgis.com/datasets/critical-facilities"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </Popover>
    )

    let sloshDescription = (
      <Popover id="slosh" title="SLOSH">
        This is the <strong>SLOSH</strong> (Sea, Lake and Overland Surge from
        Hurricane) model visualization for Barnstable County. The data and more
        information is available{' '}
        <a
          href="http://gis-cccommission.opendata.arcgis.com/datasets/sea-lake-and-overland-surge-from-hurricanes-slosh"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </Popover>
    )

    let femaFirmDescription = (
      <Popover id="fema" title="FEMA FIRM">
        This is the <strong>FEMA FIRM</strong> Digital Flood Insurance Rate Maps
        (DFIRM) for Barnstable County. More information and the data is
        available{' '}
        <a
          href="http://gis-cccommission.opendata.arcgis.com/datasets/fema-floodplains"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </Popover>
    )

    let slrDescription = (
      <Popover id="slr" title="Sea Level Rise">
        The datalayer displays sea level intervals relative to mean high water
        representing the Cape Cod Commission's <strong>Sea Level Rise</strong>{' '}
        modeling for Barnstable County. The critical facilities intersecting
        with the sea level at each interval are styled differently to represent
        intersection and potential coastal flooding. More information and the
        data for sea level models is available{' '}
        <a
          href="http://gis-cccommission.opendata.arcgis.com/datasets?q=sea%20level"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </Popover>
    )

    let clearLayerDesc = (
      <Popover id="clr" title="Clear All Layers">
        This button allows the user to remove any toggled layer from the map
      </Popover>
    )

    let critFacFilterPopover = (
      <Popover id="filterPop" title="Filter by Type or Town">
        <Row>
          <Col md={6}>
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
          <Col md={6}>
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
        <Col xs={1} xsOffset={2}>
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
        </Col>
        <Col md={6}>
          <Image
            onClick={RootStore.ControlPanelStore.handleCriticalFacilitiesClick.bind(
              this
            )}
            className={
              RootStore.ControlPanelStore.criticalFacilitiesBackground
                ? css.clickedButton
                : css.criticalFacilities
            }
            src={require('./img/critFac.svg')}
            responsive
            circle
          />
        </Col>
      </div>
    )

    let sloshImage = (
      <div>
        <Col style={{paddingLeft: '0'}} xs={1}>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={sloshDescription}
          >
            <Button bsSize="xsmall">
              <Glyphicon glyph="glyphicon glyphicon-info-sign" />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col style={{paddingRight: '0', paddingLeft: '30px'}} xs={11}>
          <Image
            onClick={RootStore.ControlPanelStore.handleSloshClick.bind(this)}
            className={
              RootStore.ControlPanelStore.sloshBackground
                ? css.clickedButton
                : css.slosh
            }
            src={require('./img/slosh.svg')}
            responsive
            circle
          />
        </Col>
      </div>
    )

    let femaImage = (
      <div>
        <Col style={{paddingLeft: '0'}} xs={1}>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={femaFirmDescription}
          >
            <Button bsSize="xsmall">
              <Glyphicon glyph="glyphicon glyphicon-info-sign" />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col style={{paddingRight: '0', paddingLeft: '30'}} xs={11}>
          <Image
            onClick={RootStore.ControlPanelStore.handleFemaFirmClick.bind(this)}
            className={
              RootStore.ControlPanelStore.femaFirmBackground
                ? css.clickedButton
                : css.femaFirm
            }
            src={require('./img/fema.svg')}
            responsive
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
          marginBottom: '10%',
        }}
        className={css.slider}
        dots
        marks={RootStore.ControlPanelStore.marks}
        min={0}
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

    let slrWithInfo = (
      <div>
        <Col xs={1} xsOffset={2}>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={slrDescription}
          >
            <Button bsSize="xsmall">
              <Glyphicon glyph="glyphicon glyphicon-info-sign" />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col xs={6}>
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="right"
            overlay={layerDesc}
          >
            <Image
              className={css.slrslider}
              src={require('./img/slr.svg')}
              responsive
              circle
            />
          </OverlayTrigger>
        </Col>
      </div>
    )

    let removeLayersButton = (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        rootClose
        placement="right"
        overlay={clearLayerDesc}
      >
        <Button
          style={{paddingBottom: '0', marginBottom: '0'}}
          className="pull-right"
          bsSize="xsmall"
          onClick={RootStore.EsriMapStore.removeToggleableLayers}
        >
          <Glyphicon glyph="glyphicon glyphicon-remove-sign" />
        </Button>
      </OverlayTrigger>
    )

    let critFacFiltersButton = (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="right"
        overlay={critFacFilterPopover}
      >
        <Button bsSize="xsmall">
          <Glyphicon glyph="glyphicon glyphicon-filter" />
        </Button>
      </OverlayTrigger>
    )

    let layerToggles = [
      RootStore.ControlPanelStore.criticalFacilitiesBackground,
      RootStore.ControlPanelStore.femaFirmBackground,
      RootStore.ControlPanelStore.sloshBackground,
    ]

    let liquidFillGauge = (
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={slrDescription}
        >
          <Button bsSize="xsmall">
            <Glyphicon glyph="glyphicon glyphicon-info-sign" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="right"
          overlay={layerDesc}
        >
          <LiquidFillGauge
            style={{margin: '0 auto 0'}}
            width={radius * 2}
            height={radius * 2}
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
        </OverlayTrigger>
      </ButtonToolbar>
    )

    return (
      <div className={css.LayersWrapper}>
        <Row>
          <Col>
            <Table style={{marginBottom: '0'}}>
              <thead>
                <tr>
                  <th className={css.noBottomBorder}>
                    <div style={{textAlign: 'center'}}>
                      <strong className={css.mapLayerTitle}>MAP LAYERS</strong>
                      {layerToggles.every(i => !i) ? null : removeLayersButton}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={css.noTopBorder}>
                    <Row>
                      <Col md={12} style={{width: '100%', height: 'auto'}}>
                        {liquidFillGauge}
                        {slider}
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td className={css.noTopBorder}>
                    <Row>
                      <Col md={12}>
                        {critFacImage}
                        {RootStore.ControlPanelStore
                          .criticalFacilitiesBackground
                          ? critFacFiltersButton
                          : null}
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td className={css.noTopBorder}>
                    <Row>
                      <Col xs={6}>{sloshImage}</Col>
                      <Col xs={6}>{femaImage}</Col>
                    </Row>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Layers
