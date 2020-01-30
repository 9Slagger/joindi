import React, { Component } from "react";
import "../css/CardEvents.css";
import { Card, Avatar, Typography, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { ENDPOINT } from "../_constants";
const { Text, Paragraph } = Typography;

class CardEvents extends Component {
  render() {
    const { event } = this.props;
    return (
      <Card className="card-events">
        <Link to={`/eventdetail/${event.id}`}>
          <Avatar
            src={`${ENDPOINT}/${event.event_has_image.image.id}.${event.event_has_image.image.filename_extension}`}
            shape="square"
            size={150}
            className="avatar-events"
          />
          <Col>
            <Row>
              <Icon type="calendar" /> :{" "}
              <Text>
                {moment(parseInt(event.event_date_start)).format("ll")}
              </Text>{" "}
              <br />
            </Row>
            <Row>
              <Text strong>{event.event_name}</Text> <br />
            </Row>
            <Row>
              <Col>
                <Paragraph type="secondary">{event.event_address}</Paragraph>
              </Col>
            </Row>

            <Row type="flex" justify="center">
              <span>
                {event.event_tags &&
                  event.event_tags.map(tag => (
                    <Text code key={tag.id + "EventTag"}>
                      {tag.tag_name_en}&nbsp;
                    </Text>
                  ))}
              </span>
            </Row>
          </Col>
        </Link>
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
