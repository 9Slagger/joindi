import React, { Component } from "react";
import { Row, Col, Icon, Menu, Dropdown, Button } from "antd";
import "../css/HeaderAdmin.css";

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="logout" />
      Logout
    </Menu.Item>
  </Menu>
);

export class HeaderAdmin extends Component {
  render() {
    return (
      <Row className="headerBox" type="flex" align="middle">
        <Col span={4}>
          <img
            src="https://i.ibb.co/28WfkY9/join-DI-logo1.png"
            alt="join-DI-logo1"
            style={{ height: "50px", width: "auto" }}
          />
        </Col>
        <Col span={4} className="headerLogo">
          <span>Management</span>
        </Col>
        <Col span={13}></Col>
        <Col span={3}>
          <Row type="flex" justify="end" align="middle">
            <Dropdown
              overlay={menu}
              // onVisibleChange={this.handleVisibleChange}
              // visible={this.state.visible}
              size="large"
            >
              <p className="ant-dropdown-link" href="#">
                Admin <Icon type="down" />
              </p>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default HeaderAdmin;
