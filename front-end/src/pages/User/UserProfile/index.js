import React, { Component } from "react";
import UserLayout from "../../../common/UserLayout";
import PersonalProfile from "./components/PersonalProfile";
import CompanyProfile from "./components/CompanyProfile";

export default class index extends Component {
  render() {
    return (
      <UserLayout>
        <PersonalProfile />
        {/* <CompanyProfile /> */}
      </UserLayout>
    );
  }
}
