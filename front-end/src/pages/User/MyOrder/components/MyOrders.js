import React, { Component } from "react";
import "antd/dist/antd.css";
// import { Link } from  "react-router-dom";
import "./MyOrders.css";
import { Table,  Icon, Row, Col, Button } from "antd";


const data = [
  {
    key: "1", // id | order_id
    myOrder: "name 1", // ticket_title | ticket_detail
    paymentStatus: "Payment is incomplete", // ticket in order status | code
    status: "Continue Order" // ticket in order | name
  },
  {
    key: "2",
    myOrder: "Jim Green",
    paymentStatus: "Payment is complete",
    status: "Successful"
  },
  {
    key: "3",
    myOrder: "Joe Black",
    paymentStatus: "Payment is incomplete",
    status: "Continue Order"
  }
];
export default class MyOrders extends Component {
  state = {
    filteredInfo: null
  };

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
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "My order",
        dataIndex: "myOrder",
        width:"300px",
        key: "myOrder",
        render: myOrder => (
          <Row type="flex" justify="start" align="middle">
            <Col style={{ fontSize: "50px", color: "#345586" }}>
              <Icon type="snippets" />
            </Col>
            <Col>
              <Row>
                <h3 className="headingTableEvent">{myOrder}</h3>
                <p className="eventDetail">
                  This's a detail of event so Lorem ipsum dolor sit amet
                </p>
              </Row>
            </Col>
          </Row>
        )
      },
      {
        title: "Payment status",
        dataIndex: "paymentStatus",
        width:"150px",
        key: "paymentStatus",
        render: paymentStatus => (
          <Col>
            <Row>
              <h3 className="headingTableEvent">{paymentStatus}</h3>
              {/* <p className="eventStatusDetail">
                Order expires 10 Jan 2020, 16.35
              </p> */}
            </Row>
          </Col>
        ),
        filters: [
          { text: "Incomplete", value: "Payment is incomplete" },
          { text: "Complete", value: "Payment is complete" }
        ],
        filteredValue: filteredInfo.paymentStatus || null,
        onFilter: (value, record) => record.paymentStatus.includes(value)
      },
      {
        title: "Status",
        dataIndex: "status",
        width:"150px",
        key: "status",
        render: status =>
          status === "Successful" ? (
            <Button className="btn-success">{status}</Button>
          ) : (
            <Button className="btn-payment">{status}</Button>
          )
      }
    ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          className="tableEvent"
          scroll={{ x: 0, y: 300 }}
        />
      </div>
    );
  }
}
