import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./ApproveEvent.css";
import { Card, Icon, Row, Col, Button, Input, Modal } from "antd";
import "./approveEvent.json";
import { serviceEvent } from "../../../../_service";

const { TextArea } = Input;
const { Search } = Input;

export default class ApproveEvent extends Component {
  state = {
    key: "tab1",
    noTitleKey: "app",
    loading: false,
    visible: false,
    nameEvent: "",
    status: "",
    value: "",
    eventList: []
  };

  componentDidMount() {
    this.getEventAdmin()
  }

 async getEventAdmin() {
   try {
     let eventList = await serviceEvent.getEventAdmin()
     eventList = eventList.result
     this.setState({ eventList });
   } catch (error) {
     console.log("error", error);
   }
  }
 
  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  onChange = ({ target: { value } }) => {
    // console.log('remark',value)
    this.setState({ value });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSendReject = id => {
    let theData = [...this.state.eventList];
    theData[id - 1].event_remark = this.state.value;
    theData[id - 1].event_status_id = 3;
    console.log(
      "send",
      id,
      "status",
      theData[id - 1].event_status_id,
      "remark",
      theData[id - 1].event_remark
    );
    this.setState({ theData });
    this.setState({ visible: false });
    this.setState({ value: "" });
    
  };

  handleApprove = id => {
    let theData = [...this.state.eventList];
    theData[id - 1].event_status_id = 2;
    this.setState({ theData });
    console.log("approve", theData);
  };

  handleContent = () => {
    console.log("Content");
  };

  render() {
    const { visible, value } = this.state;
    const tabListNoTitle = [
      {
        key: "Waiting",
        tab: (
          <span className="sub-header-admin">
            <Icon type="question-circle" />
            Waiting
          </span>
        )
      },
      {
        key: "Approved",
        tab: (
          <span className="sub-header-admin">
            <Icon type="check-circle" />
            Approve
          </span>
        )
      },
      {
        key: "Rejected",
        tab: (
          <span className="sub-header-admin">
            <Icon type="close-circle" />
            Rejected
          </span>
        )
      }
    ];

    const contentListNoTitle = {
      Waiting: this.state.eventList
        .filter(item => item.event_status_id === 1)
        .map(obj => {
          return (
            <div key={obj.id}>
              <Card className="card-list">
                <Row type="flex" justify="space-between">
                  <Col onClick={this.handleContent}>
                    <span className="link-event">{obj.event_name}</span>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        border: "none",
                        color: "#345586"
                      }}
                      shape="circle"
                      onClick={() => this.handleApprove(`${obj.id}`)}
                    >
                      <Icon type="check-circle" style={{ fontSize: "25px" }} />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      style={{
                        border: "none",
                        color: "#8D021F"
                      }}
                      shape="circle"
                      onClick={() => this.showModal(obj.id, obj.event_remark)}
                    >
                      <Icon type="close-circle" style={{ fontSize: "25px" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
              <br />
            </div>
          );
        }),
      Approved: this.state.eventList
        .filter(item => item.event_status_id === 2)
        .map(obj => {
          return (
            <div key={obj.id}>
              <Card className="card-list">
                <Row type="flex" justify="space-between">
                  <Col onClick={this.handleContent}>
                    <span className="link-event">{obj.event_name}</span>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        border: "none",
                        color: "#8D021F"
                      }}
                      shape="circle"
                      onClick={() => this.showModal(obj.id)}
                    >
                      <Icon type="close-circle" style={{ fontSize: "25px" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
              <br />
            </div>
          );
        }),
      Rejected: this.state.eventList
        .filter(item => item.event_status_id === 3)
        .map(obj => {
          return (
            <div key={obj.id}>
              <Card className="card-list">
                <Row type="flex" justify="space-between">
                  <Col onClick={this.handleContent}>
                    <span className="link-event">{obj.event_name}</span>
                  </Col>
                  <Col className="modal-remark">{obj.event_remark}</Col>
                  <Col>
                    <Button
                      style={{
                        border: "none",
                        color: "#345586"
                      }}
                      shape="circle"
                      onClick={() => this.handleApprove(`${obj.id}`)}
                    >
                      <Icon type="check-circle" style={{ fontSize: "25px" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
              <br />
            </div>
          );
        })
    };

    this.showModal = id => {
      this.setState({
        visible: true,
        status: id
      });
    };

    return (
      <div className="approveEvent">
        <Card
          style={{
            width: "100%",
            textAlign: "center"
          }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, "noTitleKey");
          }}
          bordered={false}
        >
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: "70vh" }}
          />
          <br />
          <br />
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>

        <Modal visible={visible} footer={null} onCancel={this.handleCancel}>
          <Row>
            <span className="head-modal-approve-payment">Reject</span>
            <hr className="line-head-modal" />
            <TextArea
              value={value}
              onChange={this.onChange}
              placeholder="รายละเอียดที่ต้องแก้ไข.."
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="detail-approve-modal"
            />
          </Row>
          <Row style={{ textAlign: "center" }}>
            <br />
            <Button
              className="btn-send"
              onClick={() => this.handleSendReject(this.state.status)}
            >
              Send
            </Button>
          </Row>
        </Modal>
      </div>
    );
  }
}
