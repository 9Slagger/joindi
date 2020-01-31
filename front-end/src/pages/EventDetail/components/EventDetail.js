import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
import _ from "lodash";
import { message } from "antd";
import { ENDPOINT } from "../../../_constants";
import { serviceTicketInOrder } from "../../../_service";
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
      children: [],
      a: []
    };
  }

  handleChangeEarlyPrice = (id, e) => {
    const itemIndex = this.state.a.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      let cloneStateA = _.cloneDeep(this.state.a);
      cloneStateA[itemIndex].value = e;
      this.setState(() => ({
        a: cloneStateA
      }));
    } else {
      this.setState(state => ({
        a: [...state.a, { id: id, value: e }]
      }));
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  renderOptions = item => {
    const number_of_tickets = item;
    let array = [];
    for (let i = 0; i <= number_of_tickets; i++) {
      array.push(i);
    }
    return array.map(ent => <Option key={ent}>{ent}</Option>);
  };

  isListOne = list => {
    let isOne = false;
    for (let item of list) {
      let value = parseInt(item.value);
      console.log(item);
      if (value !== 0 && !isOne) {
        console.log("true");
        isOne = true;
      } else if (value !== 0 && isOne) {
        console.log("false--->");
        return false;
      }
    }
    console.log("isone");
    return isOne;
  };

  handleBuyTicket = async () => {
    console.log(this.state.a);
    if (this.isListOne(this.state.a)) {
      const ticketid = this.state.a.map(item => item.id);
      const ticketvalue = this.state.a.map(item => item.value);
      try {
        await serviceTicketInOrder.buyTicket(ticketid[0], ticketvalue[0]);
        this.props.history.push(`/checkout`);
      } catch (error) {
        alert(error.messages.title_en);
      }
    } else {
      message.success("Either one of ticket amount must be zero!!");
    }
  };

  async showData() {
    const { eventId } = this.props.match.params;
    const result = await Axios.get(`http://localhost:8085/event/${eventId}`);
    let temp = () => {
      return {
        id: result.data.result.id,
        event_name: result.data.result.event_name,
        event_address: result.data.result.event_address,
        event_content: result.data.result.event_content,
        event_date: result.data.result.event_date_start,
        event_time: result.data.result.event_date_end,
        event_remark: result.data.result.event_remark,
        event_tags: result.data.result.event_tags.tag_name_en,
        ticket: result.data.result.tickets,
        eventtag: result.data.result.event_tags,
        organized_contacts: result.data.result.organized_contacts,
        bookmarks: result.data.result.bookmarks,
        event_has_image: result.data.result.event_has_image
      };
    };
    this.setState({
      data: temp()
    });
  }

  componentDidMount = async () => {
    this.showData();
  };

  render() {
    return (
      <Row className="event-detail">
        <Col span={24}>
          <Row className="event-info" type="flex" align="middle">
            <Col className="img-info" span={8}>
              {this.state.data.event_has_image && (
                <img
                  src={`${ENDPOINT}/${this.state.data.event_has_image.image.id}.${this.state.data.event_has_image.image.filename_extension}`}
                  alt="event-img"
                  style={{
                    width: "50%",
                    height: "50%"
                  }}
                />
              )}
            </Col>
            <Col className="detail" span={12}>
              <Row className="event-name"> {this.state.data.event_name} </Row>
              <Row className="event-date">
                <Icon type="calendar" />: &nbsp;{" "}
                {moment(parseInt(this.state.data.event_date, 10)).format(
                  "Do MMM YYYY"
                )}
              </Row>
              <Row className="event-date">
                <Icon type="hourglass" />: &nbsp;{" "}
                {moment(parseInt(this.state.data.event_time, 10)).format(
                  "Do MMM YYYY"
                )}
              </Row>
              <Row className="event-date">
                <Icon type="environment" /> Location: &nbsp;
                {this.state.data.event_address}
              </Row>
              <Row className="event-date">
                <Icon type="tags" /> Tags: &nbsp;
                {this.state.data.eventtag
                  ? this.state.data.eventtag.map((item, index) => {
                      return (
                        <Tag
                          key={index}
                          color="#345586"
                          style={{
                            borderColor: "white"
                          }}
                        >
                          {item.tag_name_en}
                        </Tag>
                      );
                    })
                  : ""}
              </Row>
            </Col>
          </Row>
          {/* <Row
            type="flex"
            justify="center"
            align="middle"
            className="event-description"
          > */}
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.data.event_content
            }}
          ></div>
          {/* </Row> */}
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
                            key={item.id}
                          >
                            <Col span={16}> {item.ticket_title} </Col>
                            <Col span={5}>{item.ticket_price} &nbsp; Baht</Col>
                            <Col span={2}>
                              <Row>
                                <Select
                                  defaultValue="0"
                                  onSelect={async e => {
                                    this.handleChangeEarlyPrice(item.id, e);
                                  }}
                                  defaultValue={0}
                                  style={{
                                    width: "60px"
                                  }}
                                >
                                  {this.renderOptions(
                                    item.ticket_total_quantity
                                  )}
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
                        <Button type="primary" onClick={this.handleBuyTicket}>
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
                <Col span={24}>
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
                        <Col span={24}>
                          {this.state.data &&
                            this.state.data.organized_contacts &&
                            this.state.data.organized_contacts.map(contact => (
                              <React.Fragment key={contact.id}>
                                <Row justify="center" align="middle">
                                  <h6>{contact.organized_contact_title}</h6>
                                </Row>
                                <Row>
                                  <h5>{contact.organized_contact}</h5>
                                  <Divider type="horizontal" />
                                </Row>
                              </React.Fragment>
                            ))}
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
