import React, { Component } from "react";
import "./Bookmark.css";
import CardEvents from "../../../../common/CardEvents"
import { Row, Col, Divider } from "antd";

export default class Bookmark extends Component {
  render() {
    return (
      <Row>
        <Col className="colTextBookmark">
          <Divider orientation="left">
            <h3 className="textBookMark">Bookmark</h3>
          </Divider>
        </Col>

        <Col xs={24} sm={12} md={10} lg={8} xl={5}>
          <CardEvents/>

        </Col>

        <Col xs={24} sm={12} md={10} lg={8} xl={5}>
          <CardEvents/>

        </Col>

        <Col xs={24} sm={12} md={10} lg={8} xl={5}>
          <CardEvents/>

        </Col>

        <Col xs={24} sm={12} md={10} lg={8} xl={5}>
          <CardEvents/>

        </Col>
      </Row>
    );
  }
}
