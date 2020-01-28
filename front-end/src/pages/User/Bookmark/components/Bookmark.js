import React, { Component } from "react";
import "./Bookmark.css";
import CardEvents from "../../../../common/CardEvents";
import { Row, Col, Divider } from "antd";
import { serviceBookmark } from "../../../../_service";

export default class Bookmark extends Component {
  state = {
    myBookmarkList: [
      {
        event: {
          event_name: "",
          event_address: "",
          event_date_start: "",
          event_tags: []
        }
      }
    ]
  };

  componentDidMount = () => {
    this.getBookmark();
  };

  getBookmark = async () => {
    try {
      const res = await serviceBookmark.getBookmark();
      const myBookmarkList = res.result;
      console.log(myBookmarkList);
      this.setState({ myBookmarkList });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { myBookmarkList } = this.state;
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
          {myBookmarkList.map(event => (
            <Col
              xs={24}
              sm={16}
              md={12}
              lg={10}
              xl={5}
              className="colCardEventBookmark"
              key={event.id + 'CardEventBookmark'}
            >
              <CardEvents event={event.event} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
