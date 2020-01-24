import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";

import {
  Row,
  Col,
  Input,
  Icon,
  Divider,
  Tag,
  Button,
  Select,
  Modal
} from "antd";
import "./EventDetail.css";

const { Option } = Select;

class EventDetail extends Component {
  // export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: {},
      earlyprice: "",
      normalprice: "",
      children: []
    };
  }

  handleChangeEarlyPrice = e => {};

  handleChangeNormalPrice = e => {};

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

  renderOptions = (item) => {
    const number_of_tickets = item;
    let array = []
    for(let i = 1; i<=number_of_tickets; i++){
      array.push(i)
    }
    return array.map(ent => (
      <Option key={ent}>{ent}</Option>
    ));
  };

  hangleBuyTicket = id => async () => {
    // TODO: call api if success go to page checkout if fail alert buy ticket fail
  };
  async showData() {
    const result = await Axios.get("http://localhost:8085/event/1");

    let temp = () => {
      const s = moment(`${result.data.result.event_date_start}`);
      const startdate = s.format("DD MMM YYYY");
      const e = moment(`${result.data.result.event_date_end}`);
      const enddate = e.format("DD MMM YYYY");

      const showalldate = startdate + " - " + enddate;
      const showeventdate = startdate == enddate ? startdate : showalldate;

      const starttime = s.format("LT");
      const endtime = e.format("LT");

      const showeventtime = starttime + " - " + endtime;

      // console.log(item.tickets[0].ticket_price)
      return {
        id: result.data.result.id,
        event_name: result.data.result.event_name,
        event_address: result.data.result.event_address,
        event_date: showeventdate,
        event_time: showeventtime,
        event_address: result.data.result.event_address,
        event_remark: result.data.result.event_remark,
        event_tags: result.data.result.event_tags.tag_name_en,
        ticket: result.data.result.tickets.map(item => ({
          ticket_title: item.ticket_title,
          ticket_detail: item.ticket_detail,
          ticket_note: item.ticket_note,
          ticket_total_quantity: item.ticket_total_quantity,
          ticket_remaining_quantity: item.ticket_remaining_quantity,
          ticket_price: item.ticket_price
        })),
        eventtag: result.data.result.event_tags.map(item => ({
          ticket_price: item.ticket_price
        }))
      };
    };
    this.setState({
      data: temp()
    });
  }

  componentDidMount = async () => {
    this.showData();
    // setInterval(
    //   ()=>this.showData(),
    //   200000
    // )
  };

  render() {
    console.log(this.state.data);
    const { data } = this.state;
    console.log(data.ticket);
    return (
      <Row className="event-detail">
        <Col span={24}>
          <Row className="event-info" type="flex" align="middle">
            <Col className="img-info" span={8}>
              <img
                src="https://p-u.popcdn.net/events/poster_a4s/000/006/779/large/001_Poster-Image.jpg?1575465335"
                alt="event-img"
                style={{
                  width: "50%",
                  height: "50%"
                }}
              /> 
            </Col> 
            <Col className="detail" span={12}>
              <Row className="event-name"> {this.state.data.event_name} </Row> 
              <Row className="event-date">
                <Icon type="calendar" />: &nbsp; {this.state.data.event_date} 
              </Row> 
              <Row className="event-date">
                <Icon type="hourglass" />: &nbsp; {this.state.data.event_time} 
              </Row> 
              <Row className="event-date">
                <Icon type="environment" /> Location: &nbsp; 
                {this.state.data.event_address} 
              </Row> 
              <Row className="event-date">
                <Icon type="tags" /> Tags: &nbsp; 
                <Tag
                  color="#345586"
                  style={{
                    borderColor: "white"
                  }}
                >
                  {this.state.data.event_tags} 
                </Tag> 
              </Row> 
            </Col> 
          </Row> 
          <Row
            type="flex"
            justify="center"
            align="middle"
            className="event-description"
          >
            <div> {this.state.data.event_remark} </div> 
          </Row> 
          <Divider />
          <Row type="flex" align="middle" className="event-ticket">
            <Col span={24}>
              <Row>
                <Col span={16}>
                  <Row type="flex" align="middle">
                    <b> Tickets </b> 
                  </Row> 
                </Col> 
                <Col span={5}>
                  <Row type="flex" justify="end" align="middle">
                    <Input
                      placeholder="Enter Promotion Code"
                      style={{
                        width: "200px"
                      }}
                    /> 
                  </Row> 
                </Col> 
                <Col span={3}>
                  <Row type="flex" justify="end" align="middle">
                    <Button> Apply </Button> 
                  </Row> 
                </Col> 
              </Row> 
              <Divider />
              <Row>
                <Col span={24}>
                  {this.state.data.ticket
                    ? this.state.data.ticket.map((item, index) => {
                        return (
                          <Row
                            type="flex"
                            justify="end"
                            align="middle"
                            key={index}
                          >
                            <Col span={16}> {item.ticket_title} </Col> 
                            <Col span={5}>
                               
                              {item.ticket_price} &nbsp; Baht 
                            </Col> 
                            <Col span={2}>
                              <Row>
                                <Select
                                  defaultValue="1"
                                  onChange={e => this.handleChangeEarlyPrice(e)}
                                  style={{
                                    width: "60px"
                                  }}
                                >
                                  {this.renderOptions(item.ticket_total_quantity)}
                                </Select> 
                              </Row> 
                            </Col> 
                          </Row>
                        );
                      })
                    : ""} 
                  <Divider />
                  <Row type="flex" align="middle">
                    <Col className="ps" span={22}>
                      <Row> * All Prices exclude VAT </Row> 
                      <Row> * Some fees may be applied </Row> 
                    </Col> 
                    <Col span={2}>
                      <Row type="flex" justify="end" align="middle">
                        <Button
                          type="primary"
                          onClick={this.hangleBuyTicket(1)}
                        >
                          Buy Ticket 
                        </Button> 
                      </Row> 
                    </Col> 
                  </Row> 
                </Col> 
              </Row> 
            </Col> 
          </Row> 
          <Divider />
          <Row className="Organized">
            <Col>
              <Row type="flex" align="middle">
                <Col span={4}>
                  <img
                    src="https://p-u.popcdn.net/organizers/avatars/000/000/021/thumb/10670031_655476147898254_4774340467057592600_n.jpg?1493105685"
                    alt="img-organized"
                    style={{
                      width: "50%",
                      height: "50%"
                    }}
                  /> 
                </Col> 
                <Col span={14}>
                  <Row> Organized by </Row> <Row> Zaap Party </Row> 
                </Col> 
                <Col span={6}>
                  <Row type="flex" justify="end" align="middle">
                    <Button
                      type="link"
                      style={{
                        color: "#345586"
                      }}
                      onClick={this.showModal}
                    >
                      Contact 
                    </Button> 
                    <Modal
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={null}
                      //style={{ width: "800px" }}
                    >
                      <Row>
                        <h2> Organized by </h2> 
                      </Row> 
                      <Row
                        type="flex"
                        justify="center"
                        align="middle"
                        style={{
                          border: "1px solid #345586"
                        }}
                      >
                        <Col span={8}>
                          <Row type="flex" justify="center">
                            <img
                              src="https://p-u.popcdn.net/organizers/avatars/000/000/021/thumb/10670031_655476147898254_4774340467057592600_n.jpg?1493105685"
                              alt="img-organized"
                              style={{
                                width: "50%",
                                height: "50%"
                              }}
                            /> 
                          </Row> 
                          <Row type="flex" justify="center">
                            <h6> ZAAP Party </h6> 
                          </Row> 
                        </Col> 
                        <Col span={16}>
                          <Row>
                            <h6> Facebook </h6> 
                          </Row> 
                          <Row>
                            <h5> facebook.com / bangkokofdreams / </h5> 
                          </Row> 
                        </Col> 
                      </Row> 
                    </Modal> 
                  </Row> 
                </Col> 
              </Row> 
            </Col> 
          </Row> 
        </Col> 
      </Row>
    );
  }
}

export default EventDetail;
