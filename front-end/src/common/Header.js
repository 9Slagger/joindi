import React from "react"
import Fuse from 'fuse.js';
import {
  Menu,
  Icon,
  Row,
  Col,
  Dropdown,
  Modal,
  Button,
  Input,
  Divider,
  Form
} from "antd";
import "../css/Header.css";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Search } = Input;

function handleClickTag(e){
  console.log("click : " , e)
}

const menu = (
  <Menu onClick={handleClickTag}>
    <Menu.Item key="hot"> Hot </Menu.Item>
    <SubMenu title="Tag ">
      <Menu.Item key="beauty"> Beauty </Menu.Item>
      <Menu.Item key="book"> Book </Menu.Item>
      <Menu.Item key="business"> Business </Menu.Item>
      <Menu.Item key="comedy"> Comedy </Menu.Item>
      <Menu.Item key="concert"> Concert </Menu.Item>
      <Menu.Item key="education"> Education </Menu.Item>
      <Menu.Item key="esport"> E - sport </Menu.Item>
      <Menu.Item key="foodanddring"> Food & Drink </Menu.Item>
      <Menu.Item key="health"> Health </Menu.Item>
      <Menu.Item key="seemore"> See More... </Menu.Item>
    </SubMenu>{" "}
  </Menu>
);

class Header extends React.Component {
  state = {
    loading: false,
    visibleSignUp: false,
    visibleLogIn: false,
    isDirty: false,
    searchList:[],
    data: [
      {
        "id": 1,
        "eventName": "วิ่งไล่ลุง",
        "catagory": {
          "id": 1,
          "catagory_name": "Popular"
        },
        "tag": [
          {
            "id": 1,
            "tag_name": "Coding"
          },
          {
            "id": 2,
            "tag_name": "Run"
          }
        ]
      },
      {
        "id": 1,
        "eventName": "เดินเชียร์ลุง",
        "catagory": {
          "id": 1,
          "catagory_name": "Hot"
        },
        "tag": [
          {
            "id": 3,
            "tag_name": "Walk"
          }
        ]
      }
    ]
  };

  handleSearch = (e) => {
    const fuse = new Fuse(this.state.data, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "eventName",
        "catagory_name"
      ]
    });
    this.setState({searchList:fuse.search(e)})
    console.log("search : ",this.state.searchList)
  }



  showModalSignUp = () => {
    this.setState({
      visibleSignUp: true
    });
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

  handleCancelSignUp = () => {
    this.setState({
      visibleSignUp: false
    });
  };

  showModalLogIn = () => {
    this.setState({
      visibleLogIn: true
    });
  };

  handleOkLogIn = () => {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        visibleLogIn: false
      });
    }, 1000);
  };

  handleCancelLogIn = () => {
    this.setState({
      visibleLogIn: false
    });
  };

  handleDirtyBlur = e => {
    const { value } = e.target;
    this.setState({ isDirty: this.state.isDirty || !!value });
  };

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

  handleSubmitSignUp = e => {
    console.log(e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleSubmitLogIn = e => {
    console.log(e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row className="header" type="flex" justify="space-around" align="middle">
        <Col span={3}>
          <img
            src="https://i.ibb.co/28WfkY9/join-DI-logo1.png"
            alt="join-DI-logo1"
            style={{
              height: "50px",
              width: "auto"
            }}
          />
        </Col>
        <Col span={1}> </Col>
        <Col span={2}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="dropDownHeader" href="#">
              Events  <Icon type="down" />
            </a>
          </Dropdown>
        </Col>
        <Col span={10}>
          <Search
            placeholder="input search text"
            onSearch={this.handleSearch}
            style={{
              width: 500
            }}
          />
        </Col>
        <Col span={8}>
          <Row className="loginandsignin" type="flex" justify="end">
            <Col className="login">
              <Link onClick={this.showModalLogIn} className="buttonHeader">
                Log in
              </Link>
              <Modal
                visible={this.state.visibleLogIn}
                // title="Log in"
                onOk={this.handleOkLogIn}
                onCancel={this.handleCancelLogIn}
                footer={null}
              >
                <p> Log in</p>
                <Divider />
                <Form onSubmit={this.handleSubmitLogIn}>
                  <Row>
                    <Form.Item label="E-mail">
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your username!"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password">
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your Password!"
                          }
                        ]
                      })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item>
                      <Row type="flex" justify="center">
                        <Button type="primary" htmlType="submit">
                          Log in
                        </Button>
                      </Row>
                    </Form.Item>
                  </Row>
                </Form>
              </Modal>
            </Col>
            <Col className="signup">
              <Link onClick={this.showModalSignUp} className="buttonHeader">
                Sign in
              </Link>
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
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(Header);
