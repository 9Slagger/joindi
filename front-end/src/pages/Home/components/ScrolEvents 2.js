import React from "react";
import { Card, Row, Col } from "antd";
import selectLang from "../../../_helper/selectLang";
import CardEvents from "../../../common/CardEvents";
import "./ScrolEvents.css";

export default props => {
  const { eventList, title } = props;
  return (
    <Card>
      <h2>{selectLang(title.titleEn, title.titleTh)}</h2>
      <Row>
        <Col className="scrollmenu">
          {eventList.map(event => (
            <div className="card-scrollmenu" xs={4} key={event.id}>
              <CardEvents event={event} key={event.id} />
            </div>
          ))}
        </Col>
      </Row>
    </Card>
  );
};
