import React, { Component } from "react";
import UserLayout from "../../../common/UserLayout";
import JoinEvent from "./components/JoinEvent";

export default class index extends Component {
  render() {
    return (
      <UserLayout {...this.props}> 
        <JoinEvent />
      </UserLayout>
    );
  }
}
