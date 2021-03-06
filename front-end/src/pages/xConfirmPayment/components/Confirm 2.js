import React, { Component } from "react";
import { Button, Row, Col } from "antd";

// import * as constants from "../../../_constants";

import "antd/dist/antd.css";
import "./Confirm.css";

export default class Confirm extends Component {
  state = {};

  renderProcess = () => (
    <div id="process-div" className="mt-2 mb-2">
      <Row className="text-center">
        <Col offset={1} span={3}>
          <Button type="primary"> 1 </Button>
          <p>Checkout</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={3}>
          <Button type="primary"> 2 </Button>
          <p>Pay</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={3}>
          <Button type="primary" className="active">
            {" "}
            3{" "}
          </Button>
          <p>Confirm</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={3}>
          <Button type="primary"> 4 </Button>
          <p>Complete</p>
        </Col>
      </Row>
    </div>
  );

  renderConfirmPayment = () => (
    <div id="confirm-payment-div" className="mt-4">
      <h3 className="p-2">Confirm Payment</h3>
      <div>
        <Row className="text-center p-5">
          <Col span={12}>กำลังอยู่ในขั้นตอนการยืนยันการชำระเงิน</Col>
          <Col span={12}>
            <Button type="default">Processing</Button>
          </Col>
        </Row>
      </div>
    </div>
  );

  render() {
    return (
      <section id="checkout-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderConfirmPayment()}
      </section>
    );
  }
}
