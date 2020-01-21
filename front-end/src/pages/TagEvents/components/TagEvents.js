import React, { Component } from "react";
import "./TagEvents.css";
import { Row, Col, Card } from "antd";
import { serviceTag } from "../../../_service";

export default class TagEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: []
    };
  }

  componentDidMount() {
    this.getTag();
  }

  async getTag() {
    let tagList;
    try {
      const res = await serviceTag.getTag();
      tagList = res.result;
      this.setState({ tagList });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.state.tagList);
    return (
      <div>
        <Row gutter={[24, 40]} type="flex" justify="center">
          {this.state.tagList.map(tagevents => (
            <Col xs={24} sm={12} md={12} lg={12} xl={5}>
              <Card className="cardTagEvents" hoverable>
                <p className="textTagEvents">{tagevents.tag_name_en}</p>
                <p className="textTagEvents">{tagevents.tag_name_th}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
