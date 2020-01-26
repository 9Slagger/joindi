import React, { Component } from "react";
import UserLayout from "../../../common/UserLayout";
import MyEvents from "./components/MyEvents";

export default class index extends Component {
  render() {
    return (
      <UserLayout {...this.props}> 
        <MyEvents />
      </UserLayout>
    );
  }
}
