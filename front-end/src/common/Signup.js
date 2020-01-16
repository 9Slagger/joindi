import React, { Component } from "react";
import { Row, Col, Modal, Button, Input, Divider, Form, Radio } from "antd";
import { serviceCustomerType, serviceUser } from "../_service";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      companyName: "",
      customerTypeId: 1,
      visibleSignUp: false,
      loading: false,
      isDirty: false,
      customerTypeList: []
    };
  }

  async getRoles() {
    let customerTypeList;
    try {
      customerTypeList = await serviceCustomerType.getCustomerType();
      customerTypeList = customerTypeList.result;
      this.setState({ customerTypeList });
    } catch (error) {
      console.log(error);
    }
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
      form.validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };

  showModalSignUp = () => {
    this.getRoles();
    this.setState({
      visibleSignUp: true
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitSignUp = e => {
    e.preventDefault();
    const {
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      companyName,
      customerTypeId
    } = this.state;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          let res = await serviceUser.createUser(
            email,
            password,
            phoneNumber,
            firstName,
            lastName,
            companyName,
            customerTypeId
          );
          alert(res.messages.title_en)
        } catch (error) {
          alert(error.messages.title_en)
        }
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
    const { customerTypeList, customerTypeId } = this.state;
    console.log(this.state);
    let showIndividualFeild = false,
      showCompanyFeild = false;
    if (customerTypeList.length) {
      showIndividualFeild =
        customerTypeList.find(
          customerType => customerType.id === customerTypeId
        ).customer_type_code === "01INDV";
      showCompanyFeild =
        customerTypeList.find(
          customerType => customerType.id === customerTypeId
        ).customer_type_code === "02CO";
    }

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
          onOk={this.handleOkSignUp}
          onCancel={this.handleCancelSignUp}
          footer={null}
        >
          <p> Sign Up</p>
          <Divider />
          <Form onSubmit={this.handleSubmitSignUp}>
            <Row>
              <Form.Item label="User Type">
                <Radio.Group
                  name="customerTypeId"
                  onChange={this.handleChange}
                  value={customerTypeId}
                >
                  {customerTypeList.map(customerType => (
                    <Radio key={customerType.id} value={customerType.id}>
                      {customerType.customer_type_name_en}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>

              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Please input email"
                    }
                  ]
                })(<Input name="email" onChange={this.handleChange} />)}
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
                })(
                  <Input.Password
                    name="password"
                    onChange={this.handleChange}
                  />
                )}
              </Form.Item>

              <Form.Item label="Confirm password">
                {getFieldDecorator("confirmPassword", {
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
                })(<Input name="phoneNumber" onChange={this.handleChange} />)}
              </Form.Item>

              {showIndividualFeild && (
                <>
                  <Form.Item label="First Name">
                    {getFieldDecorator("firstName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input first name"
                        }
                      ]
                    })(<Input name="firstName" onChange={this.handleChange} />)}
                  </Form.Item>

                  <Form.Item label="Last Name">
                    {getFieldDecorator("lastName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input last name"
                        }
                      ]
                    })(<Input name="lastName" onChange={this.handleChange} />)}
                  </Form.Item>
                </>
              )}

              {showCompanyFeild && (
                <Form.Item label="Company Name">
                  {getFieldDecorator("companyName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input company name"
                      }
                    ]
                  })(<Input name="companyName" onChange={this.handleChange} />)}
                </Form.Item>
              )}
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
