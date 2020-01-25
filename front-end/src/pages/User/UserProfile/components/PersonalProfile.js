import React, { Component } from "react";
import { Row, Col, Avatar, Input, Button } from "antd";
import "./Profile.css";
import { Link } from "react-router-dom";

export default class PersonalProfile extends Component {
  render() {
    return (
      <Col className="profile">
        <Row className="Profile" type="flex" justify="center">
          My Profile
        </Row>
        <Row className="Profile">
          <Col>
            <Row className="Avatar" type="flex" justify="center">
              <Avatar
                size={100}
                icon="user"
                style={{ color: "#345586" }}
              ></Avatar>
            </Row>
            <Row className="Link" type="flex" justify="center">
              <Link to="/">Change Password</Link>
            </Row>
            <Row type="flex" justify="center">
              <Col span={20}>
                <Row className="UserData" type="flex" justify="center">
                  <Col className="UserData" span={10}>
                    <Row>Firstname :</Row>
                    <Row>
                      <Input></Input>
                    </Row>
                  </Col>
                  <Col className="UserData" span={10}>
                    <Row>Lastname :</Row>
                    <Row>
                      <Input></Input>
                    </Row>
                  </Col>
                </Row>
                <Row
                  className="UserData"
                  type="flex"
                  justify="left"
                  style={{ paddingLeft: "75px" }}
                >
                  <Col className="UserData">
                    <Row>Birthday (Day/Month/Year) :</Row>
                    <Row>
                      <Col className="InputData" span={7}>
                        <Input></Input>
                      </Col>
                      <Col className="InputData" span={7}>
                        <Input></Input>
                      </Col>
                      <Col className="InputData" span={7}>
                        <Input></Input>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  className="UserData"
                  type="flex"
                  justify="left"
                  style={{ paddingLeft: "75px" }}
                >
                  <Col className="UserData">
                    <Row>Mobile No. :</Row>
                    <Row>
                      <Input></Input>
                    </Row>
                  </Col>
                  <Col className="UserData">
                    <Row>E-mail :</Row>
                    <Row>
                      <Input></Input>
                    </Row>
                  </Col>
                </Row>

                <Row
                  className="UserData"
                  type="flex"
                  justify="center"
                  style={{ paddingTop: "40px" }}
                >
                  <Col style={{ padding: "10px" }}>
                    <Button type="danger" style={{ width: "200px" }}>
                      Cancle
                    </Button>
                  </Col>
                  <Col style={{ padding: "10px" }}>
                    <Button type="primary" style={{ width: "200px" }}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}
