import React, { Component } from "react";
import { Form, Button, Modal, Col, Row, Input, Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Column from "antd/lib/table/Column";
import "./StyleComponents/OrganizedBy.css";

class OrganizedBy extends Component {
  state = {
    visible: false,
    organizedData: [],
    name: "",
    description: ""
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, value) => {
      let datas = {
        name: value.name,
        description: value.description
      };
      console.log(datas);
      if (!err) {
        let arrayOfOrganizedData = this.state.organizedData;
        arrayOfOrganizedData.push(datas);
        await this.setState(arrayOfOrganizedData);
        await this.setState({
          visible: false
        });
        this.props.form.resetFields();
        console.log(this.state.organizedData);
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const dataOrganizedTable = this.state.organizedData;
    return (
      <div className="organizedBox">
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <h3>Organized By</h3>
          </Col>
        </Row>
        <Table dataSource={dataOrganizedTable}>
          <Column title="name" dataIndex="name" key="name" />
          <Column
            title ="Description"
            dataIndex="description"
            key="description"
            // render={(text, data) => (
            //   <lebel style={{ fontSize: 100 }}>{data.description}</lebel>
            // )}
          />
        </Table>
        <Row>
          <Col span={24} style={{ textAlign: "center", margin: "20px" }}>
            <Button type="primary" onClick={this.showModal}>
              Add Organized By
            </Button>
          </Col>
        </Row>
        <Form>
          <Modal
            title="Organized By"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Form.Item>
                    Title :
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "Please put Name!"
                        }
                      ]
                    })(<Input placeholder="Name" />)}
                  </Form.Item>
                </Row>
                <Row>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Please put Description!"
                      }
                    ]
                  })(<TextArea rows={4} placeholder="Description" />)}
                </Row>
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}

export default Form.create()(OrganizedBy);
