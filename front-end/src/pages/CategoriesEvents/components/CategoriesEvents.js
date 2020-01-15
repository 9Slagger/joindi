import React, { Component } from "react";
import { Row, Col, Divider, Select, Card } from "antd";
const { Option } = Select;

export default class CategoriesEvents extends Component {
  handleChange = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };
  render() {
    return (
      <div>
        <Row>
          <Col span={20}>
            <h3>Events</h3>
          </Col>
          <Col span={4}>
            <Row type="flex" justify="end">
              <Select
                labelInValue
                defaultValue={{ key: "Sort By" }}
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                <Option value="time">Upcoming</Option>
                <Option value="popular">Popular</Option>
              </Select>
            </Row>
          </Col>

          <Divider />
        </Row>

        <Row >
          <Col span={6}>
            <Card title="Card title" style={{ width: 250 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>

          <Col span={6}>
            <Card title="Card title" style={{ width: 250 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>

          <Col span={6}>
            <Card title="Card title" style={{ width: 250 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>

          <Col span={6}>
            <Card title="Card title" style={{ width: 250 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
