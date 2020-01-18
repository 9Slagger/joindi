import React from "react";
import Fuse from "fuse.js";
import { Menu, Icon, Row, Col, Dropdown, Input, Form, Button,Drawer } from "antd";
import "../css/Header.css";
import Login from "./Login";
import Signup from "./Signup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../redux/actions";
const { SubMenu } = Menu;
const { Search } = Input;

class Header extends React.Component {
  state = {
    loading: false,
    visibleSignUp: false,
    visibleLogIn: false,
    isDirty: false,
    searchList: [],
    data: [
      {
        id: 1,
        eventName: "วิ่งไล่ลุง",
        catagory: {
          id: 1,
          catagory_name: "Popular"
        },
        tag: [
          {
            id: 1,
            tag_name: "Coding"
          },
          {
            id: 2,
            tag_name: "Run"
          }
        ]
      },
      {
        id: 1,
        eventName: "เดินเชียร์ลุง",
        catagory: {
          id: 1,
          catagory_name: "Hot"
        },
        tag: [
          {
            id: 3,
            tag_name: "Walk"
          }
        ]
      }
    ]
  };

  handleClickTag(e) {
    console.log("click : ", e);
  }

  handleSearch = e => {
    const fuse = new Fuse(this.state.data, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["eventName", "catagory_name"]
    });
    this.setState({ searchList: fuse.search(e) });
    console.log("search : ", this.state.searchList);
  };

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

  handleClickLogout = () => {
    this.props.signout();
  };

  render() {
    const { Authentication } = this.props;
    return (
      <div>
        <Row
          className="header"
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col span={3} className="colLogo">
            <img
              src="https://i.ibb.co/28WfkY9/join-DI-logo1.png"
              alt="join-DI-logo1"
              className="logo"
            />
          </Col>
          <Col span={3}>
            <Row type="flex" justify="center">
              <Dropdown
                overlay={
                  <Menu
                    onClick={this.handleClickTag}
                    className="dropDownHeader"
                  >
                    <Menu.Item key="popular"> Popular</Menu.Item>
                    <Menu.Item key="recommendbyjoindi">
                      {" "}
                      Recommend By JoinDi
                    </Menu.Item>
                    <Menu.Item key="recommendforyou">
                      {" "}
                      Recommend For You
                    </Menu.Item>
                    <SubMenu title="Tag">
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
                    </SubMenu>
                  </Menu>
                }
                trigger={["click"]}
              >
                <Button type="link" className="dropDownHeader">
                  Events &nbsp; <Icon type="caret-down" />
                </Button>
              </Dropdown>
            </Row>
          </Col>
          <Col span={10}>
            <Search
              placeholder="input search text"
              onSearch={this.handleSearch}
              className="inputSearch"
            />
          </Col> 

          <Col span={7}>
            <Row type="flex" justify="end">
              {Authentication.item && Authentication.item.isAuthenticated ? (
                <Dropdown
                  overlay={
                    <Menu className="dropDownUser">
                      <Menu.Item key="profile">Profile</Menu.Item>
                      <Menu.Item key="payoders">Pay Orders</Menu.Item>
                      <Menu.Item key="myevents">My Events</Menu.Item>
                      <Menu.Item key="joinevents">Join Events</Menu.Item>
                      <Menu.Item key="wishlist">Wish List</Menu.Item>
                      <Menu.Item key="logout" onClick={this.handleClickLogout}>
                        {" "}
                        Logout
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button type="link" className="dropDownHeader">
                    Hi {Authentication.item.email} &nbsp;
                    <Icon type="caret-down" className="sizeIconDropdown" />
                  </Button>
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
      </div>
    );
  }
}
const mapStateToProps = ({ Authentication }) => ({
  Authentication
});

const mapDispatchToProps = { signout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Header));
