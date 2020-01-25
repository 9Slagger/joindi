import React, { Component } from "react";
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
} from  "antd";
import "./EventDetail.css";
import Axios from "axios";

const { Option } = Select;

const children = [];
for (let i = 0; i < 10; i++) {
  children.push(<Option key={i}>{i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class EventDetail extends Component {
  state = { visible: false };

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

  hangleBuyTicket = id => async () => {
    // TODO: call api if success go to page checkout if fail alert buy ticket fail
  }

  handleBookmark = () => {
    console.log("✡️",this.props.match.params.eventId)
    Axios.post('http://localhost:8085/bookmark',{ 
      event_id : this.props.match.params.eventId
    }).then(result => {
      console.log(result.data)
    }).catch(error => {
      console.log(error.message)
    })
  }

  render() {
    return (
      <Row className="event-detail">
        <Col span={24}>
          <Row className="event-info" type="flex" align="middle">
            <Col className="img-info" span={8}>
              <img
                src="https://p-u.popcdn.net/events/poster_a4s/000/006/779/large/001_Poster-Image.jpg?1575465335"
                alt="event-img"
                style={{ width: "50%", height: "50%" }}
              />
            </Col>
            <Col className="detail" span={12}>
              <Row >
              <Col span={2} style={{fontSize:"30px"}} ><Icon type="book" onClick={this.handleBookmark} /></Col>
                <Col className="event-name" span={20}>Event Name</Col>
                </Row>
              <Row className="event-date">
                <Icon type="calendar" /> : 12 Dec 2020 &nbsp;
                <Icon type="hourglass" /> : 10:00 am - 5:00 pm.
              </Row>
              <Row className="event-date">
                <Icon type="environment" /> Location : Bangna , Bkk
              </Row>
              <Row className="event-date">
                <Icon type="tags" /> Tags : &nbsp;
                <Tag color="#345586" style={{ borderColor: "white" }}>
                  A1
                </Tag>
                <Tag color="#345586" style={{ borderColor: "white" }}>
                  A2
                </Tag>
                <Tag color="#345586" style={{ borderColor: "white" }}>
                  A3
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
            <div>
              DREAMER พร้อมจะมา Let’s BLEND
              กับเฟสติวัลสุดมันส์ในมหานครในฝันรึยัง !? BLEND 285 Signature
              presents BANGKOK OF DREAMS 2020 จัดเต็ม 2 Stage ทั้ง Main Stage
              และ Stage ลับ กับดีเจสาย Techno อีกเพียบ
              พร้อมโปรดักชั่นสุดประทับใจ
            </div>
          </Row>
          <Divider />
          <Row type="flex" align="middle" className="event-ticket">
            <Col span={24}>
              <Row>
                <Col span={16}>
                  <Row type="flex" align="middle">
                    <b>Tickets</b>
                  </Row>
                </Col>
                <Col span={5}>
                  <Row type="flex" justify="end" align="middle">
                    <Input
                      placeholder="Enter Promotion Code"
                      style={{ width: "200px" }}
                    />
                  </Row>
                </Col>
                <Col span={3}>
                  <Row type="flex" justify="end" align="middle">
                    <Button>Apply</Button>
                  </Row>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={24}>
                  <Row type="flex" justify="end" align="middle">
                    <Col span={16}>Early Bird</Col>
                    <Col span={5}>1,900 Baht</Col>
                    <Col span={2}>
                      <Row>
                        <Select
                          defaultValue="0"
                          onChange={handleChange}
                          style={{ width: "60px" }}
                        >
                          {children}
                        </Select>
                      </Row>
                    </Col>
                  </Row>
                  <Divider />
                  <Row type="flex" justify="end" align="middle">
                    <Col span={16}>Normal</Col>
                    <Col span={5}>2,900 Baht</Col>
                    <Col span={2}>
                      <Row>
                        <Select
                          defaultValue="0"
                          onChange={handleChange}
                          style={{ width: "60px" }}
                        >
                          {children}
                        </Select>
                      </Row>
                    </Col>
                  </Row>
                  <Divider />
                  <Row type="flex" align="middle">
                    <Col className="ps" span={22}>
                      <Row>*All Prices exclude VAT</Row>
                      <Row>*Some fees may be applied</Row>
                    </Col>
                    <Col span={2}>
                      <Row type="flex" justify="end" align="middle">
                        <Button type="primary" onClick={this.hangleBuyTicket(1)}>Buy Ticket</Button>
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
                    style={{ width: "50%", height: "50%" }}
                  />
                </Col>
                <Col span={14}>
                  <Row>Organized by</Row>
                  <Row>Zaap Party</Row>
                </Col>
                <Col span={6}>
                  <Row type="flex" justify="end" align="middle">
                    <Button
                      type="link"
                      style={{ color: "#345586" }}
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
                        <h2>Organized by</h2>
                      </Row>
                      <Row
                        type="flex"
                        justify="center"
                        align="middle"
                        style={{ border: "1px solid #345586" }}
                      >
                        <Col span={8}>
                          <Row type="flex" justify="center">
                            <img
                              src="https://p-u.popcdn.net/organizers/avatars/000/000/021/thumb/10670031_655476147898254_4774340467057592600_n.jpg?1493105685"
                              alt="img-organized"
                              style={{ width: "50%", height: "50%" }}
                            />
                          </Row>
                          <Row type="flex" justify="center">
                            <h6>ZAAP Party</h6>
                          </Row>
                        </Col>
                        <Col span={16}>
                          <Row>
                            <h6>Facebook</h6>
                          </Row>
                          <Row>
                            <h5>facebook.com/bangkokofdreams/</h5>
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
