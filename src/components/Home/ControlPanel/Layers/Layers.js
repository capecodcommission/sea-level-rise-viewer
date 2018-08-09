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
} from 'react-bootstrap'
import {observer} from 'mobx-react'
import Slider from 'rc-slider'

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
        </a>.
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
        </a>.
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
        </a>.
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
        </a>.
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
        dots={true}
        marks={RootStore.EsriMapStore.marks}
      />
    )

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

    return (
      <div className={css.LayersWrapper}>
        <span className={css.LayerMenuTitle}>
          <strong>MAP LAYERS</strong>
        </span>
        {critFacImage}
        {sloshImage}
        {femaImage}
        {RootStore.EsriMapStore.sliderToggle ? slrWithInfo : slrWithoutInfo}
        {RootStore.EsriMapStore.sliderToggle ? slider : <p />}
      </div>
    )
  }
}

export default Layers
