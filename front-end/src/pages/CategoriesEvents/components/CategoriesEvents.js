import React, { Component } from "react";
import "./CategoriesEvents.css";
import CardEvents from "../../../common/CardEvents";
import {serviceEvent} from "../../../_service"
import { Row, Col } from "antd";

export default class CategoriesEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorieAndEventList: []
    };
  }

  componentDidMount() {
    this.getCategorieAndEvents();
  }


  async getCategorieAndEvents() {
    let categorieAndEventList;
    try {
      const res = await serviceEvent.getCategorieAndEvents();
      categorieAndEventList = res.result;
      this.setState({ categorieAndEventList });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    console.log(this.state.eventList)
    return (
      <div>
        <Row type="flex" justify="center" >
            <Col className="bottomCardEvents" xs={24} sm={16} md={12} lg={10} xl={6}>
              <CardEvents />
            </Col>
        </Row>
      </div>
    );
  }
}
