import React, { Component } from "react";

import {
  Input,
  Row,
  Col,
  Icon,
  Button,
  Table,
  Modal,
  Form,
  InputNumber
} from "antd";

const { Search } = Input;

const columns = [
  {
    title: "Tag Name EN",
    dataIndex: "address",
    key: "1",
    width: "100"
  },
  {
    title: "Tag Name TH",
    dataIndex: "age",
    key: "age",
    width: "100"
  },
  {
    title: "Status",
    dataIndex: "address",
    key: "1",
    width: "50"
  },
  {
    title: "Action",
    key: "operation",
    width: "100",
    render: () => (
      <Row>
        <Col span={7}>
          <Button type="primary" shape="circle">
            <Icon type="edit" />
          </Button>
        </Col>
        <Col span={7}>
          <Button type="danger" shape="circle">
            <Icon type="delete" />
          </Button>
        </Col>
      </Row>
    )
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `Park no. ${i}`
  });
}

export default class ManageTag extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
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
              <Icon type="tag" />
            </Col>
            <Col>
              <div>Tag List</div>
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
            <Col style={{ padding: "10px" }}>
              <Button style={{ color: "#345586" }} onClick={this.showModal}>
                Add Tag
              </Button>
              <Modal
                title="Add Tag"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="Add Tag"
                //footer={null}
              >
                <Row style={{ paddingBottom: "10px" }}>
                  Tag Name (English) :
                  <Input placeholder="Enter Tag Name (English)"></Input>
                </Row>
                <Row>
                  ชื่อแท็ก (ภาษาไทย) :
                  <Input placeholder="กรุณากรอกชื่อแท็ก (ภาษาไทย)"></Input>
                </Row>
              </Modal>
            </Col>
          </Row>
          <Row style={{ padding: "10px" }}>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: 800, y: 300 }}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}
