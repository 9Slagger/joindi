import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./JoinEvent.css";
import { Table, Divider, Tag, Icon, Row, Col, Link, Button } from "antd";
import moment from "moment";

const data = [
  {
    key: "1",
    name: "name 1",
    date: {
      dateStart: "1579157782934",
      dateEnd: "1582268182934"
    }
    // status: "Continue Order"
  },
  {
    key: "2",
    name: "Jim Green",
    date: {
      dateStart: "1579157782934",
      dateEnd: "1582268182934"
    }
    // status: "Continue Order"
  },
  {
    key: "3",
    name: "Joe Black",
    date: {
      dateStart: "1579157782934",
      dateEnd: "1582268182934"
    }
    // status: "Continue Order"
  }
];

export default class JoinEvent extends Component {
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
        title: "Join Events",
        dataIndex: "name",
        key: "name",
        render: text => (
          <Row
            type="flex"
            justify="start"
            align="middle"
            // style={{ width: "550px" }}
          >
            <Col
              style={{
                fontSize: "50px",
                color: "#345586",
                paddingRight: "10px"
              }}
            >
              <Icon type="snippets" />
            </Col>
            <Col>
              {/* <Row type="flex"> */}
              <h3 className="headingTableEvent">{text}</h3>
              <p className="eventDetail">
                This's a detail of event so Lorem ipsum
              </p>
              {/* </Row> */}
            </Col>
          </Row>
        )
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date, recode, index) => (
          <Col
          // style={{ width: "250px" }}
          >
            <Row>
              {/* <h3 className="headingTableEvent">test</h3> */}
              <p className="eventDetail">
                {/* Order expires 10 Jan 2020, 16.35 */}
                {moment(parseInt(date.dateStart)).format("ll")} -{" "}
                {moment(parseInt(date.dateEnd)).format("ll")}
              </p>
              {/* {console.log(moment(parseInt(date.dateStart)).format('ll'))} */}
            </Row>
          </Col>
        )
      },
      {
        title: "Time",
        dataIndex: "date",
        key: "time",
        render: date => (
          <Col type="flex" align="center">
            {/* <Button className="btn-paymentStatus">test</Button> */}
            <Row>
              <p className="evenDetail">
                {moment(parseInt(date.dateStart)).format("LT")} -{" "}
                {moment(parseInt(date.dateEnd)).format("LT")}
              </p>
            </Row>
          </Col>
        )
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        onChange={this.handleChange}
        className="tableEvent"
        scroll={{ x: 1200, y: 500 }}
      />
    );
  }
}
