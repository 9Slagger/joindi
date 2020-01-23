import React, { Component } from "react";
import AdminLayout from "../../../common/AdminLayout";
import ManageTag from "./component/managetag";

export default class index extends Component {
  render() {
    return (
      <AdminLayout>
        <ManageTag />
      </AdminLayout>
    );
  }
}
