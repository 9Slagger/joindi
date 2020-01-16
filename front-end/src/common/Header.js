import React from "react";
import {
  Menu,
  Icon,
  Row,
  Col,
  Dropdown,
  Input,
  Form
} from "antd";
import "../css/Header.css";
import Login from "./Login";
import Signup from "./Signup";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

const { SubMenu } = Menu;
const { Search } = Input;

const menu = (
  <Menu>
    <Menu.Item> Hot </Menu.Item>
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
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      visibleSignUp: false,
      visibleLogIn: false,
      isDirty: false
    };
  }

  render() {
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
            <Link to="/" className="dropDownHeader" href="#">
              Events &nbsp; <Icon type="down" />
            </Link>
          </Dropdown>
        </Col>
        <Col span={10}>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{
              width: 500
            }}
          />
        </Col>
        <Col span={8}>
          <Row className="loginandsignin" type="flex" justify="end">
            <Login />
            <Signup />
          </Row>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = ({ Authentication }) => ({
  Authentication
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Header));
