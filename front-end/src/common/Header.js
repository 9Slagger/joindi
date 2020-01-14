import React from "react"
import SearchEvents from "./SearchEvents"
import { Menu, Icon, Row} from 'antd';

class Header extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Row>
         <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="mail">
            <Icon type="mail" />
            Navigation One
          </Menu.Item>

          
          <Menu.Item key="search">
             <SearchEvents/>
          </Menu.Item>
          

          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">               
                Events
                <Icon type="caret-down" />
              </span>
            }
          >

            <Menu.Item title="hot">
              Hot
            </Menu.Item>
            <Menu.ItemGroup title="Tag">
              <Menu.Item key="artdesign">Art Design</Menu.Item>
              <Menu.Item key="beauty">Beauty</Menu.Item>
              <Menu.Item key="book">Book</Menu.Item>
              <Menu.Item key="business">Business</Menu.Item>
              <Menu.Item key="comedy">Comedy</Menu.Item>
              <Menu.Item key="concert">Concert</Menu.Item>
              <Menu.Item key="education">Education</Menu.Item>
              <Menu.Item key="esport">E-sport</Menu.Item>
              <Menu.Item key="foodanddring">Food & Drink</Menu.Item>
              <Menu.Item key="health">Health</Menu.Item>
              <Menu.Item key="seemore">See More ...</Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>

      

          <Menu.Item key="login">
            Log in
          </Menu.Item>
          
          <Menu.Item key="signup">
            Sign Up
          </Menu.Item>
        </Menu>
      </Row>
    );
  }
}

export default Header