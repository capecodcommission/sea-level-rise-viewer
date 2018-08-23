// IMPORT DEPENDENCIES
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Row, Col} from 'react-bootstrap'
import css from './Legend.css'
import Rootstore from '../../../store'
import {Image, Table} from 'react-bootstrap'

@observer
class Legend extends Component {
  // Render all control panel sub-components in Bootstrap grid
  render = () => {
    let townLinesLegend = (
      <tbody>
        <tr>
          <td>
            <div
              style={{backgroundColor: '#7e8b9e'}}
              className={css.colorBar}
            />
          </td>
          <td>
            <p>Town Lines</p>
          </td>
        </tr>
      </tbody>
    )

    let disConRoadsLegend = (
      <tbody>
        <tr>
          <td>
            <div style={{backgroundColor: 'red'}} className={css.colorBar} />
          </td>
          <td>
            <p>Disconnected Roads</p>
          </td>
        </tr>
      </tbody>
    )

    let critFacLegend = (
      <tbody>
        <tr>
          <td>
            <Image
              className={css.point}
              src={require('../ControlPanel/Layers/img/critFac.svg')}
              circle
            />
          </td>
          <td>
            <p>Critical Facilities</p>
          </td>
        </tr>
        <tr>
          <td>
            <div className={[css.cluster, css.digits].join(' ')} />
          </td>
          <td>
            <p>Clusters</p>
          </td>
        </tr>
      </tbody>
    )

    let sloshLegend = (
      <tbody>
        <tr>
          <td>
            <div
              style={{backgroundColor: '#fabee9'}}
              className={css.colorBar}
            />
          </td>
          <td>
            <p>Category 1</p>
          </td>
        </tr>
        <tr>
          <td>
            <div
              style={{backgroundColor: '#f500c7'}}
              className={css.colorBar}
            />
          </td>
          <td>
            <p>Category 2</p>
          </td>
        </tr>
        <tr>
          <td>
            <div
              style={{backgroundColor: '#a10085'}}
              className={css.colorBar}
            />
          </td>
          <td>
            <p>Category 3</p>
          </td>
        </tr>
        <tr>
          <td>
            <div
              style={{backgroundColor: '#be07ff'}}
              className={css.colorBar}
            />
          </td>
          <td>
            <p>Category 4</p>
          </td>
        </tr>
      </tbody>
    )

    let femaLegend = (
      <tbody>
        <tr>
          <td>
            <div
              style={{backgroundColor: '#f1a800'}}
              className={css.colorBar}
            />
          </td>
          <td>
            <p>Special Flood Hazard Areas</p>
          </td>
        </tr>
        <tr>
          <td>
            <div
              style={{backgroundColor: '#d20000'}}
              className={css.colorBar}
            />
          </td>
          <td>
            <p>Coastal High Hazard Areas</p>
          </td>
        </tr>
      </tbody>
    )

    let intersectLegend = (
      <tbody>
        <tr>
          <td>
            <Image
              className={css.point}
              src={require('../ControlPanel/Layers/img/slr.svg')}
            />
          </td>
          <td>
            <p>Affected Critical Facilities</p>
          </td>
        </tr>
      </tbody>
    )

    let legendTable = (
      <Row className={css.LegendWrapper}>
        <Col>
          <Table
            className={css.fitWidth}
            style={{tableLayout: 'fixed', overflowX: 'hidden'}}
          >
            <caption style={{color: 'white', textAlign: 'center'}}>
              <b>Legend</b>
            </caption>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Description</th>
              </tr>
            </thead>
            {townLinesLegend}
            {Rootstore.ControlPanelStore.sliderToggle
              ? disConRoadsLegend
              : null}
            {Rootstore.ControlPanelStore.criticalFacilitiesBackground
              ? critFacLegend
              : null}
            {Rootstore.ControlPanelStore.sliderToggle ? intersectLegend : null}
            {Rootstore.ControlPanelStore.sloshBackground ? sloshLegend : null}
            {Rootstore.ControlPanelStore.femaFirmBackground ? femaLegend : null}
          </Table>
        </Col>
      </Row>
    )

    return <div>{legendTable}</div>
  }
}
export default Legend
