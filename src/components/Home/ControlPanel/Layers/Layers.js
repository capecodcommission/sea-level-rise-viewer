// @flow
// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './Layers.css'
import {Image, Popover, OverlayTrigger} from 'react-bootstrap'
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
    let critFacImage = (
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
    )

    let sloshImage = (
      <Image
        onClick={RootStore.EsriMapStore.handleSloshClick.bind(this)}
        className={
          RootStore.EsriMapStore.sloshBackground ? css.clickedButton : css.slosh
        }
        src="https://cdn.onlinewebfonts.com/svg/img_540212.png"
        responsive
        circle
      />
    )

    let femaImage = (
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

    let overlayWithImage = (
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
    )

    let imageWithoutOverlay = (
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
    )

    return (
      <div className={css.LayersWrapper}>
        <span className={css.LayerMenuTitle}>
          <strong>MAP LAYERS</strong>
        </span>
        {critFacImage}
        {sloshImage}
        {femaImage}
        {RootStore.EsriMapStore.sliderToggle
          ? overlayWithImage
          : imageWithoutOverlay}
        {RootStore.EsriMapStore.sliderToggle ? slider : <p />}
      </div>
    )
  }
}

export default Layers
