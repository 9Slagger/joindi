import React, { Component } from "react";
import { Row, Col, Avatar, Input, Button } from "antd";
import "./Profile.css";
import { serviceUser } from "../../../../_service";
import { Link } from "react-router-dom";

const { TextArea } = Input;

export default class CompanyProfile extends Component {
  state = {
    detailUser: {}
  };

  componentDidMount = () => {
    this.getUserDetail();
  };

  getUserDetail = async () => {
    try {
      const res = await serviceUser.getUserDetail();
      console.log("res.result", res.result);
      const detailUser = res.result;
      this.setState({ detailUser });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { detailUser } = this.state;
    return (
      <Col className="profile">
        <Row className="Profile" type="flex" justify="center">
          Company Profile
        </Row>
        <Row className="Profile">
          <Col>
            <Row className="Avatar" type="flex" justify="center">
              <Avatar
                size={100}
                icon="shop"
                style={{ color: "#345586" }}
              ></Avatar>
            </Row>
            <Row className="Link" type="flex" justify="center">
              <Link to="/">Change Password</Link>
            </Row>
            <Row type="flex" justify="center">
              <Col span={20}>
                <Row className="UserData" type="flex" justify="center">
                  <Col className="UserData" span={15}>
                    <Row>Company Name :</Row>
                    <Row>
                      <Input value={detailUser.user_company_detail && detailUser.user_company_detail.company_name} />
                    </Row>
                  </Col>
                </Row>
                <Row className="UserData" type="flex" justify="center">
                  <Col className="UserData" span={15}>
                    <Row>Address :</Row>
                    <Row>
                      <TextArea autoSize={{ minRows: 3, maxRows: 6 }} value={detailUser.user_company_detail && detailUser.user_company_detail.company_address} />
                    </Row>
                  </Col>
                </Row>
                <Row className="UserData" type="flex" justify="center">
                  <Col className="UserData" span={15}>
                    <Row>E-mail. :</Row>
                    <Row>
                      <Input value={detailUser && detailUser.email}/>
                    </Row>
                  </Col>
                </Row>
                <Row className="UserData" type="flex" justify="center">
                  <Col className="UserData" span={15}>
                    <Row>Phone Number :</Row>
                    <Row>
                      <Input value={detailUser && detailUser.phone_number}/>
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
