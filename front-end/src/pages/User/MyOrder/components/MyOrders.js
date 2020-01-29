import React, { Component } from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import "./MyOrders.css";
import { Table, Icon, Row, Col, Button } from "antd";
import { serviceTicketInOrder } from "../../../../_service/ticketInOrderService";
import { ENDPOINT } from "../../../../_constants/index";

// const data = [
//   {
//     key: "1", // id | order_id
//     myOrder: {
//       // ticket_title | ticket_detail
//       eventName: "Event 1",
//       ticket_title: "Hello"
//     },
//     paymentStatus: "Payment is incomplete", // ticket in order status | code
//     status: "Continue Order" // ticket in order | name
//   },
//   {
//     key: "2",
//     myOrder: {
//       eventName: "Event 1",
//       ticket_title: "Hello"
//     },
//     paymentStatus: "Payment is complete",
//     status: "Successful"
//   },
//   {
//     key: "3",
//     myOrder: {
//       eventName: "Event 1",
//       ticket_title: "Hello"
//     },
//     paymentStatus: "Payment is incomplete",
//     status: "Continue Order"
//   }
// ];
export default class MyOrders extends Component {
  state = {
    filteredInfo: null,
    ticketData: []
  };

  componentDidMount() {
    this.getTicketInOrder();
  }

  async getTicketInOrder() {
    try {
      let ticketInOrder = await serviceTicketInOrder.ticketInOrder();
      console.log("😊😊😊", ticketInOrder);
      let temp = [];

      ticketInOrder.forEach((item, idx) => {
        temp[idx] = {};
        temp[idx].key = idx + 1;
        temp[idx].ticketId = item.ticket_id;
        temp[idx].myOrder = {
          img: `${ENDPOINT}/${item.id}.${item.filename_extension}`,
          eventName: item.event_name,
          ticketTitle: item.ticket_title
        };
        temp[idx].paymentStatus = item.status_code;
        temp[idx].status = item.status_code;
      });
      this.setState({
        filteredInfo: this.state.filteredInfo,
        ticketData: temp
      });
      console.log("this.state.ticketData", this.state.ticketData);
    } catch (error) {
      console.log("error", error);
    }
  }

  handleChange = (pagination, filters) => {
    console.log("Various parameters", pagination, filters);
    this.setState({
      filteredInfo: filters
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null
    });
  };

  render() {
    let { filteredInfo } = this.state;
    console.log("ticketOrser", this.state);

    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "My order",
        dataIndex: "myOrder",
        width: "300px",
        key: "myOrder",
        render: myOrder => (
          <Row type="flex" justify="start" align="middle">
            <Col style={{ fontSize: "50px", color: "#345586" }}>
              <img src={myOrder.img} alt="Event Poster" style={{ height: "50px", width: "auto" }}/>
            </Col>
            <Col>
              <Row>
                <h3 className="headingTableEvent">{myOrder.eventName}</h3>
                <p className="eventDetail">{myOrder.ticketTitle}</p>
              </Row>
            </Col>
          </Row>
        )
      },
      {
        title: "Payment status",
        dataIndex: "paymentStatus",
        width: "150px",
        key: "paymentStatus",
        render: paymentStatus =>
          paymentStatus === "complete" ? (
            <Col>
              <Row>
                <h3 className="headingTableEvent">Complete</h3>
              </Row>
            </Col>
          ) : paymentStatus === "wait_for_payment" ? (
            <Col>
              <Row>
                <h3 className="headingTableEvent">Wait for payment</h3>
              </Row>
            </Col>
          ) : (
            <Col>
              <Row>
                <h3 className="headingTableEvent">Wait for approve</h3>
              </Row>
            </Col>
          )
        // filters: [
        //   { text: "Incomplete", value: "Payment is incomplete" },
        //   { text: "Complete", value: "Payment is complete" }
        // ],
        // filteredValue: filteredInfo.paymentStatus || null,
        // onFilter: (value, record) => record.paymentStatus.includes(value)
      },
      {
        title: "Status",
        dataIndex: "status",
        width: "150px",
        key: "status",
        align: "center",
        render: (status, data) =>
          status === "complete" ? (
            <p className="btn-success">Complete</p>
          ) : status === "wait_for_payment" ? (
            <Link to={`/pay?ticket_in_order_id=${data.ticketId}`}>
              {console.log(data)}
              <Button className="btn-payment">Continue Order</Button>
            </Link>
          ) : (
            <p className="btn-payment">Waiting</p>
          )
      }
    ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.ticketData}
          onChange={this.handleChange}
          className="tableEvent"
          scroll={{ x: 0, y: 300 }}
        />
      </div>
    );
  }
}
