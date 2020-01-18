import React, { Component } from "react";
import { Row, Col, Icon, Menu, Dropdown } from "antd";
import "../css/HeaderAdmin.css";
import { connect } from "react-redux";
import { signout } from "../redux/actions";
import Login from "./Login";
import Signup from "./Signup";

export class HeaderAdmin extends Component {
  handleClickLogout = () => {
    this.props.signout();
  };
  render() {
    const { Authentication } = this.props;
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
            {Authentication.item && Authentication.item.isAuthenticated ? (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1" onClick={this.handleClickLogout}>
                      <Icon type="logout" />
                      Logout
                    </Menu.Item>
                  </Menu>
                }
                size="large"
              >
                <p className="ant-dropdown-link" href="#">
                  Admin <Icon type="down" />
                </p>
              </Dropdown>
            ) : (
              <>
                <Login />
                <Signup />
              </>
            )}
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ Authentication }) => ({
  Authentication
});

const mapDispatchToProps = { signout };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
