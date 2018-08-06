// @flow
// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './Layers.css'
import {Image} from 'react-bootstrap'

class Layers extends Component {
  // RENDER THE LAYER ICONS USING 'Layers.css' & SOME MARKUP - REMOVE 'circle' ONCE FINAL IMGs MADE
  render = () => {
    return (
      <div className={css.LayersWrapper}>
        <span className={css.LayerMenuTitle}>
          <strong>MAP LAYERS</strong>
        </span>
        <Image
          className={
            RootStore.EsriMapStore.criticalFacilitiesBackground
              ? css.clickedButton
              : css.criticalFacilities
          }
          onClick={RootStore.EsriMapStore.handleCriticalFacilitiesClick.bind(
            this
          )}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Flooded_house_icon.svg"
          responsive
          circle
        />
        <Image
          className={
            RootStore.EsriMapStore.sloshBackground
              ? css.clickedButton
              : css.slosh
          }
          onClick={RootStore.EsriMapStore.handleSloshClick.bind(this)}
          src="https://cdn.onlinewebfonts.com/svg/img_540212.png"
          responsive
          circle
        />
        <Image
          className={
            RootStore.EsriMapStore.femaFirmBackground
              ? css.clickedButton
              : css.femaFirm
          }
          onClick={RootStore.EsriMapStore.handleFemaFirmClick.bind(this)}
          src="http://public.gmmb.com/fs//images/icons/IconWarning.svg"
          responsive
          circle
        />
      </div>
    )
  }
}

export default Layers
