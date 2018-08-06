// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import RootStore from '../../../../store'
import css from './LayerDesc.css'
import {observer} from 'mobx-react'

@observer
class LayerDesc extends Component {
  constructor(props, context) {
    super(props, context)
  }

  // Render HTML from state based on slider value
  render = () => {
    return (
      <div className={css.layerDescWrapper}>
        {RootStore.EsriMapStore.layerDescShow
          ? RootStore.EsriMapStore.layerDesc
          : null}
      </div>
    )
  }
}

export default LayerDesc
