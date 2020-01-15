import React, { Component } from "react";
import {
  Input,
  Row,
  Col,
  Icon,
  Button,
  Table,
  Modal,
  Divider,
  Form,
  InputNumber
} from "antd";
import AdminLayout from "../../../common/AdminLayout";
const { Column } = Table;

const { Search } = Input;

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}
const EditableContext = React.createContext();
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
    console.log("🤧");
    return (
      <AdminLayout>
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
                  <Input placeholder="Enter Tag"></Input>
                </Modal>
              </Col>
            </Row>
            <Row type="flex" justify="center" style={{ padding: "10px" }}>
              <Table
                style={{ width: "800px" }}
                align="center"
                dataSource={data}
              >
                <Column title="Tag" dataIndex="name" key="name" />
                <Column
                  style={{ width: "150px" }}
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <span>
                      <Button type="primary">Edit Tag</Button>
                      <Divider type="vertical" />
                      <Button type="primary">Delete Tag</Button>
                    </span>
                  )}
                />
              </Table>
            </Row>
          </Col>
        </Row>
      </AdminLayout>
    );
  }
}
