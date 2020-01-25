import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";

import Pay from "./components/Pay.js";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout {...this.props}>
        <Pay />
      </DefaultLayout>
    );
  }
}
