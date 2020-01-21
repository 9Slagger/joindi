import React, { Component } from "react";
import "../CategoriesEvents/components/CategoriesEvents.css";
import DefaultLayout from "../../common/DefaultLayout";
import CarouselEvents from "../../common/CarouselEvents";
import CategoriesEvents from "./components/CategoriesEvents";
import { Row, Divider, Col } from "antd";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <Row>
          <CarouselEvents />
        </Row>

        <Row type="flex" justify="center">
          <Col span={22}>
            <h3>xxxxxxxxxx</h3>
            <Divider />
            <CategoriesEvents />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
