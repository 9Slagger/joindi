import React, { Component } from "react";
import { Layout, Icon, Row, Col, Menu } from "antd";
import "../css/SiderUser.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export class SiderUser extends Component {
  render() {
    return (
      <Sider className="siderUser">
        <Menu mode="inline" size="large">
          <Menu.Item key="1">
            <Link to="/userprofile">
              <span>
                <Icon type="user" />
                <span> Profile</span>
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/myorder">
              <span>
                <Icon type="credit-card" />
                <span> My Order</span>
              </span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="calendar" />
                <span> My Activity</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/myevent">My Events</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/joinevent">Join Events</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Link to="/bookmark">
              <span>
                <Icon type="book" />
                <span> Bookmark</span>
              </span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderUser;
