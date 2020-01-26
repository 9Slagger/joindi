import React, { Component } from "react";
import "./Bookmark.css";
import CardEvents from "../../../../common/CardEvents";
import { Row, Col, Divider } from "antd";

export default class Bookmark extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col className="colTextBookmark">
            <Divider orientation="left">
              <h3 className="textBookMark">Bookmark</h3>
            </Divider>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col xs={24} sm={16} md={12} lg={10} xl={5} className="colCardEventBookmark">
            <CardEvents/>
          </Col>

          <Col xs={24} sm={16} md={12} lg={10} xl={5} className="colCardEventBookmark">
            <CardEvents/>
          </Col>


          <Col xs={24} sm={16} md={12} lg={10} xl={5} className="colCardEventBookmark">
            <CardEvents/>
          </Col>


          <Col xs={24} sm={16} md={12} lg={10} xl={5} className="colCardEventBookmark">
            <CardEvents/>
          </Col>


          <Col xs={24} sm={16} md={12} lg={10} xl={5} className="colCardEventBookmark">
            <CardEvents/>
          </Col>


          <Col xs={24} sm={16} md={12} lg={10} xl={5} className="colCardEventBookmark">
            <CardEvents/>
          </Col>


         

         
          
          
          
        </Row>
      </div>
    );
  }
}
