import React, { Component } from "react";

import { Button, Row, Col } from "antd";

import { withRouter } from "react-router-dom";

import Axios from "../../../_helper/axios";

import _ from "lodash";

import UploadForm from "./UploadForm";

// import * as constants from  "../../../_constants";

import "antd/dist/antd.css";
import "./Pay.css";

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketLists: [],
      ticket_in_order_id: null,
      isUploaded: false
    };

    this.callBackDatas.bind(this);
  }

  componentDidMount = async () => {
    // console.log(this.props.location.search);
    let ticket_in_order_id = "";
    try {
      let res = this.props.location.search.split("=");
      ticket_in_order_id = res[1];
      await this.getTicketInOrderDatas(ticket_in_order_id);
    } catch (err) {
      console.error(err);
    }
  };

  goToConfirmPage = ticket_in_order_id => {
    console.log(ticket_in_order_id);

    // console.log(this.state.isUploaded);

    if (this.state.isUploaded) {
      Axios.put(`/ticketInOrder/${ticket_in_order_id}`, {
        ticket_in_order_status_id: 3
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
      this.props.history.push({
        pathname: `/confirm`,
        search: `?ticket_in_order_id=${ticket_in_order_id}`
      });
    } else {
      alert("Please upload payslip first.");
    }
  };

  getTicketInOrderDatas = async ticket_in_order_id => {
    let res;
    try {
      res = await Axios.get(
        `/ticketInOrder/wait_for_payment/${ticket_in_order_id}`
      );
      this.setState({
        ticketLists: res.data,
        ticket_in_order_id: ticket_in_order_id
      });
    } catch (error) {
      console.log(error);
    }
  };

  callBackDatas = async datas => {
    // console.log("callBack");
    // console.log(datas);
    await this.setState({
      ticketLists: this.state.ticketLists
    });
    // console.log(this.state);

    // console.log("google");

    //table: ticket_order_has_image, images
    //Insert image datas
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    // if (!_.isEmpty(datas[0])) {
    Axios.post(`/image`, datas, config)
      .then(res => {
        Axios.post(`/ticketInOrderHasImage`, {
          ticket_in_order_id: this.state.ticket_in_order_id,
          image_id: res.data.id
        })
          .then(res => {
            console.log(res);
            this.setState({
              ticketLists: this.state.ticketLists,
              isUploaded: true
            });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
    // }
  };

  renderProcess = () => (
    <div id="process-div" className="mt-2 mb-2">
      <Row className="text-center">
        <Col offset={6} span={4}>
          <Button type="primary" className="active">
            {" "}
            1{" "}
          </Button>
          <p>Pay</p>
        </Col>
        <Col span={4}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={4}>
          <Button type="primary"> 2 </Button>
          <p>Confirm</p>
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
            <Col span={12} className="text-right">
              <Row>
                <Col span={24}>
                  <img
                    src="./images/scb.png"
                    style={{ width: "90px", height: "90px" }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={8} className="">
              <Row className="bg-white">
                <Col span={24}>
                  <p>{"ธนาคาร ไทยพานิชย์"}</p>
                  <p>{"ชื่อบัญชี นาย จอน โด"}</p>
                </Col>
              </Row>
              <Row className="bg-white">
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
      <UploadForm sendDataToParent={this.callBackDatas} />
    </div>
  );

  render() {
    console.log(this.state);
    let ticket_in_order_id = this.state.ticket_in_order_id;
    return (
      <section id="checkout-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderPayment()}
        {this.renderBankAccount()}
        {this.renderUploadPaymentSlip()}

        <Row className="mt-4 mb-3">
          <Col span={24} className="text-right">
            <Button
              onClick={() => this.goToConfirmPage(ticket_in_order_id)}
              type="primary"
            >
              <i className="far fa-check-square mr-2"></i>Confirm
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}

export default withRouter(Pay);
