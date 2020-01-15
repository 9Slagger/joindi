import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import InfoEvents from "./components/InfoEvents";
import Ticket from "./components/Ticket";
import Description from "./components/Description";
import OrganizedBy from "./components/OrganizedBy";
import { Row } from "antd";
import RichText from "./components/RichText";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <Row>
          <InfoEvents />
        </Row>
        <Row>
            <RichText/>
        </Row>
        <Row>
          <Ticket />
        </Row>
        <Row>
          <Description />
        </Row>
        <Row>
          <OrganizedBy />
        </Row>
      </DefaultLayout>
    );
  }
}
