import React, { Component } from "react";
import "../css/CardEvents.css";
import { Card, Avatar, Typography, Icon, Row, Col } from "antd";
const { Text, Paragraph } = Typography;

export default class CardEvents extends Component {
  render() {
    return (
        <Card className="card-events">
          <Avatar shape="square" size={150} className="avatar-events" />
          <Col>
            <Row>
              <Icon type="calendar" /> : <Text>Sat,12 Jan 2020</Text> <br />
            </Row>
            <Row>
              <Text strong>BLEND 285 Signature presents BANGKOK</Text> <br />
            </Row>
            <Row>
              <Col span={20}>
                <Paragraph type="secondary">
                  SHOW DC ARENA, Bangkok, Thailand
                </Paragraph>
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
