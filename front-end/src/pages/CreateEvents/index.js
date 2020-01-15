import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import InfoEvents from "./components/InfoEvents";
import Ticket from "./components/Ticket";
import OrganizedBy from "./components/OrganizedBy";
import { Row, Col, Button } from "antd";
import RichText from "./components/RichText";
import './CreateEventsStyle.css'

export default class index extends Component {
  render() {
    return (
      <DefaultLayout >
        <div className="outerBox">
        <Row className="infoEvents">
          <InfoEvents />
        </Row>
        <Row>
            <RichText/>
        </Row>
        <Row>
          <Ticket />
        </Row>
        <Row>
          <OrganizedBy />
        </Row>
        <Row>
          <Col span={24} style={{textAlign:"right"}}>
            <Button style={{margin:"10px 10px"}}>Back</Button>
            <Button style={{margin:"10px 10px"}}>Confirm</Button>
          </Col>
        </Row>
        </div>    
      </DefaultLayout>
    );
  }
}
