import React, { Component } from "react";
import AdminLayout from "../../../common/AdminLayout";
import ManageUser from "./component/manageuser";

export default class index extends Component {
  render() {
    return (
      <AdminLayout>
        <ManageUser />
      </AdminLayout>
    );
  }
}
