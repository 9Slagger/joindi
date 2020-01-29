import React, { Component } from "react";
import { Button, Row, Col } from "antd";

import Axios from "../../../_helper/axios";

import { withRouter } from "react-router-dom";

import * as constants from "../../../_constants";

import "antd/dist/antd.css";
import "./Confirm.css";

class Confirm extends Component {
  state = {};

  componentDidMount = async () => {
    console.log(this.props.location.search);
    let ticket_in_order_id = "";
    try {
      let res = this.props.location.search.split("=");
      ticket_in_order_id = res[1];
      await this.getTicketInOrderDatas(ticket_in_order_id);
    } catch (err) {
      console.error(err);
    }
  };

  goToCompletePage = ticket_in_order_id => {
    // Axios.put(`/ticketInOrder/${ticket_in_order_id}`, {
    //   ticket_in_order_status_id: 4
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    // this.props.history.push({
    //   pathname: `/complete`,
    //   search: ``
    // });
  };

  goToHomePage = ticket_in_order_id => {
    // Axios.put(`/ticketInOrder/${ticket_in_order_id}`, {
    //   ticket_in_order_status_id: 4
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    this.props.history.push({
      pathname: `/`,
      search: ``
    });
  };

  getTicketInOrderDatas = async ticket_in_order_id => {
    await Axios.get(`/ticketInOrder/wait_for_approve/${ticket_in_order_id}`)
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
        <Col offset={6} span={4}>
          <Button type="primary"> 1 </Button>
          <p>Pay</p>
        </Col>
        <Col span={4}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={4}>
          <Button type="primary" className="active">
            {" "}
            2{" "}
          </Button>
          <p>Confirm</p>
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
            <Button type="default">Confirm Success</Button>
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

        <Row className="mt-4">
          <Col span={24} className="text-right">
            <Button onClick={() => this.goToHomePage()} type="primary">
              Complete
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}

export default withRouter(Confirm);
