import React, { Component } from "react";
import { Button, Row, Col } from "antd";

import { withRouter } from "react-router-dom";

<<<<<<< HEAD
=======
import {Link} from "react-router-dom"
>>>>>>> 6aca75e20d4554eeea63a32fad1438592929ee2f
// import * as constants from "../../../_constants";

import "antd/dist/antd.css";
import "./Complete.css";

class Complete extends Component {
  state = {};

  goToHome = () => {
    this.props.history.push({
      pathname: `/`,
      search: ``
    });
  };

  renderProcess = () => (
    <div id="process-div" className="mt-2 mb-2">
      <Row className="text-center">
        <Col offset={1} span={3}>
          <Button type="primary"> 1 </Button>
          <p>Checkout</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={3}>
          <Button type="primary"> 2 </Button>
          <p>Pay</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={3}>
          <Button type="primary"> 3 </Button>
          <p>Confirm</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={3}>
          <Button type="primary" className="active">
            {" "}
            4{" "}
          </Button>
          <p>Complete</p>
        </Col>
      </Row>
    </div>
  );

  renderComplete = () => (
    <div id="complete-div" className="mt-4">
      <div className="text-center p-5">
        <p className="display-3 m-5">Get Ticket Completed</p>
      </div>
    </div>
  );

  render() {
    return (
      <section id="complete-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderComplete()}

        <Row className="mt-4 mb-3">
          <Col span={24} className="text-center">
            <Button onClick={() => this.goToHome()} type="primary">
              Home
            </Button>
          </Col>
        </Row>
      </section>
    );
  }
}

export default withRouter(Complete);
