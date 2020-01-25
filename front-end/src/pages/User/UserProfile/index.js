import React, { Component } from "react";
import UserLayout from "../../../common/UserLayout";
import PersonalProfile from "./components/PersonalProfile";

export default class UserProfile extends Component {
  render() {
    return (
      <UserLayout>
        <PersonalProfile />
      </UserLayout>
    );
  }
}
