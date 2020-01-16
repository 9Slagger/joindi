import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import { Row, Col, Icon,
  // Divider, Input
} from "antd";
import "./EventDetail.css";

export default class EventDetail extends Component {
  render() {
    return (
      <DefaultLayout>
        <Row className="event-detail">
          <Col>
            <Row className="event-info" type="flex" align="middle">
              <Col className="img-info" span={8}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsVQ9Gk69HrUGy5_m59PsYrzTEBWFdol777zM4o7NU0cFoUTT&s"
                  alt="event-img"
                />
              </Col>
              <Col className="detail" span={10}>
                <Row className="event-name">Event Name</Row>
                <Row className="event-date">
                  <Icon type="calendar" /> : 12 Dec 2020 &nbsp;
                  <Icon type="hourglass" /> 10:00 am - 5:00 pm.
                </Row>
                <Row className="event-date">
                  <Icon type="environment" /> Location : Bangna , Bkk
                </Row>
                <Row className="event-date">
                  <Icon type="tags" />
                </Row>
              </Col>
            </Row>
            <Row></Row>

            <Row></Row>

            <Row></Row>
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
