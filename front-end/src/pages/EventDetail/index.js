import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";

import EventDetail from "./components/EvenDetail";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <EventDetail />
      </DefaultLayout>
    );
  }
}
