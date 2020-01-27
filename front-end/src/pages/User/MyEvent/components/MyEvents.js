import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Link } from  "react-router-dom";
import "./MyEvents.css";
import { Table, Divider, Tag, Icon, Row, Col, Button } from "antd";
import moment from "moment";
import Axios from "axios";
import { serviceEvent, serviceTag } from "../../../../_service";



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
export default class MyEvents extends Component {
  state = {
    filteredInfo: null,
    myEvent:[]
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
  render() {
    console.log("👍",this.state.myEvent)
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    let dataMyEvent = this.state.myEvent;
    

    const columns = [
      {
        title: "My Events",
        dataIndex: "name",
        width:"300px",
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
        width:"150px",
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
      },{
        title: "User Join Event",
        dataIndex: "userjoin",
        width:"150px",
        key: "userjoin",
        render: (date, recode, index) => (
          <Col>
            <Row>
              <Button>xxxx</Button>
            </Row>
          </Col>
        )
      },{
        title: "Status",
        dataIndex: "status",
        width:"100px",
        key: "status",
        render: (date, recode, index) => (
          <Col
          // style={{ width: "250px" }}
          >
            <Row>
              <Tag  color="blue">Approve</Tag>
            </Row>
          </Col>
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
          scroll={{ x: 0, y: 500 }}
        />
        <Row type="flex" justify="center">
          <Link to="/createevents"><Button className="buttonAddNewEvents">Add New Events<Icon type="plus-circle" /></Button></Link>
        </Row>
      </div>
    );
  }
}
