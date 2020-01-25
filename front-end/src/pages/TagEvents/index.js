import React, { Component } from  "react";
import DefaultLayout from  "../../common/DefaultLayout";
import TagEvents from  "../../common/TagEvents";
import CarouselEvents from  "../../common/CarouselEvents";
import { Row, Divider, Col } from  "antd";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <Row>
          <CarouselEvents />
        </Row>

        <Row type="flex" justify="center">
          <Col span={22}>
            <h3>Events</h3>
            <Divider />
            <TagEvents />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
