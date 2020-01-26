<<<<<<< HEAD
import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import EventDetail from "./components/EventDetail";
=======
import React, { Component } from  "react";
import DefaultLayout from  "../../common/DefaultLayout";
import EventDetail from  "./components/EvenDetail";
>>>>>>> 06c96ef13ffbfc91e2ac6216080050fa3bf87466

export default class index extends Component {
  render() {
    return (
      <DefaultLayout {...this.props}>
        <EventDetail />
      </DefaultLayout>
    );
  }
}
