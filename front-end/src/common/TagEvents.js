import React, { Component } from "react";
import "../css/TagEvents.css";
import { Row, Col, Card } from "antd";
import { serviceTag } from "../_service";
import { Link } from "react-router-dom";
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
    console.log("this.state.tagList", this.state.tagList);
    return (
      <div>
        <Row gutter={[24, 40]} type="flex" justify="center">
          {this.state.tagList.map(tagevents => (
            <Col key={tagevents.id} xs={24} sm={12} md={12} lg={12} xl={5}>
              <Link to={`/searchtag/${tagevents.id}`}>
                <Card className="cardTagEvents" hoverable>
                  <p className="textTagEvents">{tagevents.tag_name_en}</p>
                  <p className="textTagEvents">{tagevents.tag_name_th}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
