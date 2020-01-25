import React, { Component } from  "react";
import "../css/CardEvents.css";
import { Card, Avatar, Typography, Icon, Row, Col } from  "antd";
import { Link } from  "react-router-dom";
const { Text, Paragraph } = Typography;

class CardEvents extends Component {
  render() {
    // console.log(this.props.event);
    const { event } = this.props;
    return (
      <Card className="card-events">
        <Link to={`/eventdetail/${event.id}`}>
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
            <Col>
              <Paragraph type="secondary">{event.event_address}</Paragraph>
            </Col>
          </Row>

          <Row type="flex" justify="center">
            <span>
            {event.event_tags && event.event_tags.map(tag => (
                      <Text code key={tag.id}>{tag.tag_name_en}&nbsp;</Text>
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
