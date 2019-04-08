// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import css from './Legend.css'
import RootStore from '../../../store'

@observer
class Legend extends Component {
  render = () => {

    let seaLevelRise = (
      <div id = 'sea-level-rise' title='Sea Level Rise'
        className = 
          {
            RootStore.GeoJSONStore.currentSLRLayer
              ? css.seaLevelRise
              : css.seaLevelRiseOff
          }
      />
    )

    let lowLyingAreas = (
      <div id = 'low-lying-areas' title='Low Lying Areas'
        className = 
          {
            RootStore.GeoJSONStore.currentSLRLayer
              ? css.lowLyingAreas
              : css.lowLyingAreasOff
          }
      />
    )

    let criticalFacilities = (
      <div id = 'critical-facilities' title='Critical Facilities'
        className = 
          {
            RootStore.ControlPanelStore.criticalFacilitiesBackground
              ? css.criticalFacilities
              : css.criticalFacilitiesOff
          }
      />
    )

    let criticalFacilitiesAffected = (
      <div id = 'critical-facilities-affected' title='Affected Critical Facilities'
        className = 
          {
            RootStore.ControlPanelStore.currentSliderValue > 0
              ? css.criticalFacilitiesAffected
              : css.criticalFacilitiesAffectedOff
          }
      />
    )

    let disconnectedRoads = (
      <div id = 'disconnected-roads' title='Disconnected Roads'
        className = 
          {
            RootStore.ControlPanelStore.currentSliderValue > 0
              ? css.disconnectedRoads
              : css.disconnectedRoadsOff
          }
      />
    )

    let noaaCoastalFloodHazardComposite = (
      <div id = 'noaa-coastal-flood-hazard-composite' title='NOAA Coastal Flood Hazard Composite'
        className = 
          {
            RootStore.ControlPanelStore.sloshBackground
              ? css.noaaCoastalFloodHazardComposite
              : css.noaaCoastalFloodHazardCompositeOff
          }
      />
    )

    let Legend = (
      <div id = 'legend'
        className = 
          {
            RootStore.ControlPanelStore.panelButtonOpenness &&
            RootStore.EsriMapStore.loadingComplete
              ? css.gridContainerOpen
              : css.gridContainerClosed
          }
      >
        {seaLevelRise}
        {lowLyingAreas}
        {disconnectedRoads}
        {noaaCoastalFloodHazardComposite}
        {criticalFacilities}
        {criticalFacilitiesAffected}
      </div>
    )
    return (
      Legend
    )
  }
}

export default Legend
