import React, { Component } from "react";
import DefaultLayout from "../../common/DefaultLayout";
import CategoriesEvents from "./components/CategoriesEvents";
import CarouselEvents from "./components/CarouselEvents";
import { Row } from "antd";

export default class index extends Component {
  render() {
    return (
      <DefaultLayout>
        <Row>
          <CarouselEvents />
        </Row>

        <Row style={{margin:"50px 10%"}}>
          <CategoriesEvents />
        </Row>
      </DefaultLayout>
    );
  }
}
