import React, { Component } from "react";
import { Button, Row, Col, Table } from "antd";
import { withRouter } from "react-router-dom";
// import Axios from "../../../_helper/axios";
import { serviceTicket } from "../../../_service/ticketServices";
import _ from "lodash";
import * as constants from "../../../_constants";
import "antd/dist/antd.css";
import "./Checkout.css";

const reviewOrderSummaryColumns = [
  {
    title: "Ticket",
    dataIndex: "ticket_title",
    key: "ticket_title"
  },
  {
    title: "Price",
    dataIndex: "ticket_price",
    key: "ticket_price"
  },
  {
    title: "Quantity",
    dataIndex: "ticket_quantity",
    key: "ticket_quantity"
  },
  {
    title: "Subtotal",
    dataIndex: "subtotal",
    key: "subtotal"
  }
];

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: {}
    };
  }

  componentDidMount() {
    this.getTicket();
  }

  async getTicket() {
    try {
      const res = await serviceTicket.getTicket(
        this.props.match.params.ticketId
      );
      const ticket = res.result;
      this.setState({ ticket });
    } catch (error) {
      alert(error.messages.title_en);
    }
  }

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
        <Col span={4}>
          <Button type="primary"> 2 </Button>
          <p>Pay</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={4}>
          <Button type="primary"> 3 </Button>
          <p>Confirm</p>
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

  renderTotal = ticket => (
    <div id="total-div" className="mt-4">
      <h3 className="p-2">Total</h3>
      <Row className="total-header-row font-weight-bold">
        <Col span={12}>Event</Col>
        <Col span={6}>Ticket Amount</Col>
        <Col span={6}></Col>
      </Row>
      <Row className="total-header-body">
        <Col span={12}>
          <Row span={24}>
            <Col span={24 / 2}>
              <img className="" src="https://picsum.photos/100" alt="" />
            </Col>
            <Col>
              <p className="mt-2">{ticket.event_name}</p>
              <p>{ticket.ticket_title}</p>
            </Col>
          </Row>
        </Col>
        <Col span={6}>{ticket.ticket_price * ticket.ticket_quantity}</Col>
        <Col span={6}>
          <Button
            type="primary"
          >
            Confrim Order
          </Button>
        </Col>
      </Row>
    </div>
  );

  renderReviewOrderSummary = () => {
    let reviewOrderSummaryDatas = this.state.ticketLists.slice(
      0,
      this.state.ticketLists.length
    );

    let sum = 0;
    this.state.ticketLists.forEach(obj => {
      // console.log(obj.ticket_price * obj.ticket_quantity);
      sum += obj.ticket_price * obj.ticket_quantity;
    });

    reviewOrderSummaryDatas.push({
      key: reviewOrderSummaryDatas.length + 1,
      ticket_quantity: "Grand Total",
      subtotal: sum
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

  render() {
    const { ticket } = this.state
    console.log("ticket", ticket)
    return (
      <section id="checkout-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderTotal(ticket)}
      </section>
    );
  }
}

export default withRouter(Checkout);
