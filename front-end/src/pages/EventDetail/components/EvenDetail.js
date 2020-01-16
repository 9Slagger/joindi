import React, { Component } from "react";
import DefaultLayout from "../../../common/DefaultLayout";
import { Row, Col, Input, Icon, Divider, Tag, Button } from "antd";
import "./EventDetail.css";

export default class EventDetail extends Component {
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
              <Row className="event-name">Event Name</Row>
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
            <div c>
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
                    Tickets
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
              <Row></Row>
              <Row></Row>
            </Col>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    );
  }
}
