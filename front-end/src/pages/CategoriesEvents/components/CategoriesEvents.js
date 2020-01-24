import React, { Component } from "react";
import "./CategoriesEvents.css";
import CardEvents from "../../../common/CardEvents";
import { Row, Col } from "antd";

export default class CategoriesEvents extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          {/* <Col
            className="bottomCardEvents"
            xs={24}
            sm={16}
            md={12}
            lg={10}
            xl={6}
          > */}
            <CardEvents event={this.props.event} />
          {/* </Col> */}
        </Row>
      </div>
    );
  }
}
