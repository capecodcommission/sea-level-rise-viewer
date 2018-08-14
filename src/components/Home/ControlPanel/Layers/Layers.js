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
  Col,
  Row,
} from 'react-bootstrap'
import {observer} from 'mobx-react'
import Slider from 'rc-slider'
import {color} from 'd3-color'
import {interpolateRgb} from 'd3-interpolate'
import LiquidFillGauge from 'react-liquid-gauge'

@observer
class Layers extends Component {
  componentDidMount = () => {
    RootStore.EsriMapStore.loadAllSLR()
  }

  // Show/Hide slider
  toggleSlider = () => {
    RootStore.EsriMapStore.toggleSlider()
  }

  // Switch out map layers based on slider value
  setSliderValue = value => {
    RootStore.EsriMapStore.switchSLRLayer(value)
  }

  checkSubType = e => {
    RootStore.EsriMapStore.handleSubTypeFilter(e.target.value)
  }

  checkTown = e => {
    RootStore.EsriMapStore.handleTownFilter(e.target.value)
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
        The datalayer displayed at sea level intervals represents the Cape Cod
        Commission's <strong>Sea Level Rise</strong> modeling for Barnstable
        County. The critical facilities intersecting with the sea level at each
        interval are styled differently to represent intersection and potential
        coastal flooding. More information and the data for sea level models is
        available{' '}
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
            <FormGroup>
              <Checkbox
                onChange={this.checkSubType}
                value="701"
                checked={RootStore.EsriMapStore.subTypeFIEArray[0].checked}
              >
                Agriculture, Food &amp; Livestock
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="710"
                checked={RootStore.EsriMapStore.subTypeFIEArray[1].checked}
              >
                Industry
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="720"
                checked={RootStore.EsriMapStore.subTypeFIEArray[2].checked}
              >
                Commercial &amp; Retail
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="730"
                checked={RootStore.EsriMapStore.subTypeFIEArray[3].checked}
              >
                Education
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="740"
                checked={RootStore.EsriMapStore.subTypeFIEArray[4].checked}
              >
                Emergency Response &amp; Law Enforcement
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="750"
                checked={RootStore.EsriMapStore.subTypeFIEArray[5].checked}
              >
                Energy
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="790"
                checked={RootStore.EsriMapStore.subTypeFIEArray[6].checked}
              >
                Building General
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="800"
                checked={RootStore.EsriMapStore.subTypeFIEArray[7].checked}
              >
                Health &amp; Medical
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="810"
                checked={RootStore.EsriMapStore.subTypeFIEArray[8].checked}
              >
                Transportation Facilities
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="820"
                checked={RootStore.EsriMapStore.subTypeFIEArray[9].checked}
              >
                Public Attraction &amp; Landmark Buildings
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="830"
                checked={RootStore.EsriMapStore.subTypeFIEArray[10].checked}
              >
                Government &amp; Military
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="850"
                checked={RootStore.EsriMapStore.subTypeFIEArray[11].checked}
              >
                Water Supply &amp; Treatment
              </Checkbox>
              <Checkbox
                onChange={this.checkSubType}
                value="880"
                checked={RootStore.EsriMapStore.subTypeFIEArray[12].checked}
              >
                Information &amp; Communication
              </Checkbox>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Checkbox
                onChange={this.checkTown}
                value="Barnstable"
                checked={RootStore.EsriMapStore.townArray[0].checked}
              >
                Barnstable
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Bourne"
                checked={RootStore.EsriMapStore.townArray[1].checked}
              >
                Bourne
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Brewster"
                checked={RootStore.EsriMapStore.townArray[2].checked}
              >
                Brewster
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Chatham"
                checked={RootStore.EsriMapStore.townArray[3].checked}
              >
                Chatham
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Dennis"
                checked={RootStore.EsriMapStore.townArray[4].checked}
              >
                Dennis
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Eastham"
                checked={RootStore.EsriMapStore.townArray[5].checked}
              >
                Eastham
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Falmouth"
                checked={RootStore.EsriMapStore.townArray[6].checked}
              >
                Falmouth
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Harwich"
                checked={RootStore.EsriMapStore.townArray[7].checked}
              >
                Harwich
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Mashpee"
                checked={RootStore.EsriMapStore.townArray[8].checked}
              >
                Mashpee
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Orleans"
                checked={RootStore.EsriMapStore.townArray[9].checked}
              >
                Orleans
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Provincetown"
                checked={RootStore.EsriMapStore.townArray[10].checked}
              >
                Provincetown
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Sandwich"
                checked={RootStore.EsriMapStore.townArray[11].checked}
              >
                Sandwich
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Truro"
                checked={RootStore.EsriMapStore.townArray[12].checked}
              >
                Truro
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Wellfleet"
                checked={RootStore.EsriMapStore.townArray[13].checked}
              >
                Wellfleet
              </Checkbox>
              <Checkbox
                onChange={this.checkTown}
                value="Yarmouth"
                checked={RootStore.EsriMapStore.townArray[14].checked}
              >
                Yarmouth
              </Checkbox>
            </FormGroup>
          </Col>
        </Row>
        <Button
          bsStyle="info"
          bsSize="small"
          className={'glyphicon glyphicon-star'}
          onClick={RootStore.EsriMapStore.selectAll.bind(this)}
        >
          Select All
        </Button>
        <Button
          bsStyle="info"
          bsSize="small"
          className={'glyphicon glyphicon-star-empty pull-right'}
          onClick={RootStore.EsriMapStore.selectNone.bind(this)}
        >
          Select None
        </Button>
      </Popover>
    )

    let critFacImage = (
      <ButtonToolbar className={css.buttonToolbarWrapper}>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={criticalFacilitiesDescription}
        >
          <Button bsSize="xsmall" className={css.buttonPosition}>
            <Glyphicon glyph="glyphicon glyphicon-info-sign" />
          </Button>
        </OverlayTrigger>
        <Image
          onClick={RootStore.EsriMapStore.handleCriticalFacilitiesClick.bind(
            this
          )}
          className={
            RootStore.EsriMapStore.criticalFacilitiesBackground
              ? css.clickedButton
              : css.criticalFacilities
          }
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Flooded_house_icon.svg"
          responsive
          circle
        />
      </ButtonToolbar>
    )

    let sloshImage = (
      <ButtonToolbar className={css.buttonToolbarWrapper}>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={sloshDescription}
        >
          <Button bsSize="xsmall" className={css.buttonPosition}>
            <Glyphicon glyph="glyphicon glyphicon-info-sign" />
          </Button>
        </OverlayTrigger>
        <Image
          onClick={RootStore.EsriMapStore.handleSloshClick.bind(this)}
          className={
            RootStore.EsriMapStore.sloshBackground
              ? css.clickedButton
              : css.slosh
          }
          src="https://cdn.onlinewebfonts.com/svg/img_540212.png"
          responsive
          circle
        />
      </ButtonToolbar>
    )

    let femaImage = (
      <ButtonToolbar className={css.buttonToolbarWrapper}>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={femaFirmDescription}
        >
          <Button bsSize="xsmall" className={css.buttonPosition}>
            <Glyphicon glyph="glyphicon glyphicon-info-sign" />
          </Button>
        </OverlayTrigger>
        <Image
          onClick={RootStore.EsriMapStore.handleFemaFirmClick.bind(this)}
          className={
            RootStore.EsriMapStore.femaFirmBackground
              ? css.clickedButton
              : css.femaFirm
          }
          src="http://public.gmmb.com/fs//images/icons/IconWarning.svg"
          responsive
          circle
        />
      </ButtonToolbar>
    )

    let layerDesc = (
      <Popover id="popover">{RootStore.EsriMapStore.layerDesc}</Popover>
    )

    let slider = (
      <Slider
        className={css.slider}
        min={0}
        max={6}
        onAfterChange={this.setSliderValue}
        railStyle={{backgroundColor: 'grey', height: 2}}
        trackStyle={{
          backgroundColor: RootStore.EsriMapStore.endColor,
          height: 8,
          marginTop: -2,
        }}
        dotStyle={{borderColor: 'grey'}}
        activeDotStyle={{
          backgroundColor: RootStore.EsriMapStore.endColor,
          borderColor: RootStore.EsriMapStore.endColor,
        }}
        handleStyle={{
          img: 'src=liquidFillGauge',
          borderColor: 'grey',
          height: 20,
          width: 20,
          marginLeft: -5,
          marginTop: -7,
          backgroundColor: '#0077be',
        }}
        // handle={liquidFillGauge} NEED TO MAKE A f(x) RE: https://react-component.github.io/slider/examples/handle.html
      />
    )

    const radius = 30

    const interpolate = interpolateRgb(
      RootStore.EsriMapStore.startColor,
      RootStore.EsriMapStore.endColor
    )

    const fillColor = interpolate(
      RootStore.EsriMapStore.currentLiquidValue / 100
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
      <ButtonToolbar className={css.buttonToolbarWrapper}>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={slrDescription}
        >
          <Button bsSize="xsmall" className={css.buttonPosition}>
            <Glyphicon glyph="glyphicon glyphicon-info-sign" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="right"
          overlay={layerDesc}
        >
          <Image
            onClick={this.toggleSlider}
            className={
              RootStore.EsriMapStore.sliderToggle
                ? css.clickedButton
                : css.slrslider
            }
            src="https://1motal1rjacba143y34bvqcn-wpengine.netdna-ssl.com/industrial-manufacturing/wp-content/uploads/sites/72/2016/08/Food_Icons_Frame7a_3Circles.png"
            responsive
            circle
          />
        </OverlayTrigger>
      </ButtonToolbar>
    )

    let slrWithoutInfo = (
      <ButtonToolbar className={css.buttonToolbarWrapper}>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={slrDescription}
        >
          <Button bsSize="xsmall" className={css.buttonPosition}>
            <Glyphicon glyph="glyphicon glyphicon-info-sign" />
          </Button>
        </OverlayTrigger>
        <Image
          onClick={this.toggleSlider}
          className={
            RootStore.EsriMapStore.sliderToggle
              ? css.clickedButton
              : css.slrslider
          }
          src="https://1motal1rjacba143y34bvqcn-wpengine.netdna-ssl.com/industrial-manufacturing/wp-content/uploads/sites/72/2016/08/Food_Icons_Frame7a_3Circles.png"
          responsive
          circle
        />
      </ButtonToolbar>
    )

    let removeLayersButton = (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        rootClose
        placement="right"
        overlay={clearLayerDesc}
      >
        <Button
          bsStyle="primary"
          bsSize="small"
          className={'glyphicon glyphicon-remove-sign pull-right'}
          onClick={RootStore.EsriMapStore.removeToggleableLayers}
        />
      </OverlayTrigger>
    )

    let critFacFiltersButton = (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="right"
        overlay={critFacFilterPopover}
      >
        <Button
          bsStyle="success"
          bsSize="small"
          className={'glyphicon glyphicon-filter'}
        />
      </OverlayTrigger>
    )

    let layerToggles = [
      RootStore.EsriMapStore.criticalFacilitiesBackground,
      RootStore.EsriMapStore.femaFirmBackground,
      RootStore.EsriMapStore.sloshBackground,
      RootStore.EsriMapStore.sliderToggle,
    ]

    let liquidFillGauge = (
      <LiquidFillGauge
        style={{
          margin: '2.75em auto 0',
        }}
        width={radius * 2}
        height={radius * 2}
        value={RootStore.EsriMapStore.currentLiquidValue}
        textSize={1}
        textOffsetX={0}
        textOffsetY={10}
        textRenderer={props => {
          const value = RootStore.EsriMapStore.currentSliderValue
          const radius = Math.min(props.height / 2.5, props.width / 2)
          const textPixels = (props.textSize * radius) / 1.5
          const valueStyle = {
            fontSize: textPixels,
          }

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>
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
    )

    return (
      <div className={css.LayersWrapper}>
        <span className="text-center">
          <span className={css.LayerMenuTitle}>
            <strong>MAP LAYERS</strong>
          </span>
          {layerToggles.every(i => !i) ? null : removeLayersButton}
        </span>
        <span>
          {critFacImage}
          {RootStore.EsriMapStore.criticalFacilitiesBackground
            ? critFacFiltersButton
            : null}
        </span>
        {sloshImage}
        {femaImage}
        {RootStore.EsriMapStore.sliderToggle ? slrWithInfo : slrWithoutInfo}
        {RootStore.EsriMapStore.sliderToggle ? slider : <p />}
        {RootStore.EsriMapStore.sliderToggle ? liquidFillGauge : <p />}
      </div>
    )
  }
}

export default Layers
