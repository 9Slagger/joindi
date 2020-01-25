import React, { Component } from "react";
import UserLayout from "../../../common/UserLayout";
import MyOrders from "./components/MyOrders";

export default class index extends Component {
  render() {
    return (
      <UserLayout>
        <MyOrders />
      </UserLayout>
    );
  }
}
