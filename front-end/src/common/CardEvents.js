import React, { Component } from "react";
import "../css/CardEvents.css";
import { Card, Avatar, Typography, Icon, Row, Col } from "antd";
const { Text, Paragraph } = Typography;

class CardEvents extends Component {
  render() {
    console.log(this.props.event);
    const { event } = this.props;
    return (
      <Card className="card-events">
        <Avatar shape="square" size={150} className="avatar-events" />
        <Col>
          <Row>
            <Icon type="calendar" /> : <Text>{event.event_date_start}</Text>{" "}
            <br />
          </Row>
          <Row>
            <Text strong>{event.event_name}</Text> <br />
          </Row>
          <Row>
            <Col span={20}>
              <Paragraph type="secondary">{event.event_address}</Paragraph>
            </Col>
            <Col span={4}>
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
            </Col>
          </Row>
        </Col>
      </Card>
    );
  }
}

CardEvents.defaultProps = {
  event: {
    event_name: "",
    event_date_start: "",
    event_address: ""
  }
};

export default CardEvents;
