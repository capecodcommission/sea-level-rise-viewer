// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './Layers.css'
import {Image} from 'react-bootstrap'

// @observer
class Layers extends Component {
  // constructor(props) {
  //   super(props)
  // }

  // componentDidMount = () => {
  //   this.consoleLogSlosh()
  // }

  handleCriticalFacilitiesClick = () => {
    RootStore.EsriMapStore.toggleCriticalFacilities()
  }

  handleSloshClick = () => {
    RootStore.EsriMapStore.toggleSlosh()
  }

  handleFemaFirmClick = () => {
    RootStore.EsriMapStore.toggleFemaFirm()
  }

  // consoleLogSlosh = () => {
  //   console.log('slosh --> ', RootStore.EsriMapStore.slosh)
  // }

  // RENDER THE BASEMAP SWITCHER USING THE 'BaseMapSwitcher.css' & SOME MARKUP
  render = () => {
    return (
      <div className={css.LayersWrapper}>
        <span className={css.LayerMenuTitle}>
          <strong>MAP LAYERS</strong>
        </span>
        <Image
          onClick={this.handleCriticalFacilitiesClick.bind(this)}
          className={css.Layer1}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Flooded_house_icon.svg"
          responsive
          circle
        />
        <Image
          onClick={this.handleSloshClick.bind(this)}
          className={css.Layer2}
          src="https://cdn.onlinewebfonts.com/svg/img_540212.png"
          responsive
          circle
        />
        <Image
          onClick={this.handleFemaFirmClick.bind(this)}
          className={css.Layer3}
          src="http://public.gmmb.com/fs//images/icons/IconWarning.svg"
          responsive
          circle
        />
      </div>
    )
  }
}

export default Layers
