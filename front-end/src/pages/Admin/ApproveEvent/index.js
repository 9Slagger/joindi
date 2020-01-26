import React, { Component } from  "react";
import AdminLayout from  "../../../common/AdminLayout";
import ApproveEvent from  "./component/ApproveEvent";

export default class index extends Component {
  render() {
    return (
      <AdminLayout>
        <ApproveEvent />
      </AdminLayout>
    );
  }
}
