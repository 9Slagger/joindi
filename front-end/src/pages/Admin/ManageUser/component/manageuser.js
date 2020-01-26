import React, { Component } from "react";
import { Input, Row, Col, Icon, Button, Table, Modal, Form } from "antd";
import { serviceTag } from "../../../../_service";
import Axios from "axios";
import Column from "antd/lib/table/Column";
import Notification from "../../../../common/Notification";

const { Search } = Input;

class ManageUser extends Component {
  state = { visible: false, TagNameEn: "", TagNameTh: "", userList: [] };

  fetchdata = () => {
    Axios.get("http://localhost:8085/user").then(result => {
      this.setState({ userList: result.data.result });
    });
  };

  componentDidMount() {
    this.fetchdata();
  }

  handleToggleUserStatus = data => () => {
    console.log(data);
    Axios.put("http://localhost:8085/user", {
      id: data.id,
      userActive: !data.user_active
    })
      .then(result => {
        this.fetchdata();
        console.log(result.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const dataUser = this.state.userList;

    return (
      <Row type="flex" justify="center">
        <Col>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{
              fontSize: "40px",
              color: "#345586"
              // borderBottom: "1px solid #345586"
            }}
          >
            <Col style={{ padding: "10px" }}>
              <Icon type="user" />
            </Col>
            <Col>
              <div>User List</div>
            </Col>
          </Row>
          <Row
            style={{
              color: "#345586",
              borderBottom: "1px solid #345586"
            }}
          ></Row>
          <Row type="flex" justify="center" style={{ padding: "10px" }}>
            <Col style={{ padding: "10px" }}>
              <Search style={{ width: "500px" }} />
            </Col>
          </Row>
          <Row style={{ padding: "10px" }}>
            <Table
              // columns={columnTag}
              dataSource={dataUser}
              scroll={{ x: 800, y: 300 }}
            >
              <Column
                title="First name"
                dataIndex="user_individual_detail.first_name"
                key="first_name"
              />
              <Column
                title="Last name"
                dataIndex="user_individual_detail.last_name"
                key="last_name"
              />
              <Column
                title="Phone number"
                dataIndex="phone_number"
                key="phone_number"
              />
              <Column
                title="E-mail"
                dataIndex="email"
                key="email"
              />
              <Column
                title="Status"
                dataIndex="tag_active"
                key="status"
                render={(text, data, index) => (
                  <>{data.user_active ? <Button type="primary">Active</Button> : <Button type="danger">In-Active</Button>}</>
                )}
              />
              <Column
                title="Action"
                key="action"
                dataIndex="tag_active"
                render={(text, data, index) => (
                  <>
                    <Button
                      type="danger"
                      shape="circle"
                      onClick={this.handleToggleUserStatus(data)}
                    >
                      <Icon type="swap" />
                    </Button>
                  </>
                )}
              />
            </Table>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(ManageUser);
