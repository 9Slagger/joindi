import React, { Component } from "react";
import { Button, Modal, Form, Row, Col, Input, Checkbox } from "antd";


class Ticket extends Component {
  state = {
    visible: false,
    checked: true,
    disabled: false,
    ticketList: [],
    title: "",
    description: "",
    remarks: "",
    quantity: "",
    ticketPrice: ""
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
           title: value.tickettitle,
           description: value.ticketdescription,
           remarks: value.ticketremark,
           quantity: value.ticketquantity,
           ticketPrice: value.ticketprice
       }
       console.log(datas)
      if (!err) {
        let arrayOfTicketList = this.state.ticketList;
        arrayOfTicketList.push(datas);
        await this.setState(arrayOfTicketList)
        await this.setState({
            visible: false
          });
        this.props.form.resetFields();
        console.log(this.state.ticketList)
      }
    });
    
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  };

  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const label = "Free Event";
    return (
      <div>
        <Form>
            {this.state.ticketList.map(x=>(
                <Row key={x}>
  <Col span={5}>{x.title}</Col>
            <Col span={5}>{x.description}</Col>
            <Col span={5}>{x.remarks}</Col>
            <Col span={4}>{x.quantity}</Col>
            <Col span={5}>{x.ticketPrice}</Col>
                </Row>
            ))}
          <Button type="primary" onClick={this.showModal}>
            Add New Ticket
          </Button>
          <Modal
            title="Ticket"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Form.Item>
                    Title :
                    {getFieldDecorator("tickettitle", {
                      rules: [
                        {
                          required: true,
                          message: "Please put Ticket title!"
                        }
                      ]
                    })(<Input placeholder="Title" />)}
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item>
                    Description :
                    {getFieldDecorator("ticketdescription", {
                      rules: [
                        {
                          required: true,
                          message: "Please put description!"
                        }
                      ]
                    })(<Input placeholder="Description" />)}
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item>
                    Remark :
                    {getFieldDecorator(
                      "ticketremark",
                      {}
                    )(<Input placeholder="Remark" />)}
                  </Form.Item>
                </Row>
                <Row>
                  <Row>
                    <Checkbox
                      checked={this.state.checked}
                      disabled={this.state.disabled}
                      onChange={this.onChange}
                    >
                      {label}
                    </Checkbox>
                  </Row>

                  <Col span={12}>
                    <Form.Item>
                      Quantity :
                      {getFieldDecorator("ticketquantity", {
                        rules: [
                          {
                            required: true,
                            message: "Please put quantity!"
                          }
                        ]
                      })(<Input placeholder="Quantity" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      Ticket Price :
                      {getFieldDecorator(
                        "ticketprice",
                        {}
                      )(
                        <Input
                          placeholder="Ticket Price"
                          disabled={this.state.checked}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Ticket);
