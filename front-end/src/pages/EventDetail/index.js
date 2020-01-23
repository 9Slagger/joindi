import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import EventDetail from "./components/EventDetail";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <EventDetail />
      </DefaultLayout>
    );
  }
}
