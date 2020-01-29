import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./JoinEvent.css";
import { Table, Divider, Tag, Icon, Row, Col, Link, Button } from "antd";
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
        width: "300px"
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
        // render: (date, recode, index) => (
        //   <Col
        //   // style={{ width: "250px" }}
        //   >
        //     <Row>
        //       {/* <h3 className="headingTableEvent">test</h3> */}
        //       <p className="eventDetail">
        //         {/* Order expires 10 Jan 2020, 16.35 */}
        //         {moment(parseInt(date.dateStart)).format("ll")} -{" "}
        //         {moment(parseInt(date.dateEnd)).format("ll")}
        //       </p>
        //       {/* {console.log(moment(parseInt(date.dateStart)).format('ll'))} */}
        //     </Row>
        //   </Col>
        // )
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
