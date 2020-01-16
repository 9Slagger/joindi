import React, { Component } from 'react'
import "./CategoriesPopularEvents.css"
import { Row, Col, Divider} from "antd";

export default class CategoriesPopularEvents extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={20}>
            <h3>Popular Events</h3>
          </Col>

          <Divider />
        </Row>
      </div>
    )
  }
}
