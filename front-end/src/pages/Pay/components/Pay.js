import React, { Component } from "react";

import { Button, Row, Col } from "antd";

import { withRouter } from "react-router-dom";

import Axios from "../../../_helper/axios";

import UploadForm from "./UploadForm";

// import * as constants from  "../../../_constants";

import "antd/dist/antd.css";
import "./Pay.css";

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketLists: []
    };
  }

  componentDidMount = () => {
    this.getTicketInOrderDatas();
  };

  goToConfirmPage = ticket_in_order_id => {
    // Axios.put(`/ticketInOrder/${ticket_in_order_id}`, {
    //   ticket_in_order_status_id: 3
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    this.props.history.push({
      pathname: `/confirm`,
      search: ``
    });
  };

  getTicketInOrderDatas = async () => {
    await Axios.get(`/ticketInOrder/wait_for_payment`)
      .then(res => {
        this.setState({ ticketLists: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

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
          <Button type="primary" className="active">
            {" "}
            2{" "}
          </Button>
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

  renderPayment = () => {
    let summary = 0;
    this.state.ticketLists.forEach((item, idx) => {
      summary += item.ticket_price * item.ticket_quantity;
    });

    return (
      <div id="total-div" className="mt-4">
        <h3 className="p-2">Payment</h3>
        <Row className="payment-header-row font-weight-bold">
          <Col span={12}>Event</Col>
          <Col span={6}>Ticket</Col>
          <Col span={6}>Price x Amount</Col>
        </Row>
        {this.state.ticketLists.map((item, idx) => {
          return (
            <Row key={idx} className="payment-header-body">
              <Col span={12}>
                <p>{item.event_name}</p>
              </Col>
              <Col span={6}>{item.ticket_title}</Col>
              <Col span={6}>
                {item.ticket_price} x {item.ticket_quantity}
                {" = "}
                {item.ticket_price * item.ticket_quantity}
              </Col>
            </Row>
          );
        })}
        <Row className="payment-footer-summary">
          <Col span={12}></Col>
          <Col span={6} className="font-weight-bold">
            Summary
          </Col>
          <Col span={6} className="font-weight-bold">
            {summary}
          </Col>
        </Row>
      </div>
    );
  };
  renderBankAccount = () => {
    return (
      <div id="bank-account-div" className="mt-4">
        <h3 className="p-2">Bank Account</h3>
        <div className="p-5">
          <Row>
            <Col span={12} className="text-right pr-5">
              <Row>
                <Col span={24}>Bank Logo</Col>
              </Row>
            </Col>
            <Col span={12} className="pl-5">
              <Row>
                <Col span={24}>{"{Account name : John Doe}"}</Col>
              </Row>
              <Row>
                <Col span={24}>{"{XXX-XXXXX-XXX}"}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  renderUploadPaymentSlip = props => (
    <div id="upload-payment-slip-div" className="text-center border mt-4 p-3">
      <UploadForm />
    </div>
  );

  render() {
    console.log(this.state);
    let ticket_in_order_id = this.state.ticketLists;
    return (
      <section id="checkout-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderPayment()}
        {this.renderBankAccount()}
        {this.renderUploadPaymentSlip()}

        <Row className="mt-4 mb-3">
          <Col span={24} className="text-right">
            <Button onClick={() => this.goToConfirmPage()} type="primary">
              <i className="far fa-check-square mr-2"></i>Confirm
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}

export default withRouter(Pay);
