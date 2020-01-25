import React, { Component } from "react";
import { Button, Row, Col, Table, Upload, Icon,
  // message
} from "antd";

// import * as constants from "../../../_constants";

import "antd/dist/antd.css";
import "./Pay.css";

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

// const props = {
//   name: "file",
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   headers: {
//     authorization: "authorization-text"
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   }
// };

export default class Pay extends Component {
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

  renderPayment = () => (
    <div id="total-div" className="mt-4">
      <h3 className="p-2">Payment</h3>
      <Table
        columns={totalColumns}
        dataSource={this.state.ticketLists}
        pagination={false}
      />
    </div>
  );
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
    <div id="upload-payment-slip-div" className="border mt-4 p-3">
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    </div>
  );

  render() {
    console.log(this.state);
    return (
      <section id="checkout-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderPayment()}
        {this.renderBankAccount()}
        {this.renderUploadPaymentSlip()}

        <Row className="mt-4">
          <Col span={24} className="text-right">
            <Button type="primary">
              <i className="far fa-check-square mr-2"></i>Confirm
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}
