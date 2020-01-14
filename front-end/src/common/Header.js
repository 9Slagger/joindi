import React from "react";
import { Menu, Icon, Row, Col, Dropdown, Modal, Button, Input } from "antd";
import "../css/Header.css";
import { Link } from "react-router-dom";

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
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        visible: false
      });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;
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
              Events &nbsp; <Icon type="down" />
            </a>
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
            <Col className="login">
              <Link onClick={this.showModal} className="buttonHeader">
                Log in
              </Link>
              <Modal
                visible={visible}
                // title="Log in"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="submit" onClick={this.handleCancel}>
                    Log in
                  </Button>
                ]}
              >
                <p> Log in</p>
              </Modal>
            </Col>
            <Col className="signup">
              <Link onClick={this.showModal} className="buttonHeader">
                Sign in
              </Link>
              <Modal
                visible={visible}
                // title="Log in"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="submit" onClick={this.handleCancel}>
                    Sign in
                  </Button>
                ]}
              >
                <p> Sign in</p>
              </Modal>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Header;
