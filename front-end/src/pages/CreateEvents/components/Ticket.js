import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  DatePicker,
  Table
} from "antd";
import Column from "antd/lib/table/Column";
import "./StyleComponents/ticketDecoration.css";

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
    ticketPrice: "",
    dateAndTimeStart: "",
    dateAndTimeEnd: "",
    startValue: null,
    endValue: null,
    endOpen: false
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
        ticketPrice: value.ticketprice,
        dateAndTimeStart: this.state.startValue,
        dateAndTimeEnd: this.state.endValue
      };
      console.log(datas);
      if (!err) {
        let arrayOfTicketList = this.state.ticketList;
        arrayOfTicketList.push(datas);
        await this.setState(arrayOfTicketList);
        await this.setState({
          visible: false
        });
        this.props.form.resetFields();
        console.log(this.state.ticketList);
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
  // Handle Date and time picker
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onStartChange = (value, valueStrng) => {
    this.setState({ startValue: valueStrng });
    console.log(valueStrng);
  };

  onEndChange = (value, valueStrng) => {
    this.setState({ endValue: valueStrng });
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const label = "Free Event";
    const { endOpen } = this.state;
    const dataTicketTable = this.state.ticketList;
    return (
      <div className="ticketBox">
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <h3>Ticket</h3>
          </Col>
        </Row>
        <Table dataSource={dataTicketTable} style={{ width:"100%" }}>
          <Column title="Title" dataIndex="title" key="title" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />

          <Column title="Remark" dataIndex="remarks" key="remarks" />
          <Column title="Quantity" dataIndex="quantity" key="quantity" />
          <Column
            title="Ticket Price"
            dataIndex="ticketPrice"
            key="ticketPrice"
          />
          <Column
            title="Start"
            dataIndex="dateAndTimeStart"
            key="dateAndTimeStart"
          />
          <Column title="End" dataIndex="dateAndTimeEnd" key="dateAndTimeEnd" />
        </Table>
        <Form>
          <Row>
            <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" onClick={this.showModal}>
                Add New Ticket Type
              </Button>
            </Col>
          </Row>

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
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator("startValue", {
                        rules: [
                          {
                            required: true,
                            message: "Please put Start Date!"
                          }
                        ]
                      })(
                        <DatePicker
                          disabledDate={this.disabledStartDate}
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="Start"
                          onChange={this.onStartChange}
                          onOpenChange={this.handleStartOpenChange}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator("endValue", {
                        rules: [
                          {
                            required: true,
                            message: "Please put End Date!"
                          }
                        ]
                      })(
                        <DatePicker
                          disabledDate={this.disabledEndDate}
                          showTime
                          format="YYYY-MM-DD HH:mm:ss"
                          placeholder="End"
                          onChange={this.onEndChange}
                          open={endOpen}
                          onOpenChange={this.handleEndOpenChange}
                        />
                      )}
                    </Form.Item>
                  </Col>
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
                      })(<Input type="number" placeholder="Quantity" />)}
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
                          type="number"
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
