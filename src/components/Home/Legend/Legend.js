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
              src="https://cdn3.iconfinder.com/data/icons/home-insurance-2/380/2-512.png"
              circle
            />
          </td>
          <td>
            <p>Critical Facilities</p>
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
              src="https://cdn3.iconfinder.com/data/icons/weather-round-corner-glyph/614/439_-_Flood_Symbol-512.png"
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
          <Table>
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
            {Rootstore.EsriMapStore.sliderToggle ? disConRoadsLegend : null}
            {Rootstore.EsriMapStore.criticalFacilitiesBackground
              ? critFacLegend
              : null}
            {Rootstore.EsriMapStore.sliderToggle ? intersectLegend : null}
            {Rootstore.EsriMapStore.sloshBackground ? sloshLegend : null}
            {Rootstore.EsriMapStore.femaFirmBackground ? femaLegend : null}
          </Table>
        </Col>
      </Row>
    )

    return <div>{legendTable}</div>
  }
}
export default Legend
