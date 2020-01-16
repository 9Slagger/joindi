import React, { Component } from "react";
import "./CategoriesEvents.css"
import { Row, Col, Divider, Select, Card, Avatar, Icon } from "antd";
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
            <Row type="flex" justify="end" style={{textAlign: 'centers'}}>
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

        <Row gutter={[32, 24]} center="xs">
          <Col  xs={24}  md={12} xl={6}>
            <Card
              style={{
                textAlign: "center",
                width: "250px",
                borderRadius: "10%",
                margin: 'auto'
              }}
            >
              <Avatar shape="square" size={200} />
              <Icon type="book" className="avatarEvents" />
            </Card>
          </Col>

          <Col xs={24}  md={12} xl={6} >
            <Card
              style={{
                textAlign: "center",
                width: "250px",
                borderRadius: "10%",
                margin: 'auto'
              }}
            >
              <Avatar shape="square" size={200} />
              <Icon type="book" className="avatarEvents" />
            </Card>
          </Col>

          <Col xs={24}  md={12} xl={6} >
            <Card
              style={{
                textAlign: "center",
                width: "250px",
                borderRadius: "10%",
                margin: 'auto'
              }}
            >
              <Avatar shape="square" size={200} />
              <Icon type="book" className="avatarEvents" />
            </Card>
          </Col>

          <Col xs={24}  md={12} xl={6}>
            <Card
              style={{
                textAlign: "center",
                width: "250px",
                borderRadius: "10%",
                margin: 'auto'
              }}
            >
              <Avatar shape="square" size={200} />
              <Icon type="book" className="avatarEvents" />
            </Card>
          </Col>

          <Col  xs={24}  md={12} xl={6}>
            <Card
              style={{
                textAlign: "center",
                width: "250px",
                borderRadius: "10%",
                margin: 'auto'
              }}
            >
              <Avatar shape="square" size={200} />
              <Icon type="book" className="avatarEvents" />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
