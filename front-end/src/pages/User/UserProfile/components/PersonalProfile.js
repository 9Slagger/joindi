import React, { Component } from "react";
import {
  Row,
  Col,
  Avatar,
  Input,
  Button,
  DatePicker,
  Modal,
  Form,
  Icon
} from "antd";
import "./Profile.css";
import { serviceUser } from "../../../../_service";
import { Link } from "react-router-dom";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";

class PersonalProfile extends Component {
  state = {
    detailUser: {},
    visible: false
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

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { detailUser } = this.state;
    const { getFieldDecorator } = this.props.form;
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
              <Link onClick={this.showModal}>Change Password</Link>
              <Modal
                title="Change Password"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
              >
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                      {getFieldDecorator("old_password", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your old password"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Old password"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("new_password", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your new password"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="password"
                          placeholder="New Password"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("confirm_new_password", {
                        rules: [
                          {
                            required: true,
                            message: "Please input confirm new password"
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="password"
                          placeholder="Confirm New Password"
                        />
                      )}
                    </Form.Item>

                    <Form.Item>
                      <Row type="flex" justify="center">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Change Password
                        </Button>
                      </Row>
                    </Form.Item>
                  </Form>
                </Col>
              </Modal>
            </Row>
            <Row type="flex" justify="center">
              <Col span={20}>
                <Row
                  className="UserData"
                  type="flex"
                  justify="left"
                  style={{ paddingLeft: "75px" }}
                >
                  <Col
                    className="UserData"
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={10}
                  >
                    <Row>Firstname :</Row>
                    <Row>
                      <Input
                        value={
                          detailUser.user_individual_detail &&
                          detailUser.user_individual_detail.first_name
                        }
                      />
                    </Row>
                  </Col>
                  <Col
                    className="UserData"
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={10}
                  >
                    <Row>Lastname :</Row>
                    <Row>
                      <Input
                        value={
                          detailUser.user_individual_detail &&
                          detailUser.user_individual_detail.last_name
                        }
                      />
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
                      <DatePicker
                        defaultValue={moment(
                          moment(
                            detailUser.user_individual_detail &&
                              detailUser.user_individual_detail.birthday
                          ).format("DD/MM/YYYY"),
                          dateFormat
                        )}
                        format={dateFormat}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row
                  className="UserData"
                  type="flex"
                  justify="left"
                  style={{ paddingLeft: "75px" }}
                >
                  <Col
                    className="UserData"
                    xs={24}
                    sm={24}
                    md={24}
                    lg={15}
                    xl={15}
                  >
                    <Row>E-mail. :</Row>
                    <Row>
                      <Input value={detailUser && detailUser.email} />
                    </Row>
                  </Col>
                </Row>
                <Row
                  className="UserData"
                  type="flex"
                  justify="left"
                  style={{ paddingLeft: "75px" }}
                >
                  <Col
                    className="UserData"
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={10}
                  >
                    <Row>Phone Number :</Row>
                    <Row>
                      <Input value={detailUser && detailUser.phone_number} />
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

export default Form.create()(PersonalProfile);
