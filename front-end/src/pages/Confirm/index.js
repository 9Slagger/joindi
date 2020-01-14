import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";

import Confirm from "./components/Confirm.js";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <Confirm />
      </DefaultLayout>
    );
  }
}
