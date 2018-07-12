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
  //
  // }

  handleCriticalFacilitiesClick = () => {
    RootStore.EsriMapStore.toggleCriticalFacilities()
    // this.consoleLogToggleCriticalFacilities()
  }

  // consoleLogToggleCriticalFacilities = () => {
  //   console.log('criticalFacilitiesToggle --> ', RootStore.EsriMapStore.criticalFacilitiesToggle)
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
          className={css.Layer2}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Flooded_house_icon.svg"
          responsive
          circle
        />
        <Image
          className={css.Layer3}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Flooded_house_icon.svg"
          responsive
          circle
        />
      </div>
    )
  }
}

export default Layers
