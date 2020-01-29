import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import "./MyEvents.css";
import { Table, Divider, Tag, Icon, Row, Col, Button, Modal } from "antd";
import Column from "antd/lib/table/Column";
import moment from "moment";
import Axios from "axios";
import { serviceEvent, serviceTag } from "../../../../_service";

export default class MyEvents extends Component {
  state = {
    filteredInfo: null,
    myEvent: [],
    visible: false
  };

  fetchdata = () => {
    Axios.get("http://localhost:8085/event/myevents").then(result => {
      // console.log(result)
      this.setState({ myEvent: result.data.result });
    });
  };

  handleChange = (pagination, filters) => {
    console.log("Various parameters", pagination, filters);
    this.setState({
      filteredInfo: filters
    });
  };

  componentDidMount() {
    this.fetchdata();
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    console.log("👍", this.state.myEvent);
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    let dataMyEvent = this.state.myEvent;

    const columns = [
      {
        title: "My Events",
        dataIndex: "name",
        width: "200px"
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
      // {
      //   title: "Users Join Event",
      //   dataIndex: "usersjoin",
      //   width: "150px",
      //   render: (data, recode, index) => (
      //     <Col>
      //       <Row>
      //         <Button onClick={this.showModal}>Users Join Event</Button>
      //         <Modal
      //           title="Basic Modal"
      //           visible={this.state.visible}
      //           onOk={this.handleOk}
      //           onCancel={this.handleCancel}
      //         >
      //           <p>Some contents...</p>
      //           <p>Some contents...</p>
      //           <p>Some contents...</p>
      //         </Modal>
      //       </Row>
      //     </Col>
      //   )
      // },
      {
        title: "Status",
        dataIndex: "status",
        width: "150px",
        render: (data, recode, index) => (
          <Col>
            <Row>
              {data == "approved" ? (
                <Tag color="green">{data}</Tag>
              ) : data == "pending approve" ? (
                <Tag color="blue">{data}</Tag>
              ) : (
                <Tag color="red">{data}</Tag>
              )}
            </Row>
          </Col>
        )
      }
    ];

    const data = dataMyEvent.map(detail => {
      return {
        name: detail.event_name,
        datestart: detail.event_date_start,
        dateend: detail.event_date_end,
        status: detail.event_status.status_name_en
      };
    });

    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          // onChange={this.handleChange}
          className="tableEvent"
          scroll={{ x: 0, y: 500 }}
        />

        <Row type="flex" justify="center">
          <Link to="/createevents">
            <Button className="buttonAddNewEvents">
              Add New Events
              <Icon type="plus-circle" />
            </Button>
          </Link>
        </Row>
      </div>
    );
  }
}
