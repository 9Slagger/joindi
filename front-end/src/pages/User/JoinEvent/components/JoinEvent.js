import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./JoinEvent.css";
import {
  Table,
  // Divider, Tag,
  Icon,
  Row,
  Col,
  Tag
  // Link, Button
} from "antd";
import moment from "moment";
import { serviceOrder } from "../../../../_service";
import Axios from "axios";

export default class JoinEvent extends Component {
  state = {
    filteredInfo: null,
    joinEventList: []
  };

  componentDidMount = () => {
    this.getJoinEvents();
  };

  getJoinEvents = async () => {
    try {
      const res = await serviceOrder.getJoinEvents();
      const joinEventList = res.result;
      console.log(joinEventList);
      this.setState({ joinEventList });
    } catch (error) {
      console.log(error);
    }
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
    console.log("result-----", this.state.joinEventList);

    let dataJoinEvent = this.state.joinEventList;

    const columns = [
      {
        title: "Join Events",
        dataIndex: "name",
        width: "250px"
      },
      {
        title: "Ticket",
        dataIndex: "ticket",
        width: "150px"
      },
      {
        title: "Date Start",
        dataIndex: "datestart",
        width: "150px",
        render: (data, recode, index) => (
          <Col>
            <Row>{moment(parseInt(data)).format("ll")}</Row>
          </Col>
        )
      },
      {
        title: "Date End",
        dataIndex: "dateend",
        width: "150px",
        render: (data, recode, index) => (
          <Col>
            <Row>{moment(parseInt(data)).format("ll")}</Row>
          </Col>
        )
      },
      {
        title: "Status",
        dataIndex: "status",
        width: "150px",
        render: (data, recode, index) => (
          <Col>
            <Row>
              <Tag color="green">{data}</Tag>
            </Row>
          </Col>
        )
      }
    ];

    const data = dataJoinEvent.map(detail => {
      return {
        name: detail.ticket_in_orders.map(event => {
          return event.ticket.event.event_name;
        }),
        ticket: detail.ticket_in_orders.map(ticket => {
          return ticket.ticket.ticket_title;
        }),
        datestart: detail.ticket_in_orders.map(event => {
          return event.ticket.event.event_date_start;
        }),
        dateend: detail.ticket_in_orders.map(event => {
          return event.ticket.event.event_date_end;
        }),
        status: detail.ticket_in_orders.map(status => {
          return status.ticket_in_order_status.status_name_en;
        })
      };
    });

    return (
      <Table
        columns={columns}
        dataSource={data}
        onChange={this.handleChange}
        className="tableEvent"
        scroll={{ x: 0, y: 500 }}
      />
    );
  }
}
