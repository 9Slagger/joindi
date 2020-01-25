import React, { Component } from  "react";
import { Button, Row, Col, Table } from  "antd";

import * as constants from  "../../../_constants";

import "antd/dist/antd.css";
import "./Checkout.css";

const totalColumns = [
  {
    title: "Event name",
    dataIndex: "event_name",
    key: "event_name"
    // render: text => <a>{text}</a>
  },
  {
    title: "Ticket",
    dataIndex: "ticket",
    key: "ticket"
  },
  {
    title: "Price x Amount",
    dataIndex: "price_amount",
    key: "price_amount"
  }
];

const reviewOrderSummaryColumns = [
  {
    title: "Ticket",
    dataIndex: "ticket",
    key: "ticket"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "Quantity",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Subtotal",
    dataIndex: "subtotal",
    key: "subtotal"
  }
];

export default class Checkout extends Component {
  state = {
    ticketLists: [
      {
        key: "1",
        event_name: "Event",
        ticket: "Early Bird",
        price: 1000,
        amount: 1,
        price_amount: `1000 x 1`,
        subtotal: 1000 * 1
      },
      {
        key: "2",
        event_name: "Event 2",
        ticket: "Normal",
        price: 1500,
        amount: 2,
        price_amount: `1500 x 2`,
        subtotal: 1500 * 2
      }
    ]
  };

  renderProcess = () => (
    <div id="process-div" className="mt-2 mb-2">
      <Row className="text-center">
        <Col offset={1} span={3}>
          <Button type="primary" className="active">
            {" "}
            1{" "}
          </Button>
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
          <Button type="primary"> 3 </Button>
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

  renderConuntDown = () => (
    <div id="countdown-div" className="border p-3">
      <span className="ml-5 mr-5">15:00</span>
      <span className="ml-5">{constants.COUNTDOWN_TEXT}</span>
    </div>
  );
  renderTotal = () => (
    <div id="total-div" className="mt-4">
      <h3 className="p-2">Total</h3>
      <Table
        columns={totalColumns}
        dataSource={this.state.ticketLists}
        pagination={false}
      />
    </div>
  );
  renderReviewOrderSummary = () => {
    let reviewOrderSummaryDatas = this.state.ticketLists.slice(
      0,
      this.state.ticketLists.length
    );
    reviewOrderSummaryDatas.push({
      key: "3",
      amount: "Grand Total",
      subtotal: 4000
    });
    return (
      <div id="review-order-summary-div" className="mt-4">
        <h3 className="p-2">Review Order Summary</h3>
        <Table
          columns={reviewOrderSummaryColumns}
          dataSource={reviewOrderSummaryDatas}
          pagination={false}
        />
      </div>
    );
  };

  toPayPage = ticketInOrderId => () => {
    // TODO: call api send ticketInOrderId if success go to page pay page if fail alert
  }

  render() {
    console.log(this.state);
    return (
      <section id="checkout-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderConuntDown()}
        {this.renderTotal()}
        {this.renderReviewOrderSummary()}

        <Row className="mt-4">
          <Col span={24 / 2}>
            <Button type="danger">Cancel Order</Button>
          </Col>
          <Col span={24 / 2} className="text-right">
            <Button type="primary" onClick={this.toPayPage}>Confirm Order</Button>
          </Col>
        </Row>
      </section>
    );
  }
}
