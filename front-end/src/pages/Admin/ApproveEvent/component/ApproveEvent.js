import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./ApproveEvent.css";
import { Card, Icon, Row, Col, Button, Input, Modal } from "antd";
import "./approveEvent.json";

const EventStatusModel = [
  {
    EventStatusModel_id: 1,
    user_id: 2,
    event_status_id: 1,
    event_name: "JoinDi 1",
    event_latitude_map: 123,
    event_longitude_map: 456,
    event_date_start: "2020-01-15",
    event_date_end: "2020-01-16",
    event_content:
      '<h4>test<br /><img src="https: //i.ibb.co/GQysSdf/color-Scheme.png" alt="theme" width="795" height="397" /></h4>'
  },
  {
    EventStatusModel_id: 2,
    user_id: 2,
    event_status_id: 2,
    event_name: "JoinDi 2",
    event_latitude_map: 123,
    event_longitude_map: 456,
    event_date_start: "2020-01-15",
    event_date_end: "2020-01-16",
    event_content:
      '<h4>test<br /><img src="https: //i.ibb.co/GQysSdf/color-Scheme.png" alt="theme" width="795" height="397" /></h4>'
  },
  {
    EventStatusModel_id: 3,
    user_id: 2,
    event_status_id: 3,
    event_name: "JoinDi 3",
    event_latitude_map: 123,
    event_longitude_map: 456,
    event_date_start: "2020-01-15",
    event_date_end: "2020-01-16",
    event_content:
      '<h4>test<br /><img src="https: //i.ibb.co/GQysSdf/color-Scheme.png" alt="theme" width="795" height="397" /></h4>'
  }
];

const { TextArea } = Input;
const { Search } = Input;

export default class ApproveEvent extends Component {
  state = {
    key: "tab1",
    noTitleKey: "app",
    loading: false,
    visible: false,
    value: "",
    nameEvent: "",
    status: "",
    theData: EventStatusModel
  };

  onTabChange = (key, type) => {
    // console.log(key, type);
    this.setState({ [type]: key });
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  
  handleCancel = () => {
    this.setState({ visible: false });
  };
  
  handleSend = () => {
    console.log('send')        
  }

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
      Waiting: this.state.theData
        .filter(item => {
          // console.log(item.event_status_id === 1);
          // console.log(item.event_status_id);
          return item.event_status_id === 1;}
          )
        .map(obj => {
          return (
            <div>
              <Card className="card-list">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Link className="link-event">
                      {obj.event_name}
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        border: "none",
                        color: "#345586"
                      }}
                      shape="circle"
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
                      onClick={this.showModal}
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
      Approved: this.state.theData
        .filter(item => item.event_status_id === 2)
        .map(obj => {
          console.log("Approved", this.state.theData);
          return (
            <div>
              <Card className="card-list">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Link className="link-event">
                      {obj.event_name}
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        border: "none",
                        color: "#345586"
                      }}
                      shape="circle"
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
                      onClick={this.showModal}
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
      Rejected: this.state.theData
        .filter(item => item.event_status_id === 3)
        .map(obj => {
          console.log("Rejected", this.state.theData);
          return (
            <div>
              <Card className="card-list">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Link className="link-event">
                      {obj.event_name}
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      style={{
                        border: "none",
                        color: "#345586"
                      }}
                      shape="circle"
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
                      onClick={this.showModal}
                    >
                      <Icon type="close-circle" style={{ fontSize: "25px" }} />
                    </Button>
                  </Col>
                </Row>
              </Card>
              <br />
            </div>
          );
        })
    };

    this.showModal = () => {
      this.setState({
        visible: true
      });
    };

    return (
      <div>
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
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="detail-approve-modal"
            />
          </Row>
          <Row style={{ textAlign: "center" }}>
            <br />
            {/* <Button className="btn-cancle" onClick={}>Cancle</Button> */}
            {/* &nbsp; */}
            <Button className="btn-send" onclick={this.handleSend}>Send</Button>
          </Row>
        </Modal>
      </div>
    );
  }
}
