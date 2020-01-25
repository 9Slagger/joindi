import React, { Component } from  "react";
import { Layout, Icon, Row, Col } from  "antd";
import "../css/SiderAdmin.css";
import { Link } from  "react-router-dom";

const { Sider } = Layout;

export class SiderAdmin extends Component {
  render() {
    return (
      <div>
        <Sider className="siderAdmin">
          <Col>
            <Row>
            <Link to="/approveevent">
              <br />
              <Icon
                type="project"
                style={{ fontSize: "60px", color: "#345586" }}
              />
              <br />
              <span>Event</span>
              </Link>
            </Row>
            <Row>
            <Link to="/">
              <br />
              <Icon
                type="user"
                style={{ fontSize: "60px", color: "#345586" }}
              />
              <br />
              <span>User</span>
            </Link>
            </Row>
            <Row>
            <Link to="/approvepayment">
              <br />
              <Icon
                type="wallet"
                style={{ fontSize: "60px", color: "#345586" }}
              />
              <br />
              <span>Payment</span>
              </Link>
            </Row>
            <Row>
              <Link to="/managetag">
                <br />
                <Icon
                  type="tags"
                  style={{ fontSize: "60px", color: "#345586" }}
                />
                <br />
                <span>Tag</span>
              </Link>
            </Row>
            <Row style={{ height: "100px" }}>&nbsp;</Row>
          </Col>
        </Sider>
      </div>
    );
  }
}

export default SiderAdmin;
