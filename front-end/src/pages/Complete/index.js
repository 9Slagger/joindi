import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";

import Complete from "./components/Complete.js";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout {...this.props}>
        <Complete />
      </DefaultLayout>
    );
  }
}
