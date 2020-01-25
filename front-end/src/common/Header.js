import React from  "react";
import {
  Menu,
  Icon,
  Row,
  Col,
  Dropdown,
  Input,
  Form,
  Button,
  Drawer,
  Badge,
  Divider
} from  "antd";
import "../css/Header.css";
import Login from  "./Login";
import Signup from  "./Signup";
import { connect } from  "react-redux";
import { signout, clearMessages } from  "../redux/actions";
import _ from  "lodash";
import { Link } from  "react-router-dom";
import { serviceCategorie, serviceEvent, serviceTag } from  "../_service";
import selectLang from  "../_helper/selectLang";
import { TAG } from  "../_constants";
import Notification from  "../common/Notification";

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
      searchKeyword: "",
      categorieList: []
    };
  }

  componentDidMount = () => {
    this.getCategorie();
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps !== this.props &&
      !_.isEmpty(nextProps.Authentication.messages)
    ) {
      Notification(
        selectLang(
          nextProps.Authentication.messages.title_en,
          nextProps.Authentication.messages.title_th
        )
      );
      this.props.clearMessages();
    }
  }

  getCategorie = async () => {
    try {
      const res = await serviceCategorie.getCategorie();
      const categorieList = res.result;
      this.setState({ categorieList });
    } catch (error) {
      console.log(error);
    }
  };

  getCategorieAndEvent = async () => {
    try {
      const res = await serviceEvent.getCategorieAndEvent();
      const searchList = res.result;
      this.setState({ searchList });
      console.log(searchList);
    } catch (error) {
      console.log(error);
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
    if (e) {
      this.props.history.push(`/searchevnts?keyword=${encodeURIComponent(e)}`);
    } else {
      this.props.history.push("/searchevnts?keyword=");
    }
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
    let keyword =
      decodeURIComponent(window.location.search.split("keyword=")[1]) !==
      "undefined"
        ? decodeURIComponent(window.location.search.split("keyword=")[1])
        : "";
    return (
      <div>
        <Row
          className="header"
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col md={2} lg={2} xl={2} className="colLogo">
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
                    <SubMenu title={TAG}>
                      <Menu.Item key="beauty"> Beauty </Menu.Item>
                      <Menu.Item key="book"> Book </Menu.Item>
                      <Menu.Item key="business"> Business </Menu.Item>
                      <Menu.Item key="comedy"> Comedy </Menu.Item>
                      <Menu.Item key="concert"> Concert </Menu.Item>
                      <Menu.Item key="education"> Education </Menu.Item>
                      <Menu.Item key="esport"> E - sport </Menu.Item>
                      <Menu.Item key="foodanddring"> Food & Drink </Menu.Item>
                      <Menu.Item key="health"> Health </Menu.Item>
                      <Menu.Item key="seemore">
                        {" "}
                        <Link to="/tagevents">See More...</Link>{" "}
                      </Menu.Item>
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
          <Col xs={12} md={12} lg={12} xl={8}>
            <Search
              defaultValue={keyword}
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
                  <>
                    {Authentication.item.role.role_code === "01ADM" ? (
                      <>
                        <Menu mode="inline">
                          <Menu.Item>
                            <Badge count={15}>
                              <Icon type="snippets" />
                            </Badge>
                          </Menu.Item>
                          <Menu.Item key="profile">
                            <Link to="/admin">Management</Link>
                          </Menu.Item>
                        </Menu>
                      </>
                    ) : Authentication.item.role.role_code === "02CUS" ? (
                      <>
                        <Menu mode="inline">
                          <Menu.Item>
                            <Badge count={15}>
                              <Icon type="bell" />
                            </Badge>
                          </Menu.Item>
                          <Menu.Item key="profile">
                            <Link to="/">My Events</Link>
                          </Menu.Item>
                        </Menu>
                      </>
                    ) : null}
                    <Menu mode="inline">
                      <SubMenu title={Authentication.item.email}>
                        <Menu.Item key="profile">Profile</Menu.Item>
                        <Menu.Item key="payoders">Pay Orders</Menu.Item>
                        <Menu.Item key="myevents">My Events</Menu.Item>
                        <Menu.Item key="joinevents">Join Events</Menu.Item>
                        <Menu.Item key="wishlist">Wish List</Menu.Item>
                        <Menu.Item
                          key="logout"
                          onClick={this.handleClickLogout}
                        >
                          {" "}
                          Logout
                        </Menu.Item>
                      </SubMenu>
                    </Menu>
                  </>
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
                        <Menu.Item key="seemore">
                          {" "}
                          <Link to="/tagevents">See More...</Link>{" "}
                        </Menu.Item>
                      </SubMenu>
                    </SubMenu>
                  </Menu>
                </Row>
              </Drawer>
            </Row>
          </Col>

          <Col xs={0} md={0} lg={0} xl={7}>
            <Row type="flex">
              {Authentication.item && Authentication.item.isAuthenticated ? (
                <>
                  {Authentication.item.role.role_code === "01ADM" ? (
                    <>
                      <Col span={2}>
                        <Badge count={15}>
                          <Icon type="snippets" className="iconNav" />
                        </Badge>
                      </Col>
                      <Col span={2}>
                        <Button type="link" className="dropDownHeader">
                          <Link to="/admin">Management</Link>
                        </Button>
                      </Col>
                    </>
                  ) : Authentication.item.role.role_code === "02CUS" ? (
                    <>
                      <Col span={2}>
                        <Badge count={15}>
                          <Icon type="bell" className="iconNav" />
                        </Badge>
                      </Col>
                      <Col span={2}>
                        <Button type="link" className="dropDownHeader">
                          <Link to="/">My Events</Link>
                        </Button>
                      </Col>
                    </>
                  ) : null}
                  <Col span={3} className="colDropdownUser">
                    <Dropdown
                      overlay={
                        <Menu className="dropDownUser">
                          <Menu.Item key="profile">Profile</Menu.Item>
                          <Menu.Item key="payoders">Pay Orders</Menu.Item>
                          <Menu.Item key="myevents">My Events</Menu.Item>
                          <Menu.Item key="joinevents">Join Events</Menu.Item>
                          <Menu.Item key="wishlist">Wish List</Menu.Item>
                          <Menu.Item
                            key="logout"
                            onClick={this.handleClickLogout}
                          >
                            {" "}
                            Logout
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <Button type="link" className="dropDownHeader">
                        Hi {Authentication.item.email}
                        <Icon type="caret-down" className="sizeIconDropdown" />
                      </Button>
                    </Dropdown>
                  </Col>
                </>
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

const mapDispatchToProps = { signout, clearMessages };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Header));
