import React, { Component } from "react";
import { Form, Button, Modal, Col, Row, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

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
        await this.setState({
          organizedData: datas,
          visible: false
        });
        this.props.form.resetFields();
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
    return (
      <div>
        <Form>
          <Row>
            <Col span={12}>
              <Row>{this.state.organizedData.name}</Row>
            </Col>
            <Col span={12}>
            <Row>{this.state.organizedData.description}</Row>
            </Col>
          </Row>
          <Button type="primary" onClick={this.showModal}>
            Add Organized By
          </Button>
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
