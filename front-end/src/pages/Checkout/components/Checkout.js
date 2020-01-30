import React, { Component } from "react";
import { Button, Row, Col, Table } from "antd";
import { withRouter } from "react-router-dom";
import Axios from "../../../_helper/axios";
import "antd/dist/antd.css";
import "./Checkout.css";
import { ENDPOINT } from "../../../_constants";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketLists: [],
      columnsTicket: [
        {
          title: "Order NO.",
          dataIndex: "id",
          render: (value, ticketInOrder, index) => {
            let orderNumber = `${ticketInOrder.id}`;
            while (orderNumber.length < 8) {
              orderNumber = `0${orderNumber}`;
            }
            return <label>#{orderNumber}</label>;
          }
        },
        {
          title: "Event",
          dataIndex: "eventimage",
          render: (value, ticketInOrder, index) => {
            console.log("ticketInOrder", ticketInOrder);
            return (
              <img
                src={`${ENDPOINT}/${ticketInOrder.ticket.event.event_has_image.image.id}.${ticketInOrder.ticket.event.event_has_image.image.filename_extension}`}
                style={{ width: "50px" }}
              />
            );
          }
        },
        {
          title: "Event Name",
          dataIndex: "eventname",
          render: (value, ticketInOrder, index) => (
            <label>{ticketInOrder.ticket.event.event_name}</label>
          )
        },
        {
          title: "Ticket Name",
          dataIndex: "ticketname",
          render: (value, ticketInOrder, index) => (
            <label>{ticketInOrder.ticket.ticket_title}</label>
          )
        },
        {
          title: "Ticket in Stock",
          dataIndex: "ticketinstock",
          render: (value, ticketInOrder, index) => (
            <label>{ticketInOrder.ticket.ticket_remaining_quantity}</label>
          )
        },
        {
          title: "Buy Ticket",
          dataIndex: "buyticket",
          render: (value, ticketInOrder, index) => (
            <label>{ticketInOrder.ticket_quantity}</label>
          )
        },
        {
          title: "Check Out",
          dataIndex: "checkout",
          align: "center",
          render: (value, ticketInOrder, index) => (
            <Button type="primary" onClick={this.goToPayPage(ticketInOrder.id)}>
              Check Out
            </Button>
          )
        }
      ]
    };
  }

  componentDidMount = async () => {
    await this.getTicketInOrderDatas();
  };

  goToPayPage = ticket_in_order_id => () => {
    Axios.put(`/ticketInOrder/${ticket_in_order_id}`, {
      ticket_in_order_status_id: 2
    })
      .then(res => {
        this.props.history.push({
          pathname: `/pay`,
          search: `?ticket_in_order_id=${ticket_in_order_id}`
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  getTicketInOrderDatas = async () => {
    await Axios.get(`/ticketInOrder/checkout`)
      .then(res => {
        this.setState({ ticketLists: res.data.result });
      })
      .catch(err => {
        console.error(err);
      });
  };

  renderProcess = () => (
    <div id="process-div" className="mt-2 mb-2">
      <Row className="text-center">
        <Col offset={1} span={3}>
          <Button type="primary" className="active">
            {" "}
            1{" "}
          </Button>
          <p>Checkout</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={4}>
          <Button type="primary"> 2 </Button>
          <p>Pay</p>
        </Col>
        <Col span={3}>
          <h2>
            <i className="fas fa-ellipsis-h"></i>
            <i className="fas fa-ellipsis-h"></i>
          </h2>
        </Col>
        <Col span={4}>
          <Button type="primary"> 3 </Button>
          <p>Confirm</p>
        </Col>
      </Row>
    </div>
  );

  renderTotal = () => (
    <Row type="flex" justify="center">
      <Col span={20}>
        <Table
          columns={this.state.columnsTicket}
          dataSource={this.state.ticketLists}
          size="middle"
          align="center"
          // scroll={{ x: 200, y: 0 }}
        />
      </Col>
    </Row>
  );

  render() {
    console.log("this.state.ticketLists", this.state.ticketLists);
    return (
      <section id="checkout-section" className="container mt-4">
        {this.renderProcess()}
        {this.renderTotal()}
      </section>
    );
  }
}

export default withRouter(Checkout);
