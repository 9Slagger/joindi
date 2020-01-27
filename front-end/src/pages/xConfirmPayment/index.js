import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";

import Checkout from "./components/Checkout.js";
import Pay from "./components/Pay.js";
import Confirm from "./components/Confirm.js";
import Complete from "./components/Complete.js";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout {...this.props}>
        <Checkout />
      </DefaultLayout>
    );
  }
}
