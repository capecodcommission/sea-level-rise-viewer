// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './SLRSlider.css'
import {observer} from 'mobx-react'
import Slider from 'rc-slider'
import {Image} from 'react-bootstrap'

@observer
class SLRSlider extends Component {
  constructor(props, context) {
    super(props, context)
  }

  // Show/Hide slider
  toggleSlider = () => {
    RootStore.EsriMapStore.toggleSlider()
  }

  // Switch out map layers based on slider value
  setSliderValue = value => {
    RootStore.EsriMapStore.switchSLRLayer(value)
  }

  // Load all SLR-geojson layers on creation of component
  componentDidMount = () => {
    RootStore.EsriMapStore.loadAllSLR()
  }

  // Render button always, slider based on boolean state property
  render = () => {
    let slider = (
      <Slider
        min={0}
        max={6}
        onAfterChange={this.setSliderValue}
        dots={true}
        marks={RootStore.EsriMapStore.marks}
      />
    )

    return (
      <div className={css.slideWrapper}>
        <Image
          onClick={this.toggleSlider}
          className={css.Layer1}
          src="https://1motal1rjacba143y34bvqcn-wpengine.netdna-ssl.com/industrial-manufacturing/wp-content/uploads/sites/72/2016/08/Food_Icons_Frame7a_3Circles.png"
          responsive
          circle
        />
        {RootStore.EsriMapStore.sliderToggle ? slider : null}
      </div>
    )
  }
}

export default SLRSlider
