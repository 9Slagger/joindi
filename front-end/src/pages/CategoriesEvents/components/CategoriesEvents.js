import React, { Component } from  "react";
import "./CategoriesEvents.css";
import CardEvents from  "../../../common/CardEvents";
import { Row, Col } from  "antd";

export default class CategoriesEvents extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
            <CardEvents event={this.props.event} />
        </Row>
      </div>
    );
  }
}
