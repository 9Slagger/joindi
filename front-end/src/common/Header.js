import React from "react";
import Fuse from "fuse.js";
import {
  Menu,
  Icon,
  Row,
  Col,
  Dropdown,
  Input,
  Form,
  Button,
  Drawer
} from "antd";
import "../css/Header.css";
import Login from "./Login";
import Signup from "./Signup";
import { connect } from "react-redux";
import { signout } from "../redux/actions";
import { Link } from "react-router-dom";
import { serviceCategorie } from "../_service";
import { selectLang } from "../_constants";

const { SubMenu } = Menu;
const { Search } = Input;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visibleDrawer: false,
      visibleSignUp: false,
      visibleLogIn: false,
      isDirty: false,
      searchList: [],
      categorieList: [],
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
  }

  componentDidMount = () => {
    this.getCategorie();
  };

  getCategorie = async () => {
    try {
      const res = await serviceCategorie.getCategorie();
      const categorieList = res.result;
      this.setState({ categorieList });
    } catch (error) {
      console.log(error);
    }
  };

  resize = () => {
    let isMobileScreen = window.innerWidth <= 1100;
    if (isMobileScreen !== this.state.mobileScreen) {
      this.setState({
        mobileScreen: isMobileScreen
      });
    }
  };

  showDrawer = () => {
    this.setState({
      visibleDrawer: true
    });
  };

  onClose = () => {
    this.setState({
      visibleDrawer: false
    });
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

  toPageCategorie = id => () => {
    this.props.history.push(`/categoriesevents/${id}`);
  };

  render() {
    const { Authentication } = this.props;
    const { categorieList } = this.state;
    return (
      <div>
        <Row
          className="header"
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col md={2} lg={2} xl={3} className="colLogo">
            <Link to="/">
              <img
                src="https://i.ibb.co/28WfkY9/join-DI-logo1.png"
                alt="join-DI-logo1"
                className="logo"
              />
            </Link>
          </Col>
          <Col xs={0} md={0} lg={0} xl={3}>
            <Row type="flex" justify="center">
              <Dropdown
                overlay={
                  <Menu
                    onClick={this.handleClickTag}
                    className="dropDownHeader"
                  >
                    {categorieList.map(data => (
                      <Menu.Item
                        key={data.id}
                        onClick={this.toPageCategorie(data.id)}
                      >
                        {selectLang(
                          data.category_name_en,
                          data.category_name_th
                        )}
                      </Menu.Item>
                    ))}
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
          <Col xs={12} md={12} lg={12} xl={10}>
            <Search
              placeholder="input search text"
              onSearch={this.handleSearch}
              className="inputSearch"
            />
          </Col>

          <Col xs={3} md={3} lg={3} xl={0}>
            <Row type="flex" justify="end">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hamburger_icon_white.svg/768px-Hamburger_icon_white.svg.png"
                alt=""
                className="buttonDrawer"
                onClick={this.showDrawer}
              />
              <Drawer
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visibleDrawer}
              >
                {Authentication.item && Authentication.item.isAuthenticated ? (
                  <Menu mode="inline">
                    <SubMenu title={Authentication.item.email}>
                      <Menu.Item key="profile">Profile</Menu.Item>
                      <Menu.Item key="payoders">Pay Orders</Menu.Item>
                      <Menu.Item key="myevents">My Events</Menu.Item>
                      <Menu.Item key="joinevents">Join Events</Menu.Item>
                      <Menu.Item key="wishlist">Wish List</Menu.Item>
                      <Menu.Item key="logout" onClick={this.handleClickLogout}>
                        {" "}
                        Logout
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                ) : (
                  <div className="logInAndSignUp-drawer">
                    <Login />
                    <Signup />
                  </div>
                )}

                <Row>
                  <Menu onClick={this.handleClickTag} mode="inline">
                    <SubMenu title="Events">
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
                    </SubMenu>
                  </Menu>
                </Row>
              </Drawer>
            </Row>
          </Col>

          <Col xs={0} md={0} lg={0} xl={7}>
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
                <div className="logInAndSignUp-nav">
                  <Login />
                  <Signup />
                </div>
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
