import React, { Component } from  "react";
import { Form, Button, Modal, Col, Row, Input, Table, Icon } from  "antd";
import TextArea from  "antd/lib/input/TextArea";
import Column from  "antd/lib/table/Column";
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
        organized_contact_title: value.name,
        organized_contact: value.description
      };
      console.log(datas);
      if (!err) {
        let arrayOfOrganizedData = this.state.organizedData;
        arrayOfOrganizedData.push(datas);
        await this.setState(arrayOfOrganizedData);
        await this.setState({
          visible: false
        });
        await this.props.handleGetOrganized(this.state.organizedData);
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

  swapOrganizedData = (index, isUpperCase) => () => {
    let organizedData = JSON.parse(JSON.stringify(this.state.organizedData));
    if (isUpperCase && index !== 0) {
      let temp = JSON.parse(JSON.stringify(organizedData[index]));
      organizedData[index] = organizedData[index - 1];
      organizedData[index - 1] = temp;
    } else if (!isUpperCase && index !== organizedData.length - 1) {
      let temp = JSON.parse(JSON.stringify(organizedData[index]));
      organizedData[index] = organizedData[index + 1];
      organizedData[index + 1] = temp;
    }
    this.setState({ organizedData });
  };

  deleteOrganizedData = indexTarget => () => {
    this.setState({
      organizedData: this.state.organizedData.filter(
        (item, index) => indexTarget !== index
      )
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
        <Table
          dataSource={dataOrganizedTable}
          style={{ width: "100%", overflow: "auto" }}
        >
          <Column
            title="Name"
            dataIndex="organized_contact_title"
            key="organized_contact_title"
          />
          <Column
            title="Description"
            dataIndex="organized_contact"
            key="organized_contact"
          />
          <Column
            title="Action"
            dataIndex="organized_contact"
            key="action"
            render={(text, data, index) => (
              <>
                <Button
                  
                  onClick={this.swapOrganizedData(index, true)}
                >
                  <Icon type="up" />
                </Button>
                <Button
                  onClick={this.swapOrganizedData(index, false)}
                  
                >
                  <Icon type="down" />
                </Button>
                <Button
                  onClick={this.deleteOrganizedData(index)}
                  
                >
                  <Icon type="delete" />
                </Button>
              </>
            )}
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
