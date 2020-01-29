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
  Icon,
  message
} from "antd";
import "./Profile.css";
import { serviceUser } from "../../../../_service";
import { Link } from "react-router-dom";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";

class PersonalProfile extends Component {
  state = {
    detailUser: {},
    visible: false,
    buttonVisible: false
  };

  componentDidMount = () => {
    this.getUserDetail();
  };

  getUserDetail = async () => {
    try {
      const res = await serviceUser.getUserDetail();
      // console.log("res.result", res.result);
      const detailUser = res.result;
      // console.log("detailUser", detailUser);
      this.props.form.setFieldsValue({
        first_name: detailUser.user_individual_detail.first_name,
        last_name: detailUser.user_individual_detail.last_name,
        birthday: moment(
          moment(parseInt(detailUser.user_individual_detail.birthday)).format(
            "DD/MM/YYYY"
          ),
          dateFormat
        ),
        email: detailUser.email,
        phone_number: detailUser.phone_number
      });
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

  success = () => {
    message.success("Update Your Profile Success");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleToggleButton = () => {
    this.setState({ buttonVisible: true });
  };
  handleClickCancle = () => {
    this.setState({ buttonVisible: false });
    this.getUserDetail();
  };

  handleSubmitEditProfile = e => {
    e.preventDefault();
    this.props.form.validateFields(
      ["first_name", "last_name", "birthday", "email", "phone_number"],
      (err, values) => {
        console.log(err);
        if (!err) {
          console.log("Received values of form: ", values);
          values.birthday = values.birthday.toDate().getTime();
          console.log(values);
          serviceUser.updateUserDetailIndividual(values);
          serviceUser.updateUser(values);
        }
      }
    );
    this.success();
    this.handleClickCancle();
    this.getUserDetail();
  };
  render() {
    const { detailUser } = this.state;
    const { getFieldDecorator, setFieldsValue } = this.props.form;
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
              {/* <Link onClick={this.showModal}>Change Password</Link> */}
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
                <Row className="UserData" type="flex" justify="center">
                  <Col span={15}>
                    <Form
                      onSubmit={this.handleSubmitEditProfile}
                      onChange={this.handleToggleButton}
                    >
                      <Form.Item label="First Name">
                        {getFieldDecorator("first_name", {
                          rules: [
                            {
                              required: true,
                              message: "Please input your first name"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Last Name">
                        {getFieldDecorator("last_name", {
                          rules: [
                            {
                              required: true,
                              message: "Please input your last name"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>
                      <Form.Item label="Birthday">
                        {getFieldDecorator("birthday", {
                          rules: [
                            {
                              required: true,
                              message: "Please input your birthday"
                            }
                          ]
                        })(<DatePicker format={dateFormat} />)}
                      </Form.Item>

                      <Form.Item label="E-mail">
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Please input your email"
                            }
                          ]
                        })(<Input />)}
                      </Form.Item>

                      <Form.Item label="Phone Number">
                        {getFieldDecorator("phone_number", {
                          rules: [
                            {
                              required: true,
                              message: "Please input your phone number"
                            }
                          ]
                        })(
                          <Input
                            value={detailUser && detailUser.phone_number}
                          />
                        )}
                      </Form.Item>

                      {this.state.buttonVisible ? (
                        <Form.Item>
                          <Row
                            className="UserData"
                            type="flex"
                            justify="center"
                            style={{ paddingTop: "40px" }}
                          >
                            <Col style={{ padding: "10px" }}>
                              <Button
                                type="danger"
                                style={{ width: "200px" }}
                                onClick={this.handleClickCancle}
                              >
                                Cancle
                              </Button>
                            </Col>
                            <Col style={{ padding: "10px" }}>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "200px" }}
                              >
                                Save
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                      ) : null}
                    </Form>
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
