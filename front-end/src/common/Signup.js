import React, { Component } from "react";
import { Row, Col, Modal, Button, Input, Divider, Form } from "antd";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visibleSignUp: false
    };
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Password และ Confirm password ไม่ตรงกัน");
    } else {
      callback();
    }
  };

  compareToSecondPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.isDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  showModalSignUp = () => {
    this.setState({
      visibleSignUp: true
    });
  };

  handleSubmitSignUp = e => {
    console.log(e);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleCancelSignUp = () => {
    this.setState({
      visibleSignUp: false
    });
  };

  handleDirtyBlur = e => {
    const { value } = e.target;
    this.setState({ isDirty: this.state.isDirty || !!value });
  };

  handleOkSignUp = () => {
    this.setState({
      loading: true
    });
    this.setState({
      loading: false,
      visibleSignUp: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col className="signup">
        <Button
          type="link"
          onClick={this.showModalSignUp}
          className="buttonHeader"
        >
          Sign in
        </Button>
        <Modal
          visible={this.state.visibleSignUp}
          // title="Log in"
          onOk={this.handleOkSignUp}
          onCancel={this.handleCancelSignUp}
          footer={null}
        >
          <p> Sign Up</p>
          <Divider />
          <Form onSubmit={this.handleSubmitSignUp}>
            <Row>
              <Form.Item label="Phone Number">
                {getFieldDecorator("phoneNumber", {
                  rules: [
                    {
                      required: true,
                      message: "Please input phone number"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input password"
                    },
                    {
                      validator: this.compareToSecondPassword
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm password">
                {getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "please confirm password"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={this.handleDirtyBlur} />)}
              </Form.Item>

              <Form.Item label="Phone Number">
                {getFieldDecorator("phoneNumber", {
                  rules: [
                    {
                      required: true,
                      message: "Please input phone number"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="First Name (English)">
                {getFieldDecorator("firstNameEn", {
                  rules: [
                    {
                      required: true,
                      message: "Please input first name english"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="First Name (Thai)">
                {getFieldDecorator("firstNameTh", {
                  rules: [
                    {
                      required: true,
                      message: "Please input first name thai"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Last Name (English)">
                {getFieldDecorator("lastNameEng", {
                  rules: [
                    {
                      required: true,
                      message: "Please input last name english"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Last Name (Thai)">
                {getFieldDecorator("lastNameTh", {
                  rules: [
                    {
                      required: true,
                      message: "Please input last name thai"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Company Name (English)">
                {getFieldDecorator("companyNameEn", {
                  rules: [
                    {
                      required: true,
                      message: "Please input company name english"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Company Name (Thai)">
                {getFieldDecorator("companyNameTh", {
                  rules: [
                    {
                      required: true,
                      message: "Please input company name thai"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Company Address (English)">
                {getFieldDecorator("companyAddressEn", {
                  rules: [
                    {
                      required: true,
                      message: "Please input company address english"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Company Address (Thai)">
                {getFieldDecorator("companyAddressTh", {
                  rules: [
                    {
                      required: true,
                      message: "Please input company address thai"
                    }
                  ]
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Birthday">
                {getFieldDecorator("birthday", {
                  rules: [
                    {
                      required: true,
                      message: "Please input cyour birthday"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Row>

            <Row type="flex" justify="center">
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      </Col>
    );
  }
}

export default Form.create()(Signup);
