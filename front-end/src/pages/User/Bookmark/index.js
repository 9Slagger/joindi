import React, { Component } from "react";
import UserLayout from "../../../common/UserLayout";
import Bookmark from "./components/Bookmark";

export default class index extends Component {
  render() {
    return (
      <UserLayout>
        <Bookmark />
      </UserLayout>
    );
  }
}
