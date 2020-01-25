import React from "react";
import { Card, Row, Col } from "antd";
import selectLang from "../../../_helper/selectLang";
import CardEvents from "../../../common/CardEvents";

export default props => {
  const { eventList, title } = props;
  return (
    <Card>
      <Row className="scrollmenu">
        <h2>{selectLang(title.titleEn, title.titleTh)}</h2>
        {eventList.map(event => (
          <Col xs={4} key={event.id}>
            <CardEvents event={event} key={event.id} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};
