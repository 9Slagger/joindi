import React, { Component } from "react";
import UserLayout from "../../../../common/UserLayout";
import { serviceEvent } from "../../../../_service";
import { Table, Divider, Tag, Icon, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

export default class UserJoinEvent extends Component {
  state = {
    userJoinEventList: []
  };

  componentDidMount = () => {
    this.getUserJoinEvent();
  };

  getUserJoinEvent = async () => {
    try {
      const res = await serviceEvent.getUserJoinEvent(
        this.props.match.params.eventId
      );
      const userJoinEventList = res.result;
      console.log(userJoinEventList);
      this.setState({ userJoinEventList });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let dataUserJoinEvent = this.state.userJoinEventList;
    const columns = [
      {
        title: "First Name",
        dataIndex: "first_name",
        width: "150px",
        align: "center"
      },
      {
        title: "Last Name",
        dataIndex: "last_name",
        width: "150px",
        align: "center"
      },
      {
        title: "E-mail",
        dataIndex: "email",
        width: "150px",
        align: "center"
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
        width: "150px",
        align: "center"
      },
      {
        title: "Status",
        dataIndex: "status_name_en",
        width: "150px",
        align: "center",
        render: (data, recode, index) => (
          <Col>
            <Row>
              {recode.status_code == "checkout" ? (
                <Tag color="yellow">{recode.status_code}</Tag>
              ) : recode.status_code == "wait_for_payment" ? (
                <Tag color="purple">{recode.status_code}</Tag>
              ) : recode.status_code == "wait_for_approve" ? (
                <Tag color="blue">{recode.status_code}</Tag>
              ) : (
                <Tag color="green">{recode.status_code}</Tag>
              )}
            </Row>
          </Col>
        )
      }
    ];
    let data = [];
    dataUserJoinEvent.tickets &&
      dataUserJoinEvent.tickets.forEach(ticket => {
        ticket.ticket_in_orders.forEach(ticketInOrder => {
          data.push({
            ...ticketInOrder.order.user,
            ...ticketInOrder.order.user.user_individual_detail,
            ...ticketInOrder.order.user.user_company_details,
            ...ticketInOrder.ticket_in_order_status
          });
        });
      });

    return (
      <UserLayout {...this.props}>
        <Row>
          <Col>
            <Row type="flex">
              <Col span={12}>
                <h3 style={{ margin: "20px 20px" }}>Users Join Event</h3>
              </Col>

              <Col span={12} style={{ margin: "20px 0" }}>
                <Row type="flex" justify="end" style={{ margin: "0 20px" }}>
                  <Link to="/myevent">
                    <Button>Back</Button>
                  </Link>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <Table columns={columns} dataSource={data} size="middle" />
          </Col>
        </Row>
      </UserLayout>
    );
  }
}
