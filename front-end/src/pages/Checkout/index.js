import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";

import Checkout from "./components/Checkout.js";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <Checkout />
      </DefaultLayout>
    );
  }
}