import React, { Component } from "react";
import "./Bookmark.css"
import { Row, Col, Divider } from "antd";

export default class Bookmark extends Component {
  render() {
    return (
      <Row>
        <Col className="colTextBookmark">
          <Divider orientation="left">
            <h3 className="textBookMark">Bookmarks</h3>
          </Divider>
        </Col>

        <Col>
        {/* <CardEvents/> */}
<p>xcvbnm,.;lkjhgfdsaqwertyuiop</p>
        
        </Col>
      </Row>
    );
  }
}
